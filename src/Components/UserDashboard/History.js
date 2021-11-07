import { Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import {
    MDBCarousel, MDBCarouselElement, MDBCarouselInner,
    MDBCarouselItem, MDBIcon
} from 'mdb-react-ui-kit';
import React, { useContext, useEffect, useState } from 'react';
import { UserDataContext } from '../../App';
import { deleteHistoryById, fetchHistoryPackageByUserName } from '../../Database';
import MarkdownRenderer from '../Editor/MarkdownRenderer';

export default function History() {

    const userData = useContext(UserDataContext)
    const [userHistory, setUserHistory] = useState([])

    useEffect(() => {
        let mounted = true
        fetchHistoryPackageByUserName(userData.user_name)
            .then(output => {
                console.log("User History", output)
                if (mounted) {
                    setUserHistory(output)
                }
            })
            .catch(error => console.log(error));

        return () => { mounted = false }
    }, [userData])

    //splice(0, 1)
    //end point - DELETE /users/:user_name/history
    function handleDeleteHistory(history) {
        deleteHistoryById(userData.user_name, history.history_object.history_id)
            .then(newHistory => setUserHistory(newHistory))
    }

    //edit template in history
    function handleEditHistory(history) {
        console.log('go to editor')
        history.push(`/editor?historyId=${history.history_object.history_id}`)
    }

    if (userHistory.length === 0) {
        return null
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
                                <Paper data-testid="editor" sx={{ zoom: '60%', mx: "auto", p: "1in", aspectRatio: "8.5/11", width: '60%', position: 'relative', overflow: 'auto' }}>
                                    <MarkdownRenderer template={history.template} templateOptions={history.template_options} serializedOptions={history.history_object.serialized_options} />
                                </Paper>
                                <Typography variant='h5'>{history.history_object.file_name}</Typography>
                                <Stack direction="row" spacing={2}>
                                    <Button onClick={(e) => handleDeleteHistory(history)}>{<MDBIcon fas icon="trash" color="black" size='1.5x' />}</Button>
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


