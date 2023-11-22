import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { /* specific components or styles */ } from '@material-ui/core';

const Header = () => {
    return (
        
<Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CodeYourFuture
          </Typography>
          <Button color="inherit">Support</Button>
        </Toolbar>
      </AppBar>
    </Box>
    )
}

export default Header