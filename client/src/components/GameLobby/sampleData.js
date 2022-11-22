import React, { useState, useEffect } from 'react';
import { socket, emitters } from '../../socket';
import madCat from '../../assets/avatars/madCat.png';
import happyCat from '../../assets/avatars/happyCat.png';
import sageCat from '../../assets/avatars/sageCat.png';
import sneakyCat from '../../assets/avatars/sneakyCat.png';
import tongueCat from '../../assets/avatars/tongueCat.png';


const Lobby = ({ userInfo }) => {

  const [roomId, setRoomId] = useState('')
  const [profiles, setProfiles] = useState()

  const userObj = {};
  if (userInfo) {
    userObj.email = userInfo.email;
    userObj.room = room;
    userObj.socketId = socket.id;
    userObj.fireId = userInfo.firebase_id;

  } else {
    userObj.room = room;
    userObj.socketId = socket.id;
  }


  return (
    <div className="w-screen h-screen bg-[#F4F1DE] flex flex-col justify-center items-center">
    </div>
  );
};

export default Lobby;

  // get room
  // get socket ids
  // use socket ids to get firebase ids
  // socket.get-user-data -> get profiles
  // map

  // const [users, setUsers] = useState([])
  // useEffect(() => {
  //   socket.on('join-room', data => {
  //     setUsers([...users, data])
  //   })

  //   // let user = 0.7774628866373077;
  //   // let profileContainer = [];
  //   // socket.emit('get-user-data', { firebaseId: user });
  //   // socket.on('send-user-data', data => {
  //   //   console.log(data, 'datatata')
  //   //   profileContainer.push(data[0])
  //   // })
  // }, [])

  // const [user, setUser] = useState('0.14438257512163855');

  // emitters.joinRoom(roomId)
  // socket.on('game-state', gameState => console.log('game', gameState))

  const [roomId, setRoomId] = useState('')
  const [profiles, setProfiles] = useState()
  // const [users, setUsers] = useState([0.7774628866373077, 0.6022004814666602, 0.05526058428859737, 0.14438257512163855, undefined])

  // useEffect(() => {
  //   let profileContainer = [];
  //   for (let i = 0; i < users.length; i++) {
  //     let userId = users[i]
  //     if (userId) {
  //       console.log('userid', userId)
  //       socket.emit('get-user-data', { firebaseId: userId });
  //       // socket.on('send-user-data', data => {
  //       //   console.log(data, 'datatata')
  //       //   // profileContainer.push(data[0])
  //       // })
  //     }
  //     // else {
  //   //     let guestData = {
  //   //       username: 'guest',
  //   //       avatar: '/static/media/unhappyCat.b2eb973ef1b49ad56a6e.png'
  //   //     }
  //   //     profileContainer.push(guestData)
  //   //   }
  //   }
  //   console.log(profileContainer, 'profileContainer')
  //   // setProfiles(profileContainer)
  //   setRoomId('CdVal6')
  // }, [])


  const [users, setUsers] = useState([])
  // useEffect(() => {
  //   socket.on('join-room', data => {
  //     setUsers([...users, data])
  //   })
  // }, [])


