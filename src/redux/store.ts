import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "./reducers/productsReducer";
import cartReducer from "./reducers/cartReducer";
import userReducer from "./reducers/userReducer";

const store = configureStore({
    reducer: {
        productsReducer,
        cartReducer,
        userReducer
    }
})

export type GlobalState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;