import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import {
    MDBCarousel, MDBCarouselElement, MDBCarouselInner,
    MDBCarouselItem, MDBIcon
} from 'mdb-react-ui-kit';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { AppFunctionsContext, UserDataContext } from '../../App';
import MarkdownRenderer from '../Editor/MarkdownRenderer';




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
        appFunctions.fetchSerializedOptionsByUserName(userData.user_name)
            .then(output => {
                console.log("User History", output)
                setUserHistory(output)
            })
            .catch(error => console.log(error));
    }



    //delete History forms
    const handleDeleteHistory = async (e) => {
        //     e.preventDefault();
        //     await fetch(`users/${userData.name}/history/${e.target.value}`, {
        //         method: 'DELETE'
        //     })
        //         .then(user => {
        //             // userData(user.history);
        //         })
        console.log('delete req')
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

                            <Paper data-testid="editor" sx={{ zoom: '50%', mx: "auto", p: "1in", aspectRatio: "8.5/11", width: '60%', mx: "auto" }}>
                                <MarkdownRenderer template={history.template} templateOptions={history.template_options} serializedOptions={history.serialized_options} />
                            </Paper>
                            <Button onClick={(e) => handleDeleteHistory(history)}>{<MDBIcon fas icon="trash" color="black" size='1.5x' />}</Button>
                            <Button onClick={(e) => handleEditHistory(history)}><MDBIcon fas icon="pencil-alt" color="black" size='1.5x' /></Button>

                        </MDBCarouselItem>
                    )
                })}
            </MDBCarouselInner>
        </MDBCarousel >
    )
}


