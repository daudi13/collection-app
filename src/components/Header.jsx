import { AppBar, Toolbar, Typography, createTheme, ThemeProvider, Button } from '@mui/material'
import { Container } from '@mui/system'
import { makeStyles } from 'tss-react/mui';
import { CollectionState } from '../CollectionContext';
import ModalBox from './ModalBox';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const Header = () => {
  const navigate = useNavigate();
  const { setOpen, open, isAuthenticated, setAlert } = CollectionState();
  const useStyles = makeStyles()(() => ({
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    },
    menuItem: {
      display: "flex",
      gap: 40,
      flex: 1,
      alignItems: "center"
    }
  }))

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    }
  });

  const logout = () => {
    signOut(auth);
    setAlert({
      open: true,
      message: "You've successfully logged out",
      type: "success"
    });
    navigate("/")
  };

  const { classes } = useStyles();
  const handleOpen = () => setOpen(true);

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar  position='fixed' className={classes.top}>
        <Container>
          <Toolbar className={classes.toolbar}>
            <Typography className={classes.title}>SnapHub</Typography>
            <div className={classes.right}>
              {
                isAuthenticated ?
                  (<div className={classes.menuItem}>
                    <Link to={"/Homepage"}>Home</Link>
                    <Button
                variant='contained'
                style={{
                  width: 85,
                  height: 40,
                  marginLeft: 15,
                  backgroundColor: "#53c28b",
                }}
                onClick={logout}
              >
                Logout
                    </Button>
                  </div>) :
                  (
                    <Button
                variant='contained'
                style={{
                  width: 85,
                  height: 40,
                  marginLeft: 15,
                  backgroundColor: "#53c28b",
                }}
                onClick={handleOpen}
              >
                Login
                    </Button>
                  )
              }
            </div>
          </Toolbar>
        </Container>
      </AppBar>
      <ModalBox open={open} setOpen={setOpen} />
    </ThemeProvider>
  )
}

export default Header