import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const { useRef } = React;

const JoinGameModal = ({ closeModal }) => {
  const codeRef = useRef(null)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(codeRef.current.value)
  }
  return (
    <div onSubmit={handleSubmit}>
      <div onClick={(e)=> closeModal(e)} className='fixed top-0 left-0 w-full h-full backdrop-blur-sm z-10'></div>
      <div className='absolute w-96 h-96 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white bg-[#F2CC8F] drop-shadow-2xl z-20 '>
        <button className='h-8 w-8 text-[#3D405B] float-right text-3xl' onClick={(e)=>closeModal(e)}>&times;</button>
        <form className='h-96 w-max flex flex-col justify-around' onSubmit={handleSubmit}>
          <label className='max-w-fit p-2'>Enter Game Code:
            <input className='max-w-fit block m-2' type='text' ref={codeRef} />
          </label>
          <button className={buttonStyle} type='submit'>Join</button>
        </form>
      </div>
    </div>
  )
}

const buttonStyle = 'p-2 bg-[#81B29A] rounded w-60 h-16 text-xl text-white font-bold hover:outline hover:outline-4 hover:outline-[#E07A5F]';

export default JoinGameModal;