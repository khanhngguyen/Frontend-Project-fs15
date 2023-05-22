import React from 'react'
import { useLoaderData, useParams } from 'react-router-dom'
import axios, { AxiosError } from 'axios';
import { Product } from '../types/Product';

const ProductDetails = () => {
  const { id } = useParams();
  const product = useLoaderData() as Product;;

  return (
    <div>
      {id && (<p>{product.title}: {product.price}</p>)}
    </div>
  )
}

export default ProductDetails;

//loader function
export const productDetailsLoader = async({ params }: any) => {
 const { id } = params;
 try {
  const response = await axios.get<Product>(`https://api.escuelajs.co/api/v1/products/${id}`);
  return response.data;
 } catch (e) {
  const error = e as AxiosError;
  console.log(error.message);
  return error.message;
 }
}