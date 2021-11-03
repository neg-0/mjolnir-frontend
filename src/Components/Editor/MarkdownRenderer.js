import { Paper } from '@mui/material'
import { Box } from '@mui/system'
import * as React from 'react'
import { useEffect, useState } from 'react'
import Markdown from 'react-markdown-it'
import OptionDrawer from './OptionDrawer'
import { useLocation } from 'react-router'

export default function MarkdownRenderer({ markdown, templateOptions, serializedOptions }) {

    const [markdownText, setMarkdownText] = useState('**Loading...**') // The converted text ready for markdown parsing

    useEffect(() => {
        setMarkdownText(parseMarkdownOptions(markdown, templateOptions, serializedOptions))
    }, [markdown, templateOptions, serializedOptions])

    function renderList(listItems, type) {
        // add dashes/number and newline
        let prefix = ''
        if (type === 'ordered_list') {
            prefix = '1.'
        } else if (type === 'unordered_list') {
            prefix = '-'
        }
        let items = listItems.map(item => `${prefix} ${item}\n`)
        return items.join('').trim()
    }

    /**
     * Renders a markdown file, replacing options in {CURLY_BRACES} with items in templateOptions, further filling them with data from serializedOptions if it exists
     * @param {string} markdown The Markdown formatted template file
     * @param {array} templateOptions An array of objects containing template option name, type, and value(s)
     * @param {object} serializedOptions An object containing key value pairs of option names and values to replace
     * @returns A Markdown formatted file with all available options replaced
     */
    function parseMarkdownOptions(markdown, templateOptions, serializedOptions) {
        // console.log("Parsing")
        // console.log("Markdown", markdown)
        // console.log("Options", templateOptions)

        if (!templateOptions) {
            return markdown
        }

        // Iterate through the template options and replace entries with default or serialized data
        for (let option of templateOptions) {
            // console.log("Option", option)

            let key = option.option_name
            let type = option.option_type

            let value = option.option_text

            if (serializedOptions.hasOwnProperty(key)) {
                value = serializedOptions[key]
            }

            let regexKey = `{${key}}`
            let regex = new RegExp(regexKey, "gi")

            // console.log('regex:', regex)

            if (Array.isArray(value)) {
                markdown = markdown.replace(regex, renderList(value, type))
            } else {
                markdown = markdown.replace(regex, value)
            }
        }

        return markdown
    }

    return <Markdown source={markdownText} />
}