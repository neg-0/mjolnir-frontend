import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
import { Button, FormControl, Paper } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { AppFunctionsContext, UserDataContext } from '../../App';
import video from './BackdropTwo_v2.mp4';
import mjolnirImage from './mjolnir.png';
import Stack from '@mui/material/Stack';

export default function Home() {

    const [open, setOpen] = useState(false);

    const handleOpen = (e) => setOpen(true);
    const handleClose = (e) => setOpen(false);

    const userData = useContext(UserDataContext)
    const appFunctions = useContext(AppFunctionsContext)

    const [usernameField, setUsernameField] = useState('')
    const [displayAutocomplete, setDisplayAutocomplete] = useState(false)
    const [selectedTemplateId, setSelectedTemplateId] = useState('')
    const [templateNameValid, setTemplateNameValid] = useState(true)
    const [templateTitleList, setTemplateTitleList] = useState([])
    const history = useHistory();

    // Fetch templates and grab the title and id to display in the dropdown
    useEffect(() => {
        appFunctions
            .fetchTemplates()
            .then(templates => {
                console.log("templates", templates)
                let titleList = templates.map(template => { return { label: template.template.title, id: template.template.id } })
                setTemplateTitleList(titleList)
            })
    }, [])
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

    const onSubmitName = (e) => {
        e.preventDefault();
        setDisplayAutocomplete(true)
        appFunctions.login(usernameField)
    }

    const closeAutoComplete = (e) => {
        e.preventDefault();
        setDisplayAutocomplete(false)
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            onSubmitName(e)
        }
    }

    const goToEditor = () => {
        // Get the template ID from App
        // Push to the editor with template ID
        history.push(`/editor?templateId=${selectedTemplateId}`)
    }

    function goToDashboard() {
        history.push(`/dashboard`)
    }

    const handleLoginClick = (e) => {
        e.preventDefault();
        if (userData.username === !undefined) {
            handleClose()
        } else {
            handleOpen()
        }
    }

    const registerUser = (e) => {
        e.preventDefault()
        let username = e.target[0].value
        let password = e.target[1].value

        //Name of the file : sha256-hash.js
        //Loading the crypto module in node.js
        var crypto = require('crypto');
        //creating hash object 
        var hash = crypto.createHash('sha256');
        //passing the data to be hashed
        let data = hash.update(password, 'utf-8');
        //Creating the hash in the required format
        let password_hash = data.digest('hex');
        //Printing the output on the console
        console.log("hash : " + password_hash);

        console.log('registering', username, password_hash)
        appFunctions.postUserAccount(username, password_hash)
    }

    const autoCompleteField = <Autocomplete
        disablePortal
        id="template-autocomplete"
        options={templateTitleList}
        getOptionLabel={option => option.label}
        data-testid="autocomplete"
        onChange={(event, newValue) => {
            if (newValue) {
                setSelectedTemplateId(newValue.id)
            } else {
                setSelectedTemplateId('')
            }
        }
        }
        sx={{ width: 300, my: 4, mx: "auto" }}
        renderInput={(params) => <TextField {...params} label="Would you like to start a new draft?" />}
    />

    return (
        <div className="App">
            <video autoPlay loop muted style={{
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
                        {displayAutocomplete && userData ?
                            <Stack spacing={4} marginTop={1}>
                                <Box height={200}>
                                    <Stack direction="row" sx={{ mx: 'auto', alignItems: 'center' }}>
                                        <Box>
                                            <Button variant="text" aria-label="back" onClick={(e) => closeAutoComplete(e)} >
                                                <ArrowBackIcon sx={{ mr: 1 }} />
                                            </Button>
                                        </Box>
                                        <Box>
                                            Welcome back, {userData.user_name}!
                                        </Box>
                                        <Box />
                                    </Stack>
                                    {autoCompleteField}
                                    {selectedTemplateId !== '' ?
                                        <Button endIcon={<SendIcon />} onClick={(e) => goToEditor(e)}>
                                            Start a new draft
                                        </Button>
                                        :
                                        <></>}
                                </Box>
                                <Box>
                                    <Button sx={{ mt: 5 }} endIcon={<SendIcon />} onClick={(e) => goToDashboard()}>
                                        view my dashboard
                                    </Button>
                                </Box>
                            </Stack>
                            :
                            <Box>
                                <FormControl onSubmit={(e) => handleKeyPress(e)}>
                                    <TextField sx={{ mx: "auto", my: 4 }} id="name-textfield" label="What is your name?" variant="standard" onChange={(e, value) => setUsernameField(e.target.value)} value={usernameField} onKeyPress={(e) => handleKeyPress(e)} />
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
                <Modal
                    open={open}
                    onOpen={(e) => handleLoginClick(e)}
                    onClose={(e) => handleClose(e)}
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
                    </Box>
                </Modal>
            </Grid >
        </div >)
}
