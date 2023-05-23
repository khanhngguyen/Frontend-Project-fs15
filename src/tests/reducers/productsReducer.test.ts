import { cleanUpProductReducer, createNewProduct, fetchAllProducts } from "../../redux/reducers/productsReducer"
import store from "../../redux/store"
import { invalidProduct, newProduct } from "../data/products";
import productServer from "../servers/productServer";

beforeEach(() => {
    store.dispatch(cleanUpProductReducer());
})

beforeAll(() => {
    productServer.listen();
})

afterAll(() => {
    productServer.close();
})

describe('Test productsReducer', () => {
    test('Check products initial state', () => {
        expect(store.getState().productsReducer).toEqual({
            products: [],
            productsWithConditions: [],
            categories: [],
            loading: false,
            error: '',
        })
    })
    test('Check fetchAllProducts', async () => {
        await store.dispatch(fetchAllProducts());
        expect(store.getState().productsReducer.products.length).toBe(4);
    })
    test('Check if a new product is created using createNewProduct function', async () => {
        await store.dispatch(createNewProduct(newProduct));
        expect(store.getState().productsReducer.products.length).toBe(1);
    })
    test('Check validations when a new product is created',async () => {
        await store.dispatch(createNewProduct(invalidProduct));
        expect(store.getState().productsReducer.products.length).toBe(0);
        // expect(store.getState().productsReducer.error).toBe('Request failed with status code 400');
        expect(store.getState().productsReducer.error).toBe(JSON.stringify({
            statusCode: 400,
            message: [
                'price must be a positive number',
                'images must contain at least 1 elements',
                'category does not exist'
            ],
            error: 'Bad Request'
        }));
    })
})