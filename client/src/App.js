import axios from 'axios';
import { useEffect } from 'react';
import { io } from 'socket.io-client';


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
    <>
      <div className="px-10 text-gray-500 font-bold mb-2">Hello world!</div>
    </>
  );
}

export default App;
