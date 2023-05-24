import React from 'react'
import { AddShoppingCart, MoreVert, ReadMore } from '@mui/icons-material'
import { Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Link, Typography } from '@mui/material'
import { Product } from '../../types/Product'

interface ProductCardProps {
    product: Product
}

const ProductCard = (props: ProductCardProps) => {
  return (
    <Card sx={{ maxWidth: 330, display: 'inline-block' }}>
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
            <IconButton aria-label='add to cart'>
                <AddShoppingCart />
                <Typography variant='body1' color='text.primary'>Add to cart</Typography>
            </IconButton>
            <Link href="#" underline="none" marginLeft='auto'>
                Seemore
                <IconButton>
                    <ReadMore fontSize='large'/>
                </IconButton>
            </Link>
        </CardActions>
    </Card>
  )
}

export default ProductCard