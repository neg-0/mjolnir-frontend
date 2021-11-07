import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import { AppFunctionsContext } from '../../App';
import { getPasswordHash } from '../PasswordHasher';
export default function LoginUserModal({ open, onClose }) {

    const appFunctions = useContext(AppFunctionsContext)

    const onLoginSubmit = (e) => {
        e.preventDefault();
        let password_hash = getPasswordHash(e.target[1].value)
        appFunctions.login(e.target[0].value, password_hash).then(success => {
            if (success) {
                onClose()
            }
        })
    }

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

    return (<Modal
        open={open}
        onClose={onClose}
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
    </Modal>)
}