import { NewProduct } from "../../types/NewProduct";
import { Product } from "../../types/Product";

const product1: Product = {
    id: 1,
    title: 'Product no.1',
    price: 100,
    description: 'Description for product no.1',
    images: [''],
    creationAt: '',
    updatedAt: '',
    category: {
        id: 1,
        name: 'Category no.1',
        image: 'image1',
        creationAt: 'creationDate',
        updatedAt: 'updatedDate'
    }
}

const product2: Product = {
    id: 2,
    title: 'Product no.2',
    price: 300,
    description: 'Description for product no.2',
    images: [''],
    creationAt: '',
    updatedAt: '',
    category: {
        id: 3,
        name: 'Category no.3',
        image: 'image3',
        creationAt: 'creationDate',
        updatedAt: 'updatedDate'
    }
}

const product3: Product = {
    id: 3,
    title: 'Product no.3',
    price: 800,
    description: 'Description for product no.3',
    images: [''],
    creationAt: '',
    updatedAt: '',
    category: {
        id: 2,
        name: 'Category no.2',
        image: 'image2',
        creationAt: 'creationDate',
        updatedAt: 'updatedDate'
    }
}

const product4: Product = {
    id: 4,
    title: 'Product no.4',
    price: 1400,
    description: 'Description for product no.3',
    images: [''],
    creationAt: '',
    updatedAt: '',
    category: {
        id: 5,
        name: 'Category no.5',
        image: '',
        creationAt: 'creationDate',
        updatedAt: 'updatedDate'
    }
}

const newProduct: NewProduct = {
    title: 'New Product',
    price: 250,
    description: 'New product description',
    categoryId: 4,
    images: ['', ''],
}

const invalidProduct: NewProduct = {
    title: 'Invalid Product',
    price: 0,
    description: 'New product description',
    categoryId: 100,
    images: [],
}

export { product1, product2, product3, product4, newProduct, invalidProduct };
