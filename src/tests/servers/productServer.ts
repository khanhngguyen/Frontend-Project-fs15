import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { product1, product2, product3, product4 } from '../data/products'
import { NewProduct } from '../../types/NewProduct'
import { Product } from '../../types/Product'
import categories from '../data/categories'

const productServer = setupServer(
    //Describe the requests to mock
    rest.get('https://api.escuelajs.co/api/v1/products', (req, res, ctx) => {
        // req: to access params and wuiries of the request
        // res: method to send data back
        // ctx: method to construct the content of returned data
        return res(
            ctx.json([product1, product2, product3, product4]),
        )
    }),
    rest.post('https://api.escuelajs.co/api/v1/products/', async (req, res, ctx) => {
        const newProduct = await req.json() as NewProduct;
        const category = categories.find(c => c.id === newProduct.categoryId);
        const error: string[] = [];
        let newAddedProduct: Product | null = null;

        //check conditions for price
        if (newProduct.price <= 0) {
            error.push('price must be a positive number');
        }
        //check conditions for images
        if (!Array.isArray(newProduct.images)) {
            error.push('images must be an array'); 
        } else if (newProduct.images.length < 1) {
            error.push('images must contain at least 1 elements');
        } else if (newProduct.images.some(item => typeof item != 'string')) {
            error.push('images must be an array of string');
        }
        if (!category) {
            error.push('category does not exist');
        } else {
            newAddedProduct = {
                id: 5,
                title: newProduct.title,
                price: newProduct.price,
                description: newProduct.description,
                images: newProduct.images,
                creationAt: '',
                updatedAt: '',
                category: category
            }
        }
        if (error.length > 0) {
            return res(
                ctx.status(400),
                ctx.json({
                    statusCode: 400,
                    message: error,
                    error: 'Bad Request'
                })
            )
        }

        return res(
            ctx.status(201),
            ctx.json(newAddedProduct)
        )
    })
)

export default productServer;