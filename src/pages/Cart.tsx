import React from 'react'
import { useAppSelector } from '../hooks/useAppSelector'

const Cart = () => {
  const { cart, totalQuantity, totalPrice } = useAppSelector(state => state.cartReducer);
  return (
    <div>
      <div>Cart: total quantity: {totalQuantity}, total price: {totalPrice}</div>
      <div>
        Cart items:
        {cart.map(product => (
          <p key={product.id}>{product.title}, quantity: {product.quantity}</p>
          ))}
      </div>
    </div>
  )
}

export default Cart