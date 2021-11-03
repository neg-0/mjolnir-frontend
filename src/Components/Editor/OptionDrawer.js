import MailIcon from '@mui/icons-material/Mail'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import { SwipeableDrawer, Toolbar } from '@mui/material'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import * as React from 'react'
import MarkdownOption from './MarkdownOption'

export default function OptionDrawer({ options, markdownOptionFuncs }) {
    const drawerWidth = 240;

    const [drawerOpen, setDrawerOpen] = React.useState(true);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (<Drawer
        sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
            },
        }}
        variant="persistent"
        anchor="right"
        open={drawerOpen}
    >
        <Toolbar />
        <Divider />
        <List>
            {options ? Object.entries(options).map(([key, value], index) => <MarkdownOption key={index} optionName={key} optionValue={value} markdownOptionFuncs={markdownOptionFuncs} />) : <></>}
        </List>
    </Drawer>)
}