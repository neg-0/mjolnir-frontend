import ZoomInIcon from '@mui/icons-material/ZoomIn';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AppFunctionsContext, UserDataContext } from '../../App';
import MarkdownRenderer from '../Editor/MarkdownRenderer';
import FavoriteButton from './FavoriteButton';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

export default function AllForms() {


    const [open, setOpen] = useState(false);
    const handleOpen = (template) => {
        setModalTemplate(template)
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const handleLoginModalOpen = () => setLoginModalOpen(true);
    const handleLoginModalClose = () => setLoginModalOpen(false);

    const appFunctions = useContext(AppFunctionsContext)
    const userData = useContext(UserDataContext)
    const history = useHistory();

    const [templates, setTemplate] = useState([]) // The original text from the markdown file
    const [modalTemplate, setModalTemplate] = useState()
    const [formFavorites, setFormFavorites] = useState([]); //favorites state


    // Fetch templates and grab the title and id to display in the dropdown
    useEffect(() => {
        appFunctions
            .fetchTemplates()
            .then(templates => {
                setTemplate(templates)
            })
    }, [])

    useEffect(() => {
        if (!userData) {
            return
        }
        appFunctions
            .fetchUserFavorites(userData.user_name)
            .then(favorites => {
                setFormFavorites(favorites)
                return favorites
            })
            .then(favorites => console.log('fetched favorites', favorites))
    }, [userData])

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };



    if (templates.length === 0) {
        return null
    }

    const onLoginSubmit = (e) => {
        e.preventDefault();
        appFunctions.login(e.target[0].value, e.target[1].value).then(success => {
            if (success) {
                handleLoginModalClose()
            }
        }
        )
    }
    //onClick takes you to the selected template
    const handleFormClick = (template) => {
        appFunctions.setTemplate(template)
    }

    //add form to favorites
    const addFavorite = (template_id) => {
        if (userData === undefined) {
            handleLoginModalOpen()
        } else {
            //push selected template_id to userData.favorites
            //formFavorites.push(templates.template.id)
        }
    }


    const onSelectEditForm = (e, templateId) => {
        e.preventDefault();
        history.push(`/editor/?templateId=${templateId}`)
    }




    function toggleFavorite(templateId) {
        console.log('toggling favorite', templateId)
        if (isFavorite(templateId)) {
            // Remove favorite
            appFunctions
                .removeUserFavorite(userData.user_name, templateId)
                .then(newFavorites => {
                    setFormFavorites(newFavorites)
                    return newFavorites
                })
                .then((newFavorites) => console.log('removed favorite', newFavorites))
        } else {
            //Add favorite
            appFunctions
                .addUserFavorite(userData.user_name, templateId)
                .then(newFavorites => {
                    setFormFavorites(newFavorites)
                    return newFavorites
                })
                .then((newFavorites) => console.log('added favorite', newFavorites))
        }
    }

    function isFavorite(templateId) {
        if (!formFavorites) {
            return false
        }
        return formFavorites.includes(templateId)
    }

    return (

        <Box sx={{ backgroundColor: "#333", p: ".25in", height: '100vh', mx: "auto", my: "auto", position: 'relative', overflow: 'auto' }}>
            <Paper elevation={3} sx={{ width: "85vw", height: "90vh", mx: "auto", my: "auto", p: "1in", position: 'relative', overflow: 'auto' }} >

                < Typography variant='h4' color="text.secondary" gutterBottom >
                    Forms we currently support
                    <Divider />
                </Typography >


                <Box sx={{
                    display: 'grid',
                    gridAutoFlow: 'row',
                    borderRadius: 3,
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    marginTop: '20px',
                    gap: 3,
                    p: 3,
                    mx: "auto",
                    my: "auto",
                    color: "text.secondary",
                    border: "2px solid #333",
                    boxShadow: "0px 0px 10px #333",
                    aspectRatio: 10 / 3,
                }}
                >

                    {templates.map(template => {
                        return (
                            <Card sx={{ maxWidth: 345, border: '1px solid #000', borderShadow: '10px', borderRadius: 3 }}>
                                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <Typography variant='h5' color="text.secondary" gutterBottom>
                                        {template.template.title}
                                    </Typography>
                                    <Paper data-testid="editor" sx={{ zoom: '40%', aspectRatio: "8.5/11", width: '100%', mx: "auto", p: "1in" }}>
                                        <MarkdownRenderer template={template.template} templateOptions={template.template_options} serializedOptions={null} />
                                    </Paper>
                                    <CardActions>
                                        <Button onClick={(e) => handleOpen(template)} ><ZoomInIcon /></Button>
                                        <Button onClick={(e) => onSelectEditForm(e, template.template.id)}><NoteAddIcon /></Button>
                                        <FavoriteButton templateId={template.template.id} favorites={formFavorites} toggleFavorite={toggleFavorite} />
                                    </CardActions>
                                </CardContent>
                            </Card>
                        )
                    })}

                </Box >
                <Divider sx={{ marginTop: '25px' }} />
                < Typography sx={{ textAlignLast: 'right', marginTop: '10px' }} variant='h4' color="text.secondary" gutterBottom >
                    ...Several forms in development, check back soon!
                </Typography >

                <Modal
                    open={open}
                    onClose={(e) => handleClose(e)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        {modalTemplate ? (<>
                            <Typography id="modal-modal-title" variant="h3" sx={{ textAlign: 'center' }}>
                                {modalTemplate.template.title}
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                <Paper data-testid="editor" sx={{ zoom: '80%', aspectRatio: "8.5/11", width: '100%', mx: "auto", p: "1in" }}>
                                    <MarkdownRenderer template={modalTemplate.template} templateOptions={modalTemplate.template_options} serializedOptions={null} />
                                </Paper>
                            </Typography></>) : <></>}
                    </Box>
                </Modal>
                <Modal
                    open={loginModalOpen}
                    onClose={(e) => handleLoginModalClose(e)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Please Login
                        </Typography>
                        <form onSubmit={(e) => onLoginSubmit(e)}>
                            <TextField
                                required
                                id="filled-required"
                                label="Required"
                                placeholder="Username/Email"
                                variant="filled"
                            />
                            <TextField
                                required
                                id="filled-password-input"
                                label="Required"
                                type="password"
                                placeholder="Password"
                                variant="filled"
                            />
                            <Button type='submit'>Log Me In!</Button>
                        </form>
                    </Box>
                </Modal>
            </Paper >
        </Box >
    )
}

