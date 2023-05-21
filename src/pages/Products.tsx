import React, { useState } from 'react'
import { Button, Grid, Typography, Card } from '@mui/material';
import { useAppSelector } from '../hooks/useAppSelector'
import { useAppDispatch } from '../hooks/useAppDispatch';
import { fetchProducts } from '../redux/reducers/productsReducer';
import useDebounce from '../hooks/useDebounce';
import { Product } from '../types/Product';
import ProductsGrid from '../components/ProductsGrid';

const getFilteredList = (products: Product[], search: string) => {
    return products.filter(product => product.title.toLowerCase().includes(search.toLowerCase()))
}

const Products = () => {
    const [offset, setOffset] = useState(0);
    const [search, setSearch] = useState('');
    const { products, loading, error } = useAppSelector(state => state.productsReducer);
    const dispatch = useAppDispatch();

    //functions to next/prev pages
    const limit = 10;
    const toNextPage = () => {
        setOffset(offset => offset + limit);
        dispatch(fetchProducts(offset + limit));
    }
    const toPrevPage = () => {
        if (offset < limit) return
        else {
            setOffset(offset - limit);
            dispatch(fetchProducts(offset - limit));
        }
    }

    //functions to search a product by title
    const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }
    const debouncedValue = useDebounce(search, 500);
    const filteredProducts = getFilteredList(products, debouncedValue);
  return (
    <div>
        <Typography>Product</Typography>
        <input 
            type='text'
            placeholder='Search product by name'
            value={search}
            onChange={handleSearchInput}
        />
        <button>Search</button>
        <p>Search input: {search}</p>
        <p>Debounced value: {debouncedValue}</p>
        <Button>Sort by categories</Button>
        <Button>Sort by price</Button>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <ProductsGrid />
        {/* {products.map(product => (
            <p key={product.id}>{product.title}: {product.description}</p>
        ))} */}

        {/* <Grid container spacing={2}>
            {filteredProducts.map(product => (
                <Grid item>
                    <Card key={product.id}>
                        {product.title}: {product.description}
                    </Card>
                </Grid>
        ))}
        </Grid> */}
        {/* {filteredProducts.map(product => (
            <p key={product.id}>{product.title}: {product.description}</p>
        ))} */}
        <button onClick={toPrevPage}>Prev</button>
        <button onClick={toNextPage}>Next</button>
    </div>
  )
}

export default Products