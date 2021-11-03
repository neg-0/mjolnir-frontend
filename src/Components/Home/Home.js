import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Button, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import { useContext, useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { AppFunctionsContext, UserDataContext } from '../../App';
import video from './backdrop.mp4'

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

    const onSubmit = (e) => {
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
            onSubmit(e)
        }
    }

    const goToEditor = (e) => {
        history.push(`/editor?template=${templateName}`)
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
            <Box sx={{ m: 30 }}>
                {displayAutocomplete && userData ?
                    <div>
                        <Box display='inline-flex' alignItems='center'>
                            <Box width={80}>
                                <Button variant="text" aria-label="back" onClick={(e) => closeAutoComplete(e)} >
                                    <ArrowBackIcon sx={{ mr: 1 }} />
                                </Button>
                            </Box>
                            <Box>
                                Welcome, {userData.user_name}!
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
                            renderInput={(params) => <TextField {...params} label="What would you like to draft?" />}
                        />
                        {templateNameValid ?
                            <Box display='inline-flex' alignItems='center'>
                                <Box width={80} />
                                <Box>
                                    Let's go!
                                </Box>
                                <Box width={80} > <Button variant="text" aria-label="go" onClick={(e) => goToEditor(e)} >

                                    <ArrowForwardIcon sx={{ ml: 1 }} />
                                </Button></Box>
                            </Box>

                            :
                            <></>}</div>
                    :
                    <Box>
                        <TextField sx={{ mx: "auto" }} id="name-textfield" label="What is your name?" variant="standard" onChange={(e, value) => setUsernameField(e.target.value)} value={usernameField} onKeyPress={(e) => handleKeyPress(e)} />
                    </Box>
                }
            </Box >
        </div >)
}