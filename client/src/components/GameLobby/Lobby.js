import React, { useState, useEffect } from 'react';
import { socket, emitters } from '../../socket';

const Lobby = () => {



  return (
    <div className="w-screen h-screen bg-[#F4F1DE] flex flex-col justify-center items-center">
      <h1>Game Lobby</h1>
      <div>Game ID</div>
      {/* <icon src="" alt="pencil"/> */}
    <br/>

    <button className="bg-[#E07A5F] hover:outline text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Ex Kittens</button>
    <br/>
    <button className="bg-[#3D405B] hover:outline text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">UNO</button>


    <br/>
    <button className="bg-[#E07A5F] hover:outline text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Leave Game</button>
    <br/>
      <div>Chat functions (imported separately)</div>
    <br/>

      <button className="bg-[silver] hover:outline text-white font-bold py-2 px-4 rounded-full">Player1 Avatar</button>
    <br/>
      <button className="bg-[silver] hover:outline text-white font-bold py-2 px-4 rounded-full">Player2 Avatar</button>
    <br/>
      <button className="bg-[silver] hover:outline text-white font-bold py-2 px-4 rounded-full">Player3 Avatar</button>
    <br/>
      <button className="bg-[silver] hover:outline text-white font-bold py-2 px-4 rounded-full">Playe4 Avatar</button>
    <br/>
      <button className="bg-[silver] hover:outline text-white font-bold py-2 px-4 rounded-full">Player5 Avatar</button>

    </div>
  );
};

export default Lobby;
