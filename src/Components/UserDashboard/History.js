import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { UserDataContext } from '../../App';
import { useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { MDBIcon } from 'mdb-react-ui-kit';
import {
    MDBCarousel,
    MDBCarouselInner,
    MDBCarouselItem,
    MDBCarouselElement,
    MDBCarouselCaption
} from 'mdb-react-ui-kit';

const someDamnData = [
    {
        formName: 'this',
        data: '**Lots of Cool Stuff!**',
        image: 'https://mdbootstrap.com/img/Photos/Slides/img%20(19).jpg',
        serializedOptions: [
            { id: 1, title: "First Letter to Santa", name: "Little Brian" }
        ],
    },
    {
        formName: 'that',
        data: 'lots of cool stuff sorta',
        image: 'https://mdbootstrap.com/img/Photos/Slides/img%20(40).jpg',
        serializedOptions: [
            { id: 2, title: "Second Letter to Santa", name: "Little Dustin" }
        ],
    },
    {
        formName: 'Anotha',
        data: '**WOW we are using Markdown!**',
        image: 'https://mdbootstrap.com/img/Photos/Slides/img%20(35).jpg',
        serializedOptions: [
            { id: 3, title: "Third Letter to Santa", name: "Little Floyd" }
        ],
    },
    {
        formName: 'Anotha',
        data: '**WOW we are using Markdown!**',
        image: 'https://mdbootstrap.com/img/Photos/Slides/img%20(19).jpg',
        serializedOptions: [
            { id: 3, title: "Third Letter to Santa", name: "Little Floyd" }
        ],
    },
    {
        formName: 'Anotha',
        data: '**WOW we are using Markdown!**',
        image: 'https://mdbootstrap.com/img/Photos/Slides/img%20(40).jpg',
        serializedOptions: [
            { id: 3, title: "Third Letter to Santa", name: "Little Floyd" }
        ],
    }
]

export default function History() {

    const userData = useContext(UserDataContext)

    //delete History forms     will be async
    const handleDeleteHistory = (e) => {
        //e.preventDefault();
        // await fetch(`users/${userData.name}/history/${e.target.value}`, {
        //     method: 'DELETE'
        // })
        //     .then(user => 
        //userData(user.history);
        // })
        console.log('im  a delete history button...sorta')
    }


    //favorites will be in userData

    return (
        <MDBCarousel showControls showIndicators dark fade sx={{
            height: '100vh'
        }} >
            <MDBCarouselInner>
                {someDamnData.map((form, index) =>
                    <MDBCarouselItem className={index === 0 ? 'active' : ''}>
                        <MDBCarouselElement src={form.image} />
                        <MDBCarouselCaption>
                            <h5>{form.formName}</h5>
                            <p>{form.data}</p>
                            <Button onClick={(e) => handleDeleteHistory(form.serializedOptions.id)}>{<MDBIcon fas icon="trash" size='2x' />}</Button>
                        </MDBCarouselCaption>
                    </MDBCarouselItem>
                )}
            </MDBCarouselInner>
        </MDBCarousel >
    )
}


/*

let user = {
    id: 1,
    name: brian,
    history: [
      {id: 1, title: "test letter", name: "Little Timmy"}
    ],
    favorites: [1, 2, 3]
  }

*/