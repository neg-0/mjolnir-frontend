import SendIcon from '@mui/icons-material/Send';
import { Button, FormControl, Paper } from '@mui/material';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import React, { useContext, useState } from 'react';
import { AppFunctionsContext, UserDataContext } from '../../App';
import { getPasswordHash } from '../PasswordHasher';
import video from './BackdropTwo_v2.mp4';
import mjolnirImage from './mjolnir.png';
import Welcome from './Welcome';
import Stack from '@mui/material/Stack';

export default function Home() {
    const userData = useContext(UserDataContext)
    const appFunctions = useContext(AppFunctionsContext)

    const [usernameField, setUsernameField] = useState('')
    const [passwordField, setPasswordField] = useState('')
    const [showLoginError, setShowLoginError] = useState(false)

    const onSubmitName = (e) => {
        e.preventDefault();
        let password = getPasswordHash(passwordField)
        if (appFunctions) {
            appFunctions
                .login(usernameField, password)
                .then(success => setShowLoginError(!success))
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            onSubmitName(e)
        }
    }

    return (
        <div className="App">
            <video autoPlay loop style={{
                position: "fixed",
                bottom: 0,
                right: 0,
                zIndex: -1,
                minWidth: '100%',
                minHeight: '100%'
            }}>
                <source src={video} type='video/mp4' />
            </video>
            <Grid
                height='100%'
                container
                spacing={0}
                align="center"
                justify="center"
                direction="column"
            >
                <Grid item sx={{ mx: 'auto', mt: 20 }}>
                    <Paper sx={{ p: 5, width: 380, height: 500, backgroundColor: 'rgba(255, 255, 255, 0.9)' }} elevation={10}>
                        <img src={mjolnirImage} width={270} />
                        {userData ?
                            <Welcome user_name={userData.user_name} />
                            :
                            <Box>
                                <FormControl onSubmit={(e) => handleKeyPress(e)}>
                                    <Stack spacing={2} sx={{ mx: 'auto', my: 2, width: 200 }}>
                                        <TextField id="name-textfield" label="What is your name?" variant="standard" onChange={(e) => setUsernameField(e.target.value)} value={usernameField} />
                                        {usernameField === '' ? <></> : <TextField type="password" autoComplete="current-password" id="password-textfield" label="Password" variant="standard" onChange={(e) => setPasswordField(e.target.value)} onKeyPress={(e) => handleKeyPress(e)} />}
                                        <Button endIcon={<SendIcon />} onClick={(e) => onSubmitName(e)}>
                                            Go
                                        </Button>
                                    </Stack>
                                    {showLoginError ? <Alert severity="error">Invalid Username or Password</Alert>
                                        : <></>}
                                </FormControl>
                                {/* <Button endIcon={<SendIcon />} onClick={(e) => handleOpen(e)} >
                                    New user?
                                </Button> */}
                            </Box>
                        }
                    </Paper >
                </Grid>
            </Grid >
        </div >)
}
