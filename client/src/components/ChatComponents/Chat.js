import React from 'react';
import {useState, useEffect} from 'react';
import ChatEntry from './ChatEntry.js';


const Chat = (props) => {

  let date = new Date().toISOString();
  console.log(date, 'ISO')

  const [messages, setMessages] = useState([{username: 'Fernando', isItMe: true, message: 'hello', date: date}, {username: 'Josh', isItMe: false, message: 'hello', date: date}, {username: 'Fernando', isItMe: true, message: 'hello', date: date}, {username: 'Jonah', isItMe: false, message: 'hello', date: date}, {username: 'Fernando', isItMe: true, message: 'hello', date: date}, {username: 'Hieu', isItMe: false, message: 'hello', date: date}, {username: 'Fernando', isItMe: true, message: 'hello', date: date}, {username: 'Hieu', isItMe: true, message: 'hello', date: date}, {username: 'Eric', isItMe: false, message: 'hello', date: date}, {username: 'Joe', isItMe: false, message: 'hello', date: date}])

  const handleMsgSubmit = (message) => {
    let msg = {username: 'Fernando', isItMe: true, message: message, date: date};
    setMessages([...messages, msg]);
  }

  useEffect(() => {

  }, [messages])


  return (

    <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-[#F4F1DE] text-gray-800 p-10">

      {/* <!-- Component Start --> */}
      <div className="flex flex-col flex-grow w-full max-w-xl bg-[#F2CC8F] shadow-xl rounded-lg overflow-hidden">
        <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">

          {/* <!-- chat messages --> */}
          <div className="transaction-container">
            <div id='transContainer' className='EContainer'>
              {messages.map((mess, index) => (
                <ChatEntry mess={mess} key={index} />
              ))}
            </div>
          </div>

          {/* response bubble -----------------------
          <div class="flex w-full mt-2 space-x-3 max-w-xs">
            profile bubble ---
            <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
            <div>
              chat bubble -----
              <div class="bg-[#E07A5F] p-3 rounded-r-lg rounded-bl-lg">
                <p class="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
              <span class="text-xs text-gray-500 leading-none">2 min ago</span>
            </div>
          </div>

          my bubble -----------------------
          <div class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
            <div>
              <div class="bg-[#81B29A] text-black p-3 rounded-l-lg rounded-br-lg">
                <p class="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</p>
              </div>
              <span class="text-xs text-gray-500 leading-none">2 min ago</span>
            </div>
            <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
          </div>
          my bubble -----------------------
          <div class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
            <div>
              <div class="bg-[#81B29A] text-black p-3 rounded-l-lg rounded-br-lg">
                <p class="text-sm">Lorem ipsum dolor sit amet.</p>
              </div>
              <span class="text-xs text-gray-500 leading-none">2 min ago</span>
            </div>
            <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
          </div>

          response bubble -----------------------
          <div class="flex w-full mt-2 space-x-3 max-w-xs">
            <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
            <div>
              <div class="bg-[#E07A5F] p-3 rounded-r-lg rounded-bl-lg">
                <p class="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
              </div>
              <span class="text-xs text-gray-500 leading-none">2 min ago</span>
            </div>
          </div>

          my bubble -----------------------
          <div class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
            <div>
              <div class="bg-[#81B29A] text-black p-3 rounded-l-lg rounded-br-lg">
                <p class="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
              </div>
              <span class="text-xs text-gray-500 leading-none">2 min ago</span>
            </div>
            <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
          </div>
          my bubble -----------------------
          <div class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
            <div>
              <div class="bg-[#81B29A] text-black p-3 rounded-l-lg rounded-br-lg">
                <p class="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
              </div>
              <span class="text-xs text-gray-500 leading-none">2 min ago</span>
            </div>
            <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
          </div>
          my bubble -----------------------
          <div class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
            <div>
              <div class="bg-[#81B29A] text-black p-3 rounded-l-lg rounded-br-lg">
                <p class="text-sm">Lorem ipsum dolor sit amet.</p>
              </div>
              <span class="text-xs text-gray-500 leading-none">2 min ago</span>
            </div>
            <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
          </div>

          response bubble -----------------------
          <div class="flex w-full mt-2 space-x-3 max-w-xs">
            <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
            <div>
              <div class="bg-[#E07A5F] p-3 rounded-r-lg rounded-bl-lg">
                <p class="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
              </div>
              <span class="text-xs text-gray-500 leading-none">2 min ago</span>
            </div>
          </div>

          my bubble -----------------------
          <div class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
            <div>
              <div class="bg-[#81B29A] text-black p-3 rounded-l-lg rounded-br-lg">
                <p class="text-sm">Lorem ipsum dolor sit.</p>
              </div>
              <span class="text-xs text-gray-500 leading-none">2 min ago</span>
            </div>
            <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
          </div> */}
        </div>


        {/* type your message bar --------------------- */}
        <form className="bg-gray-300 p-4 flex items-start" onSubmit={(e) => {
          e.preventDefault();
          console.log(e.target.msg.value, 'wow')
          handleMsgSubmit(e.target.msg.value);
        }}>
          <input className="flex-row items-center h-10 w-11/12 rounded px-3 text-sm" type="text" name='msg' placeholder="Type your message…"></input>
          <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 ml-1 transform rotate-90">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
            </svg>
          </button>
        </form>
        <form className="bg-gray-300 p-4 flex items-start">
          <input className="flex-row items-center h-10 w-11/12 rounded px-3 text-sm" type="text" placeholder="Type room name..."></input>
          <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 ml-1 transform rotate-90">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
            </svg>
          </button>
        </form>
      </div>
      {/* <!-- Component End  --> */}

    </div>
  )
}

export default Chat;
