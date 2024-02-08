import React, { createContext, useEffect, useState, useContext } from "react";
import axios from "axios"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

const Collection = createContext();

const CollectionContext = ({ children }) => {
  const [userAlbums, setUserAlbums] = useState();
  const [photoAlbum, setPhotoAlbum] = useState();
  const [user, setUser] = useState(null)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success"
  })

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if(user) setUser(user)
    })
  })

  return (
    <Collection.Provider value={{
      userAlbums,
      setUserAlbums,
      photoAlbum,
      setPhotoAlbum,
      user,
      setUser,
      open,
      setOpen,
      loading,
      setLoading,
      alert,
      setAlert
    }}>
      {children}
    </Collection.Provider>
  )
}

export default CollectionContext

export const CollectionState = () => {
  return useContext(Collection)
}