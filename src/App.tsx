import React, { useEffect } from 'react'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

//pages
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Product from './pages/Product'
import User from './pages/User'
import RootLayout from './layouts/RootLayout'
//hooks
// import { useAppSelector } from './hooks/useAppSelector'
import { useAppDispatch } from './hooks/useAppDispatch'
import { fetchProducts } from './redux/reducers/productsReducer'
import Cart from './pages/Cart'

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
      <Route
        path='product'
        element={<Product />}
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
    dispatch(fetchProducts());
  }, [])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App