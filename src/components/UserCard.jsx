import { makeStyles } from 'tss-react/mui';
import React, { useEffect, useState } from 'react'
import { FaUser } from "react-icons/fa";
import axios from 'axios';

const UserCard = ({ user }) => {
  const [albums, setAlbums] = useState();

  const URL = `https://jsonplaceholder.typicode.com/users/${user.id}/albums`;

  const fetchUserAlbums = async () => {
    const { data } = await axios.get(URL)
    setAlbums(data)
  }

  useEffect(() => {
    fetchUserAlbums()
  }, [])
  
  console.log(albums?.length)

  return (
    <div>
      <FaUser size={200}/>
      <p><span>Name:</span> {user?.name}</p>
      <p><span>Album No:</span>{albums?.length}</p>
    </div>
  )
}

export default UserCard