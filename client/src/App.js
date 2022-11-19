import axios from 'axios';
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './contexts/AuthContext';


function App() {
  const [userInfo, setUserInfo] = useState();

  const getUserData = async (user) => {
    let userData = await axios.get(`/api/login/${user.firebaseId}`, {params: user});
    if (userData) {
      setUserInfo(userData.data[0])
      return userData.data[0];
    }
  };

  const createNewUser = async (user) => {
    let userDataPost = await axios.post(`/api/signup/${user.firebaseId}`, {params: user});
    if (userDataPost) {
      let userData = await axios.get(`/api/login/${user.firebaseId}`, {params: user});
      setUserInfo(userData.data[0]);
      return userData.data[0];
    }
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
    <>
      <div className="px-10 text-gray-500 font-bold mb-2">Hello world!</div>
    </>
  );
}

export default App;
