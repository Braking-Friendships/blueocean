import axios from 'axios';
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Board from './components/GameComponents/Board';
import NavBar from './components/landingPageComponents/NavBar';
import LandingPage from './components/landingPageComponents/LandingPage';

function App() {
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
      <NavBar />
      <Routes>
        <Route path='/' element={<LandingPage />}></Route>
        <Route path='/game' element={<Board />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
