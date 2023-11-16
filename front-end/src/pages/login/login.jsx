// Login.jsx
import React from 'react';
import LoginForm from '../../components/auth-components/LoginForm';
import { Container } from '@mui/material';


const LoginPage = () => {

  
  return (
<Container maxWidth="sm">
      <h2>Login Page</h2>
      <LoginForm />
   </Container>
  );
}

export default LoginPage;
