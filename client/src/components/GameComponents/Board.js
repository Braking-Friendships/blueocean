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

    <div id="board" className='grid grid-cols-6 grid-rows-5 bg-black h-screen overflow-hidden'>
      <div id="left-player" className='row-span-full col-span-1 flex flex-col justify-center items-center bg-red-300 '>
        <OtherCard orientation={90} />
        <OtherCard orientation={90} />
        <OtherCard orientation={90} />
      </div>
      <div id="top-player" className='row-start-1 row-end-2 col-span-4 bg-green-400 flex justify-center'>
        <OtherCard />
        <OtherCard />

      </div>
      <div id="middle-stack" className='row-start-3 row-end-4 col-span-4 bg-green-400 flex justify-center gap-7'>
        <OtherCard stack={true} />
        <OtherCard />
      </div>
      <div id="bottom-player" className='row-start-5 row-end-6 col-span-4 bg-green-400 flex justify-center items-end gap-2'>
        <PlayerCard />
        <PlayerCard />
        <PlayerCard />
      </div>
      <div id="right-player" className='row-span-full col-span-1 col-end-7 flex flex-col justify-center items-center bg-blue-500'>
        <OtherCard orientation={-90} />
        <OtherCard orientation={-90} />
      </div>

    </div>
  )
}
/* <div className='flex justify-around items-center h-[95vh] '>
      <div className='flex-col justify-center items-center bg-red-600'><OtherCard orientation={90}/><OtherCard orientation={90}/></div>
      <div className='flex-col justify-center items-center h-full bg-black'>
        <div className='flex h-1/3'><OtherCard /><OtherCard /></div>
        <div className='flex h-1/3'><OtherCard stack={true} /><OtherCard /></div>
        <div className='flex h-1/3'><PlayerCard isPlayer={true}/><PlayerCard isPlayer={true}/></div>
      </div>
      <div className='flex-col justify-center items-center bg-green-500'><OtherCard orientation={-90}/><OtherCard orientation={-90}/></div>
    </div> */
export default Board
