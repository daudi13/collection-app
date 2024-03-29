import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { Box } from '@mui/system';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { CollectionState } from '../CollectionContext';
import { useNavigate } from 'react-router-dom';



function Login({handleClose}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAlert } = CollectionState();
  const navigate = useNavigate();

  const handleSubmit = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        setAlert({
          open: true,
          message: `You've successfully logged in with ${user.email}`,
          type: "success"
        })
        navigate("/Homepage")
        handleClose();
      })
      .catch((error) => {
        setAlert({
          open: true,
          message: `${error.message}`,
          type: "error"
        })
        handleClose();
    })
  };

  return (
    <Box p={3} style={{ display: "flex", flexDirection: "column", gap: "20px", alignItems: "center" }}>
      <TextField
        variant='outlined'
        type="email"
        label="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        variant='outlined'
        type="password"
        label="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <Button
        variant="contained"
        type="submit"
        size="large"
        style={{ padding: 10, backgroundColor: "gold", }}
        fullWidth
        onClick={handleSubmit}
      >
        Login
      </Button>
    </Box>
  )
}

export default Login