import { Box, Button, InputLabel, TextField } from '@mui/material';
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import registrationSchema, { RegistrationFormData } from '../validations/registrationSchema';
import GoogleLoginButton from '../components/User Page/GoogleLogin';

const User = () => {
  const { handleSubmit, control, formState: { errors } } = useForm<RegistrationFormData>({
    resolver: yupResolver(registrationSchema)
  });
  const onSubmit = (data: RegistrationFormData) => {

  }
  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name='username'
          render={({ field: { onChange, value }}) => (
            <>
            <InputLabel htmlFor='username'>Username:</InputLabel>
            <TextField
              placeholder='Username'
              onChange={onChange}
            >
            </TextField>
            </>
          )}
        />
        {errors.username && (<p>{errors.username.message}</p>)}
        <Controller
          control={control}
          name='email'
          render={({ field: { onChange, value }}) => (
            <>
            <InputLabel htmlFor='email'>Email:</InputLabel>
            <TextField
              placeholder='Email'
              type='email'
              onChange={onChange}
            >
            </TextField>
            </>
          )}
        />
        <Controller
          control={control}
          name='password'
          render={({ field: { onChange, value }}) => (
            <>
            <InputLabel htmlFor='password'>Password:</InputLabel>
            <TextField
              placeholder='Password'
              type='password'
              onChange={onChange}
            >
            </TextField>
            </>
          )}
        />
        <Controller
          control={control}
          name='confirm'
          render={({ field: { onChange, value }}) => (
            <>
            <InputLabel htmlFor='confirm'>Confirm password:</InputLabel>
            <TextField
              placeholder='Type in your password again'
              type='password'
              onChange={onChange}
            >
            </TextField>
            </>
          )}
        />
        <Button type='submit'>Register</Button>
      </form>
      <GoogleLoginButton />
    </Box>
  )
}

export default User