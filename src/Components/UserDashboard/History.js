import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useContext, useState, useEffect, setState } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { MDBIcon } from 'mdb-react-ui-kit';
import { AppFunctionsContext, UserDataContext } from '../../App';
import MarkdownRenderer from '../Editor/MarkdownRenderer';

import {
    MDBCarousel,
    MDBCarouselInner,
    MDBCarouselItem,
    MDBCarouselElement,
    MDBCarouselCaption
} from 'mdb-react-ui-kit';



export default function History() {

    // const userData = useContext(UserDataContext)
    const appFunctions = useContext(AppFunctionsContext)

    const [template, setTemplate] = useState() // The original text from the markdown file
    const [templateOptions, setTemplateOptions] = useState() // JSON object of template option names and values
    const [serializedOptions, setSerializedOptions] = useState({}) // JSON object of user-provided options

    const [userHistory, setUserHistory] = useState()
    const userData = useContext(UserDataContext)
    const user = userData.user_name;

    useEffect(() => {
        fetchUserHistory()
    }, [])


    async function fetchUserHistory() {
        console.log("USER", user)
        return fetch(`http://localhost:3001/users/${user}/history`)
            .then(response => response.text())
            .then(json => {
                console.log("JSON", json)
                return json
            })
            .then(history => setUserHistory(userHistory))
            .catch(error => console.log(error));
    }


    if (!template || !templateOptions) {
        return null
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
    const handleEditHistory = async (e) => {
        // e.preventDefault();
        // await fetch(`users/${userData.name}/history/${e.target.value}`, {
        //     method: 'PATCH',
        //     body: JSON.stringify({
        //         history: {
        //             history_id: e.target.value,
        //         }
        //     })
        // })
        //     .then(user => {
        //         // userData(user.history);
        //     })
        console.log('edit req')
    }




    return (
        <MDBCarousel showControls showIndicators dark fade sx={{
            height: '100vh'
        }} >
            <MDBCarouselInner>
                {userHistory.map(history => {
                    return (
                        <MDBCarouselItem className="active">
                            <MDBCarouselElement />
                            <MDBCarouselCaption>
                                <h5>{history.history_id}</h5>
                                <MarkdownRenderer template={history.template} templateOptions={history.template_options} serializedOptions={history.serialized_options} />
                                <Button onClick={(e) => handleDeleteHistory(e)}>{<MDBIcon fas icon="trash" color="black" size='1.5x' />}</Button>
                                <Button onClick={(e) => handleEditHistory(e)}>{<MDBIcon fas icon="pencil-alt" color="black" size='1.5x' />}</Button>
                            </MDBCarouselCaption>
                        </MDBCarouselItem>
                    )
                })}
            </MDBCarouselInner>
        </MDBCarousel >
    )
}


//src={<MarkdownRenderer template={template} templateOptions={templateOptions} serializedOptions={null}