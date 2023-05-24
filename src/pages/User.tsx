import { Box, Button, Grid, InputLabel, Paper, TextField, Typography } from '@mui/material';
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import registrationSchema, { RegistrationFormData } from '../validations/registrationSchema';
import GoogleLoginButton from '../components/User Page/GoogleLogin';
import { Form } from 'react-router-dom';

const User = () => {
  const { handleSubmit, control, formState: { errors } } = useForm<RegistrationFormData>({
    resolver: yupResolver(registrationSchema)
  });
  const onSubmit = (data: RegistrationFormData) => {

  }

  const paperStyle = { padding: '30px 20px', width: 500, margin: '20px auto' };

  return (
    <Grid>
      <Paper style={paperStyle} elevation={3}>
        <Grid>
          <Typography
            variant='h5'
            component='h5'
            textAlign='center'
          >Sign up</Typography>
          <Typography
            margin='5px 0'
            textAlign='center'
          >Fill in the form to sign up & create a new account</Typography>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              control={control}
              name='username'
              render={({ field: { onChange, value }}) => (
                <>
                <InputLabel htmlFor='username'>Username:</InputLabel>
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
                <InputLabel htmlFor='email'>Email:</InputLabel>
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
            <Controller
              control={control}
              name='password'
              render={({ field: { onChange, value }}) => (
                <>
                <InputLabel htmlFor='password'>Password:</InputLabel>
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
            <Controller
              control={control}
              name='confirm'
              render={({ field: { onChange, value }}) => (
                <>
                <InputLabel htmlFor='confirm'>Confirm password:</InputLabel>
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
            <Box textAlign='center' margin='10px auto'>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                >Sign up</Button>
            </Box>
          </Form>
          <Typography textAlign='center' margin='10px auto'>Or</Typography>
          <Form>
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
        </Grid>
      </Paper>
    </Grid>
  )
}

export default User