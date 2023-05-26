import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Form } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'

import registrationSchema, { RegistrationFormData } from '../../validations/registrationSchema'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { createNewUser } from '../../redux/reducers/userReducer'

const SignupForm = () => {
    const { handleSubmit, control, formState: { errors } } = useForm<RegistrationFormData>({
        resolver: yupResolver(registrationSchema)
    })
    const { users } = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();

    const handleRegisterSubmit = (data: RegistrationFormData) => {
        console.log(data);
        const emailAvailable = users.find(user => user.email === data.email);
        if (emailAvailable) {
        alert('This email is already registered, please try another one');
        } else {
        dispatch(createNewUser({
            name: data.username,
            email: data.email,
            password: data.password,
        }))
        }
    }
  return (
    <div>
        <Typography textAlign='center' margin='10px auto'>Or</Typography>
        <Typography
            variant='h5'
            component='h5'
            textAlign='center'
        >Sign up</Typography>
        <Typography
            margin='5px 0'
            textAlign='center'
        >Fill in the form to sign up & create a new account</Typography>
        <Form onSubmit={handleSubmit(handleRegisterSubmit)}>
        <Controller
            control={control}
            name='username'
            render={({ field: { onChange, value }}) => (
            <>
                <InputLabel htmlFor='username'>*Username:</InputLabel>
                <TextField
                    placeholder='Username'
                    fullWidth
                    margin='dense'
                    onChange={onChange}
                >
                </TextField>
                </>
              )}
            />
            {errors.username && (<Typography color='error'>{errors.username.message}</Typography>)}
            <Controller
                control={control}
                name='email'
                render={({ field: { onChange, value }}) => (
                <>
                <InputLabel htmlFor='email'>*Email:</InputLabel>
                <TextField
                    placeholder='Email'
                    type='email'
                    fullWidth
                    margin='dense'
                    onChange={onChange}
                >
                </TextField>
                </>
              )}
            />
            {errors.email && (<Typography color='error'>{errors.email.message}</Typography>)}
            <Controller
                control={control}
                name='password'
                render={({ field: { onChange, value }}) => (
                <>
                <InputLabel htmlFor='password'>*Password:</InputLabel>
                <TextField
                    placeholder='Password'
                    type='password'
                    fullWidth
                    margin='dense'
                    onChange={onChange}
                >
                </TextField>
                </>
              )}
            />
            {errors.password && (<Typography color='error'>{errors.password.message}</Typography>)}
            <Controller
                control={control}
                name='confirm'
                render={({ field: { onChange, value }}) => (
                <>
                <InputLabel htmlFor='confirm'>*Confirm password:</InputLabel>
                <TextField
                    placeholder='Type in your password again'
                    type='password'
                    fullWidth
                    margin='dense'
                    onChange={onChange}
                >
                </TextField>
                </>
              )}
            />
            {errors.confirm && (<Typography color='error'>{errors.confirm.message}</Typography>)}
            <Box textAlign='center' margin='10px auto'>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                >Sign up</Button>
            </Box>
        </Form>
    </div>
  )
}

export default SignupForm;