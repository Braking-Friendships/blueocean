import React from 'react';
import { formatDistanceToNow, parseISO } from "date-fns";


const ChatEntry = (props) => {

  return (
    <>
      {props.mess.isItMe === true ?
      // my bubble -----------------------
      <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
        <div>
          <div className="bg-[#81B29A] text-black p-3 rounded-l-lg rounded-br-lg">
            <p className="text-sm">{`${props.mess.message}`}</p>
          </div>
          <span className="text-xs text-gray-500 leading-none">{`${formatDistanceToNow(parseISO(props.mess.date))}`}</span>
          {/* <span className="text-xs text-gray-500 leading-none">{`${formatDistanceToNow(parseISO(props.mess.date))}`}  &nbsp;&nbsp;|&nbsp;&nbsp; </span>
          <span className="text-xs text-gray-500 leading-none">{`${props.mess.username}`}</span> */}
        </div>
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
      </div> :
      // {/* response bubble -----------------------
      <div className="flex w-full mt-2 space-x-3 max-w-xs">
        {/* profile bubble --- */}
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
        <div>
          {/* chat bubble ----- */}
          <div className="bg-[#E07A5F] p-3 rounded-r-lg rounded-bl-lg">
            <p className="text-sm">{`${props.mess.message}`}</p>
          </div>
          <span className="text-xs text-gray-500 leading-none">{`${props.mess.username}`}  &nbsp;&nbsp;|&nbsp;&nbsp; </span>
          <span className="text-xs text-gray-500 leading-none">{`${formatDistanceToNow(parseISO(props.mess.date))}`}</span>
        </div>
      </div>}
    </>
  )
}

export default ChatEntry;
