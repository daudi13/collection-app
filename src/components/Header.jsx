import React from 'react'
import { AppBar, Toolbar, Typography, Select, MenuItem, createTheme, ThemeProvider, Button } from '@mui/material'
import { Container } from '@mui/system'
import { makeStyles } from 'tss-react/mui';
import { CollectionState } from '../CollectionContext';
import ModalBox from './ModalBox';

const Header = () => {
  const useStyles = makeStyles()((theme) => ({
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

  const { classes } = useStyles();
  const { setOpen, open, user } = CollectionState();
  const handleOpen = () => setOpen(true);
  console.log(user)

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar  position='fixed' className={classes.top}>
        <Container>
          <Toolbar className={classes.toolbar}>
            <Typography className={classes.title}>SnapHub</Typography>
            <div className={classes.right}>
              {
                user ?
                  (<div className={classes.menuItem}>
                    <p>Home</p>
                    <p>Users</p>
                    <p>Albums</p>
                    <p>Photo</p>
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