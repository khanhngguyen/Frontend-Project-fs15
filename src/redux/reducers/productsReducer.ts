import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { Category, Product } from "../../types/Product";
import { Condition } from "../../types/Condition";
import { NewProduct } from "../../types/NewProduct";

const initialState: {
    products: Product[],
    productsWithConditions: Product[],
    categories: Category[],
    loading: boolean,
    error: string
} = {
    products: [],
    productsWithConditions: [],
    categories: [],
    loading: false,
    error: '',
}

export const fetchAllProducts = createAsyncThunk(
    'fetchAllProducts',
    async () => {
        try {
            const response = await axios.get<Product[]>('https://api.escuelajs.co/api/v1/products');
            console.log('fetchAllProducts run');
            return response.data;
        } catch (e) {
            const error = e as AxiosError;
            return error;
        }
    }
)

export const fetchProductsWithConditions = createAsyncThunk(
    'fetchProductsWithConditions',
    async ({price_min = 0, price_max = 2000, offset = 0} : Condition) => {
        try {
            const response = await axios.get<Product[]>(`https://api.escuelajs.co/api/v1/products/?price_min=${price_min}&price_max=${price_max}&offset=${offset}&limit=15`);
            console.log('fetchProductsWithConditions run');
            console.log(`https://api.escuelajs.co/api/v1/products/?price_min=${price_min}&price_max=${price_max}&offset=${offset}&limit=15`);
            return response.data;
        } catch (e) {
            const error = e as AxiosError;
            return error;
        }
    }
)

export const fetchCategories = createAsyncThunk(
    'fetchCategories',
    async () => {
        try {
            const response = await axios.get<Category[]>('https://api.escuelajs.co/api/v1/categories');
            return response.data;
        } catch (e) {
            const error = e as AxiosError;
            return error;
        }
    }
)

export const fetchProductsByCategory = createAsyncThunk(
    'fetchProductsByCategory',
    async (category: number) => {
        try {
            const response = await axios.get<Product[]>(`https://api.escuelajs.co/api/v1/categories/${category}/products`);
            return response.data;
        } catch (e) {
            const error = e as AxiosError;
            return error;
        }
    }
)

// export const getProductDetails = createAsyncThunk(
//     'getProductDetails',
//     async (id: string) => {
//         try {
//             const response = await axios.get<Product>(`https://api.escuelajs.co/api/v1/products/${id}`);
//             return response.data;
//         } catch (e) {
//             const error = e as AxiosError;
//             return error;
//         }
//     }
// )

export const createNewProduct = createAsyncThunk(
    'createNewProduct',
    async (product: NewProduct) => {
        try {
            const response = await axios.post<Product>('https://api.escuelajs.co/api/v1/products/', product);
            return response.data;
        } catch (e) {
            const error = e as AxiosError;
            if (error.response) {
                return JSON.stringify(error.response.data);
            }
            return error;
        }
    }
)

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        cleanUpProductReducer: (state) => {
            return initialState;
        }
    },
    extraReducers: (build) => {
        build.addCase(fetchAllProducts.fulfilled, (state, action) => {
            if (action.payload instanceof AxiosError) {
                state.error = action.payload.message;
                state.loading = false;
            } else {
                state.products = action.payload;
                state.loading = false;
            }
        })
        .addCase(fetchAllProducts.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchAllProducts.rejected, (state, action) => {
            state.error = 'can not fetch data';
            state.loading = false;
        })
        .addCase(fetchProductsWithConditions.fulfilled, (state, action) => {
            if (action.payload instanceof AxiosError) {
                state.error = action.payload.message;
                state.loading = false;
            } else {
                state.productsWithConditions = action.payload;
                state.loading = false;
            }
        })
        .addCase(fetchProductsWithConditions.rejected, () => {
            console.log('can not fetch data');
        })
        .addCase(fetchCategories.fulfilled, (state, action) => {
            if (action.payload instanceof AxiosError) {
                state.categories = [];
            } else {
                state.categories = action.payload;
                console.log(state.categories);
            }
        })
        .addCase(fetchCategories.rejected, () => {
            console.log('can not fetch categories');
        })
        .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
            if (action.payload instanceof AxiosError) {
                state.error = action.payload.message;
                state.loading = false;
            } else {
                state.productsWithConditions = action.payload;
                state.loading = false;
            }
        })
        .addCase(fetchProductsByCategory.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchProductsByCategory.rejected, (state, action) => {
            state.error = 'can not fetch data';
            state.loading = false;
        })
        .addCase(createNewProduct.fulfilled, (state, action) => {
            if (action.payload instanceof AxiosError) {
                state.error = action.payload.message;
                state.loading = false;
            } else if (typeof action.payload === 'string') {
                state.error = action.payload;
                state.loading = false;
            } else {
                state.products.push(action.payload);
            }
        })
        .addCase(createNewProduct.pending, (state) => {
            state.loading = true;
        })
        .addCase(createNewProduct.rejected, (state, action) => {
            state.error = 'can not create new product';
            state.loading = false;
        })
    }
})

export const { cleanUpProductReducer } = productsSlice.actions;
const productsReducer = productsSlice.reducer;
export default productsReducer;