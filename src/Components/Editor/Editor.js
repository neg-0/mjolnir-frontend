import { Paper } from '@mui/material'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'
import Markdown from 'react-markdown-it'
import demo from './Markdown Demo.md'
import santa from './Letter to Santa.md'
import santa_options from './Letter to Santa.json'

export default function Editor({ template, testMarkdown, testMarkdownOptions }) {

    const [markdownText, setMarkdownText] = useState('**Loading...**')

    useEffect(() => {
        if (testMarkdown) {
            setMarkdownText(parseMarkdownOptions(testMarkdown, testMarkdownOptions))
        } else {
            fetch(santa)
                .then((res) => res.text())
                .then((text) => setMarkdownText(parseMarkdownOptions(text, santa_options)))
        }
    }, [])

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
        </Box>
    )
}