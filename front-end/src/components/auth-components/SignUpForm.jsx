import React, { useState } from "react";
import Stack from '@mui/material/Stack';
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import FormProvider from "../hooks-form/form-provider";
import RHFTextField from "../hooks-form/RHFTextField";
import { Button, IconButton, InputAdornment } from "@mui/material";
import Iconify from "../iconify/Iconify";
import RHFSelect from "../hooks-form/RHFSelect";

const SignUp = () => {

    const [showPassword, setShowPassword] = useState(false);
    const schema = Yup.object().shape({
        username: Yup.string().max(255, "Max 255").required(),
        email: Yup.string().email('Email must be a valid email address').required('Email is required'),
        password: Yup.string().required('Password is required'),
        password_confirmation: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
        city: Yup.string().max(255, "Max 255").required(),
        role: Yup.string().max(255, "Max 255").required()

    })

    const defaultValues = {
        username: 'baki',
        password: '1234',
        password_confirmation: '',
        email: "baki@gmail.com",
        city: "Istanbul",
        role: "Volunteer"

    }

    const ROLE_OPTIONS = [{ value: 'Volunteer', label: 'Volunteer' },
    { value: 'Traniee', label: 'Traniee' },

    ]
    /*const LoginSchema = Yup.object().shape({
        email: Yup.string().email('Email must be a valid email address').required('Email is required'),
        password: Yup.string().required('Password is required'),
    });
Coordinator
Lead Teacher 1
Assistant Lead Teacher 5
Teaching Assistant 6
Personal Development Rep 2

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
        formState: { isSubmitting, isValid },
    } = methods;

    const onSubmit = (data) => {
        console.log("submit", data);
    }

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>

            <Stack spacing={2}>
                <RHFTextField name='username' label='User Name' />
                <RHFTextField name='email' label='Mail' />
                <RHFTextField
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                <RHFTextField
                    name="password_confirmation"
                    label="Confirm Password"
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <RHFTextField name='city' label='City' />
                <RHFSelect name={"role"} label="Role" variant={"outlined"} InputLabelProps={{ shrink: true }}>
                    {ROLE_OPTIONS.map((category) => (
                        <option key={category.value} value={category.value}>
                            {category.label}
                        </option>
                    ))}
                </RHFSelect>                <Button type='submit' variant="contained">Sign Up</Button>
                <Button href={`/login`} >Login</Button>

            </Stack>

        </FormProvider>

    )
}

export default SignUp