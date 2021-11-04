import { Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import * as React from 'react'
import { useContext, useEffect, useState, createContext } from 'react'
import { useLocation } from 'react-router'
import { AppFunctionsContext } from '../../App'
import MarkdownRenderer from './MarkdownRenderer'
import OptionDrawer from './OptionDrawer'

export default function Editor({ testTemplate, testTemplateOptions, testSerializedOptions }) {

    const appFunctions = useContext(AppFunctionsContext)

    const [template, setTemplate] = useState() // The original text from the markdown file
    const [templateOptions, setTemplateOptions] = useState() // JSON object of template option names and values
    const [serializedOptions, setSerializedOptions] = useState({}) // JSON object of user-provided options

    const markdownOptionFuncs = { setMarkdownOption, deleteMarkdownOption } // Wrap our markdown option functions into an object to pass down

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
            let templateOptionsId = 1
            let serializedOptionsId = 1

            appFunctions.fetchTemplate(templateId).then(setTemplate)
            appFunctions.fetchTemplateOptions(templateOptionsId).then(setTemplateOptions)
            appFunctions.fetchSerializedOptions(serializedOptionsId).then(setSerializedOptions)
        }
    }, [])

    // // Update the rendered markdown text any time the markdown, template options, or serialized options change
    // useEffect(() => {
    //     // Fetch all information
    //     let templatePromise = appFunctions.fetchTemplate(templateId)
    //     let templateOptionsPromise = appFunctions.fetchTemplateOptions(templateOptionsId)
    //     let serializedOptionsPromise = appFunctions.fetchSerializedOptions(serializedOptionsId)

    //     // Wait for all promises to come back
    //     Promise.all([templatePromise, templateOptionsPromise, serializedOptionsPromise]).then(([template, templateOptions, serializedOptions]) => {
    //         // Parse our markdown text with returned values from the promise
    //         setMarkdownText(parseMarkdownOptions(template, templateOptions, serializedOptions))
    //     })
    // }, [templateId, templateOptionsId, serializedOptionsId])

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

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
        <Box sx={{ backgroundColor: "#333", p: ".5in", height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h1" sx={{ mx: 'auto', color: '#ccc' }}>{template.template_title}</Typography>
            <Typography>{serializedOptions ? serializedOptions.name : ''}</Typography>
            <Paper data-testid="editor" sx={{ aspectRatio: "8.5/11", width: '60%', mx: "auto", p: "1in" }}>
                <MarkdownRenderer template={template} templateOptions={templateOptions} serializedOptions={serializedOptions} />
            </Paper>
            <OptionDrawer drawerWidth={drawerWidth} templateOptions={templateOptions} markdownOptionFuncs={markdownOptionFuncs} serializedOptions={serializedOptions} />
        </Box >
    )
}