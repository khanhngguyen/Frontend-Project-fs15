import React, { useEffect } from 'react'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

//pages
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Products from './pages/Products'
import User from './pages/User'
import RootLayout from './layouts/RootLayout'
import Cart from './pages/Cart'
import ProductDetails, { productDetailsLoader } from './pages/ProductDetails'
//hooks
// import { useAppSelector } from './hooks/useAppSelector'
import { useAppDispatch } from './hooks/useAppDispatch'
import { fetchAllProducts } from './redux/reducers/productsReducer'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path='/'
      element={<RootLayout />}
      errorElement={<NotFound />}
    >
      <Route
        path='/'
        element={<Home />}
      />
      <Route path='products/:id' element={<ProductDetails />} loader={productDetailsLoader} />
      <Route
        path='products'
        element={<Products />}
      />
      <Route
        path='cart'
        element={<Cart />}
      />
      <Route
        path='user'
        element={<User />}
      />
    </Route>
  )
)
const App = () => {
  // const products = useAppSelector(state => state.productsReducer);
  // console.log(products);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App