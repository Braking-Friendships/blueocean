import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { socket, emitters } from '../../socket';
import createDeck from '../../Tools/createDeck';

const Lobby = ({ inGameProfiles }) => {

  const navigate = useNavigate();
  console.log(socket.id)

  console.log(inGameProfiles)

  socket.on('start-join', (room) => {
    navigate(`/game`)
  })

  const loadGame = (room) => {
    let decks = createDeck(4);
    emitters.startGame(decks);
    socket.emit('join-game', room)
    navigate(`/game`)
  }

  const leaveGame = () => {
    navigate(`/`)
  }

  return (
    <div className="w-screen h-screen bg-[#F4F1DE] flex flex-col justify-center items-center">
      <div>Game ID: {inGameProfiles?.[0].room}</div>
      {/* <icon src="" alt="pencil"/> */}
    <br/>

    <button onClick={() => {loadGame(inGameProfiles?.[0].room)}}className="bg-[#E07A5F] hover:outline text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Ex Kittens</button>
    <br/>
    <button className="bg-[#3D405B] hover:outline text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">UNO</button>


    <br/>
    <button onClick={() => {leaveGame()}}className="bg-[#E07A5F] hover:outline text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Leave Game</button>
    <br/>
      <div>Chat functions (imported separately)</div>
    <br/>

      <div className ='flex flex-row justify-center items-center'>
        {inGameProfiles ? (inGameProfiles?.[0]?.players.map((player) =>
        <div className ='flex flex-col justify-center items-center'>
          <h4>{player.username}</h4>
          <img src={player.avatar} className='pointer-events-none w-52 h-auto rounded-full' alt="avatar card" />
        </div>)) : null}
      </div>
    </div>
  );
};

export default Lobby;


