import React from 'react'
import PlayerCard from './PlayerCard';

const CardDisplay = ({ futureCards, closeFuture }) => {
  const reverseCards = () => {
    let result = [];
    let length = futureCards.length - 1;

    for(let i = length; i >= 0; i--) {
      result.push(futureCards[i]);
    }
    return result;
  }

  return (
    <div className='absolute top-0 left-0 h-screen w-screen flex flex-col justify-center items-center z-[100]'>
      <div className='flex  justify-center items-center gap-12 bg-slate-300 rounded-lg p-8'>
        <div>Next</div>
        {reverseCards().map((card) => {
          return <PlayerCard key={card.id} card={card} firstLoad={false} />
        })}
        <div>Last</div>
      </div>
      <button
      className='bg-red-500 rounded-md w-14 h-8'
      onClick={closeFuture}>Close</button>
    </div>
  )
}

export default CardDisplay;
