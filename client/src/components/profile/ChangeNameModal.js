import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// const { useRef } = React;

const ChangeNameModal = ({ nameModal, setNameModal }) => {
  if (!nameModal) { return null }


  return (
    <div>
      <div className='fixed top-0 left-0 w-full h-full backdrop-blur-sm z-10'></div>
      <div className='absolute w-96 h-80 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white bg-[#F2CC8F] drop-shadow-2xl z-20  rounded-lg'>
        <button className='h-fit w-8 text-[#3D405B] float-right text-3xl hover:text-[#E07A5F] rounded-lg'>&times;</button>
        <form className='h-80 w-max flex flex-col items-center justify-center ml-10 p-0'>
          <h2 className='max-w-max p-2 mb-4 text-3xl'>Enter Game Code:</h2>
          <input className='mb-4 rounded-sm text-[#3D405B] text-3xl text-center' type='text'/>
          <button className={buttonStyle} type='submit'>Join</button>
        </form>
      </div>
    </div>
  )
}

const buttonStyle = 'p-2 bg-[#81B29A] rounded w-60 h-16 text-xl text-white font-bold hover:outline hover:outline-4 hover:outline-[#E07A5F]';

export default ChangeNameModal;