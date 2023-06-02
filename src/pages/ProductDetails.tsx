import React, { useState } from 'react'
import { Link, useLoaderData, useParams } from 'react-router-dom'
import axios, { AxiosError } from 'axios';
import { Alert, Box, Button, Card, CardContent, CardHeader, CardMedia, IconButton, ImageList, ImageListItem, Snackbar, Typography } from '@mui/material';
import { AddShoppingCart, ArrowBack } from '@mui/icons-material';

import { Product } from '../types/Product';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { addToCart } from '../redux/reducers/cartReducer';

const ProductDetails = () => {
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const product = useLoaderData() as Product;
  const dispatch = useAppDispatch();

  //function to add product into cart
  const handleAddToCart = () => {
    dispatch(addToCart(product));
  }
  //show alert when add to cart successfully
  const handleOpen = () => setOpen(true);
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpen(false);
    };

  return (
    <div>
      <Box padding='0 20px'>
        <Link to='/products'>
            <Button variant='outlined'>
                <IconButton><ArrowBack color='primary' /></IconButton>
                Back
            </Button>
        </Link>
    </Box>
      {id &&
        <Card sx={{ padding: '10px 20px'}}>
          <CardHeader
            title={product.title}
            subheader={product.price}
            action={
                <IconButton
                  aria-label='add to cart'
                  onClick={() => {
                    handleAddToCart();
                    handleOpen();
                  }}
                >
                    <AddShoppingCart />
                </IconButton>
            }
          />
          <CardMedia>
            <ImageList variant="masonry" cols={3} gap={8}>
              {product.images.map(image => (
                <ImageListItem key={image}>
                  <img
                    src={`${image}?w=248&fit=crop&auto=format`}
                    srcSet={`${image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt='product'
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </CardMedia>
          <CardContent>
            <Typography>
              Description: {product.description}
            </Typography>
            <Typography>
              Category: {product.category.name}
            </Typography>
            <Typography>
              Date created: {product.creationAt}
            </Typography>
          </CardContent>
        </Card>
      }
      <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
            <Alert severity="success">
                Product added to cart successfully!
            </Alert>
        </Snackbar>
        {/* {id && (<p>{product.title}: {product.price}</p>)} */}
    </div>
  )
}

export default ProductDetails;

//loader function
export const productDetailsLoader = async({ params }: any) => {
 const { id } = params;
 try {
  const response = await axios.get<Product>(`https://api.escuelajs.co/api/v1/products/${id}`);
  return response.data;
 } catch (e) {
  const error = e as AxiosError;
  return error.message;
 }
}