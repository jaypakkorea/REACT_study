import AppRouter from 'components/Router'
import React, { useState, useEffect } from 'react';
import {authService} from "myBase"
import { updateProfile } from 'firebase/auth';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(()=> {
    authService.onAuthStateChanged((user) => {
      if(user){
        setIsLoggedIn(true)
        setUserObj({
            displayName : user.displayName,
            uid : user.uid,
            updateProfile : (args) => updateProfile(user, { displayName: user.displayName })
          })
      } else {
        setIsLoggedIn(false)
      }
      setInit(true)
    })
  }, [])
  const refreshUser = () => {
    const user = authService.currentUser
    setUserObj({
      displayName : user.displayName,
      uid : user.uid,
      updateProfile : (args) => updateProfile(user, { displayName: user.displayName })
    })
  }
  return (
    <>
    {init ? <AppRouter refreshUser={refreshUser} isLoggedIn={isLoggedIn} userObj={userObj}/> : "Initializing..." }
    <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
