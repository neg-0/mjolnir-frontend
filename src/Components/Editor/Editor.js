import { Paper } from '@mui/material'
import { Box } from '@mui/system'
import * as React from 'react'
import { useEffect, useState } from 'react'
import Markdown from 'react-markdown-it'
import santa_options from './Letter to Santa.json'
import santa from './Letter to Santa.md'
import OptionDrawer from './OptionDrawer'

export default function Editor({ template, testMarkdown, testMarkdownOptions }) {

    const [templateText, setTemplateText] = useState('') // The original text from the markdown file
    const [markdownText, setMarkdownText] = useState('**Loading...**') // The converted text ready for markdown parsing
    const [templateOptions, setTemplateOptions] = useState() // JSON object of template option names and values
    const markdownOptionFuncs = { setMarkdownOption, deleteMarkdownOption }

    useEffect(() => {
        if (testMarkdown) {
            setTemplateText(testMarkdown)
            setTemplateOptions(testMarkdownOptions)
        } else {
            fetch(santa)
                .then((res) => res.text())
                .then((text) => {
                    setTemplateText(text)
                    setTemplateOptions(santa_options)
                })
        }
    }, [])

    useEffect(() => {
        setMarkdownText(parseMarkdownOptions(templateText, templateOptions))
    }, [templateText, templateOptions])

    function setMarkdownOption(optionName, optionValue) {
        let newOptions = { ...templateOptions }
        newOptions[optionName] = optionValue
        setTemplateOptions(newOptions)
    }

    function deleteMarkdownOption(optionName) {
        let newOptions = { ...templateOptions }
        delete newOptions[optionName]
        setTemplateOptions(newOptions)
    }


    function renderList(listItems) {
        // add dashes and newline
        let items = listItems.map(item => `- ${item}\n`)
        return items.join('').trim()
    }

    function parseMarkdownOptions(markdown, options) {

        if (!options) {
            return markdown
        }

        for (const [key, value] of Object.entries(options)) {
            // console.log('key', key)
            // console.log('value', value)

            let regexKey = `{${key}}`
            let regex = new RegExp(regexKey, "gi")

            // console.log('regex:', regex)

            if (Array.isArray(value)) {
                markdown = markdown.replace(regex, renderList(value))
            } else {
                markdown = markdown.replace(regex, value)
            }

        }

        return markdown
    }



    return (
        <Box sx={{ backgroundColor: "#333", p: ".5in" }}>
            <Paper data-testid="editor" sx={{ width: "8.5in", height: "11in", mx: "auto", p: "1in" }}>
                <Markdown source={markdownText} />
            </Paper>
            <OptionDrawer options={templateOptions} markdownOptionFuncs={markdownOptionFuncs} />
        </Box>
    )
}