import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ReceiptIcon from '@mui/icons-material/Receipt';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AppFunctionsContext, UserDataContext } from '../../App';
import LoginUserModal from './LoginUserModal';
import RegisterUserModal from './RegisterUserModal';

export default function MenuBar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [loginUserOpen, setLoginModalOpen] = useState(false);
    const openLoginModal = () => setLoginModalOpen(true);
    const closeLoginModal = () => setLoginModalOpen(false);

    const [registerUserOpen, setRegisterUseOpen] = useState(false);
    const openRegisterUserModal = () => setRegisterUseOpen(true);
    const closeRegisterUserModal = () => setRegisterUseOpen(false);

    const appFunctions = useContext(AppFunctionsContext)
    const userData = useContext(UserDataContext)
    const history = useHistory()

    const toggleDrawer = (open) => (e) => {
        if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
            return;
        }
        setMenuOpen(open);
    };


    const handleLoginClick = (e) => {
        e.preventDefault();
        if (userData.username === !undefined) {
            closeRegisterUserModal()
        } else {
            openRegisterUserModal()
        }
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
                            (<><ListItem onClick={(e) => openLoginModal(e)} button key='Login'>
                                <ListItemIcon >
                                    <PersonIcon />
                                </ListItemIcon>
                                <ListItemText primary='Login' />
                            </ListItem>
                                <ListItem onClick={(e) => openRegisterUserModal(e)} button key='New User'>
                                    <ListItemIcon >
                                        <PersonAddIcon />
                                    </ListItemIcon>
                                    <ListItemText primary='New User' />
                                </ListItem></>)}
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
            <LoginUserModal open={loginUserOpen} onClose={closeLoginModal} />
            <RegisterUserModal open={registerUserOpen} onClose={closeRegisterUserModal} />
        </ Box >
    )
}
