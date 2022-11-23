import React from 'react';
import { useState, useEffect } from 'react';
import { socket, emitters } from '../../socket';
import Chat from '../ChatComponents/Chat';


const Lobby = (props) => {
  // chat badge code --------------
  // state for opening chat
  const [isOpen, setOpen] = useState(false);
  // const [newMess, setNewMess] = useState(true);
  // const [badge, setBadge] = useState(0);
  // const [count, setCount] = useState(0);

  // useEffect(() => {
  //   // setBadge(props.chatMessages - count)
  //   // setCount(props.chatMessages);
  //   // setNewMess(!newMess);
  // }, [props.chatMessages, isOpen])

  return (
    <>
      {/* CHAT STARTS HERE ----  */}
      <div>
        <div className={isOpen ? 'bg-[#3D405B] h-130 w-screen max-w-sm flex flex-col flex-grow absolute right-0 px-15 mt-20 pb-0 rounded-l-lg': "hidden"}>
          <button type="button" className="absolute left-0 ml-3 mt-3 text-white" onClick={(e) => setOpen(!isOpen)}>X</button>
          <h5 className="absolute ml-48 mt-10 text-white">Chat</h5>
          <div className="h-130 flex flex-col flex-grow mt-10">
            <Chat />
          </div>
        </div>
      </div>

      <div className={!isOpen ? "absolute inset-y-20 right-10" : "hidden"}>
        <button className="inline-block px-6 py-2.5 bg-[#3D405B] text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-[#4b4e6f] hover:shadow-lg" type="button" onClick={(e) => setOpen(!isOpen)}>
          <span className="mr-2">Open Chat</span>
          {/* {!newMess ? <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">!</span> : ''} */}
          <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">!</span>
        </button>
      </div>
      {/* CHAT ENDS HERE --- */}

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
      </div>
    </>
  );
};

export default Lobby;
