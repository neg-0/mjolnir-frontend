import { Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import * as React from 'react'
import { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { AppFunctionsContext } from '../../App'
import MarkdownRenderer from './MarkdownRenderer'
import OptionDrawer from './OptionDrawer'

export default function Editor({ testTemplate, testTemplateOptions, testSerializedOptions }) {

    const appFunctions = useContext(AppFunctionsContext)

    const [template, setTemplate] = useState() // The original text from the markdown file
    const [templateOptions, setTemplateOptions] = useState() // Array of template options
    const [serializedOptions, setSerializedOptions] = useState({}) // JSON object of user-provided options

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
            setSerializedOptions(testSerializedOptions)
        } else {
            // Get the template ID from the browser and fetch the contents from appFunctions
            let templateId = 1
            // let templateOptionsId = templateId
            let serializedOptionsId = null

            if (query.get('templateId')) {
                templateId = query.get('templateId')
            }

            if (query.serializedOptionsId) {
                serializedOptionsId = query.serializedOptionsId
            }

            appFunctions.fetchTemplateById(templateId).then(templatePackage => {
                console.log('setting template package:', templatePackage.template, "options", templatePackage.template_options)
                setTemplate(templatePackage.template)
                setTemplateOptions(templatePackage.template_options)

            })
            appFunctions.fetchSerializedOptions(serializedOptionsId).then(setSerializedOptions)
        }
    }, [])

    /**
     * Sets a serialized option value
     * @param {string} optionName 
     * @param {*} optionValue 
     */
    function setMarkdownOption(optionName, optionValue) {
        let newOptions = { ...serializedOptions }
        newOptions[optionName] = optionValue
        setSerializedOptions(newOptions)
    }

    /**
     * Deletes a serialized option value
     * @param {string} optionName 
     */
    function deleteMarkdownOption(optionName) {
        let newOptions = { ...serializedOptions }
        delete newOptions[optionName]
        setSerializedOptions(newOptions)
    }

    let drawerWidth = 260

    // If either the template or templateOptions haven't loaded, don't render anything
    if (!template || !templateOptions) {
        return null
    }

    return (
        <Box sx={{ backgroundColor: "#333", p: ".5in", height: '120vh', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h1" sx={{ mx: 'auto', color: '#ccc' }}>{template.template_title}</Typography>
            <Typography>{serializedOptions ? serializedOptions.name : ''}</Typography>
            <Paper data-testid="editor" sx={{ aspectRatio: "8.5/11", width: '60%', mx: "auto", mr: { drawerWidth }, p: "1in" }}>
                <MarkdownRenderer template={template} templateOptions={templateOptions} serializedOptions={serializedOptions} />
            </Paper>
            <OptionDrawer drawerWidth={drawerWidth} templateOptions={templateOptions} markdownOptionFuncs={markdownOptionFuncs} serializedOptions={serializedOptions} />
        </Box >
    )
}