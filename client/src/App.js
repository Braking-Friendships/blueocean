import axios from 'axios';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Board from './components/GameComponents/Board';
import { useAuth } from './contexts/AuthContext';
import Login from './components/Login/Login';
import Signup from './components/Login/Signup';

function App() {
  const [userInfo, setUserInfo] = useState();

  const getUserData = async (user) => {
    /// EMIT USERDATA TO SOCKET
    /// RECEIVE USERDATA FROM SOCKET
    // let userData = await axios.get(`/api/login/${user.firebaseId}`, {params: user});
    // if (userData) {
    //   setUserInfo(userData.data[0])
    //   return userData.data[0];
    // }
  };

  const createNewUser = async (user) => {
    // let userDataPost = await axios.post(`/api/signup/${user.firebaseId}`, {params: user});
    // if (userDataPost) {
    //   let userData = await axios.get(`/api/login/${user.firebaseId}`, {params: user});
    //   setUserInfo(userData.data[0]);
    //   return userData.data[0];
    // }
  };



  const socket = io('http://localhost:5001');
  socket.on('connect', () => {
    console.log(`You connected with id: ${socket.id}`);
  })
  socket.on('receive-message', message => {
    console.log(message)
  })
  socket.emit('send-message', 'Hello from the client')

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<div>Hello world!</div>}></Route>
        <Route path='/game' element={<Board />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
