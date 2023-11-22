import React from 'react';
import { makeStyles } from '@mui/styles';
import backgroundImage from '../assets/cyf.png';
import SignupModal from './SignupModal';
import {  } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        //color: theme.palette.common.white,  // Set text color to white or light color for contrast
    },
}));

const HomePageMain = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <SignupModal />
        </div>
    );
};

export default HomePageMain;
