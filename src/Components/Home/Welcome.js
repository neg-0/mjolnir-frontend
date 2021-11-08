import SendIcon from '@mui/icons-material/Send';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import React from 'react';
import { useHistory } from "react-router-dom";
import TemplateWindow from './TemplateWindow';

export default function Welcome({ user_name }) {
    const history = useHistory();

    function goToDashboard() {
        history.push(`/dashboard`)
    }

    return (<Stack spacing={4} marginTop={1}>
        <Box sx={{ height: 200, mt: 2 }}>
            <Typography variant='h5' sx={{ width: '100%' }} >
                Welcome, {user_name}!
            </Typography>
            <TemplateWindow />
        </Box>
        <Box>
            <Button sx={{ mt: 5 }} endIcon={<SendIcon />} onClick={(e) => goToDashboard()}>
                view my dashboard
            </Button>
        </Box>
    </Stack>)
}