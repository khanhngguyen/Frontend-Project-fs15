import React, { useState } from 'react'
import { AddCircleOutline, DeleteOutlineOutlined, Remove } from '@mui/icons-material';
import { Alert, IconButton, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector'
import { addQuantity, removeFromCart, subtractQuantity } from '../redux/reducers/cartReducer';

const Cart = () => {
  const [open, setOpen] = useState(false);
  const { cart, totalQuantity, totalPrice } = useAppSelector(state => state.cartReducer);
  const dispatch = useAppDispatch();

  //functions to handle modify cart items: add, subtract, remove
  const handleAddQuantity = (id: number) => {
    dispatch(addQuantity(id));
  }
  const handleSubtractQuantity = (id: number) => {
    dispatch(subtractQuantity(id));
  }
  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id));
  }
  //functions to calculate prices
  const subTotal = cart.reduce((total, item) => {
    return item.price * item.quantity + total;
  }, 0)
  const taxRate = 0.24;
  const tax = taxRate * subTotal;
  //functions to show/unshow alert on removing item from cart
  const handleOpen = () => setOpen(true);
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
      return;
      }
      setOpen(false);
  };

  return (
    <div>
      {/* <div>Cart: total quantity: {totalQuantity}, total price: {totalPrice}</div> */}
      {/* <div>
        Cart items:
        {cart.map(product => (
          <p key={product.id}>{product.title}, quantity: {product.quantity}</p>
          ))}
      </div> */}
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product name</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart && cart.map(product => (
            <TableRow
              key={product.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {product.title}
                <IconButton onClick={() => {
                  handleRemoveFromCart(product.id);
                  handleOpen();
                }}>
                  <DeleteOutlineOutlined />
                </IconButton>
              </TableCell>
              <TableCell align="right">{product.price}</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => handleSubtractQuantity(product.id)}>
                  <Remove />
                </IconButton>
                {product.quantity}
                <IconButton onClick={() => handleAddQuantity(product.id)}>
                  <AddCircleOutline />
                </IconButton>
              </TableCell>
              <TableCell align="right">{product.price * product.quantity}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{totalQuantity}</TableCell>
            <TableCell align="right">{subTotal}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Tax</TableCell>
            <TableCell align="right">{`${taxRate * 100} %`}</TableCell>
            <TableCell align="right">{tax.toFixed(2)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell align="right">{(subTotal + tax).toFixed(2)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
            <Alert severity="info">
                Product removed from cart successfully!
            </Alert>
        </Snackbar>
    </div>
  )
}

export default Cart