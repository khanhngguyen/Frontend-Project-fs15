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
            // const newItem = action.payload;
            // const existingItem = state.cart.find((item) => item.id === newItem.id);
            // state.totalQuantity++;
            // state.totalPrice += newItem.price;
            // if (!existingItem) {
            //     state.cart.push({ ...newItem, quantity: 1 })
            //     console.log('added new item');
            // } else {
            //     existingItem.quantity++
            //     console.log('product exists in cart, updte quantity');
            // }
            const isExisted = state.cart.find((item) => item.id === action.payload.id);
            //if product already exists in cart
            if (isExisted) {
                isExisted.quantity++;
            } else {
                //product is not yet in cart
                state.cart.push({...action.payload, quantity: 1})
                console.log('added new product');
            }
            state.totalQuantity++;
            state.totalPrice += action.payload.price;
        },
        emptyCart: (state) => {
            state.cart = [];
            state.totalPrice = 0;
            state.totalQuantity = 0;
        }
    }
})

export const { addToCart, emptyCart } = cartSlice.actions;
const cartReducer = cartSlice.reducer;
export default cartReducer;