import React from 'react';
import {useState, useEffect} from 'react';
import ChatEntry from './ChatEntry.js';
import { socket, emitters } from '../../socket.js';


const Chat = (props) => {
  // SOCKET.IO -----------------------------------------------

  // recieves/post messages
  socket.on('receive-message', (user, message, avatar) => {
    handleMsgSubmit(user, message, avatar);
    // console.log(user, message, 'receive');
    // console.log('MESSAGE RECEIVE ID: ', socket.id);
  })

  // sends messages to everyone or to a specific user id
  const handleBroadSubmit = (user, message, avatar, room) => {
    emitters.handleBroadSubmit(user, message, avatar, room);
    // console.log('MESSAGE SENT ID: ', socket.id);
  }
  let roomy = '';
  // add users to rooms -----
  // const handleRmSubmit = (room) => {
  //   // socket to join rooms
  //   emitters.handleRmSubmit(room);
  //   roomy = room;
  //   console.log('JOINED ROOM: ', room);
  // }

  // ---------------------------------------------------------

  let date = new Date().toISOString();
  // console.log(date, 'ISO')

  // dummy/test data
  // const [messages, setMessages] = useState([{username: 'Fernando', isItMe: true, message: 'yo', date: date}, {username: 'Josh', isItMe: false, message: 'wassup', date: date}, {username: 'Fernando', isItMe: true, message: 'hello', date: date}, {username: 'Jonah', isItMe: false, message: 'hi', date: date}, {username: 'Fernando', isItMe: true, message: 'yoyo', date: date}, {username: 'Hieu', isItMe: false, message: 'hey', date: date}, {username: 'Fernando', isItMe: true, message: 'hello', date: date}, {username: 'Hieu', isItMe: true, message: 'hello', date: date}, {username: 'Eric', isItMe: false, message: 'hello', date: date}, {username: 'Joe', isItMe: false, message: 'whats up', date: date}]);

  const [messages, setMessages] = useState([]);


  const handleMsgSubmit = (user, message, avatar, isItMe = false) => {
    let me = isItMe;
    // create message obj
    let msg = {username: user, isItMe: me, message: message, avatar: avatar, date: date};
    setMessages([...messages, msg]);
    props.setNewMess([...messages, msg]);
  }

  // auto scroll messages in chat
  function updateScroll() {
    var element = document.getElementById('chatContainer');
    element.scrollTop = element.scrollHeight;
  }

  useEffect(() => {
    updateScroll();
    // adds badge number to chat button
    // props.setChatMessages(messages.length);
  }, [messages, props.receiveScroll])


  return (
      // {/* <!-- Component Start --> */}
      <div className="flex flex-col flex-grow w-full max-w-sm bg-[#F2CC8F] shadow-xl rounded-lg overflow-hidden mt-12">
        <div id='chatContainer' className="flex flex-col flex-grow h-98 p-4 overflow-y-auto scroll-smooth">

          {/* <!-- chat messages --> */}
          <div id='chatContainer' className="chat-container">
            <span className='ml-[35%]'>Start chatting...</span>
            <div id='chatContainer' className='EContainer'>
              {messages.map((mess, index) => (
                <ChatEntry mess={mess} key={index} />
              ))}
            </div>
          </div>
        </div>

        {/* type your message bar --------------------- */}
        <form className="bg-gray-300 p-4 flex items-start" onSubmit={(e) => {
          e.preventDefault();
          (props.inGameProfiles !== undefined) ?
            props.inGameProfiles[0].players.forEach((curr, index, collection) => {
              if (curr.socketId === socket.id) {
                console.log(curr, 'im in submit message')
                // display sent message right away to sender
                handleMsgSubmit(curr.username, e.target.msg.value, curr.avatar, true);
                // sends messages to all
                handleBroadSubmit(curr.username, e.target.msg.value, curr.avatar, roomy);
                e.target.msg.value = '';
              }
            }) :
            console.log('Players are undefined!');
        }}>
          <input className="flex-row items-center h-10 w-11/12 rounded px-3 text-sm" type="text" name='msg' placeholder="Type your message…"></input>
          <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 ml-1 transform rotate-90">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
            </svg>
          </button>
        </form>

        {/* input to type room to join ----- */}
        {/* <form onSubmit={(e) => {
            e.preventDefault();
            //joins room
            handleRmSubmit(e.target.rm.value);
            e.target.rm.value = '';
          }}>
          <div className="bg-gray-300 p-4 flex items-start">
            <input className="flex-row items-center h-10 w-11/12 rounded px-3 text-sm" type="text" name='rm' placeholder="Type room name..."></input>
            <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 ml-1 transform rotate-90">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
              </svg>
            </button>
          </div>
        </form> */}

      </div>
      // {/* <!-- Component End  --> */}
  )
}

export default Chat;