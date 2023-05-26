import React, { useState } from 'react'
import { AddShoppingCart, MoreVert, ReadMore } from '@mui/icons-material'
import { Alert, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Link, Snackbar, Typography } from '@mui/material'

import { Product } from '../../types/Product'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { addToCart } from '../../redux/reducers/cartReducer'
// import { useAppSelector } from '../../hooks/useAppSelector'

interface ProductCardProps {
    product: Product
}

const ProductCard = (props: ProductCardProps) => {
    const [open, setOpen] = useState(false);
    // const { cart, totalQuantity, totalPrice } = useAppSelector(state => state.cartReducer);
    const dispatch = useAppDispatch();

    //functions: add product to cart & show alert on success
    const handleAddToCart = () => {
        dispatch(addToCart(props.product));
        // console.log(cart, totalQuantity, totalPrice);
    }
    const handleOpen = () => setOpen(true);
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpen(false);
    };

  return (
    <Card sx={{ width: 330, display: 'inline-block' }}>
        <CardHeader
            sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
            action={
                <IconButton aria-label='settings'>
                    <MoreVert />
                </IconButton>
            }
            title={props.product.title}
            subheader={'Price: ' + props.product.price}
        />
        <CardMedia
            component='img'
            height='194'
            image={props.product.images[0]}
            alt='Product image'
        />
        <CardContent 
            sx={{ height: 124 }}
        >
            <Typography variant='body1' color='text.primary'>
                {props.product.description}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
                {'Category: ' + props.product.category.name}
            </Typography>
        </CardContent>
        <CardActions disableSpacing>
            <IconButton
                aria-label='add to cart'
                onClick={() => {
                    handleAddToCart();
                    handleOpen();
                }}
            >
                <AddShoppingCart />
                <Typography variant='body1' color='text.primary'>Add to cart</Typography>
            </IconButton>
            <Link href={'products/' + props.product.id.toString()} underline="none" marginLeft='auto'>
                See more
                <IconButton>
                    <ReadMore fontSize='large'/>
                </IconButton>
            </Link>
        </CardActions>
        <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
            <Alert severity="success">
                Product added to cart successfully!
            </Alert>
        </Snackbar>
    </Card>
  )
}

export default ProductCard