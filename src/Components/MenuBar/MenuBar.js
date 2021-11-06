import { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import ReceiptIcon from '@mui/icons-material/Receipt';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import React from 'react';
import { UserDataContext, AppFunctionsContext } from '../../App';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuBookIcon from '@mui/icons-material/MenuBook';

export default function MenuBar() {
    const [state, setState] = useState({
        top: false,
    });
    const [open, setOpen] = useState(false);

    const handleOpen = (e) => setOpen(true);
    const handleClose = (e) => setOpen(false);

    const appFunctions = useContext(AppFunctionsContext)
    const userData = useContext(UserDataContext)
    const history = useHistory()

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

    const onLoginSubmit = (e) => {
        e.preventDefault();
        appFunctions.login(e.target[0].value, e.target[1].value).then(success => {
            if (success) {
                handleClose()
                // history.push('/dashboard')
            }
        }
        )
    }

    const handleLoginClick = (e) => {
        e.preventDefault();
        if (userData.username === !undefined) {
            handleClose()
        } else {
            handleOpen()
        }
    }

    const handleDashboardClick = (e) => {
        e.preventDefault();
        //if logged in pushes you to dashboard 
        if (userData) {
            history.push(`/dashboard`)
        } else {
            history.push(`/`)
            handleOpen();
        }
    }

    function handleLogout() {
        appFunctions.logout()
        history.push(`/`)
    }

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <ListItem button key='Home' component={Link} to={'/'}>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary='Home' />
                </ListItem>
                {userData ? (<ListItem onClick={(e) => handleLogout(e)} button key='Logout'>
                    <ListItemIcon >
                        <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary='Logout' />
                </ListItem>) :
                    (<ListItem onClick={(e) => handleOpen(e)} button key='Login'>
                        <ListItemIcon >
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary='Login' />
                    </ListItem>)}
                <ListItem button key='Dashboard' onClick={(e) => handleDashboardClick(e)}>
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary='Dashboard' />
                </ListItem>
                <ListItem button key='View all forms we manage' component={Link} to={'/forms'}>
                    <ListItemIcon>
                        <ReceiptIcon />
                    </ListItemIcon>
                    <ListItemText primary='View all supported forms' />
                </ListItem>
            </List>
        </Box >
    );


    return (
        <Box sx={{ position: 'fixed', zIndex: 1 }}>
            {['top'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)}>{<MenuBookIcon />}</Button>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {list(anchor)}
                    </Drawer>
                    <Modal
                        open={open}
                        onOpen={(e) => handleLoginClick(e)}
                        onClose={(e) => handleClose(e)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Please Login
                            </Typography>
                            <form onSubmit={(e) => onLoginSubmit(e)}>
                                <TextField
                                    required
                                    id="filled-required"
                                    label="Required"
                                    placeholder="Username/Email"
                                    variant="filled"
                                />
                                <TextField
                                    required
                                    id="filled-password-input"
                                    label="Required"
                                    type="password"
                                    placeholder="Password"
                                    variant="filled"
                                />
                                <Button type='submit'>Log Me In!</Button>
                            </form>
                        </Box>
                    </Modal>
                </React.Fragment>
            ))
            }
        </ Box >
    )
}
