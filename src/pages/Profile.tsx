import React from 'react'
import { Box, Button, IconButton, Typography } from '@mui/material';
import { ArrowRightAlt } from '@mui/icons-material';

import { useAppSelector } from '../hooks/useAppSelector'
import { useAppDispatch } from '../hooks/useAppDispatch';
import { logOut } from '../redux/reducers/userReducer';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();
    const { currentUser } = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();
    const handleLogOut = () => {
        dispatch(logOut());
        navigate('/');
    }
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
        gap: '30px'
      }}
    >
        <Typography>
            Hi {currentUser?.name}, you are currently logged in.
        </Typography>
        <Typography>
            <Button
                href='/'
                variant='outlined'
            >
                Back to Home
                <IconButton><ArrowRightAlt color='primary' /></IconButton>
            </Button>
        </Typography>
        <Typography>Or</Typography>
        <Button
            variant='outlined'
            onClick={handleLogOut}
        >Log out</Button>
    </Box>
  )
}

export default Profile