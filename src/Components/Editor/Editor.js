import { Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import * as React from 'react'
import { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { AppFunctionsContext, UserDataContext } from '../../App'
import MarkdownRenderer from './MarkdownRenderer'
import OptionDrawer from './OptionDrawer'
import { url } from '../../App'

export default function Editor({ testTemplate, testTemplateOptions, testHistoryObject }) {

    const appFunctions = useContext(AppFunctionsContext)
    const userData = useContext(UserDataContext)

    const [template, setTemplate] = useState() // The original text from the markdown file
    const [templateOptions, setTemplateOptions] = useState() // Array of template options
    const [historyObject, setHistoryObject] = useState() // JSON object of user-provided options

    const markdownOptionFuncs = { setMarkdownOption, deleteMarkdownOption } // Wrap our markdown option functions into an object to pass down

    function useQuery() {
        const { search } = useLocation();

        return React.useMemo(() => new URLSearchParams(search), [search]);
    }
    let query = useQuery()

    // Fetch template, options, and serializedOptions upon load
    useEffect(() => {
        if (testTemplate) {
            // If we're supplied with test data, use that instead
            setTemplate(testTemplate)
            setTemplateOptions(testTemplateOptions)
            setHistoryObject(testHistoryObject)
        } else {
            // Get the template ID from the browser and fetch the contents from appFunctions
            let templateId = 1
            // let templateOptionsId = templateId
            let serializedOptionsId = null

            // If the template is supplied via query (it always should be!)
            if (query.get('templateId')) {
                templateId = query.get('templateId')
            }

            appFunctions.fetchTemplateById(templateId).then(templatePackage => {
                setTemplate(templatePackage.template)
                setTemplateOptions(templatePackage.template_options)
            })

            // If serialized options are supplied, such as when loading from history, then load them in
            if (query.get('serializedOptions')) {
                serializedOptionsId = query.get('serializedOptions')
                appFunctions.fetchHistoryObjectByHistoryId(serializedOptionsId).then(options => {
                    if (options) {
                        setHistoryObject(options.serialized_options)
                    }
                })
            }
        }
    }, [testTemplate, testTemplateOptions, testHistoryObject, appFunctions, query])

    async function postSerializedOptions() {
        fetch(`${url}/users/${userData.user_name}/history`)
    }

    /**
     * Sets a serialized option value
     * @param {string} optionName 
     * @param {*} optionValue 
     */
    function setMarkdownOption(optionName, optionValue) {
        let newOptions = { ...historyObject }
        newOptions[optionName] = optionValue
        setHistoryObject(newOptions)
    }

    /**
     * Deletes a serialized option value
     * @param {string} optionName 
     */
    function deleteMarkdownOption(optionName) {
        let newOptions = { ...historyObject }
        delete newOptions[optionName]
        setHistoryObject(newOptions)
    }

    let drawerWidth = 260

    // If either the template or templateOptions haven't loaded, don't render anything
    if (!template || !templateOptions) {
        return null
    }

    return (
        <Box sx={{ backgroundColor: "#333", p: ".5in", height: '120vh', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h1" sx={{ mx: 'auto', color: '#ccc' }}>{historyObject ? historyObject.file_name : template.title}</Typography>
            <Paper data-testid="editor" sx={{ aspectRatio: "8.5/11", width: '60%', mx: "auto", mr: { drawerWidth }, p: "1in" }}>
                <MarkdownRenderer template={template} templateOptions={templateOptions} serializedOptions={historyObject ? historyObject.serialized_options : null} />
            </Paper>
            <OptionDrawer drawerWidth={drawerWidth} templateOptions={templateOptions} markdownOptionFuncs={markdownOptionFuncs} serializedOptions={historyObject ? historyObject.serialized_options : null} />
        </Box >
    )
}