import CheckBoxIcon from '@mui/icons-material/CheckBox';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import TextFormatIcon from '@mui/icons-material/TextFormat';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { Divider, FormControl, ListItem, ListItemIcon, ListItemText, TextField } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Box } from '@mui/system';
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';


export default function MarkdownOption({ templateOption, serializedOption, markdownOptionFuncs }) {
    let icon
    let valueComponent

    let optionName = templateOption.option_name // The name of this option in templateOptions
    let optionType = templateOption.option_type // The type of option (string, number, boolean, etc)
    let optionValue = templateOption.option_text // The default value of this option if string, array of items if a list

    let serializedValue
    let value

    // If serializedOptions has an overriding value, use that instead
    if (serializedOption !== undefined) {
        serializedValue = serializedOption
    }

    /**
     * Updates the serialized option value
     * @param {string} value 
     */
    function updateValue(value) {
        markdownOptionFuncs.setMarkdownOption(optionName, value)
    }

    /**
     * Updates the serialized dropdown value with a new dropdown index
     * @param {number} index 
     */
    function updateDropdownValue(index) {
        markdownOptionFuncs.setMarkdownOption(optionName, index)
    }

    /**
     * Updates an options array at the specified index with the new value
     * @param {number} index 
     * @param {string} value 
     */
    function updateList(index, value) {
        let newArray = []
        if (serializedValue) { newArray = [...serializedValue] } else {
            newArray = [...optionValue]
        }
        newArray[index] = value
        markdownOptionFuncs.setMarkdownOption(optionName, newArray)
    }

    function addListOption() {
        let newArray = []
        if (serializedValue) { newArray = [...serializedValue] } else {
            newArray = [...optionValue]
        }
        newArray.push('')
        markdownOptionFuncs.setMarkdownOption(optionName, newArray)
    }

    function removeListOption(index) {
        let newArray = []
        if (serializedValue) { newArray = [...serializedValue] } else {
            newArray = [...optionValue]
        }
        newArray.splice(index, 1)
        markdownOptionFuncs.setMarkdownOption(optionName, newArray)
    }

    const fieldStyle = { mx: 2, my: 1, width: 200 }
    const columnStyle = { display: 'flex', flexDirection: 'column', justifyItems: 'center', alignItems: 'center' }

    switch (optionType) {
        case "string":
            icon = <TextFormatIcon />
            valueComponent = <TextField sx={fieldStyle} value={serializedValue ?? optionValue} onChange={e => updateValue(e.target.value)} />
            break
        case "number":
            icon = <TextFormatIcon />
            valueComponent = <TextField sx={fieldStyle} value={serializedValue ?? optionValue} onChange={e => updateValue(e.target.value)} />
            break
        case "unordered_list":
            icon = <FormatListBulletedIcon />
            console.log('array', optionValue)
            value = serializedValue ?? optionValue
            valueComponent = (
                <Box sx={columnStyle} >
                    {value.map((element, index) => (
                        <Box>
                            <TextField sx={fieldStyle} value={element} onChange={e => updateList(index, e.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="remove element"
                                            onClick={(e) => removeListOption(index)}
                                        >
                                            <RemoveCircleIcon />
                                        </IconButton>
                                    </InputAdornment>
                                } />

                        </Box>
                    ))}
                    < AddCircleIcon sx={{ my: 2 }} onClick={(e) => addListOption()} />
                </Box>
            )
            break
        case "ordered_list":
            icon = <FormatListNumberedIcon />
            console.log('array', optionValue)
            value = serializedValue ?? optionValue
            valueComponent = (
                <Box sx={columnStyle} >
                    {value.map((element, index) => (
                        <Box>
                            <Input type='text' sx={fieldStyle} value={element} onChange={e => updateList(index, e.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="remove element"
                                            onClick={(e) => removeListOption(index)}
                                        >
                                            <RemoveCircleIcon />
                                        </IconButton>
                                    </InputAdornment>
                                } />

                        </Box>
                    ))}
                    < AddCircleIcon sx={{ my: 2 }} onClick={(e) => addListOption()} />
                </Box>
            )
            break
        case "boolean":
            icon = <CheckBoxIcon />
            let checked = serializedValue === undefined ? true : serializedValue
            valueComponent = <FormControlLabel sx={fieldStyle} control={<Checkbox defaultChecked checked={checked} onChange={e => updateValue(e.target.checked)} />} label={optionValue} />
            break
        case 'dropdown':
            icon = <MenuOpenIcon />
            valueComponent = (<FormControl sx={fieldStyle}>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={serializedValue ?? 0}
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