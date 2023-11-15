import React from "react";
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';


const LoginForm = () => {
    return (
        <Stack>
        <TextField
          required
          id="outlined-required"
          label="User Name"
        />
        </Stack>
    )
}

export default LoginForm