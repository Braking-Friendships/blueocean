import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { socket, emitters } from '../../socket';
import madCat from '../../assets/avatars/madCat.png';
import happyCat from '../../assets/avatars/happyCat.png';
import sageCat from '../../assets/avatars/sageCat.png';
import sneakyCat from '../../assets/avatars/sneakyCat.png';
import tongueCat from '../../assets/avatars/tongueCat.png';
import createDeck from '../../Tools/createDeck';
import Chat from '../ChatComponents/Chat.js';


const Lobby = ({ userInfo }) => {

  const [roomId, setRoomId] = useState('CdVal6')
  const [profiles, setProfiles] = useState([]);
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

  socket.on('update-room', room_id => setRoomId(room_id))

  const loadGame = (room) => {
    //replace with real users
    //min2 - max4
    let users = [userInfo.username, 'b', 'c', 'd'];

    let decks = createDeck(users);

    decks.playerOrder = users;

    emitters.startGame(decks);
    socket.emit('join-game', room)
    navigate(`/game`)
  }


  // state for opening chat and badge icon -----
  const [isOpen, setOpen] = useState(false);
  const [receiveScroll, setReceiveScroll] = useState(false);
  const [badge, setBadge] = useState(false);
  const [newMess, setNewMess] = useState([]);
  const [newMess2, setNewMess2] = useState([]);

  const newMessage = () => {
    // console.log(newMess.length, newMess2.length, 'check')
    if (newMess.length !== newMess2.length) {
      setBadge(true);
      setNewMess2(newMess);
    } else {
      setBadge(false);
    }
  }

  useEffect(() => {
    newMessage();
  }, [newMess])

  return (
    <>
      {/* CHAT STARTS HERE ----  */}
      <div>
        <div className={isOpen ? 'bg-[#3D405B] h-130 w-screen max-w-sm flex flex-col flex-grow absolute right-0 px-15 mt-20 pb-0 rounded-l-lg': "hidden"}>
          <button type="button" className="absolute left-0 ml-3 mt-3 text-white" onClick={(e) => {
          setOpen(!isOpen);
          newMessage();
          }}>X</button>
          <h5 className="absolute ml-48 mt-10 text-white">Chat</h5>
          <div className="h-130 flex flex-col flex-grow mt-10">
            <Chat setNewMess={setNewMess} receiveScroll={receiveScroll} />
          </div>
        </div>
      </div>

      <div className={!isOpen ? "absolute inset-y-20 right-10" : "hidden"}>
        {/* badge icon for messages */}
        <span className={badge ? "flex h-1 w-3 ml-[7.3rem]" : "hidden"}>
          <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
        {/* button to open chat */}
        <button className="inline-block px-6 py-2.5 bg-[#3D405B] text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-[#4b4e6f] hover:shadow-lg" type="button" onClick={(e) => {
          setOpen(!isOpen);
          newMessage();
          setReceiveScroll(!receiveScroll);
        }}>
          <span className="mr-2">Open Chat</span>
        </button>
      </div>
      {/* CHAT ENDS HERE --- */}

      <div className="w-screen h-screen bg-[#F4F1DE] flex flex-col justify-center items-center">
        <h1>{roomId}</h1>
        <div>Game ID</div>
        <div>Joined:{users?.[0]?.room} id={users?.[0]?.socketId}</div>
        {/* <icon src="" alt="pencil"/> */}
        <br/>

        <button onClick={() => {loadGame(users[0]?.room)}}className="bg-[#E07A5F] hover:outline text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Ex Kittens</button>
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
    </>
  );
};

export default Lobby;


