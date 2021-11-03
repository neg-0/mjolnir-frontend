import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Button, FormControl, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import { useContext, useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { AppFunctionsContext, UserDataContext } from '../../App';
import video from './backdrop.mp4'
import { Paper } from '@mui/material';
import Grid from '@mui/material/Grid';
import SendIcon from '@mui/icons-material/Send';

export default function Home() {

    const userData = useContext(UserDataContext)
    const appFunctions = useContext(AppFunctionsContext)

    const [usernameField, setUsernameField] = useState('')
    const [displayAutocomplete, setDisplayAutocomplete] = useState(false)
    const [templateName, setTemplateName] = useState('')
    const [templateNameValid, setTemplateNameValid] = useState(false)

    const templates = ["Letter to Santa", "Breakup Letter", "Notice of Intent"]

    const history = useHistory();

    useEffect(() => { setTemplateNameValid(templates.includes(templateName)) }, [templateName])

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

    const goToEditor = (e) => {
        history.push(`/editor?template=${templateName}`)
    }

    function goToDashboard() {
        history.push(`/dashboard`)
    }

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
                    <Paper sx={{ p: 5, width: 350, height: 400, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
                        {displayAutocomplete && userData ?
                            <Grid spacing={4}  >
                                <Grid item>
                                    <Box display='inline-flex' alignItems='center'>
                                        <Box width={80}>
                                            <Button variant="text" aria-label="back" onClick={(e) => closeAutoComplete(e)} >
                                                <ArrowBackIcon sx={{ mr: 1 }} />
                                            </Button>
                                        </Box>
                                        <Box>
                                            Welcome back, {userData.user_name}!
                                        </Box>
                                        <Box width={80} />
                                    </Box>
                                    <Autocomplete
                                        disablePortal
                                        id="template-autocomplete"
                                        options={templates}
                                        inputValue={templateName}
                                        data-testid="autocomplete"
                                        onInputChange={(event, newInputValue) => {
                                            setTemplateName(newInputValue);
                                        }}
                                        sx={{ width: 300, my: 4, mx: "auto" }}
                                        renderInput={(params) => <TextField {...params} label="Would you like to start a new draft?" />}
                                    />
                                    {templateNameValid ?
                                        <Button endIcon={<SendIcon />} onClick={(e) => goToEditor(e)}>
                                            Start a new draft
                                        </Button>
                                        :
                                        <></>}
                                </Grid>
                                <Grid item>
                                    {userData.serializedOptions.length > 0 ?
                                        <Button sx={{ mt: 5 }} endIcon={<SendIcon />} onClick={(e) => goToDashboard()}>
                                            view my dashboard
                                        </Button> : <></>}
                                </Grid>
                            </Grid>
                            :
                            <Box>
                                <FormControl onSubmit={(e) => handleKeyPress(e)}>
                                    <TextField sx={{ mx: "auto", my: 4 }} id="name-textfield" label="What is your name?" variant="standard" onChange={(e, value) => setUsernameField(e.target.value)} value={usernameField} onKeyPress={(e) => handleKeyPress(e)} />
                                    <Button endIcon={<SendIcon />} onClick={(e) => onSubmitName(e)}>
                                        Go
                                    </Button>
                                </FormControl>
                            </Box>
                        }
                    </Paper >
                </Grid>
            </Grid >
        </div >)
}