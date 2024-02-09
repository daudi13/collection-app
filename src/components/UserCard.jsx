import { makeStyles } from 'tss-react/mui';
import React from 'react'
import { FaUser } from "react-icons/fa";
import { Container } from '@mui/material';

const UserCard = ({ user }) => {
  return (
    <div>
      <FaUser size={200}/>
      <p><span>Name:</span> {user?.name}</p>
      <p><span>Album No:</span>10</p>
    </div>
  )
}

export default UserCard