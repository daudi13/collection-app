import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { firebaseConfig } from '../firebase';
import { CollectionState } from '../CollectionContext';
import { Container, Typography, Button } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import Hero from "../assets/hero.png"
import { fetchUsers, getUserStatus, selectAllUsers } from '../feature/users/usersSlice';
import UserCard from '../components/UserCard';


const Homepage = () => {
  const users = useSelector(selectAllUsers);
  const status = useSelector(getUserStatus)
  const dispatch = useDispatch();
  const { setOpen, open, user } = CollectionState();

  useEffect(() => {
    if (status === "idle") dispatch(fetchUsers())
  }, [status, dispatch]);
  
  
    const useStyles = makeStyles()((theme) => ({
      wrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "100vh",
        overflowY: "hidden",
      },
      cards: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 70,
      gap: 40,
      },
      textBox: {
        width: 450
      },
      content: {
        marginBottom: 30,
        textAlign: "justify"
      },
      boxCard: {
      width: 250,
      padding: 15,
      borderWidth: 2,
      borderColor: "black",
      borderStyle: "solid",
      borderRadius: 20
    }
    }))
  
  const { classes } = useStyles()

  const userContent = users?.map((user) => (
    <div key={user?.id} className={classes.boxCard}>
      <UserCard user={user} />
    </div>
  ));

  
  if (user) {
    return (
      <Container className={classes.cards}>
      {userContent}
      </Container>
    )
  }

  return (
    <Container className={classes.wrapper}>
      <div className={classes.textBox}>
        <Typography className={classes.content}>
            SnapHub is an immersive online platform that seamlessly intertwines the worlds of photography, storytelling, and global connection. At its core, SnapHub is a community-driven space where individuals from around the world converge to share the stories captured through their lenses.
            SnapHub goes beyond a typical photo-sharing platform; it's a sanctuary for visual storytellers. Users craft narratives through their albums and photos, transforming moments into captivating tales that resonate with a diverse and engaged audience
        </Typography>
        <Button variant="contained" style={{
          width: 215,
          height: 40,
          backgroundColor: "#53c28b",
          color: "black"
        }}>
          create an account
        </Button>
      </div>
      <img src={Hero} style={{
        width: 560
      }} alt="hero"/>
    </Container>
  )
}

export default Homepage