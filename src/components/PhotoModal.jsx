import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
};

export default function PhotoModal({ openModal, setOpenModal, setPhoto, photoId }) {
  const [title, setTitle]= React.useState("")

  const handleClose = () => setOpenModal(false);

  const editPhotoTitle = async (photoId, title) => {
    const PHOTO_URL = `https://jsonplaceholder.typicode.com/photos/${photoId}`
    const { data } = await axios.patch(PHOTO_URL, {
      title: title,
    })
    console.log("Post title edited successfully")
    setPhoto(data)
    handleClose()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    editPhotoTitle(photoId, title)
  }

  console.log(title)

  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form>
            <input
              type='text'
              value={title}
              placeholder='Edit Photo title'
              
              onChange={(e) => setTitle(e.target.value)}
            />
            <button onClick={(e) => handleSubmit(e)}>submit</button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}