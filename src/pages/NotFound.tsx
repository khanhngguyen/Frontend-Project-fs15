import React from 'react'
import { Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Typography variant='h4'>404</Typography>
      <Typography variant='h6'>The page you're looking for does not exist</Typography>
      <Typography>
        Back to <Link to='/'>Home</Link>
      </Typography>
    </Box>
  )
}

export default NotFound