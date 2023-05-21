import { AppBar, Box, Button, Container, CssBaseline, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div>
        <CssBaseline />
        <Box component="header">
            <AppBar component='nav' position='sticky'>
                <Toolbar>
                    <Typography
                        variant="h4"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        >
                    Welcome
                    </Typography>
                    <NavLink to='/'>
                        <Button sx={{ color: '#fff' }}>Home</Button>
                    </NavLink>
                    <NavLink to='products'>
                        <Button sx={{ color: '#fff' }}>Products</Button>
                    </NavLink>
                    <NavLink to='cart'>
                        <Button sx={{ color: '#fff' }}>Cart</Button>
                    </NavLink>
                    <NavLink to='user'>
                        <Button sx={{ color: '#fff' }}>Register/Log in</Button>
                    </NavLink>
                    {/* <NavLink to='product'>Product</NavLink>
                    <NavLink to='user'>User</NavLink> */}
                </Toolbar>
            </AppBar>
        </Box>
        <Container maxWidth='lg'>
            <Box sx={{ bgcolor: '#cfe8fc', height: '100%' }}>
                <Outlet />
            </Box>
        </Container>
        <Box component='footer'>
            <AppBar component='nav' position='sticky'>
                {/* <NavLink to='/'>Home</NavLink>
                <NavLink to='product'>Product</NavLink>
                <NavLink to='user'>User</NavLink> */}
                <Toolbar sx={{ justifyContent: 'center' }}>
                    <Link to='/'>
                        <Button sx={{ color: '#fff' }}>Home</Button>
                    </Link>
                    <Link to='products'>
                        <Button sx={{ color: '#fff' }}>Products</Button>
                    </Link>
                    <Link to='user'>
                        <Button sx={{ color: '#fff' }}>User</Button>
                    </Link>
                </Toolbar>
            </AppBar>
        </Box>
    </div>
  )
}

export default RootLayout