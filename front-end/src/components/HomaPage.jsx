import * as React from 'react';
import HomePageMain from './HomePageMain';
import Box from '@mui/material/Box';
import Footer from './Footer';
import { AppBar } from '@material-ui/core';

export default function ButtonAppBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <HomePageMain />
        </Box>
    );
}
