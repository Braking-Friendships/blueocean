import React from 'react'
import Board from './Board'
import Chat from '../ChatComponents/Chat';
import {useState} from 'react';


const GameRoom = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <div className={isOpen ? 'grid grid-cols-5 bg-[#3D405B]': ""}>
        <Board />
        <div className={isOpen ? 'h-170 w-screen max-w-sm flex flex-col flex-grow absolute right-0 px-15 pt-0 pb-0': "hidden"}>
          <button type="button" className="absolute left-0 ml-3 mt-3 text-white" onClick={(e) => setOpen(!isOpen)}>X</button>
          <h5 className="absolute ml-48 mt-10 text-white">Chat</h5>
          <div className="h-170 flex flex-col flex-grow mt-10">
            <Chat />
          </div>
        </div>
      </div>

      <div className="absolute inset-y-20 right-10">
        <button className={!isOpen ? "inline-block px-6 py-2.5 bg-[#3D405B] text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-[#4b4e6f] hover:shadow-lg" : "hidden"} type="button" onClick={(e) => setOpen(!isOpen)}>Open Chat</button>
      </div>
    </>
  )
}

export default GameRoom
