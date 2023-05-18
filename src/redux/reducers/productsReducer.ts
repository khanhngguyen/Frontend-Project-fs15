import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { Product } from "../../types/Product";

const initialState: Product[] = [];

export const fetchProducts = createAsyncThunk(
    'fetchProducts',
    async () => {
        try {
            const response = await axios.get<Product[]>('https://api.escuelajs.co/api/v1/products');
            console.log(response.data);
            return response.data;
        } catch (e) {
            const error = e as AxiosError;
            if (error.request) {
                console.log('error in request: ', error.request);
            }
        }
    }
)

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (build) => {
        build.addCase(fetchProducts.fulfilled, (state, action) => {
            if (action.payload) {
                return action.payload;
            }
        })
    }
})

const productsReducer = productsSlice.reducer;
export default productsReducer;