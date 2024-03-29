import React from 'react'
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { CollectionState } from '../CollectionContext';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AlertBox = () => {

  const { alert, setAlert } = CollectionState();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    
    setAlert({
      open: false,
      message: "",
      type: ""
    })
  }


  console.log("alert",alert.message)

  return (
  <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleClose}>
    <Alert onClose={handleClose} severity={alert.type} sx={{ width: '100%', margin: "0 auto"}}>
      {alert.message}
    </Alert>
  </Snackbar>
  )
}

export default AlertBox