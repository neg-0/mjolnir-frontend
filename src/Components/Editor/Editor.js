import { Paper } from '@mui/material'
import { Box } from '@mui/system'
import * as React from 'react'
import { useContext, useEffect, useState, createContext } from 'react'
import { useLocation } from 'react-router'
import { AppFunctionsContext } from '../../App'
import MarkdownRenderer from './MarkdownRenderer'
import OptionDrawer from './OptionDrawer'

const MarkdownContext = createContext()
const TemplateOptionsContext = createContext()
const SerializedOptionsContext = createContext()

export default function Editor({ testMarkdown, testMarkdownOptions }) {

    const appFunctions = useContext(AppFunctionsContext)

    const [templateText, setTemplateText] = useState('') // The original text from the markdown file
    const [templateOptions, setTemplateOptions] = useState([]) // JSON object of template option names and values
    const [serializedOptions, setSerializedOptions] = useState([]) // JSON object of user-provided options
    const markdownOptionFuncs = { setMarkdownOption, deleteMarkdownOption }
    const query = useQuery()

    useEffect(() => {
        if (testMarkdown) {
            setTemplateText(testMarkdown)
            setTemplateOptions(testMarkdownOptions)
        } else {
            let templateName = query.get('template')
            console.log("Loading template", templateName)
            let template = appFunctions.fetchTemplate(templateName)
            let options = appFunctions.fetchTemplateOptions(templateName)

            console.log('Template', template)

            fetch(template)
                .then((res) => res.text())
                .then((text) => {
                    setTemplateText(text)
                    setTemplateOptions(options)
                })
        }
    }, [])



    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    /**
     * Sets a serialized option value
     * @param {string} optionName 
     * @param {*} optionValue 
     */
    function setMarkdownOption(optionName, optionValue) {
        let newOptions = [...serializedOptions]
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

    return (
        <MarkdownContext.Provider value={templateText}>
            <TemplateOptionsContext.Provider value={templateOptions}>
                <SerializedOptionsContext.Provider value={serializedOptions}>
                    <Box sx={{ backgroundColor: "#333", p: ".5in" }}>
                        <Paper data-testid="editor" sx={{ width: "8.5in", height: "11in", mx: "auto", p: "1in" }}>
                            <MarkdownRenderer markdown={templateText} templateOptions={templateOptions} serializedOptions={serializedOptions} />
                        </Paper>
                        <OptionDrawer templateOptions={templateOptions} markdownOptionFuncs={markdownOptionFuncs} serializedOptions={serializedOptions} />
                    </Box>
                </SerializedOptionsContext.Provider>
            </TemplateOptionsContext.Provider>
        </MarkdownContext.Provider >
    )
}