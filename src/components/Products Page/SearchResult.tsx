import React from 'react'

import { Product } from '../../types/Product'
import { Card, CardActions, CardContent, IconButton, Link, Typography } from '@mui/material'
import { ReadMore } from '@mui/icons-material'

interface SearchResultProps {
    product: Product
}

const SearchResult = (props: SearchResultProps) => {
  return (
    <div>
        <Card
            variant='outlined'
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                margin: '5px auto'
            }}
        >
            <CardContent>
                <Typography>
                    Product name: {props.product.title}
                </Typography>
                <Typography variant='subtitle2'>
                    Price: {props.product.price}€
                </Typography>
                <Typography variant='body2'>
                    {props.product.description}
                </Typography>
                <Typography variant='subtitle2'>
                    Category: {props.product.category.name}
                </Typography>
            </CardContent>
            <CardActions>
               <Link href={'products/' + props.product.id.toString()} underline="none" fontSize='14px'>
                More details
                <IconButton>
                    <ReadMore fontSize='large'/>
                </IconButton>
                </Link>
            </CardActions>
        </Card>
    </div>
  )
}

export default SearchResult