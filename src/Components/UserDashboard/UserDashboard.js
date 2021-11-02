import react from 'react'


export default function UserDashboard({ appFunctions }) {



    //logout button
    const handleLogout = (e) => {
        e.preventDefault();
        appFunctions.logout();
    }

    //view favorites 
    const handleFavorite = (e) => {
        e.preventDefault();
        appFunctions.getFavs(`/users/${username}/favorites`)
    }




    return (
        <>
        </>
    )
}