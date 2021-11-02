import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Button, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';


export default function Home({ username, appFunctions }) {

    const [displayAutocomplete, setDisplayAutocomplete] = useState(false)
    const [templateName, setTemplateName] = useState('')
    const [templateNameValid, setTemplateNameValid] = useState(false)

    const templates = ["Letter to Santa", "Breakup Letter", "Notice of Intent"]

    useEffect(() => { setTemplateNameValid(templates.includes(templateName)) }, [templateName])

    const onSubmit = (e) => {
        e.preventDefault();
        setDisplayAutocomplete(true)
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

    return (<div className="App">
        <Box sx={{ m: 30 }}>
            {displayAutocomplete ?
                <div>
                    <Box display='inline-flex' alignItems='center'>
                        <Box width={80}>
                            <Button variant="text" aria-label="back" onClick={(e) => closeAutoComplete(e)} >
                                <ArrowBackIcon sx={{ mr: 1 }} />
                            </Button>
                        </Box>
                        <Box>
                            Welcome, {username}!
                        </Box>
                        <Box width={80} />
                    </Box>
                    <Autocomplete
                        disablePortal
                        id="template-autocomplete"
                        options={templates}
                        inputValue={templateName}
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
                            <Box width={80} > <Button variant="text" aria-label="go" onClick={(e) => closeAutoComplete(e)} >

                                <ArrowForwardIcon sx={{ ml: 1 }} />
                            </Button></Box>
                        </Box>

                        :
                        <></>}</div>
                :
                <Box>
                    <TextField sx={{ mx: "auto" }} id="name-textfield" label="What is your name?" variant="standard" onChange={(e, value) => appFunctions.setUsername(e.target.value)} onKeyPress={(e) => handleKeyPress(e)} />
                </Box>
            }
        </Box >
    </div >)
}