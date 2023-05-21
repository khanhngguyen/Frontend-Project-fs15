import React from 'react'
import { useAppSelector } from '../hooks/useAppSelector'

const ProductsGrid = () => {
    const { products, loading, error } = useAppSelector(state => state.productsReducer);
    return (
    <div>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {products.map(product => (
            <p key={product.id}>{product.title}: {product.description}</p>
        ))}
    </div>
  )
}

export default ProductsGrid