import { Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import * as React from 'react'
import { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { AppFunctionsContext, UserDataContext } from '../../App'
import MarkdownRenderer from './MarkdownRenderer'
import OptionDrawer from './OptionDrawer'
import { patchSerializedOptions, postSerializedOptions, fetchHistoryPackageByHistoryId } from '../../Database'

export default function Editor({ location, testTemplate, testTemplateOptions, testHistoryObject }) {

    const appFunctions = useContext(AppFunctionsContext)
    const userData = useContext(UserDataContext)

    const [historyObject, setHistoryObject] = useState() // History object loaded from DB
    const [template, setTemplate] = useState() // The original template
    const [templateOptions, setTemplateOptions] = useState() // Array of template options
    const [localSerializedOptions, setLocalSerializedOptions] = useState(null) // saved user data
    const [remoteHistoryId, setRemoteHistoryId] = useState(undefined) // Lets us know if we're properly connected to the remote DB
    const markdownOptionFuncs = { setMarkdownOption, deleteMarkdownOption } // Wrap our markdown option functions into an object to pass down

    console.log('LOCATION', location)
    function useQuery() {
        const { search } = useLocation();

        return React.useMemo(() => new URLSearchParams(search), [search]);
    }
    let query = useQuery()

    // Fetch template, options, and serializedOptions upon load
    useEffect(() => {

        // If we're supplied with test data, use that instead
        if (testTemplate) {
            setTemplate(testTemplate)
            setTemplateOptions(testTemplateOptions)
            setHistoryObject(testHistoryObject)
            return
        }

        // If a history ID is supplied, such as when loading from history, then load them in
        if (query.get('historyId')) {
            let historyId = query.get('historyId')
            fetchHistoryPackageByHistoryId(historyId).then(historyPackage => {
                if (historyPackage) {
                    console.log('Received history package:', historyPackage)

                    // Set state to know we're PATCHing instead of POSTing
                    // Do this first to prevent accidental posting
                    setRemoteHistoryId(historyPackage.history_object.history_id)

                    setHistoryObject(historyPackage.history_object)
                    setTemplate(historyPackage.template)
                    setTemplateOptions(historyPackage.template_options)
                    setLocalSerializedOptions(historyPackage.history_object.serialized_options)

                }
            })
        } else {
            // History was not provided, check for a template ID and grab the template and options
            let templateId = 1
            if (query.get('templateId')) {
                templateId = query.get('templateId')
                appFunctions.fetchTemplateById(templateId).then(templatePackage => {
                    setTemplate(templatePackage.template)
                    setTemplateOptions(templatePackage.template_options)
                })
            }
        }

    }, [testTemplate, testTemplateOptions, testHistoryObject, appFunctions, query])

    // Watch our local serialized options or history object and if there are changes, post or patch to the DB
    useEffect(() => {
        // If template has not yet been loaded, return
        if (!template) {
            return
        }

        if (remoteHistoryId === undefined) {
            postSerializedOptions(userData.user_name, template.id, template.title, localSerializedOptions)
                .then(newHistoryObject => {
                    // Get back our historyObject and set that to our state
                    setRemoteHistoryId(newHistoryObject.history_id)
                    setHistoryObject(newHistoryObject)
                })
        } else {
            patchSerializedOptions(remoteHistoryId, template.id, historyObject.file_name, localSerializedOptions)
                .then(newHistoryObject => {
                    // Get back our historyObject and set that to our state
                    setHistoryObject(newHistoryObject)
                    setRemoteHistoryId(newHistoryObject.history_id)
                })
        }
    }, [localSerializedOptions])


    /**
     * Sets a serialized option value
     * @param {string} optionName 
     * @param {*} optionValue 
     */
    function setMarkdownOption(optionName, optionValue) {
        let newSerializedOptions = { ...localSerializedOptions }
        newSerializedOptions[optionName] = optionValue
        setLocalSerializedOptions(newSerializedOptions)
    }

    /**
     * Deletes a serialized option value
     * @param {string} optionName 
     */
    function deleteMarkdownOption(optionName) {
        let newSerializedOptions = { ...localSerializedOptions }
        delete newSerializedOptions[optionName]
        setLocalSerializedOptions(newSerializedOptions)
    }

    // /**
    //  * Continuous timer function to push serializedOption updates to the DB
    //  */
    // async function historyUpdater() {
    //     if (pushHistoryToDB) {
    //         setTimeout(() => {historyUpdater()}, 500)
    //         postHistory()
    //     }
    // }

    let drawerWidth = 260

    // If either the template or templateOptions haven't loaded, don't render anything
    if (!template || !templateOptions) {
        return null
    }

    return (
        <Box sx={{ backgroundColor: "#333", p: ".5in", height: '120vh', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h1" sx={{ mx: 'auto', color: '#ccc' }}>{historyObject ? historyObject.file_name : template.title}</Typography>
            <Paper data-testid="editor" sx={{ aspectRatio: "8.5/11", width: '60%', mx: "auto", mr: { drawerWidth }, p: "1in" }}>
                <MarkdownRenderer template={template} templateOptions={templateOptions} serializedOptions={localSerializedOptions} />
            </Paper>
            <OptionDrawer drawerWidth={drawerWidth} templateOptions={templateOptions} markdownOptionFuncs={markdownOptionFuncs} serializedOptions={localSerializedOptions} />
        </Box >
    )
}