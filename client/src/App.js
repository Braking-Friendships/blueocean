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
import happyCat from './assets/avatars/happyCat.png';


// Josh: adding socket.js file to house all emitters
import { socket, emitters } from './socket.js'
import GameRoom from './components/GameComponents/GameRoom';

function App() {
  const location = useLocation();
  const [userInfo, setUserInfo] = useState();
  const [guest, setGuest] = useState();

  // USER LOGIN
  const getUserData = async (user) => {
    console.log('LOGIN GET USER DATA: ', user);
    emitters.getUserData(user);
  };
  console.log(userInfo, 'USERINFO', socket.id, 'SOCKET')

  // USER SIGN-UP
  const createNewUser = async (user) => {
    console.log('NEW USER CREATED: ', user);
    emitters.createUser(user);
  };

  // LOGOUT BTN CLICKED
  const logout = () => {
    localStorage.removeItem('u_id');
    setUserInfo('');
  };

  // SOCKET LISTENERS
  socket.on('send-user-data', data => {
    // console.log('received data', data[0]);
    setUserInfo(data[0])
    localStorage.setItem('u_id', data[0].firebase_id)
    // console.log(localStorage)
  });

  // CHECK TO SEE IF USER IS LOGGED IN
  useEffect(() => {
    console.log('~~ LOCAL STORAGE ~~', localStorage.getItem('u_id'));
    let user;
    if (localStorage.getItem('u_id') !== undefined) {
      user = { firebaseId: localStorage.getItem('u_id') }
      getUserData(user);
    // } else {
    //   const guest = 'Guest' + Math.floor(Math.random() * 1000000).toString();
    //   setUserInfo({ username: guest })
    }
    // if (user.firebaseId) { getUserData(user) }
    // else {setGuest({username: guest})}

  }, []);


  return (
    <>
      {location.pathname !== '/game' ? <NavBar userInfo={userInfo} logout={logout} /> : null}
      <Routes>
        <Route path='/' element={<LandingPage userInfo={userInfo} guest={guest} />}></Route>
        <Route path='/game' element={<GameRoom />}></Route>
        <Route path='/login' element={<Login getUserData={getUserData} />}></Route>
        <Route path='/signup' element={<Signup createNewUser={createNewUser} />}></Route>
        <Route path='/profile' element={<ViewProfile userInfo={userInfo} />}></Route>
        <Route path='/forgot-password' element={<ForgotPassword />}></Route>
        <Route path='/lobby' element={<Lobby />}></Route>
        <Route path='/chat' element={<Chat />}></Route>
      </Routes>
    </>
  );
}

export default App;
