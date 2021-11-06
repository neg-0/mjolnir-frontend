import { useContext, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { AppFunctionsContext, UserDataContext } from '../../App';
import { MDBIcon } from 'mdb-react-ui-kit';
import MarkdownRenderer from '../Editor/MarkdownRenderer';
import { Stack, Typography } from '@mui/material';
import {
    MDBCarousel,
    MDBCarouselInner,
    MDBCarouselItem,
    MDBCarouselElement,
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

export default function Favorites() {

    const userData = useContext(UserDataContext)
    const appFunctions = useContext(AppFunctionsContext)
    const [templates, setTemplates] = useState([]) // The original text from the markdown file
    const [formFavorites, setFormFavorites] = useState([]); //favorites state

    useEffect(() => {
        appFunctions
            .fetchTemplates()
            .then(templates => {
                setTemplates(templates)
            })
    }, [])

    useEffect(() => {
        appFunctions
            .fetchUserFavorites(userData.user_name)
            .then(favorites => setFormFavorites(favorites))
    }, [userData])

    function removeFavorite(templateId) {
        appFunctions
            .removeUserFavorite(userData.user_name, templateId)
            .then(newFavorites => {
                setFormFavorites(newFavorites)
                return newFavorites
            })
            .then((newFavorites) => console.log('removed favorite', newFavorites))
    }

    function isFavorite(templateId) {
        if (!formFavorites) {
            return false
        }
        return formFavorites.includes(templateId)
    }

    if (templates.length === 0) {
        return null
    }

    if (!formFavorites || formFavorites.length === 0) {
        return (<Stack sx={{ alignItems: 'center', my: 4 }}>
            <Typography variant='h5'>You have not yet added any favorites.</Typography>
            <Typography variant='h5'> Check out our <Link to='/forms'>Forms</Link>!</Typography>
        </Stack>)
    }

    return (
        <MDBCarousel showControls showIndicators dark fade sx={{
            height: '50vh'
        }}>
            <MDBCarouselInner>
                {templates.filter(template => formFavorites.includes(template.template.id)).map((fav, index) => {
                    { console.log('FAVORITE TEMPLATE', fav.template.id) }
                    return (
                        < MDBCarouselItem className={index === 0 ? 'active' : ''} >
                            <MDBCarouselElement />

                            <Stack direction="column"
                                justifyContent="center"
                                alignItems="center"
                                spacing={2}>
                                <Paper data-testid="editor" sx={{ zoom: '60%', mx: "auto", p: "1in", aspectRatio: "8.5/11", width: '60%', mx: "auto", position: 'relative', overflow: 'auto' }}>
                                    <MarkdownRenderer template={fav.template} templateOptions={fav.template_options} serializedOptions={null} />
                                </Paper>
                                {/* <Typography variant='h5'>{fav.template_options}</Typography> */}
                                <Stack direction="row" spacing={2}>
                                    <Button onClick={(e) => removeFavorite(fav.template.id)} > {
                                        < MDBIcon fas icon="trash" color="black" size='1x' />
                                    }</Button>
                                </Stack>
                            </Stack>
                        </MDBCarouselItem>
                    )
                })}

            </MDBCarouselInner>
        </ MDBCarousel >
    );
}

