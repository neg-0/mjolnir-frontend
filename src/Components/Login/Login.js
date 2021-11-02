import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import ReceiptIcon from '@mui/icons-material/Receipt';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HistoryIcon from '@mui/icons-material/History';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import React from 'react';

export default function Login({ getData, username, appFunctions }) {
    const [state, setState] = useState({
        top: false,
    });
    const [open, setOpen] = useState(false);

    const handleOpen = (e) => setOpen(true);
    const handleClose = (e) => setOpen(false);

    const toggleDrawer = (anchor, open) => (e) => {
        if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const handleSubmitLogin = (e) => {
        e.preventDefault();
        getData(`users/${username}`)
            .then(data => {
                appFunctions(data);
            })
    }

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <ListItem button key='Home'>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary='Home' />
                </ListItem>
                <ListItem onClick={(e) => handleOpen(e)} button key='Login'>
                    <ListItemIcon >
                        <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary='Login' />
                </ListItem>
                <ListItem button key='View all forms we manage'>
                    <ListItemIcon>
                        <ReceiptIcon />
                    </ListItemIcon>
                    <ListItemText primary='View all supported forms' />
                </ListItem>
                <Divider>Log in to access your favorites and history</Divider>
                <ListItem button key='Favorites'>
                    <ListItemIcon>
                        <FavoriteIcon />
                    </ListItemIcon>
                    <ListItemText primary='Favorites' />
                </ListItem>
                <ListItem button key='History'>
                    <ListItemIcon>
                        <HistoryIcon />
                    </ListItemIcon>
                    <ListItemText primary='History' />
                </ListItem>
            </List>
        </Box >
    );


    return (
        <div className='nav-menu'>
            {['top'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)}>Menu</Button>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {list(anchor)}
                    </Drawer>
                    <Modal
                        open={open}
                        onClose={(e) => handleClose(e)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Please Login
                            </Typography>
                            <TextField
                                required
                                id="filled-required"
                                label="Required"
                                placeholder="Username/Email"
                                variant="filled"
                            />
                            <TextField
                                required
                                id="filled-required"
                                label="Required"
                                placeholder="Password"
                                variant="filled"
                            />
                            <Button onClick={(e) => handleSubmitLogin(e)}>Log Me In Damnit</Button>
                        </Box>
                    </Modal>
                </React.Fragment>
            ))
            }
        </ div >
    )
}

