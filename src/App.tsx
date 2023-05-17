import React from 'react'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

//pages
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Product from './pages/Product'
import User from './pages/User'
import RootLayout from './layouts/RootLayout'

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
        path='user'
        element={<User />}
      />
    </Route>
  )
)

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App