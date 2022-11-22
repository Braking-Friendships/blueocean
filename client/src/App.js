import axios from 'axios';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Login from './components/Login/Login';
import Signup from './components/Login/Signup';
import ForgotPassword from './components/Login/ForgotPassword';
import NavBar from './components/landingPageComponents/NavBar';
import LandingPage from './components/landingPageComponents/LandingPage';
import ViewProfile from './components/profile/ViewProfile';
import Lobby from './components/GameLobby/Lobby';
import Chat from './components/ChatComponents/Chat';


// Josh: adding socket.js file to house all emitters
import { socket, emitters } from './socket.js'
import GameRoom from './components/GameComponents/GameRoom';

function App() {
  const location = useLocation();
  const [userInfo, setUserInfo] = useState();

  const getUserData = async (user) => {
    console.log(user)
    emitters.getUserData(user)
    return;
  };
  console.log(userInfo, 'USERINFO', socket.id, 'SOCKET')

  const createNewUser = async (user) => {
    console.log(user)
    emitters.createUser(user);
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
        <Route path='/' element={<LandingPage userInfo={userInfo}/>}></Route>
        <Route path='/game' element={<GameRoom />}></Route>
        <Route path='/login' element={<Login getUserData={getUserData}/>}></Route>
        <Route path='/signup' element={<Signup createNewUser={createNewUser}/>}></Route>
        <Route path='/profile' element={<ViewProfile />}></Route>
        <Route path='/forgot-password' element={<ForgotPassword />}></Route>
        <Route path='/lobby' element={<Lobby />}></Route>
        <Route path='/chat' element={<Chat />}></Route>
      </Routes>
    </>
  );
}

export default App;
