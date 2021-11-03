import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import TextFormatIcon from '@mui/icons-material/TextFormat';
import { Divider, FormControl, List, ListItem, ListItemIcon, ListItemText, TextField } from "@mui/material";
import { Box } from '@mui/system';

export default function MarkdownOption({ optionName, optionValue, markdownOptionFuncs }) {
    let icon
    let valueComponent

    function updateArray(index, value) {
        let newArray = [...optionValue]
        newArray[index] = value
        markdownOptionFuncs.setMarkdownOption(optionName, newArray)
    }

    if (Array.isArray(optionValue)) {
        icon = <FormatListBulletedIcon />
        console.log('array', optionValue)
        valueComponent = optionValue.map((element, index) => (<TextField sx={{ mx: 2, my: 1 }} value={element} onChange={e => updateArray(index, e.target.value)} />))

    } else {
        icon = <TextFormatIcon />
        valueComponent = <TextField sx={{ mx: 2, my: 1 }} value={optionValue} onChange={e => markdownOptionFuncs.setMarkdownOption(optionName, e.target.value)} />
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