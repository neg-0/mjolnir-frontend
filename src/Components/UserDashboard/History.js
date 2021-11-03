import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import { UserDataContext } from '../../App';
import { useContext } from 'react';


export default function History() {

    const userData = useContext(UserDataContext)

    //delete History forms
    const handleDeleteHistory = async (e) => {
        e.preventDefault();
        await fetch(`users/${userData.name}/history/${e.target.value}`, {
            method: 'DELETE'
        })
            .then(user => {
                // userData(user.history);
            })
    }

    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography variant='h5' color="text.secondary" gutterBottom>
                    Hey I'm the History
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {userData.serializedOptions.map((formId, index) => {
                        <Paper>
                            <Typography variant='h4' color="text.secondary" gutterBottom>
                                Form {index + 1}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">{formId.form}</Typography>
                            <CardActions>
                                <Button variant="outlined" startIcon={<DeleteIcon />} onClick={(e) => handleDeleteHistory(e)}>Delete this historic Form?</Button>
                            </CardActions>
                        </Paper>
                    })}
                </Typography>
            </CardContent>
        </Card>

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