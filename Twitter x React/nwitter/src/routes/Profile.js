import { authService } from 'myBase';
import React from 'react';
import { useHistory } from 'react-router-dom';



function Profile()  {
    const history = useHistory()
    const onLogoutClick = () => {
        authService.signOut();
        history.push("/")
    }

    return (
        <>
            <button onClick={onLogoutClick}> Logout</button>
        </>
    )
};

export default Profile;