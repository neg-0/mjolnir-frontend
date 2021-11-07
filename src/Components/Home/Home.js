import SendIcon from '@mui/icons-material/Send';
import { Button, FormControl, Paper } from '@mui/material';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import React, { useContext, useState } from 'react';
import { AppFunctionsContext, UserDataContext } from '../../App';
import video from './BackdropTwo_v2.mp4';
import mjolnirImage from './mjolnir.png';
import WelcomeBack from './WelcomeBack';

export default function Home() {
    const userData = useContext(UserDataContext)
    const appFunctions = useContext(AppFunctionsContext)

    const [usernameField, setUsernameField] = useState('')

    const onSubmitName = (e) => {
        e.preventDefault();
        if (appFunctions) {
            appFunctions.login(usernameField)
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
                            <WelcomeBack user_name={userData.user_name} />
                            :
                            <Box>
                                <FormControl onSubmit={(e) => handleKeyPress(e)}>
                                    <TextField sx={{ mx: "auto", my: 4 }} id="name-textfield" label="What is your name?" variant="standard" onChange={(e) => setUsernameField(e.target.value)} value={usernameField} onKeyPress={(e) => handleKeyPress(e)} />
                                    <Button endIcon={<SendIcon />} onClick={(e) => onSubmitName(e)}>
                                        Go
                                    </Button>
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
