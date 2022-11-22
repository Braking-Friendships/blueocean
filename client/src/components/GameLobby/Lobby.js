import React, { useState, useEffect } from 'react';
import { socket, emitters } from '../../socket';
import Chat from '../ChatComponents/Chat';

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
    <div className='flex justify-around gap-2'>
        <button className="bg-[silver] hover:outline text-white font-bold py-2 px-4 rounded-full">Player1 Avatar</button>
        <button className="bg-[silver] hover:outline text-white font-bold py-2 px-4 rounded-full">Player2 Avatar</button>
        <button className="bg-[silver] hover:outline text-white font-bold py-2 px-4 rounded-full">Player3 Avatar</button>
        <button className="bg-[silver] hover:outline text-white font-bold py-2 px-4 rounded-full">Player4 Avatar</button>
        <button className="bg-[silver] hover:outline text-white font-bold py-2 px-4 rounded-full">Player5 Avatar</button>
    </div>

      {/* Chat offcanvas modal  */}
      <div className="absolute inset-y-20 right-10">

        <button class="inline-block px-6 py-2.5 bg-[#3D405B] text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-[#4b4e6f] hover:shadow-lg" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Open Chat</button>

        <div class="offcanvas offcanvas-end fixed bottom-0 flex flex-col max-w-full bg-white invisible bg-clip-padding shadow-sm outline-none transition duration-300 ease-in-out text-gray-700 top-0 right-0 border-none w-96" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
          <div class="offcanvas-header flex items-center justify-between p-4">
            <button type="button" class="btn-close box-content w-4 h-4 p-2 -my-5 -mr-2 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline" data-bs-dismiss="offcanvas" aria-label="Close">X</button>
            <h5 class="offcanvas-title mb-0 leading-normal font-semibold" id="offcanvasRightLabel">CHAT</h5>
          </div>
          <div class="">
            <Chat />
          </div>
        </div>
        </div>

    </div>

  );
};

export default Lobby;
