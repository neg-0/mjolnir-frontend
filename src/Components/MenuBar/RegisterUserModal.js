import { Button, Modal } from '@mui/material';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { useContext, useState } from 'react';
import { AppFunctionsContext } from '../../App';
import { getPasswordHash } from '../PasswordHasher';
import Alert from '@mui/material/Alert';

export default function RegisterUserModal({ open, onClose }) {

    const appFunctions = useContext(AppFunctionsContext)
    const [showLoginError, setShowLoginError] = useState(false)
    const [errorText, setErrorText] = useState()

    function registerUser(e) {
        setShowLoginError(false)
        e.preventDefault()
        let username = e.target[0].value
        let password = e.target[1].value
        let password_hash = getPasswordHash(password)
        appFunctions.postUserAccount(username, password_hash)
            .then((response) => {
                appFunctions.setUserData(response)
                setShowLoginError(false)
                onClose()
            })
            .catch((err) => {
                setShowLoginError(true)
                setErrorText('This username is already taken.')
            })
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'white',
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
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Register
            </Typography>
            <form onSubmit={(e) => registerUser(e)}>
                <TextField
                    id="filled-required"
                    label="What do we call you?"
                    placeholder="Username/Email"
                    variant="filled"
                />
                <TextField
                    required
                    id="filled-password-input"
                    label="Secure-ish"
                    type="password"
                    placeholder="Password"
                    variant="filled"
                />
                <Button type='submit'>I wanna be apart of this!</Button>
            </form>
            {showLoginError ? <Alert severity="error">{errorText}</Alert>
                : <></>}
        </Box>
    </Modal>)
}