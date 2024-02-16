import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CollectionState } from '../CollectionContext';
import axios from 'axios';
import { makeStyles } from 'tss-react/mui';
import LandingPage from './LandingPage';

const Album = () => {
  const { id } = useParams();
  const navigate = useNavigate()

  const ALBUM_URL = `https://jsonplaceholder.typicode.com/albums/${id}`;
  const PHOTOS_URL = `https://jsonplaceholder.typicode.com/albums/${id}/photos`;

  const { album, setAlbum, setPhotoAlbum, photoAlbum, isAuthenticated, loading, setLoading } = CollectionState();


  const fetchAlbumData = async () => {
    setLoading(true)
    const { data } = await axios.get(ALBUM_URL)
    setAlbum(data)
    setLoading(false)
  }

  const fetchAlbumPhotos = async () => {
    setLoading(true)
    const { data } = await axios.get(PHOTOS_URL)
    setPhotoAlbum(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchAlbumData()
  }, []);

  useEffect(() => {
    fetchAlbumPhotos()
  }, []);
  
  const useStyles = makeStyles()(() => ({
    photoBox: {
      display: "flex",
      flexWrap: "wrap",
      gap: 20,
      alignItems: "center",
      justifyContent: "center"
    },
    photo: {
      width: 150,
      borderRadius: 10,
    },
    photoCard: {
      padding: 5,
      '&:hover': {
        backgroundColor: "grey",
        borderRadius: 10,
        cursor: "pointer",
        color: "#ffff"
      }

    }
  }))

  const {classes} = useStyles()
  
  const albumPhotos = photoAlbum?.map((photo) => (
    <div key={photo?.id} className={classes.photoCard} onClick={() => navigate(`/photo/${photo?.id}`)}>
      <img src={photo?.url} className={classes.photo}/>
      <p>Photo: <span>{photo?.id}</span></p>
    </div>
  ))
  
  console.log(photoAlbum);

  return (
    isAuthenticated ? (loading ? <h1>fetching Album info</h1> : <div>
      <p>Album details</p>
      <div>
        <p>Album Title: <span>{album?.title}</span></p>
        <p>Album Id: <span>{album?.id}</span></p>
        <p>User Id: <span>{album?.userId}</span></p>
      </div>
      <p>Album photos</p>
      <div className={classes.photoBox}>
        {albumPhotos}
      </div>
    </div>) : <LandingPage />
  );
}

export default Album