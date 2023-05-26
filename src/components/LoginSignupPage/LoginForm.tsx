import React from 'react'
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
import { Form, useNavigate } from 'react-router-dom';

import loginSchema, { LoginFormData } from '../../validations/loginSchema';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { login } from '../../redux/reducers/userReducer';
import GoogleLoginButton from './GoogleLogin';

const LoginForm = () => {
    const { handleSubmit, control, formState: { errors } } = useForm<LoginFormData>({
        resolver: yupResolver(loginSchema)
    })
    const navigate = useNavigate();
    const handleLogin = (data: LoginFormData) => {
        // console.log(data);
        dispatch(login({
          email: data.email,
          password: data.password
        }))
        navigate('/profile');
    }
    // const { users } = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();
  return (
    <div>
        <Typography
            variant='h5'
            component='h5'
            textAlign='center'
          >Sign in</Typography>
          <Form onSubmit={handleSubmit(handleLogin)}>
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
            <Box textAlign='center' margin='10px auto'>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                >Sign in</Button>
            </Box>
          </Form>
          <Typography textAlign='center' margin='10px auto'>Or</Typography>
          <GoogleLoginButton />
    </div>
  )
}

export default LoginForm