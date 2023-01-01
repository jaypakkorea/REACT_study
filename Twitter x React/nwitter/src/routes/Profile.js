import { authService, dbService } from 'myBase';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { collection, getDocs, query, where } from "@firebase/firestore";
import { updateProfile } from "@firebase/auth";

function Profile({refreshUser, userObj})  {
    const [newDisplay, setNewDisplay] = useState(userObj.displayName)
    const history = useHistory()
    const onLogoutClick = () => {
        authService.signOut();
        history.push("/")
    };
    const getMyNweets = async () => {
        console.log(userObj)
        const q = query(
        collection(dbService, "nweets"),
        where("creatorId", "==", userObj.uid)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        });
    };
    const onChange = (event) => {
        const {
            target: {value},
        } = event
        setNewDisplay(value)
    }
    const onSubmit = async (event) => {
        event.preventDefault()
        if(userObj.displayName !== newDisplay) {
            await updateProfile(authService.currentUser, { displayName: newDisplay });
            refreshUser();
        }
        refreshUser()
    }

    useEffect(() =>{
        getMyNweets()
    },[])

    return (
        <>
        <form onSubmit={onSubmit}>
            <input onChange={onChange} type="text" placeholder='Displaay name' value={newDisplay} />
            <input type="submit" value="Update Profile" />
        </form>
            <button onClick={onLogoutClick}> Logout</button>
        </>
    )
};

export default Profile;