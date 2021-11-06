import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import {
    MDBCarousel, MDBCarouselCaption, MDBCarouselElement, MDBCarouselInner,
    MDBCarouselItem, MDBIcon
} from 'mdb-react-ui-kit';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { AppFunctionsContext, UserDataContext } from '../../App';
import MarkdownRenderer from '../Editor/MarkdownRenderer';
import { Box } from '@mui/system';
import { Stack, Typography } from '@mui/material';



export default function History() {

    useEffect(() => {
        fetchUserHistory()
    }, [])
    // const userData = useContext(UserDataContext)
    const appFunctions = useContext(AppFunctionsContext)

    const [template, setTemplate] = useState() // The original text from the markdown file
    const [templateOptions, setTemplateOptions] = useState() // JSON object of template option names and values
    const [serializedOptions, setSerializedOptions] = useState({}) // JSON object of user-provided options

    const [userHistory, setUserHistory] = useState([])
    const userData = useContext(UserDataContext)
    const user = userData.user_name;
    const history = useHistory()


    async function fetchUserHistory() {
        console.log("Fetching...", userData.user_name)
        appFunctions.fetchHistoryObjectByUserName(userData.user_name)
            .then(output => {
                console.log("User History", output)
                setUserHistory(output)
            })
            .catch(error => console.log(error));
    }


//splice(0, 1)
   //end point - DELETE /users/:user_name/history
    const handleDeleteHistory = async (e) => {
        console.log("Deleting...", user)
        console.log("userHistory", userHistory)
         //delete history at serialized_options.serialized_options
        userHistory.splice(userHistory.indexOf(e), 1)
        setUserHistory(userHistory)
        // fetchUserHistory()
    }

    //edit template in history
    const handleEditHistory = (h) => {
        console.log('go to editor')
        history.push(`/editor?template=${h.template.id}&serializedOptions=${h.serialized_options.history_id}`)
    }

    return (
        <MDBCarousel showControls showIndicators dark fade sx={{
            height: '50vh'
        }} >
            <MDBCarouselInner>
                {userHistory.map((history, index) => {
                    return (
                        < MDBCarouselItem className={index === 0 ? 'active' : ''} >
                            <MDBCarouselElement />
                            <Stack direction="column"
                                justifyContent="center"
                                alignItems="center"
                                spacing={2}>
                                <Paper data-testid="editor" sx={{ zoom: '50%', mx: "auto", p: "1in", aspectRatio: "8.5/11", width: '60%', mx: "auto" }}>
                                    <MarkdownRenderer template={history.template} templateOptions={history.template_options} serializedOptions={history.serialized_options.serialized_options} />
                                </Paper>
                                <Typography variant='h5'>{history.serialized_options.file_name}</Typography>
                                <Stack direction="row" spacing={2}>
                                    <Button onClick={(e) => handleDeleteHistory(e)}>{<MDBIcon fas icon="trash" color="black" size='1.5x' />}</Button>
                                    <Button onClick={(e) => handleEditHistory(history)}><MDBIcon fas icon="pencil-alt" color="black" size='1.5x' /></Button>
                                </Stack>
                            </Stack>
                        </MDBCarouselItem>
                    )
                })}
            </MDBCarouselInner>
        </MDBCarousel >
    )
}


