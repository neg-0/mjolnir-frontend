import React, { useContext } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import { UserDataContext } from '../../App';

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
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography variant='h5' color="text.secondary" gutterBottom>
                    Here are all of your favorites
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {userData.favorites.map((formId, index) => {
                        <Card>
                            <Typography variant='h4' color="text.secondary" gutterBottom>
                                Form {index + 1}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">{formId.form}</Typography>
                            <CardActions>
                                <Button variant="outlined" startIcon={<DeleteIcon />} onClick={(e) => handleDeleteFavorite(e)}>Delete that Fav?</Button>
                            </CardActions>
                        </Card>
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