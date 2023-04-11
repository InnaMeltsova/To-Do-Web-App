import React, { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from 'react-redux';
import { Grid, CircularProgress } from '@mui/material';
import { setAccessToken } from "../../../store/auth";
import AppRoutes from '../../../routes';
import { Header } from '../../../components/header';
import './styles.css';

const MainLayout = () => {
    const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout, getIdTokenClaims } =
    useAuth0();
    const [tokenExist, setToken] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if(isAuthenticated) {
            getIdTokenClaims().then(idToken => {
            dispatch(setAccessToken(idToken.__raw));
            setToken(true);
            })
          }
    }, [getIdTokenClaims, isAuthenticated])

    // if (!isAuthenticated || isLoading || !tokenExist || error) {
    if (isLoading || !tokenExist || error) {
        return (
          <Grid container justifyContent="center" alignItems="center">
            {error ? <div>Oops... {error.message}</div> : <CircularProgress/>}
          </Grid>
        );
      }
    
    if (isAuthenticated) {
        return (
            <Grid container>
                <Header username={user.name} onLogOut={() => logout({ returnTo: window.location.origin })}/>
                <AppRoutes/>
            </Grid>
           )
    }

    return <button onClick={loginWithRedirect}>Log in</button>;
};

export default MainLayout;