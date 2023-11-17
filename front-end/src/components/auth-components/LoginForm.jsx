import React from "react";
import Stack from '@mui/material/Stack';
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import FormProvider from "../hooks-form/form-provider";
import RHFTextField from "../hooks-form/RHFTextField";
import { Button, Divider } from "@mui/material";
import SlackLoginButton from "./SlackLoginButton";
const LoginForm = () => {

  //const url = "https://localhost:443/auth/redirect"
  const oAuthUrl = "https://localhost:443/auth"

  const schema = Yup.object().shape({
    username: Yup.string().max(255, "Max 255").required(),
    password: Yup.string().required()

  })

  // const defaultValues = {
  //   username: 'baki',
  //   password: '1234'
  // }



  const methods = useForm({
    resolver: yupResolver(schema),

  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    getValues,
    formState: { isSubmitting, isValid },
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
        <RHFTextField name='username' label='User Name' />
        <RHFTextField name='password' label='Password' />
        <Button type='submit' variant="contained">Login</Button>
        <Divider />
        <SlackLoginButton />
        <Button href={`/signup`} >Sign Up</Button>
      </Stack>

    </FormProvider>

  )
}

export default LoginForm