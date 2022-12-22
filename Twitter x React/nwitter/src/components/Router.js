import React, { useState } from 'react';
import { BrowserRouter  as Router, Redirect, Route, Switch, Link } from 'react-router-dom';
import Profile from '../routes/Profile';
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Navigation from './Navigation';


const AppRouter = ({isLoggedIn, userObj}) => {
    return (
        <Router>
            {isLoggedIn && <Navigation/>}
            <Switch>
                {isLoggedIn ? (
                <>
                <Route exact  path="/" >
                    <Home userObj={userObj} />
                </Route>
                <Route component={Profile} exact path="/profile" />
                </>
                ) : (
                <>
                <Route exact path="/">
                    <Auth/>
                </Route>
                <Redirect from="*" to="/" />
                </>
                )}
            </Switch>
        </Router>
    )
}

export default AppRouter;