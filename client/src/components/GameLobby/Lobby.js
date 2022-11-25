import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { socket, emitters } from '../../socket';
import madCat from '../../assets/avatars/madCat.png';
import happyCat from '../../assets/avatars/happyCat.png';
import sageCat from '../../assets/avatars/sageCat.png';
import sneakyCat from '../../assets/avatars/sneakyCat.png';
import tongueCat from '../../assets/avatars/tongueCat.png';
import createDeck from '../../Tools/createDeck';


const Lobby = ({ userInfo }) => {


  const [roomId, setRoomId] = useState('CdVal6')
  const [profiles, setProfiles] = useState([])
  // emitters.joinRoom(roomId)
  // socket.on('game-state', gameState => console.log('game', gameState))

  const navigate = useNavigate();
  console.log(socket.id)
  const [users, setUsers] = useState([])

  socket.on('joined', data => {
    setUsers([...users, data])
    console.log(data)
    console.log(users)
  })

  socket.on('start-join', (room) => {
    navigate(`/game`)
  })

  const loadGame = (room) => {
    let decks = createDeck(4);
    emitters.startGame(decks);
    socket.emit('join-game', room)
    navigate(`/game`)
  }



  return (
    <div className="w-screen h-screen bg-[#F4F1DE] flex flex-col justify-center items-center">
      <h1>{roomId}</h1>
      <div>Game ID</div>
      <div>Joined:{users?.[0]?.[0].room} id={users?.[0]?.socketId}</div>
      {/* <icon src="" alt="pencil"/> */}
    <br/>

    <button onClick={() => {loadGame(users?.[0]?.[0].room)}}className="bg-[#E07A5F] hover:outline text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Ex Kittens</button>
    <br/>
    <button className="bg-[#3D405B] hover:outline text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">UNO</button>


    <br/>
    <button className="bg-[#E07A5F] hover:outline text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Leave Game</button>
    <br/>
      <div>Chat functions (imported separately)</div>
    <br/>

      <div>
        {profiles ? (profiles.map((profile) =>
        <div className ='flex flex-col justify-center items-center'>
          <h4>{profile.username}</h4>
          <img src={profile.avatar} className='pointer-events-none w-52 h-auto rounded-full' alt="avatar card" />
        </div>)) : null}
      </div>
    </div>
  );
};

export default Lobby;


