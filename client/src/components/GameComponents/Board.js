import React, { useEffect, useState } from 'react';
import PlayerCard from './PlayerCard';
import OtherCard from './OtherCard';
import createDeck from '../../Tools/createDeck';

const Board = () => {
  const [myHand, setMyHand] = useState([]);
  const [p2L, setP2L] = useState(null);
  const [p3L, setP3L] = useState(null);
  const [p4L, setP4L] = useState(null);
  const [p5L, setP5L] = useState(null);
  const [stackL, setStackL] = useState(52);

  useEffect(() => {
    let decks = createDeck(4);
    console.log(decks)
    setMyHand(decks.hand1);
    setP2L(decks.hand2.length);
    setP3L(decks.hand3.length);
    setP4L(decks.hand4.length);
    // setP5L(decks.hand5.length);
    setStackL(decks.deck.length);
  }, []);

  const displayOtherHands = (count, side) => {
    let cards = [];
    for(let i = 0; i < count; i++) {
      cards.push(<OtherCard side={side} />)
    }
    return cards;
  }

  return (
    <div id="board" className='grid grid-cols-6 grid-rows-5 bg-blue-300 h-screen overflow-hidden'>
      <div id="left-player" className='row-start-2 row-end-5 col-start-1 col-end-2 flex flex-col justify-center items-center '>
        {displayOtherHands(p2L, 'left')}
      </div>
      <div id="top-player" className='row-start-1 row-end-2 col-start-3 col-end-5  flex justify-center'>
        {displayOtherHands(p4L, 'top')}
      </div>
      <div id="middle-stack" className='row-start-3 row-end-4 col-span-4 flex justify-center gap-7'>
        <OtherCard side='mid' />
        <OtherCard side='mid' />
      </div>
      <div id="bottom-player" className='row-start-5 row-end-6 col-start-2 col-end-6 flex justify-center items-end gap-2'>
        <PlayerCard />
        <PlayerCard />
        <PlayerCard />
      </div>
      <div id="right-player" className='row-start-2 row-end-5 col-span-1 col-end-7 flex flex-col justify-center items-center'>
        {displayOtherHands(p4L, 'right')}
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
