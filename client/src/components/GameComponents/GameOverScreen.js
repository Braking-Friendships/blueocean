import React from 'react'
import { emitters } from '../../socket';

const GameOverScreen = ({ winner }) => {

  return (
    <div
    className='absolute top-0 left-0 w-screen h-screen flex justify-center items-center'
    >
      <div
      className='rounded-xl bg-slate-50 flex flex-col justify-center items-center text-xl p-8 gap-6'
      >
        <h3 className='text-5xl'>Game Over</h3>
        <p>{winner} didn't blow up!</p>
        <button
        className='bg-red-500 rounded-md p-4'
        onClick={()=> {
          emitters.returnLobby()
        }}>Back to Lobby</button>
      </div>
    </div>
  )
}

export default GameOverScreen;
