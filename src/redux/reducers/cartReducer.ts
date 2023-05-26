import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Product, ProductWithQuantity } from "../../types/Product";

const initialState: {
    cart: ProductWithQuantity[]
    totalQuantity: number,
    totalPrice: number
} = {
    cart: [],
    totalQuantity: 0,
    totalPrice: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            const isExisted = state.cart.find((item) => item.id === action.payload.id);
            //if product already exists in cart
            if (isExisted) {
                isExisted.quantity++;
                // console.log('product existed in cart, update quantity');
            } else {
                //product is not yet in cart
                state.cart.push({...action.payload, quantity: 1});
                // console.log('added new product');
            }
            state.totalQuantity++;
            state.totalPrice += action.payload.price;
        },
        emptyCart: (state) => {
            state.cart = [];
            state.totalPrice = 0;
            state.totalQuantity = 0;
        },
        addQuantity: (state, action: PayloadAction<number>) => {
            const isExisted = state.cart.find(item => item.id === action.payload);
            if (!isExisted) {
                return;
            } else {
                isExisted.quantity++;
                state.totalQuantity++;
                state.totalPrice += isExisted.price;
                // console.log(isExisted.quantity);
            }
        },
        subtractQuantity: (state, action: PayloadAction<number>) => {
            const isExisted = state.cart.find(item => item.id === action.payload);
            if (!isExisted) {
                return;
            } else {
                if (isExisted.quantity === 1) {
                    state.cart = state.cart.filter(item => item.id !== action.payload);
                } else {
                    isExisted.quantity--;
                }
                state.totalQuantity--;
                state.totalPrice -= isExisted.price;
                // console.log(isExisted.quantity);
            }
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            const isExisted = state.cart.find(item => item.id === action.payload);
            if (!isExisted) {
                return;
            } else {
                state.totalQuantity -= isExisted.quantity;
                state.totalPrice = isExisted.price * isExisted.quantity;
                state.cart = state.cart.filter(item => item.id !== action.payload);
            }
        }
    }
})

export const { addToCart, emptyCart, addQuantity, subtractQuantity, removeFromCart } = cartSlice.actions;
const cartReducer = cartSlice.reducer;
export default cartReducer;