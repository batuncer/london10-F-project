import React from "react";
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import * as Yup from 'yup';
import {yupResolver} from "@hookform/resolvers/yup"
import {useForm} from "react-hook-form"
import FormProvider from "../hooks-form/form-provider";
import RHFTextField from "../hooks-form/RHFTextField";
import { Button, Divider } from "@mui/material";

const LoginForm = () => {

  const schema = Yup.object().shape({
        username: Yup.string().max(255, "Max 255").required(),
        password: Yup.string().required()

    })

    const defaultValues = {
      username:'baki',
      password:'1234'
    }
    
    /*const LoginSchema = Yup.object().shape({
        email: Yup.string().email('Email must be a valid email address').required('Email is required'),
        password: Yup.string().required('Password is required'),
    });

    const defaultValues = {
        email: 'testadmin@soms.com',
        password: '1234',
    };
    */
    const methods = useForm({
        resolver: yupResolver(schema),
        defaultValues: defaultValues
    });

    const {
        reset,
        watch,
        setValue,
        handleSubmit,
        getValues,
        formState: {isSubmitting, isValid},
    } = methods;

const onSubmit = (data) => {
  console.log("submit", data);
}

    return (
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>

        <Stack spacing={2}> 
          <RHFTextField name='username' label='User Name'/>
          <RHFTextField name='password' label='Password'/>
          <Button type='submit' variant="contained">Login</Button>  
          <Divider />
          <Button type='submit' variant="contained">SlackLogin</Button> 
          <Divider />
          <Button href={`/signup`} >Sign Up</Button>      
        </Stack>

      </FormProvider>
   
    )
}

export default LoginForm