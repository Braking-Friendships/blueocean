import React from 'react'
import PlayerCard from './PlayerCard';

const CardDisplay = ({ futureCards, closeFuture }) => {
  const reverseCards = () => {
    let result = [];
    for(let i = 2; i >= 0; i--) {
      result.push(futureCards[i]);
    }
    return result;
  }

  return (
    <div className='absolute top-0 left-0 h-screen w-screen flex flex-col justify-center items-center'>
      <div className='flex  justify-center items-center gap-12'>
        {reverseCards().map((card) => {
          return <PlayerCard key={card.id} card={card} firstLoad={false} />
        })}
      </div>
      <button
      className='bg-slate-100 rounded-md w-14 h-8'
      onClick={closeFuture}>Close</button>
    </div>
  )
}

export default CardDisplay;
