
import SendIcon from '@mui/icons-material/Send';
import { Button } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { fetchTemplates } from '../../Database';

export default function TemplateWindow() {
    const [templateTitleList, setTemplateTitleList] = useState([])
    const [selectedTemplateId, setSelectedTemplateId] = useState('')
    const history = useHistory();

    // Fetch templates and grab the title and id to display in the dropdown
    useEffect(() => {
        let mounted = true
        fetchTemplates()
            .then(templates => {
                // console.log("templates", templates)
                let titleList = templates.map(template => { return { label: template.template.title, id: template.template.id } })
                if (mounted) { setTemplateTitleList(titleList) }
            })

        return () => { mounted = false }
    }, [])

    const goToEditor = () => {
        // Get the template ID from App
        // Push to the editor with template ID
        history.push(`/editor?templateId=${selectedTemplateId}`)
    }


    return (<><Autocomplete
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
        }}
        sx={{ width: 300, my: 4, mx: "auto" }}
        renderInput={(params) => <TextField {...params} label="Would you like to start a new draft?" />}
    />
        {selectedTemplateId !== '' ?
            <Button endIcon={<SendIcon />} onClick={(e) => goToEditor(e)}>
                Start a new draft
            </Button>
            :
            <></>}
    </>)
}