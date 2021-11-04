import React, { useContext } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import { UserDataContext } from '../../App';
import IconButton from '@mui/material/IconButton';
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



export default function Favorites(/*passing in our state/user state*/) {

    const userData = useContext(UserDataContext)

    //delete favorite forms
    const handleDeleteFavorite = async (e) => {
        e.preventDefault();
        await fetch(`users/${userData.id}/favorites/${e.target.value}`, {
            method: 'DELETE'
        })
            .then(user => {
                //userData(user.favorites);
            })
    }



    return (
        <MDBCarousel showControls showIndicators dark fade >
            <MDBCarouselInner>
                {someDamnData.map((form, index) => {
                    return (
                        <MDBCarouselItem className={index === 0 ? 'active' : ''}>
                            <MDBCarouselElement src={form.image} />
                            <MDBCarouselCaption>
                                <h5>{form.formName}</h5>
                                <p>{form.data}</p>
                                <Button>{
                                    <MDBIcon fas icon="trash" size='2x' />
                                }</Button>
                                <Button>{
                                    <MDBIcon fas icon="heart" size='2x' />
                                }</Button>
                            </MDBCarouselCaption>
                        </MDBCarouselItem>
                    )
                })}
            </MDBCarouselInner>
        </MDBCarousel >
    );
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