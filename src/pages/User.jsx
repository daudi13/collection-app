import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CollectionState } from '../CollectionContext';
import { FaUser } from "react-icons/fa";
import { Container } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

const User = () => {
  const { id } = useParams();
  const USER_URL = `https://jsonplaceholder.typicode.com/users/${id}`;
  const USER_ALBUM_URL = `https://jsonplaceholder.typicode.com/users/${id}/albums`;

  const { selectedUser, setSelectedUser, setUserAlbums, userAlbums, isAuthenticated } = CollectionState();

  const navigate = useNavigate();
  
  const fetchUserAlbums = async () => {
    const { data } = await axios.get(USER_ALBUM_URL)
    setUserAlbums(data)
  }

  const fetchUserById = async () => {
    const { data } = await axios.get(USER_URL)
    setSelectedUser(data)
  }

  useEffect(() => {
    fetchUserById();
  }, [])

  useEffect(() => {
    fetchUserAlbums();
  }, [])
  
  const useStyles = makeStyles()(() => ({
    wrapper: {
      marginTop: 50,
      display: "flex",
      gap: 60
    },
    infoBox: {
      textAlign: "justify"
    },
    label: {
      fontWeight: "700"
    },
    valueText: {
      fontWeight: "500",
      fontStyle: "italic",
      width: 300,
      textOverflow: "ellipsis",
    },
    userProfile: {
      marginTop: '3rem'
    },
    albumsBox: {
      textAlign: "justify",
      width: "800px"
    },
    albumBox: {
      flex: 1,
      borderWidth: 2,
      paddingLeft: 20,
      borderStyle: "solid",
      borderColor: "black",
      marginBottom: 20,
      borderRadius: 10,
      '&:hover': {
        backgroundColor: "black",
        color: "#fff",
        cursor: "pointer",
      }
    },
  }));

  const { classes } = useStyles();

  const albumContent = userAlbums?.map((album) => (
    <div key={album.id} className={classes.albumBox} onClick={() => navigate(`/album/${album.id}`)}>
      <p className={classes.label}>Album title: <span className={classes.valueText}>{album?.title}</span></p>
    </div>
  ));

  if (isAuthenticated === null) navigate("/")

  return (
    <Container className={classes.wrapper}>
      <FaUser size={250} className={classes.userProfile} />
      <div>
        <p className={classes.label}>User Information</p>
        <div className={classes.infoBox}>
          <p className={classes.label}>name:<span className={classes.valueText}> {selectedUser?.name}</span></p>
          <p className={classes.label}>username: <span className={classes.valueText}>{selectedUser?.username}</span></p>
          <p className={classes.label}>email:<span className={classes.valueText}>
          {selectedUser?.email}</span></p>
          <p className={classes.label}>address: <span className={classes.valueText}>{selectedUser?.address?.street}</span></p>
          <p className={classes.label}>Company: <span className={classes.valueText}>{selectedUser?.company?.name}</span></p>
          <p className={classes.label}>phone:<span className={classes.valueText}>{selectedUser?.phone} </span></p>
          <p className={classes.label}>Website: <span className={classes.valueText}>{selectedUser?.website}</span></p>
        </div>

        <p className={classes.label}>Albums</p>
        <div className={classes.albumsBox}>
          {albumContent}
        </div>
      </div>
    </Container>
  )
}

export default User