import React from 'react'
import Board from './Board'
import Chat from '../ChatComponents/Chat'

const GameRoom = () => {
  return (
    <div className='grid grid-cols-5'>
      <Board />
      <Chat />
    </div>
  )
}

export default GameRoom
