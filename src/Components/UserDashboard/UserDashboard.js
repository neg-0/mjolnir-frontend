import react from 'react'
import History from './History';
import Favorites from './Favorites';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { UserDataContext } from '../../App';
import { useContext } from 'react';






export default function UserDashboard() {

    const userData = useContext(UserDataContext)

    //logout button 
    const handleLogout = (e) => {
        e.preventDefault();
        userData({});
        // setUsername('');
    }

    return (
        <Paper>
            <Card>
                <CardContent>
                    <Typography variant="h2" gutterBottom>Hey {userData.user_name}!</Typography>
                    <Typography variant="subtitle1" gutterBottom>This is your custom dashboard.</Typography>
                    <Typography variant="subtitle1" gutterBottom>You can view your favorites and history from here, as well as remove them.</Typography>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <Favorites />
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <History />
                </CardContent>
            </Card>
            <Button variant="outlined" onClick={(e) => handleLogout(e)}>Logout</Button>
        </Paper>
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