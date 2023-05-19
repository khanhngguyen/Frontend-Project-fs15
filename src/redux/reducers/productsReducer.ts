import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { Product } from "../../types/Product";

// const initialState: Product[] = [];
const initialState: {
    products: Product[],
    loading: boolean,
    error: string
} = {
    products: [],
    loading: false,
    error: '',
}

export const fetchProducts = createAsyncThunk(
    'fetchProducts',
    async (offset: number = 0) => {
        try {
            const response = await axios.get<Product[]>(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=10`);
            console.log('fetchProducts run');
            return response.data;
        } catch (e) {
            const error = e as AxiosError;
            return error;
        }
    }
)

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
    },
    extraReducers: (build) => {
        build.addCase(fetchProducts.fulfilled, (state, action) => {
            if (action.payload instanceof AxiosError) {
                state.error = action.payload.message;
                state.loading = false;
            } else {
                state.products = action.payload;
                state.loading = false;
            }
        })
        .addCase(fetchProducts.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            state.error = 'can not fetch data';
            state.loading = false;
        })
    }
})

// export const { nextPage } = productsSlice.actions;
const productsReducer = productsSlice.reducer;
export default productsReducer;