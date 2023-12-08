import React, { useState } from 'react';
import { Box, Button, Dialog, DialogTitle, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import CartList from '../components/CartList';

function Cart() {
  const [open, setOpen] = useState(false);
  const openAddItem = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const addItem = () => {
    setOpen(false);
    console.debug('adding item');
  };
  return (
    <>
      <Box m={1} display='flex' justifyContent='space-between'>
        <h2>My Cart</h2>
      </Box>
      <CartList />
      <Button
        variant='contained'
        color='success'
        sx={{ height: '35px', marginTop: '2em' }}
        onClick={openAddItem}>
        <AddIcon />
        <span style={{ paddingLeft: '0.5em' }}>Add item</span>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Item</DialogTitle>
        <Grid container>
          <Grid item xs={12}>
            item name input
          </Grid>
          <Grid item xs={8}>
            item quantity input
          </Grid>
          <Grid item xs={4}>
            item unit input
          </Grid>
          <Grid item xs={12}>
            <Button
              color='success'
              variant='contained'
              onClick={() => addItem()}
              sx={{
                minWidth: '2em',
                padding: '1em',
                borderRadius: '50%',
                float: 'right',
                margin: '1em',
              }}>
              <AddIcon />
            </Button>
            <Button
              color='error'
              onClick={() => setOpen(false)}
              variant='outlined'
              sx={{
                minWidth: '2em',
                padding: '1em',
                borderRadius: '50%',
                float: 'right',
                marginTop: '1em',
              }}>
              <CloseIcon />
            </Button>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
}

export default Cart;
