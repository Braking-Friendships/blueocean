/* eslint-disable jsx-a11y/img-redundant-alt */
import react from 'react';
import img from './tyranitarCropped.png'
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className='relative top-1/4'>
      <div className='flex justify-evenly'>
        {/* <GameNav /> */}
        <div className='flex flex-col gap-4 justify-around'>
        {/* bg-[#81B29A] hover:outline text-white font-bold py-2 px-4 rounded FROM JOSH */}
          <Link className='p-4 bg-[#81B29A] rounded h-16 w-80 text-xl text-center text-white font-bold hover:outline hover:outline-4 hover:outline-[#E07A5F]'> Host a Game </Link>
          <button className='p-2 bg-[#81B29A] rounded w-80 h-16 text-xl text-white font-bold hover:outline hover:outline-4 hover:outline-[#E07A5F]'> Join a Game </button>
          <button className='p-2 bg-[#81B29A] rounded w-80 h-16 text-xl text-white font-bold hover:outline hover:outline-4 hover:outline-[#E07A5F]'> Join a Random Game </button>
        </div>
        {/* <Profile /> */}
        <div className='flex flex-col gap-4 justify-center'>
          <img src={img} alt='profile picture' className='object cover h-80 w-80 rounded-full'/>
          <div className='flex justify-center'>
            <div className='max-w-max text-2xl'>Username</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage;
