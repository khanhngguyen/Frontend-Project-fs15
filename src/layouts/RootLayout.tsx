import React from 'react'
import { Facebook, Instagram, LinkedIn, ShoppingCart, Twitter, YouTube } from '@mui/icons-material'
import { AppBar, Badge, Box, Button, Container, CssBaseline, IconButton, Toolbar, Typography } from '@mui/material'
import { Link, NavLink, Outlet } from 'react-router-dom'

import { useAppSelector } from '../hooks/useAppSelector'

const RootLayout = () => {
    const { totalQuantity } = useAppSelector(state => state.cartReducer);
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
                        <Button sx={{ color: '#fff' }}>
                            Cart
                            <Badge badgeContent={totalQuantity} color="secondary">
                                <ShoppingCart />
                            </Badge>
                        </Button>
                    </NavLink>
                    <NavLink to='user'>
                        <Button sx={{ color: '#fff' }}>Log in | Sign up</Button>
                    </NavLink>
                    {/* <NavLink to='product'>Product</NavLink>
                    <NavLink to='user'>User</NavLink> */}
                </Toolbar>
            </AppBar>
        </Box>
        <Container maxWidth='lg'>
            <Box sx={{ bgcolor: '#cfe8fc', height: '100%', minHeight: '100vh', pb: 7}}>
                <Outlet />
            </Box>
        </Container>
        <Box component='footer'>
            <AppBar component='nav' position='sticky'>
                {/* <NavLink to='/'>Home</NavLink>
                <NavLink to='product'>Product</NavLink>
                <NavLink to='user'>User</NavLink> */}
                <Toolbar sx={{ margin: '0 30px'}}>
                    <Link to='/'>
                        <Button sx={{ color: '#fff' }}>Home</Button>
                    </Link>
                    <Link to='products'>
                        <Button sx={{ color: '#fff' }}>Products</Button>
                    </Link>
                    <Link to='user'>
                        <Button sx={{ color: '#fff' }}>User</Button>
                    </Link>
                    <Box ml='auto'>
                        <IconButton><Twitter sx={{ color: 'white' }}/></IconButton>
                        <IconButton><Instagram sx={{ color: 'white' }}/></IconButton>
                        <IconButton><Facebook sx={{ color: 'white' }}/></IconButton>
                        <IconButton><YouTube sx={{ color: 'white' }}/></IconButton>
                        <IconButton><LinkedIn sx={{ color: 'white' }}/></IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    </div>
  )
}

export default RootLayout