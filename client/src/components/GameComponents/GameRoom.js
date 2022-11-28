import React from 'react'
import Board from './Board'
import Chat from '../ChatComponents/Chat';
import {useState, useEffect} from 'react';

const GameRoom = ({ inGameProfiles, userInfo }) => {
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
      <div className={isOpen ? 'grid grid-cols-5 bg-[#F4F1DE]': "bg-[#F4F1DE]"}>
        <Board myId={userInfo.username} userInfo={userInfo} />
        <div className={isOpen ? 'animate-slide-in-right  bg-[#3D405B] h-101 w-[20vw] max-w-sm flex flex-col flex-grow absolute right-0 px-15 pt-0 pb-0 border-l-2 border-black': "hidden"}>
          <button type="button" className="absolute left-0 ml-3 mt-3 text-white" onClick={(e) => {
          setOpen(!isOpen);
          newMessage();
          }}>X</button>
          <h5 className="absolute ml-[9vw] mt-10 text-white">Chat</h5>
          <div className="h-101 flex flex-col flex-grow mt-10">
            <Chat setNewMess={setNewMess} receiveScroll={receiveScroll} inGameProfiles={inGameProfiles} userInfo={userInfo} />
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
    </>
  )
}

export default GameRoom
