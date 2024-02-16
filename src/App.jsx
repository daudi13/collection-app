import './App.css'
import Homepage from './pages/Homepage'
import Header from './components/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Photos from './pages/Photos';
import User from "./pages/User"
import Album from './pages/Album';
import LandingPage from './pages/LandingPage';
import AlertBox from './components/Alert';

function App() {
  return (
    <BrowserRouter>
      <div style={{marginTop: "3rem"}}>
        <Header />
        <AlertBox/>
        <Routes>
          <Route path="/" element={<LandingPage />} exact />
          <Route path="/Homepage" element={<Homepage/>}></Route>
          <Route path="/user/:id" element={<User/>} />
          <Route path="/album/:id" element={<Album/>} />
          <Route path="/photo/:id" element={<Photos/>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
