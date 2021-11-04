import React, { useContext, setState, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import { UserDataContext } from '../../App';
import AddchartIcon from '@mui/icons-material/Addchart';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import MarkdownRenderer from '../Editor/MarkdownRenderer';
import Divider from '@mui/material/Divider';



const someDamnData = [
    {
        formName: 'this',
        data: '**Lots of Cool Stuff!**',
        image: '/logo192.png',
        serializedOptions: [
            { id: 1, title: "First Letter to Santa", name: "Little Brian" }
        ],
    },
    {
        formName: 'that',
        data: 'lots of cool stuff sorta',
        image: '/logo512.png',
        serializedOptions: [
            { id: 2, title: "Second Letter to Santa", name: "Little Dustin" }
        ],
    },
    {
        formName: 'Anotha',
        data: '**WOW we are using Markdown!**',
        image: '/logo192.png',
        serializedOptions: [
            { id: 3, title: "Third Letter to Santa", name: "Little Floyd" }
        ],
    },
    {
        formName: 'Anotha',
        data: '**WOW we are using Markdown!**',
        image: '/logo192.png',
        serializedOptions: [
            { id: 3, title: "Third Letter to Santa", name: "Little Floyd" }
        ],
    },
    {
        formName: 'Anotha',
        data: '**WOW we are using Markdown!**',
        image: '/logo192.png',
        serializedOptions: [
            { id: 3, title: "Third Letter to Santa", name: "Little Floyd" }
        ],
    }
]



export default function AllForms() {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };



    return (
        <Box sx={{ backgroundColor: "#333", p: ".5in", height: '100vh' }}>
            <Paper elevation={3} sx={{ width: "10.5in", height: "11in", mx: "auto", p: "1in" }} >

                < Typography variant='h4' color="text.secondary" gutterBottom >
                    Forms we currently support
                    <Divider />
                </Typography >


                <Box sx={{
                    display: 'grid',
                    gridAutoFlow: 'row',
                    textAlign: 'center',
                    borderRadius: 3,
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 3,
                }}
                >

                    {someDamnData.map(form => {
                        return (
                            <Card sx={{ maxWidth: 345, border: '1px solid #000', borderShadow: '10px', borderRadius: 3 }}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    src={form.image}
                                />
                                <CardContent>
                                    <Typography variant='h5' color="text.secondary" gutterBottom>
                                        {form.formName}
                                    </Typography>
                                    <MarkdownRenderer markdown={form.data} templateOptions={null} serializedOptions={form.serializedOptions} />
                                    <CardActions>
                                        <Button variant="outlined" startIcon={<ZoomInIcon />} onClick={(e) => handleOpen(e)} >Preview</Button>
                                        <Button variant="outlined" startIcon={<AddchartIcon />} >Work On</Button>
                                    </CardActions>
                                </CardContent>
                            </Card>
                        )
                    })}

                </Box >


                <Modal
                    open={open}
                    onClose={(e) => handleClose(e)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {someDamnData.formName}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            This is the Markdown preview...Component is below
                            {<MarkdownRenderer markdown={someDamnData.data} templateOptions={null} serializedOptions={someDamnData.serializedOptions} />}
                        </Typography>
                    </Box>
                </Modal>
            </Paper >
        </Box >
    )
}

