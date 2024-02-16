import React, { useEffect, useState } from 'react'
import { FaUser } from "react-icons/fa";
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { CollectionState } from '../CollectionContext';


const UserCard = ({ user }) => {
  const [albums, setAlbums] = useState();
  const { loading, setLoading } = CollectionState();

  const URL = `https://jsonplaceholder.typicode.com/users/${user.id}/albums`;

  const fetchUserAlbums = async () => {
    setLoading(true)
    const { data } = await axios.get(URL)
    setAlbums(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchUserAlbums()
  }, [])

  return (
    <div>
      <FaUser size={200}/>
      <p><span>Name:</span> {user?.name}</p>
      <p><span>Album No:</span>{loading ? <CircularProgress /> : albums?.length}</p>
    </div>
  )
}

export default UserCard