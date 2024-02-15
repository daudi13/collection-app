import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import { fetchUsers, getUserStatus, selectAllUsers } from '../feature/users/usersSlice';
import UserCard from '../components/UserCard';
import { useNavigate } from 'react-router-dom';
import { CollectionState } from '../CollectionContext';
import LandingPage from './LandingPage';


const Homepage = () => {
  const users = useSelector(selectAllUsers);
  const status = useSelector(getUserStatus)
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { isAuthenticated } = CollectionState();

  useEffect(() => {
    if (status === "idle") dispatch(fetchUsers())
  }, [status, dispatch]);
  
  
    const useStyles = makeStyles()((theme) => ({
      cards: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 70,
      gap: 40,
      },
      boxCard: {
      width: 250,
      padding: 15,
      borderWidth: 2,
      borderColor: "black",
      borderStyle: "solid",
      borderRadius: 20
      },
      loadingBox:{ 
      display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh"
      }
    }))
  
  const { classes } = useStyles()

  const userContent = users?.map((user) => (
    <div key={user?.id} className={classes.boxCard} onClick={() => navigate(`/user/${user.id}`)}>
      <UserCard user={user} />
    </div>
  ));

  return (
    isAuthenticated ? (
      <Container className = {classes.cards}>
      {userContent}
      </Container>) : <LandingPage/>
  )
}

export default Homepage