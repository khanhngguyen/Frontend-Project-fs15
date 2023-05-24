import React, { useState } from 'react'
import { TextField, Typography } from '@mui/material';
import { useAppSelector } from '../hooks/useAppSelector'
import useDebounce from '../hooks/useDebounce';
import { Product } from '../types/Product';
import ProductsGrid from '../components/Products Page/ProductsGrid';

const getFilteredList = (products: Product[], search: string) => {
    return products.filter(product => product.title.toLowerCase().includes(search.toLowerCase()))
}

const Products = () => {
    const [search, setSearch] = useState('');
    const { products } = useAppSelector(state => state.productsReducer);

    //functions to search a product by title
    const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }
    const debouncedSearchInput = useDebounce(search, 500);
    const filteredProducts = getFilteredList(products, debouncedSearchInput);

  return (
    <div>
        <Typography variant='h4' py={2}>Products</Typography>
        <Typography variant='subtitle1' pb={3}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi impedit pariatur numquam dolorum repudiandae dolores neque tempore officiis perspiciatis quisquam, esse sapiente molestias provident porro! Doloremque esse culpa rem magnam?</Typography>
        <TextField
            sx={{ width: '400px' }}
            size='small'
            type='text'
            placeholder='Search product by name'
            value={search}
            onChange={handleSearchInput}
        />
        <button>Search</button>
        {/* <p>Search input: {search}</p>
        <p>Debounced value: {debouncedSearchInput}</p> */}
        {debouncedSearchInput && filteredProducts.map(product => (
            <p key={product.id}>{product.title}: {product.description}</p>
        ))}
        <p>----------------------</p>
        <ProductsGrid />
        {/* <Grid container spacing={2}>
            {filteredProducts.map(product => (
                <Grid item>
                    <Card key={product.id}>
                        {product.title}: {product.description}
                    </Card>
                </Grid>
        ))}
        </Grid> */}
    </div>
  )
}

export default Products