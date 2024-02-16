import { createContext, useEffect, useState, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

const Collection = createContext();

const CollectionContext = ({ children }) => {
  const [userAlbums, setUserAlbums] = useState();
  const [photoAlbum, setPhotoAlbum] = useState();
  const [selectedUser, setSelectedUser] = useState();
  const [album, setAlbum] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(null | undefined)
  const [open, setOpen] = useState(false)
  const [photo, setPhoto] = useState()
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success"
  })

  useEffect(() => {
    onAuthStateChanged(auth, isAuthenticated => {
      if (isAuthenticated) setIsAuthenticated(isAuthenticated)
      else setIsAuthenticated(null)
    })
  })

  return (
    <Collection.Provider value={{
      userAlbums,
      setUserAlbums,
      photoAlbum,
      setPhotoAlbum,
      isAuthenticated,
      setIsAuthenticated,
      open,
      setOpen,
      loading,
      setLoading,
      alert,
      setAlert,
      selectedUser,
      setSelectedUser,
      album,
      setAlbum,
      photo,
      setPhoto
    }}>
      {children}
    </Collection.Provider>
  )
}

export default CollectionContext

export const CollectionState = () => {
  return useContext(Collection)
}