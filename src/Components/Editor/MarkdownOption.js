import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import TextFormatIcon from '@mui/icons-material/TextFormat';
import { Divider, FormControl, List, ListItem, ListItemIcon, ListItemText, TextField } from "@mui/material";
import { Box } from '@mui/system';

export default function MarkdownOption({ templateOption, serializedOptions, markdownOptionFuncs }) {
    let icon
    let valueComponent

    let optionName = templateOption.option_name
    let optionType = templateOption.option_type
    let optionValue = templateOption.option_text

    if (serializedOptions.hasOwnProperty(optionName)) {
        optionValue = serializedOptions[optionName]
    }

    /**
     * Updates an options array at the specified index with the new value
     * @param {number} index 
     * @param {string} value 
     */
    function updateArray(index, value) {
        let newArray = [...optionValue]
        newArray[index] = value
        markdownOptionFuncs.setMarkdownOption(optionName, newArray)
    }

    /**
     * Updates the serialized option value
     * @param {string} value 
     */
    function updateValue(value) {
        markdownOptionFuncs.setMarkdownOption(optionName, value)
    }

    switch (optionType) {
        case "string":
            icon = <TextFormatIcon />
            valueComponent = <TextField sx={{ mx: 2, my: 1 }} value={optionValue} onChange={e => updateValue(e.target.value)} />
            break
        case "number":
            icon = <TextFormatIcon />
            valueComponent = <TextField sx={{ mx: 2, my: 1 }} value={optionValue} onChange={e => updateValue(e.target.value)} />
            break
        case "unordered_list":
            icon = <FormatListBulletedIcon />
            console.log('array', optionValue)
            valueComponent = optionValue.map((element, index) => (<TextField sx={{ mx: 2, my: 1 }} value={element} onChange={e => updateArray(index, e.target.value)} />))
            break
        case "ordered_list":
            icon = <FormatListNumberedIcon />
            console.log('array', optionValue)
            valueComponent = optionValue.map((element, index) => (<TextField sx={{ mx: 2, my: 1 }} value={element} onChange={e => updateArray(index, e.target.value)} />))
            break
        case "boolean":
            break
    }

    return (
        // <ListItem key={optionName}>
        <Box sx={{ my: 1, py: 2 }}>
            <ListItem>
                <ListItemIcon>
                    {icon}
                </ListItemIcon>
                <ListItemText primary={optionName} />
            </ListItem>
            {valueComponent}
            <Divider />
        </Box>
        // </ListItem>
    )
}