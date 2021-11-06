import { Toolbar } from '@mui/material'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import * as React from 'react'
import MarkdownOption from './MarkdownOption'

export default function OptionDrawer({ drawerWidth, templateOptions, serializedOptions, markdownOptionFuncs }) {

    if (!serializedOptions) { serializedOptions = {} }
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
        open
    >
        <Toolbar />
        <Divider />
        <List>
            {templateOptions ? templateOptions.map((option, index) => <MarkdownOption key={index} templateOption={option} serializedOption={serializedOptions[option.option_name]} markdownOptionFuncs={markdownOptionFuncs} />) : <></>}
        </List>
    </Drawer>)
}