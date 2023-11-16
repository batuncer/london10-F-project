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

  const url = "http://localhost:4000/api/v1/auth/slack"
  const oAuthUrl = import.meta.env.VITE_OAUTH_URL
  const clientId = "85239491699.6186207620565"

  const schema = Yup.object().shape({
        username: Yup.string().max(255, "Max 255").required(),
        password: Yup.string().required()

    })

    const defaultValues = {
      username:'baki',
      password:'1234'
    }
    


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
  const handlerFailure = (error) => {
    console.log({ error })
  }

  const handlerSuccess = async (code) => {
    // The component will return a slack OAuth verifier code, 
    // you should send that code to your API and exchange your temporary OAuth verifier code for an access token.
    const request = await fetch(oAuthUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code }) })
    // If successfull you can redirect the user to the app.
    const json = await request.json()
    console.log(json)
  }

    return (
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>

        <Stack spacing={2}> 
          <RHFTextField name='username' label='User Name'/>
          <RHFTextField name='password' label='Password'/>
          <Button type='submit' variant="contained">Login</Button>  
          <Divider />
          <SlackLogin
            redirectUrl='http://localhost:4000/api/v1/auth/slack'
            onFailure={handlerFailure}
            onSuccess={handlerSuccess}
            slackClientId='SLACK_CLIENT_ID'
            slackUserScope='openid profile'
          />
          <Divider />
          <Button href={`/signup`} >Sign Up</Button>      
        </Stack>

      </FormProvider>
   
    )
}

export default LoginForm