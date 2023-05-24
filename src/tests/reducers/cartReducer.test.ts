import productServer from "../servers/productServer";

import { addToCart, emptyCart } from "../../redux/reducers/cartReducer"
import store from "../../redux/store"
import { product1, product2 } from "../data/products";

beforeEach(() => {
    store.dispatch(emptyCart());
})

beforeAll(() => {
    productServer.listen();
})

afterAll(() => {
    productServer.close();
})

describe('Test cartReducer', () => {
    test('Check cart initial state', () => {
        expect(store.getState().cartReducer).toEqual({
            cart: [],
            totalQuantity: 0,
            totalPrice: 0
        })
    })
    test('Check if a new product is added to cart using addToCart', () => {
        store.dispatch(addToCart(product1));
        store.dispatch(addToCart(product2));
        expect(store.getState().cartReducer.totalQuantity).toBe(2);
    })
    test('Check if a productt is already added to cart, if yes, only update quantity', () => {
        store.dispatch(addToCart(product1));
        store.dispatch(addToCart(product2));
        store.dispatch(addToCart(product1));
        expect(store.getState().cartReducer.totalQuantity).toBe(3);
        expect(store.getState().cartReducer.cart.find(item => item.id === product1.id)?.quantity).toBe(2);
        expect(store.getState().cartReducer.cart.find(item => item.id === product2.id)?.quantity).toBe(1);
    })
})