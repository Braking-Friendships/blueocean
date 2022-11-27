import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { socket, emitters } from '../../socket';
import createDeck from '../../Tools/createDeck';
import Chat from '../ChatComponents/Chat.js';

const Lobby = ({ inGameProfiles, userInfo }) => {

    // state for opening chat and badge icon -----
  const [isOpen, setOpen] = useState(false);
  const [receiveScroll, setReceiveScroll] = useState(false);
  const [badge, setBadge] = useState(false);
  const [newMess, setNewMess] = useState([]);
  const [newMess2, setNewMess2] = useState([]);
  const [hostRoom, setHostRoom] = useState();

  const newMessage = () => {
    // console.log(newMess.length, newMess2.length, 'check')
    if (newMess.length !== newMess2.length) {
      setBadge(true);
      setNewMess2(newMess);
    } else {
      setBadge(false);
    }
  }

  // console.log(inGameProfiles, 'bla')
  useEffect(() => {
    newMessage();
  }, [newMess])

  const navigate = useNavigate();
  // console.log(socket.id)

  // console.log(inGameProfiles)

  socket.on('start-join', (room) => {
    navigate(`/game`)
  })

  socket.on('update-room', (roomId) => {
    setHostRoom(roomId)
  })

  socket.on('return-lobby', () => {
    navigate('/lobby');
  })
  // socket.on('update-room', room_id => setRoomId(room_id))

  const loadGame = (room) => {
    console.log('inGameProfiles in loadGame:', inGameProfiles)
    //replace with real users
    //min2 - max4

    let users = inGameProfiles[0].players.map((player) => {
     return player.username
    })

    let decks = createDeck(users);

    decks.playerOrder = users;
    decks.room = inGameProfiles[0].room;
    socket.emit('join-game', room)

    setTimeout(() => {
      emitters.startGame(decks);
    }, 10)
    navigate(`/game`)
  }

  const leaveGame = () => {
    navigate(`/`)
  }

  return (
    <>
      {/* CHAT STARTS HERE ----  */}
      <div>
        <div className={isOpen ? 'bg-[#3D405B] h-100 w-screen max-w-sm flex flex-col flex-grow absolute right-0 px-15 mt-20 pb-0 rounded-l-lg border-[0.5px] border-black': "hidden"}>
          <button type="button" className="absolute left-0 ml-3 mt-3 text-white" onClick={(e) => {
          setOpen(!isOpen);
          newMessage();
          }}>X</button>
          <h5 className="absolute ml-[12.5vw] mt-10 text-white">Chat</h5>
          <div className="h-100 flex flex-col flex-grow mt-10">
            <Chat setNewMess={setNewMess} receiveScroll={receiveScroll} userInfo={userInfo} />
          </div>
        </div>
      </div>

      <div className={!isOpen ? "absolute inset-y-20 right-10" : "hidden"}>
        <span className={badge ? "flex h-1 w-3 ml-[7.3rem]" : "hidden"}>
          <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
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
      {inGameProfiles ? <div>Game ID: {inGameProfiles?.[0]?.room}</div> : <div>Game ID: {hostRoom}</div>}
      <br/>
        {console.log(socket.id)}
    <button onClick={() => {loadGame(inGameProfiles?.[0].room)}} className={`bg-[#E07A5F] hover:outline text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline `}
    hidden={socket.id !== inGameProfiles?.[0].host ? true : false}
    >Ex Kittens</button>
    <br/>
    {/* <button className="bg-[#3D405B] hover:outline text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">UNO</button>
    <br/> */}
    <button onClick={() => {leaveGame()}}className="bg-[#E07A5F] hover:outline text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Leave Game</button>
    <br/>
      <div>Chat functions (imported separately)</div>
    <br/>

        <div className ='flex flex-row justify-center items-center'>
          {inGameProfiles ? (inGameProfiles?.[0]?.players.map((player) =>
          <div key={player.username} className ='flex flex-col justify-center items-center'>
            <h4>{player.username}</h4>
            <img src={player.avatar} className='pointer-events-none w-52 h-auto rounded-full' alt="avatar card" />
          </div>)) :
            <div className ='flex flex-col justify-center items-center'>
            <h4>{userInfo.username}</h4>
            <img src={userInfo.avatar} className='pointer-events-none w-52 h-auto rounded-full' alt="avatar card" />
          </div>}
        </div>
      </div>
    </>
  );
};

export default Lobby;


