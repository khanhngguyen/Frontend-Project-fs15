import React, { useEffect, useState } from 'react'

import { useAppSelector } from '../hooks/useAppSelector'
import { useAppDispatch } from '../hooks/useAppDispatch';
import { fetchCategories, fetchProductsByCategory, fetchProductsWithConditions } from '../redux/reducers/productsReducer';
import { InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { Condition } from '../types/Condition';
import { Link } from 'react-router-dom';

const initialCondition: Condition = {
    price_min: 0,
    price_max: 400,
    offset: 0
}
const ProductsGrid = () => {
    const [conditions, setConditions] = useState<Condition>(initialCondition);
    const [categoryOptions, setCategoryOptions] = useState(1);
    const { productsWithConditions, loading, error, categories } = useAppSelector(state => state.productsReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchProductsWithConditions(conditions));
    }, [])

    useEffect(() => {
        dispatch(fetchCategories());
    }, [])

    //functions to next/prev pages
    const limit = 10;
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

    //function to handle sort by categories
    const handleCategoriesChange = (e: SelectChangeEvent<string>) => {
        setCategoryOptions(Number(e.target.value));
        dispatch(fetchProductsByCategory(Number(e.target.value)));
    }

    //function to handle filter by prices range
    const handlePricesChange = (e: SelectChangeEvent<string>) => {
        const value = e.target.value;
        switch(value) {
            case '0 - 400':
                setConditions({price_min: 0, price_max: 400, offset: 0});
                dispatch(fetchProductsWithConditions({price_min: 0, price_max: 400, offset: 0}));
                break;
            case '400 - 700':
                setConditions({price_min: 400, price_max: 700, offset: 0});
                dispatch(fetchProductsWithConditions({price_min: 400, price_max: 700, offset: 0}));
                break;
            case '700 - 1000':
                setConditions({price_min: 700, price_max: 1000, offset: 0});
                dispatch(fetchProductsWithConditions({price_min: 700, price_max: 1000, offset: 0}));
                break;
            case '1000 - 1500':
                setConditions({price_min: 1000, price_max: 1500, offset: 0});
                dispatch(fetchProductsWithConditions({price_min: 1000, price_max: 1500, offset: 0}));
                break;
            case '1500 - 2000':
                setConditions({price_min: 1500, price_max: 2000, offset: 0});
                dispatch(fetchProductsWithConditions({price_min: 1500, price_max: 2000, offset: 0}));
                break;
        }
    }

    return (
    <div>
        <Typography>Products</Typography>
        <Typography>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi impedit pariatur numquam dolorum repudiandae dolores neque tempore officiis perspiciatis quisquam, esse sapiente molestias provident porro! Doloremque esse culpa rem magnam?</Typography>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <InputLabel>Sort by categories</InputLabel>
        <Select
            value={categoryOptions.toString()}
            onChange={handleCategoriesChange}
        >
            {categories && categories.map(category => (
                <MenuItem
                    key={category.id}
                    value={category.id}
                >{category.name}</MenuItem>
            ))}
        </Select>
        <InputLabel>Filter by prices range</InputLabel>
        <Select
            value={`${conditions.price_min} - ${conditions.price_max}`}
            onChange={handlePricesChange}
        >
            <MenuItem value={'0 - 400'}>0 - 400</MenuItem>
            <MenuItem value={'400 - 700'}>400 - 700</MenuItem>
            <MenuItem value={'700 - 1000'}>700 - 1000</MenuItem>
            <MenuItem value={'1000 - 1500'}>1000 - 1500</MenuItem>
            <MenuItem value={'1500 - 2000'}> &gt; 1500</MenuItem>
        </Select>
        {productsWithConditions.map(product => (
            <Link
                key={product.id}
                to={product.id.toString()}
            >
                <p>Tittle: {product.title} - {product.description}</p>
                <p>Price: {product.price}</p>
                <p>Categories: {product.category.name}</p>
            </Link>
            // <p key={product.id}>{product.title}: {product.description}</p>
        ))}
        <button onClick={toPrevPage}>Prev</button>
        <button onClick={toNextPage}>Next</button>
    </div>
  )
}

export default ProductsGrid