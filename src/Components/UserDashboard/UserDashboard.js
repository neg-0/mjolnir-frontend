import History from './History';
import Favorites from './Favorites';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { UserDataContext, AppFunctionsContext } from '../../App';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom'
import SendIcon from '@mui/icons-material/Send';
import { Link } from 'react-router-dom';



export default function UserDashboard() {

    const userData = useContext(UserDataContext);
    const appFunctions = useContext(AppFunctionsContext);
    let history = useHistory();



    //logout button 
    const handleLogout = (e) => {
        e.preventDefault();
        appFunctions.logout()
        history.push('/')
    }

    //grab a random form to work on ***stretch goal****
    // const getRandomForm = (forms) => {
    //     let randomForm = forms[Math.floor(Math.random() * forms.length)];
    //     return randomForm;
    // }


    return (
        <Box sx={{ backgroundColor: "#333", p: ".5in", height: '100vh', borderRadius: '9', position: 'relative', overflow: 'auto' }}>
            <Paper elevation={3} sx={{ width: "95vw", height: "90vh", mx: "auto", p: "0.5in", position: 'relative', overflow: 'auto' }} >
                <Button variant="text" onClick={(e) => handleLogout(e)} sx={{
                    position: 'absolute',
                    top: '0',
                    right: '0',
                    padding: '8px',
                    margin: '5px'
                }}>Logout</Button>

                <Box sx={{
                    display: 'grid',
                    // gridAutoFlow: 'row',
                    // textAlign: 'center',
                    borderRadius: 3,
                    height: '45',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: 3,
                    p: 3,
                    color: "text.secondary",
                    border: "2px solid #333",
                    boxShadow: "0px 0px 10px #333",
                    position: 'relative',
                    overflow: 'hidden'
                }}
                >
                    <Typography variant="h2" gutterBottom>Hey {userData.user_name}!</Typography>
                    <Typography variant="subtitle1" gutterBottom sx={{
                        textAlignLast: 'center', textAlignTop: 'center'
                    }}>This is your custom dashboard, where you can view your favorites and history</Typography>
                    <Card sx={{
                        height: '150%',
                        border: '1px solid #000',
                        borderShadow: '10px',
                        borderRadius: 3
                    }}>
                        < CardContent >
                            <Typography variant="h6" sx={{ marginLeft: '10%' }}>Favorites</Typography>
                            <Favorites />
                        </CardContent>
                    </Card>
                    <Card sx={{
                        height: '150%',
                        height: '150%',
                        border: '1px solid #000',
                        borderShadow: '10px',
                        borderRadius: 3
                    }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ marginLeft: '10%' }}>History</Typography>
                            <History />
                        </CardContent>
                    </Card>
                    <Box sx={{
                        display: 'flex',
                        justifyContents: 'center',
                        marginTop: '70%',
                        flexWrap: 'wrap',
                        flexDirection: 'row'
                    }}>
                        <Typography sx={{ marginLeft: '3.5px' }}>Check out our other supported forms to be inspired?</Typography>
                        <Button component={Link} to={'/forms'} sx={{ bottom: '7px' }} variant="text" endIcon={<SendIcon />}>
                            Take me!
                        </Button>

                    </Box>
                </Box>
            </Paper >
        </Box >
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


{userData.user_name}


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
                <Typography variant="h2" gutterBottom>Hey {userData.user_name}!</Typography>
                <Typography variant="subtitle1" gutterBottom>This is your custom dashboard.</Typography>
                <Typography variant="subtitle1" gutterBottom>You can view your favorites and history from here, as well as remove them.</Typography>
                <Card>
                    <CardContent>
                        <Favorites />
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <History />
                    </CardContent>
                    <Button variant="outlined" onClick={(e) => handleLogout(e)}>Logout</Button>
                </Card>
            </Paper >
    </Box >
   */