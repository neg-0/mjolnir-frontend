import { useEffect, useState, useContext } from 'react'
import Markdown from 'react-markdown-it'
import { AppFunctionsContext } from '../../App'

export default function MarkdownRenderer({ template, templateOptions, serializedOptions }) {

    // Get our app functions for fetching content
    const appFunctions = useContext(AppFunctionsContext)

    // The converted text ready for markdown parsing
    const [markdownText, setMarkdownText] = useState('**Loading...**')

    // Update the rendered markdown text any time the markdown, template options, or serialized options change
    useEffect(() => {
        let parsedMarkdownText = parseMarkdown(template, templateOptions, serializedOptions)
        setMarkdownText(parsedMarkdownText)
    }, [template, templateOptions, serializedOptions])

    /**
     * Renders an array into a markdown with prefix before every line
     * @param {string[]} listItems 
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
     * @param {object[]} templateOptions An array of objects containing template option name, type, and value(s)
     * @param {object} serializedOptions An object containing key value pairs of option names and values to replace
     * @returns A Markdown formatted file with all available options replaced
     */
    function parseMarkdown(template, templateOptions, serializedOptions) {
        // console.log("Parsing")
        console.log("Template", template)
        console.log("Template Options", templateOptions)
        console.log("Serialized Options", serializedOptions)


        // If we haven't been supplied with any template, return nothing
        if (template === undefined) {
            return null
        }

        let markdown = template.template_body

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

            // Build a regex based off of the option key
            // e.g., object key of 'NAME' will become /{NAME}/gi
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