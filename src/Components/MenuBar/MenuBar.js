import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PersonIcon from '@mui/icons-material/Person';
import ReceiptIcon from '@mui/icons-material/Receipt';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AppFunctionsContext, UserDataContext } from '../../App';

export default function MenuBar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [open, setOpen] = useState(false);

    const openLoginModal = () => setOpen(true);
    const closeLoginModal = () => setOpen(false);

    const appFunctions = useContext(AppFunctionsContext)
    const userData = useContext(UserDataContext)
    const history = useHistory()

    const toggleDrawer = (open) => (e) => {
        if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
            return;
        }
        setMenuOpen(open);
    };

    const loginBoxStyle = {
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
                closeLoginModal()
            }
        })
    }


    const handleDashboardClick = (e) => {
        //if logged in pushes you to dashboard 
        if (userData) {
            history.push(`/dashboard`)
        } else {
            history.push(`/`)
            openLoginModal();
        }
    }

    function handleLogout() {
        appFunctions.logout()
        history.push(`/`)
    }



    return (
        <Box sx={{ position: 'fixed', zIndex: 1 }}>
            <React.Fragment key={'top'}>
                <Button onClick={toggleDrawer(true)} data-testid='menu-bar-button'>{<MenuBookIcon />}</Button>
                <Drawer
                    anchor={'top'}
                    open={menuOpen}
                    onClose={toggleDrawer(false)}
                >
                    <Box
                        sx={{ width: 'auto' }}
                        role="presentation"
                        onClick={toggleDrawer(false)}
                        onKeyDown={toggleDrawer(false)}
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
                                (<ListItem onClick={(e) => openLoginModal(e)} button key='Login'>
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
                </Drawer>
                <Modal
                    open={open}
                    onClose={(e) => closeLoginModal(e)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={loginBoxStyle}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Please Login
                        </Typography>
                        <form onSubmit={(e) => onLoginSubmit(e)}>
                            <TextField
                                required
                                id="username"
                                label="Username"
                                variant="filled"
                                autoComplete="username"
                            />
                            <TextField
                                required
                                id="password"
                                label="Password"
                                type="password"
                                variant="filled"
                                autoComplete="current-password"
                            />
                            <Button type='submit'>Log Me In!</Button>
                        </form>
                    </Box>
                </Modal>
            </React.Fragment>
        </ Box >
    )
}
