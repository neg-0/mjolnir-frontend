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



    async function fetchUserHistory() {
        console.log("USER", user)
        return fetch(`http://localhost:3001/users/${user}/history`)
            .then(response => response.text())
            .then(json => {
                let output = JSON.parse(json)
                // console.log("template", JSON.parse(json))
                // console.log("hist ID", json[0].)
                console.log(output)
                return output
            })
            .then(output => setUserHistory(output))
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
    const handleEditHistory = async (e) => {
        // e.preventDefault();
        // await fetch(`users/${userData.name}/history/${e.target.value}`, {
        //     method: 'PATCH',
        //HELP US lol
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
                {userHistory.map((history, index) => {
                    return (
                        < MDBCarouselItem className={index === 0 ? 'active' : ''} >
                            <MDBCarouselElement />


                            <h5>{history.template.title}</h5>
                            {/* <h5>{history.serialized_options[0].history_id}</h5>
                                <h5>{history.serialized_options[0].serialized_options.name}</h5> */}
                            <Paper data-testid="editor" sx={{ zoom: '25%', aspectRatio: "8.5/11", width: '100%', mx: "auto", p: "1in" }}>
                                <MarkdownRenderer template={history.template} templateOptions={history.template_options} serializedOptions={null} />
                            </Paper>
                            <Button onClick={(e) => handleDeleteHistory(e)}>{<MDBIcon fas icon="trash" color="black" size='1.5x' />}</Button>
                            <Button onClick={(e) => handleEditHistory(e)}>{<MDBIcon fas icon="pencil-alt" color="black" size='1.5x' />}</Button>

                        </MDBCarouselItem>
                    )
                })}
            </MDBCarouselInner>
        </MDBCarousel >
    )
}


