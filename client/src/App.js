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

// Josh: adding socket.js file to house all emitters
import { socket, emitters } from './socket.js'

function App() {
  const location = useLocation();
  const [userInfo, setUserInfo] = useState();
  const [gameState, setGameState] = useState({
    deck: [
      {
        type: 'bomb',
        img: 'image tag'
      }
    ],
    hand1: [
      {
        type: 'bomb',
        img: 'image tag'
      },
      {
        type: 'attack',
        img: 'image tag'
      }
    ]
  })

  useEffect(() => {
    emitters.startGame(gameState)
  }, []);

  const getUserData = async (user) => {
    console.log(user)
    emitters.getUserData(user)
    return;
  };

  const createNewUser = async (user) => {
    console.log(user)
    emitters.createUser(user);
  };

  // SOCKET LISTENERS
  socket.on('send-user-data', data => {
    console.log('received data', data)
    setUserInfo(data[0])
  })

  socket.on('current-state', state => {
    console.log(state)
    setGameState(state)
  })

  return (
    <>
      {location.pathname !== '/game' ? <NavBar /> : null}
      <Routes>
        <Route path='/' element={<LandingPage />}></Route>
        <Route path='/game' element={<Board />}></Route>
        <Route path='/login' element={<Login getUserData={getUserData}/>}></Route>
        <Route path='/signup' element={<Signup createNewUser={createNewUser}/>}></Route>
        <Route path='/profile' element={<UserProfile />}></Route>
        <Route path='/forgot-password' element={<ForgotPassword />}></Route>
      </Routes>
    </>
  );
}

export default App;
