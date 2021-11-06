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


export default function Favorites() {

    const userData = useContext(UserDataContext)
    const appFunctions = useContext(AppFunctionsContext)
    const [template, setTemplate] = useState([]) // The original text from the markdown file
    const [templateOptions, setTemplateOptions] = useState() // JSON object of template option names and values
    const [serializedOptions, setSerializedOptions] = useState({}) // JSON object of user-provided options
    const [formFavorites, setFormFavorites] = useState([]); //favorites state
    const user = userData.user_name;


    useEffect(() => {
        appFunctions
            .fetchUserFavorites()
            .then(favorites => setFormFavorites(favorites))

        appFunctions
            .fetchTemplates()
            .then(templates => {
                setTemplate(templates)
            })
    }, [])

    function toggleFavorite(templateId) {
        if (isFavorite(templateId)) {
            // Remove favorite
            appFunctions.removeUserFavorite(user, templateId)
        } else {
            //Add favorite
            appFunctions.addUserFavorite(user, templateId)
        }
    }

    function isFavorite(templateId) {
        return formFavorites.includes(templateId)
    }

    if (template.length === 0) {
        return null
    }

    return (
        <MDBCarousel showControls showIndicators dark fade sx={{
            height: '50vh'
        }}>
            <MDBCarouselInner>
                {formFavorites.map((fav, index) => {
                    return (
                        < MDBCarouselItem className={index === 0 ? 'active' : ''} >
                            <MDBCarouselElement />
                            <Stack direction="column"
                                justifyContent="center"
                                alignItems="center"
                                spacing={2}>
                                <Paper data-testid="editor" sx={{ zoom: '60%', mx: "auto", p: "1in", aspectRatio: "8.5/11", width: '60%', mx: "auto", position: 'relative', overflow: 'auto' }}>
                                    <MarkdownRenderer template={fav.templates} templateOptions={fav.template_options} serializedOptions={null} />
                                </Paper>
                                <Typography variant='h5'>{fav.template_options}</Typography>
                                <Stack direction="row" spacing={2}>
                                    <Button onClick={(e) => toggleFavorite(fav)} > {
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

