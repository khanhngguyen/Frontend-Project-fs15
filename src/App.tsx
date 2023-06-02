import React, { useEffect } from 'react'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

//pages
import Home from './pages/Home'
import LogIn from './pages/LogIn'
import NotFound from './pages/NotFound'
import Products from './pages/Products'
import RootLayout from './layouts/RootLayout'
import Cart from './pages/Cart'
import ProductDetails, { productDetailsLoader } from './pages/ProductDetails'
import Profile from './pages/Profile'
//hooks
// import { useAppSelector } from './hooks/useAppSelector'
import { useAppDispatch } from './hooks/useAppDispatch'
import { fetchAllProducts, fetchCategories } from './redux/reducers/productsReducer'
import { fetchAllUsers } from './redux/reducers/userReducer'

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
        path='login'
        element={<LogIn />}
      />
      <Route
        path='profile'
        element={<Profile />}
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
    dispatch(fetchAllUsers());
    dispatch(fetchCategories());
  }, [])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App