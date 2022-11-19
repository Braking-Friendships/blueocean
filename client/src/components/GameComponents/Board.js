import React, { useState } from 'react';
import PlayerCard from './PlayerCard';
import OtherCard from './OtherCard';

const Board = () => {
  const [p1, setP1] = useState([]);
  const [p2, setP2] = useState([]);
  const [p3, setP3] = useState([]);
  const [p4, setP4] = useState([]);
  const [p5, setP5] = useState([]);
  const [stack, setStack] = useState();

  const startGame = () => {

  }
  return (
    <div className='flex justify-center items-center justify-around h-screen '>
      <div className='flex-col justify-center items-center gap-8'><OtherCard orientation={90}/><OtherCard orientation={90}/></div>
      <div className='flex-col justify-between items-stretch h-full bg-black'>
        <div className='flex'><OtherCard /><OtherCard /></div>
        <div className='flex'><OtherCard stack={true} /><OtherCard /></div>
        <div className='flex'><PlayerCard isPlayer={true}/><PlayerCard isPlayer={true}/></div>
      </div>
      <div className='flex-col justify-center items-center'><OtherCard orientation={-90}/><OtherCard orientation={-90}/></div>
    </div>
  )
}

export default Board
