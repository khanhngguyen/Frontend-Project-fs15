import React, { useState } from 'react'
import { useAppSelector } from '../hooks/useAppSelector'
import { Button, Typography } from '@mui/material';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { fetchProducts } from '../redux/reducers/productsReducer';

const Product = () => {
    const [offset, setOffset] = useState(0);
    const { products, loading, error } = useAppSelector(state => state.productsReducer);
    const dispatch = useAppDispatch();
    const toNextPage = () => {
        setOffset(offset => offset + 10);
        dispatch(fetchProducts(offset + 10));
    }
    const toPrevPage = () => {
        if (offset < 10) return
        else {
            setOffset(offset - 10);
            dispatch(fetchProducts(offset - 10));
        }
    }
  return (
    <div>
        <Typography>Product</Typography>
        <input type='text' placeholder='Search product by name'/>
        <Button>Sort by categories</Button>
        <Button>Sort by price</Button>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {products.map(product => (
            <p key={product.id}>{product.title}: {product.description}</p>
        ))}
        <button onClick={toPrevPage}>Prev</button>
        <button onClick={toNextPage}>Next</button>
    </div>
  )
}

export default Product