import React from 'react'
import { Grid, Paper } from '@mui/material';

import LoginForm from '../components/LoginSignupPage/LoginForm';
import SignupForm from '../components/LoginSignupPage/SignupForm';

const LogIn = () => {
  const paperStyle = { padding: '30px 20px', width: 500, margin: '20px auto' };

  return (
    <Grid>
      <Paper style={paperStyle} elevation={3}>
        <Grid>
          {/* Sign in Form */}
          <LoginForm />
          {/* Sign up Form */}
          <SignupForm />
        </Grid>
      </Paper>
    </Grid>
  )
}

export default LogIn;
