import axios from 'axios';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Board from './components/GameComponents/Board';
import { useAuth } from './contexts/AuthContext';
import Login from './components/Login/Login';
import Signup from './components/Login/Signup';
import ForgotPassword from './components/Login/ForgotPassword';
import NavBar from './components/landingPageComponents/NavBar';
import LandingPage from './components/landingPageComponents/LandingPage';
import UserProfile from './components/profile/UserProfile';


const socket = io('http://localhost:5001');
socket.on('connect', () => {
  console.log(`You connected with id: ${socket.id}`);
})
function App() {
  const location = useLocation();
  const [userInfo, setUserInfo] = useState();

  const getUserData = async (user) => {
    console.log(user)
    socket.emit('get-user-data', user)
    return;
  };

  const createNewUser = async (user) => {
    console.log(user)
    socket.emit('create-user', user)
  };

  // SOCKET LISTENERS
  socket.on('send-user-data', data => {
    console.log('received data', data)
    setUserInfo(data[0])
  })

  return (
    <>
      {location.pathname !== '/game' ? <NavBar /> : null}
      <Routes>
        <Route path='/' element={<LandingPage />}></Route>
        <Route path='/game' element={<Board />}></Route>
        <Route path='/login' element={<Login getUserData={getUserData}/>}></Route>
        <Route path='/signup' element={<Signup createNewUser={createNewUser}/>}></Route>
        <Route path='/profile' element={<UserProfile socket={socket}/>}></Route>
        <Route path='/forgot-password' element={<ForgotPassword />}></Route>
      </Routes>
    </>
  );
}

export default App;
