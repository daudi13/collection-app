import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { fetchUsers, getUserStatus, selectAllUsers } from '../feature/users/usersSlice';
import UserCard from '../components/UserCard';
import { CollectionState } from '../CollectionContext';
import LandingPage from './LandingPage';
import { useNavigate } from 'react-router-dom';


const Homepage = () => {
  const users = useSelector(selectAllUsers);
  const status = useSelector(getUserStatus)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = CollectionState();

  useEffect(() => {
    if (status === "idle") dispatch(fetchUsers())
  }, [status, dispatch]);
  
  
    const useStyles = makeStyles()(() => ({
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

  console.log(status)

  return (
    isAuthenticated ? (
      <Container className = {classes.cards}>
      {status === "loading" ? <h1>LOading...</h1> : userContent}
      </Container>) : <LandingPage/>
  )
}

export default Homepage