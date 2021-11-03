import CheckBoxIcon from '@mui/icons-material/CheckBox';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import TextFormatIcon from '@mui/icons-material/TextFormat';
import { Divider, FormControl, ListItem, ListItemIcon, ListItemText, TextField } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Box } from '@mui/system';
import * as React from 'react';

export default function MarkdownOption({ templateOption, serializedOptions, markdownOptionFuncs }) {
    let icon
    let valueComponent

    let optionName = templateOption.option_name
    let optionType = templateOption.option_type
    let optionValue = templateOption.option_text

    // If serializedOptions has an overriding value, use that instead
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

    function updateDropdownValue(index) {
        markdownOptionFuncs.setMarkdownOption(optionName, index)
    }

    const fieldStyle = { mx: 2, my: 1, width: 200 }

    switch (optionType) {
        case "string":
            icon = <TextFormatIcon />
            valueComponent = <TextField sx={fieldStyle} value={optionValue} onChange={e => updateValue(e.target.value)} />
            break
        case "number":
            icon = <TextFormatIcon />
            valueComponent = <TextField sx={fieldStyle} value={optionValue} onChange={e => updateValue(e.target.value)} />
            break
        case "unordered_list":
            icon = <FormatListBulletedIcon />
            console.log('array', optionValue)
            valueComponent = optionValue.map((element, index) => (<TextField sx={fieldStyle} value={element} onChange={e => updateArray(index, e.target.value)} />))
            break
        case "ordered_list":
            icon = <FormatListNumberedIcon />
            console.log('array', optionValue)
            valueComponent = optionValue.map((element, index) => (<TextField sx={fieldStyle} value={element} onChange={e => updateArray(index, e.target.value)} />))
            break
        case "boolean":
            icon = <CheckBoxIcon />
            valueComponent = <FormControlLabel control={<Checkbox defaultChecked sx={fieldStyle} />} label={optionValue} />
            break
        case 'dropdown':

            icon = <ArrowDropDownIcon />
            valueComponent = (<FormControl sx={fieldStyle}>
                <InputLabel id="demo-simple-select-label">{optionName}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={0}
                    label={optionName}
                    onChange={e => updateDropdownValue(e.target.value)}
                >
                    {optionValue.map((v, i) => <MenuItem value={i}>{v}</MenuItem>)}
                </Select>
            </FormControl>)
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