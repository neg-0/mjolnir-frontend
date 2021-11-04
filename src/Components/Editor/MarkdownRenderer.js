import * as React from 'react'
import { useEffect, useState } from 'react'
import Markdown from 'react-markdown-it'

export default function MarkdownRenderer({ markdown, templateOptions, serializedOptions }) {

    // The converted text ready for markdown parsing
    const [markdownText, setMarkdownText] = useState('**Loading...**')

    // Update the rendered markdown text any time the markdown, template options, or serialized options change
    useEffect(() => {
        setMarkdownText(parseMarkdownOptions(markdown, templateOptions, serializedOptions))
    }, [markdown, templateOptions, serializedOptions])

    /**
     * Renders an array into a markdown with prefix before every line
     * @param {array} listItems 
     * @param {string} prefix 
     * @returns 
     */
    function renderList(listItems, prefix) {
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

        // If we aren't given any template options, simply return the markdown
        if (!templateOptions) {
            return markdown
        }

        // Iterate through the template options and replace entries with default or serialized data
        for (let option of templateOptions) {
            // console.log("Option", option)

            let key = option.option_name // NAME
            let type = option.option_type // string
            let value = option.option_text // Little Timmy
            let serializedValue

            // If we're provided a serialized options object
            if (serializedOptions) {
                // Does this key exist in serialized option?
                if (serializedOptions.hasOwnProperty(key)) {
                    serializedValue = serializedOptions[key] // Mario
                }
            }

            let regexKey = `{${key}}` // {NAME}
            let regex = new RegExp(regexKey, "gi")

            // console.log('regex:', regex)

            // Based on the type of template option, render specific markdown
            switch (type) {
                case 'number':
                case 'string':
                    // Numbers and strings don't need anything fancy, just replace the value
                    // Serialized value is a string that overrides the default
                    markdown = markdown.replace(regex, serializedValue ?? value)
                    break
                case 'ordered_list':
                case 'unordered_list':
                    // List values are an array of strings
                    // Serialized values is a replacement array of strings
                    // Lists have a prefix dash or number
                    let prefix = type === 'ordered_list' ? '1.' : '-'
                    markdown = markdown.replace(regex, renderList(serializedValue ?? value, prefix))
                    break
                case 'dropdown':
                    // Dropdowns value is an array of possible responses
                    // Serialized value is the index of that dropdown option
                    markdown = markdown.replace(regex, serializedValue ? value[serializedValue] : value[0])
                    break
                case 'boolean':
                    // Boolean value is either a single string or an array of two strings
                    // Serialized value is the index of that dropdown option
                    if (Array.isArray(value)) {
                        markdown = markdown.replace(regex, serializedValue === undefined ? value : serializedValue ? value[serializedValue] : value[0])
                    } else {
                        markdown = markdown.replace(regex, serializedValue === undefined ? value : serializedValue ? value : '')
                    }
                    break
            }

        }

        return markdown
    }

    return <Markdown source={markdownText} />
}