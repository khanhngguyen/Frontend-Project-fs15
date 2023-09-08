import React, { useEffect, useState } from 'react'
import { Box, Button, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

import { useAppSelector } from '../../hooks/useAppSelector'
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { fetchProductsWithConditions, sortProductsByPrice } from '../../redux/reducers/productsReducer';
import { Condition } from '../../types/Condition';
import ProductCard from './ProductCard';

const initialCondition: Condition = {
    price_min: 0,
    price_max: 400,
    offset: 0,
    limit: 15
}

const ProductsGrid = () => {
    const [conditions, setConditions] = useState<Condition>(initialCondition);
    const [price, setPrice] = useState('');
    const [perPage, setPerPage] = useState('15');
    const [order, setOrder] = useState('');
    const { productsWithConditions, loading, error } = useAppSelector(state => state.productsReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchProductsWithConditions(conditions));
    }, [])

    //functions to next/prev pages
    const limit = 15;
    const toNextPage = () => {
        const nextOffset = conditions.offset + limit
        setConditions({...conditions, offset: nextOffset})
        dispatch(fetchProductsWithConditions({...conditions, offset: nextOffset}));
    }
    const toPrevPage = () => {
        if (conditions.offset < limit) return
        else {
            const prevOffset = conditions.offset - limit;
            setConditions({...conditions, offset: prevOffset})
            dispatch(fetchProductsWithConditions({...conditions, offset: prevOffset}));
        }
    }

    //function to handle filter by prices range
    const handleSetPrice = (e: SelectChangeEvent<string>) => {
        setPrice(e.target.value);
        const value = e.target.value;
        switch(value) {
            case '0 - 400':
                setConditions({...conditions, price_min: 0, price_max: 400, offset: 0});
                dispatch(fetchProductsWithConditions({...conditions, price_min: 0, price_max: 400, offset: 0}));
                break;
            case '400 - 700':
                setConditions({...conditions, price_min: 400, price_max: 700, offset: 0});
                dispatch(fetchProductsWithConditions({...conditions, price_min: 400, price_max: 700, offset: 0}));
                break;
            case '700 - 1000':
                setConditions({...conditions, price_min: 700, price_max: 1000, offset: 0});
                dispatch(fetchProductsWithConditions({...conditions, price_min: 700, price_max: 1000, offset: 0}));
                break;
            case '1000 - 1500':
                setConditions({...conditions, price_min: 1000, price_max: 1500, offset: 0});
                dispatch(fetchProductsWithConditions({...conditions, price_min: 1000, price_max: 1500, offset: 0}));
                break;
            case '1500 - 2000':
                setConditions({...conditions, price_min: 1500, price_max: 2000, offset: 0});
                dispatch(fetchProductsWithConditions({...conditions, price_min: 1500, price_max: 2000, offset: 0}));
                break;
        }
    }

    //function to set order by prices
    const handleSetOrder= (e: SelectChangeEvent<string>) => {
        setOrder(e.target.value);
        dispatch(sortProductsByPrice(e.target.value));
    }

    //function to set limit products per page
    const handleSetPerPage = (e: SelectChangeEvent<string>) => {
        setPerPage(e.target.value);
        setConditions({...conditions, limit: Number(e.target.value)});
        dispatch(fetchProductsWithConditions({...conditions, limit: Number(e.target.value)}));
    }

    return (
    <div>
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                gap: '10px'
            }}
        >
            <InputLabel>Filter by prices range:</InputLabel>
            <Select
                value={price}
                onChange={handleSetPrice}
                >
                <MenuItem value={'0 - 400'}>0 - 400</MenuItem>
                <MenuItem value={'400 - 700'}>400 - 700</MenuItem>
                <MenuItem value={'700 - 1000'}>700 - 1000</MenuItem>
                <MenuItem value={'1000 - 1500'}>1000 - 1500</MenuItem>
                <MenuItem value={'1500 - 2000'}> &gt; 1500</MenuItem>
            </Select>
            <InputLabel>Sort by price:</InputLabel>
            <Select
                value={order}
                onChange={handleSetOrder}
            >
                <MenuItem value={'Low to high'}>Low to high</MenuItem>
                <MenuItem value={'High to low'}>High to low</MenuItem>
            </Select>
            <InputLabel>Products per page:</InputLabel>
            <Select
                value={perPage}
                onChange={handleSetPerPage}
            >
                <MenuItem value={'12'}>12</MenuItem>
                <MenuItem value={'15'}>15</MenuItem>
                <MenuItem value={'18'}>18</MenuItem>
                <MenuItem value={'21'}>21</MenuItem>
            </Select>
        </Box>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <Grid container>
            <Grid
                item
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '20px',
                    justifyContent: 'space-between'
                }}
            >
                {productsWithConditions.map(product => (
                    <ProductCard key={product.id} product={product}/>
                ))}
            </Grid>
        </Grid>
        <Box textAlign='center'>
            <Button variant='outlined' onClick={toPrevPage}>Prev</Button>
            <Button variant='outlined' onClick={toNextPage}>Next</Button>
        </Box>
    </div>
  )
}

export default ProductsGrid