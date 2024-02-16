import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { CollectionState } from '../CollectionContext';
import axios from 'axios';
import { makeStyles } from 'tss-react/mui';
import { Button } from '@mui/material';
import PhotoModal from '../components/PhotoModal';
import LandingPage from './LandingPage';

const Photos = () => {
  const { id } = useParams();
  const PHOTO_URL = `https://jsonplaceholder.typicode.com/photos/${id}`
  const { photo, setPhoto, isAuthenticated, loading, setLoading } = CollectionState();
  const [openModal, setOpenModal] = useState(false)
  const navigate = useNavigate()

  const handleOpen = () => setOpenModal(true);

  const fetchPhoto = async () => {
    setLoading(true)
    const { data } = await axios.get(PHOTO_URL)
    setPhoto(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchPhoto()
  }, []);

  const useStyle = makeStyles()(() => ({
    wrapper: {
      marginTop: 70
    }
  }));

  const { classes } = useStyle();
  console.log(photo)

  return (
    isAuthenticated ? (loading ? <h1>loading photo</h1> : <div className={classes.wrapper}>
      <img src={photo?.url} className={classes.photo} />
      <p>{photo?.title}</p>
      <Button variant='contained' onClick={handleOpen}>Edit title</Button>
      <PhotoModal openModal={openModal} setOpenModal={setOpenModal} setPhoto={setPhoto} photoId={id} />
    </div>) : (navigate("/") && <LandingPage/>)
  )
}

export default Photos