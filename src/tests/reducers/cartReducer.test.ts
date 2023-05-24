import productServer from "../servers/productServer";

import { addToCart, emptyCart, removeFromCart, subtractQuantity } from "../../redux/reducers/cartReducer"
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
    test('Check if a product is already added to cart, if yes, only update quantity', () => {
        store.dispatch(addToCart(product1));
        store.dispatch(addToCart(product2));
        store.dispatch(addToCart(product1));
        expect(store.getState().cartReducer.totalQuantity).toBe(3);
        expect(store.getState().cartReducer.cart.find(item => item.id === product1.id)?.quantity).toBe(2);
        expect(store.getState().cartReducer.cart.find(item => item.id === product2.id)?.quantity).toBe(1);
    })
    test('Check if a producft is subtracted from cart', () => {
        store.dispatch(addToCart(product1));
        store.dispatch(addToCart(product2));
        store.dispatch(addToCart(product1));
        expect(store.getState().cartReducer.totalQuantity).toBe(3);
        store.dispatch(subtractQuantity(product1.id));
        expect(store.getState().cartReducer.totalQuantity).toBe(2);
        expect(store.getState().cartReducer.cart.find(item => item.id === product1.id)?.quantity).toBe(1);        
    })
    test('Check when a product with quantity 1 is subtracted from cart, it will longer exist in cart', () => {
        store.dispatch(addToCart(product1));
        store.dispatch(removeFromCart(product1.id));
        expect(store.getState().cartReducer.totalQuantity).toBe(0);
        expect(store.getState().cartReducer.cart.find(item => item.id === product1.id)).toBe(undefined);        
    })
    test('Check if cart total price correct when products have different quantites', () => {
        store.dispatch(addToCart(product1));
        store.dispatch(addToCart(product2));
        store.dispatch(addToCart(product1));
        expect(store.getState().cartReducer.totalPrice).toBe(500);
    })
})