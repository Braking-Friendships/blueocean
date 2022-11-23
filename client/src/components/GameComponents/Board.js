import React, { useEffect, useRef, useState } from 'react';
import PlayerCard from './PlayerCard';
import OtherCard from './OtherCard';
import createDeck from '../../Tools/createDeck';
import { socket, emitters } from '../../socket.js';

socket.on('countdown', timer => console.log(timer))

const Board = () => {
  const playerAreaRef = useRef();
  const stackRef = useRef();

  const [firstLoad, setFirstLoad] = useState(true);
  const [playerArea, setPlayerArea] = useState(null);
  const [stackPosition, setStackPosition] = useState(null);

  useEffect(() => {
    setStackPosition(stackRef.current?.getBoundingClientRect());
  }, [])

  useEffect(() => {
    setPlayerArea(playerAreaRef.current?.getBoundingClientRect());
  }, [firstLoad]);

  const [myHand, setMyHand] = useState([]);
  const [p2L, setP2L] = useState(null);
  const [p3L, setP3L] = useState(null);
  const [p4L, setP4L] = useState(null);
  const [p5L, setP5L] = useState(null);
  const [stackL, setStackL] = useState(52);
  const [lastCardPlayed, setLastCardPlayed] = useState(null);
  socket.on('game-state', gameState => {
    console.log(gameState);
    setMyHand(gameState.hand1);
    setStackL(gameState.deck.length);
  })
  useEffect(() => {
    let decks = createDeck(4);

    // let huhHand = decks.hand1.map((card) => {card.id = Math.random(); return card})

    setMyHand(decks.hand1);
    // setMyHand(decks.hand1);
    setP2L(decks.hand2.length || null);
    setP3L(decks.hand3.length);
    setP4L(decks.hand4.length || null);
    // setP5L(decks.hand5.length);
    setStackL(decks.deck.length);
    setFirstLoad(false);
    // emitters.playCard('hand2', decks.hand2[4].type, 4)
    // emitters.playerLoses('hand1')
    emitters.startGame(decks);
  }, []);
  // emitters.playCard('future', [1], '', '', 6)
  // emitters.endGame();
  // emitters.drawCard('hand1')
  // socket.on('show-future', futureCards => {
  //   console.log('Next three cards', futureCards)
  // })

  const playCard = (idx) => {
    let tempHand = [...myHand];
    let tempCard = tempHand.splice(idx, 1);

    //if type is cat, ask for another cat
    //if action is a steal, ask for player input on who to steal from

    emitters.playCard(tempCard.type, [idx])

    setLastCardPlayed(tempCard[0]);
    setMyHand(tempHand);
  }
  const drawCard = () => {
    emitters.drawCard();
  }

  const displayOtherHands = (count, side) => {
    let cards = [];
    for(let i = 0; i < count; i++) {
      cards.push(<OtherCard key={i} side={side} stackPosition={stackPosition} idx={i} />)
    }
    return cards;
  }

  return (
    <div id="board" className='grid grid-cols-6 grid-rows-5 bg-blue-300 h-screen overflow-hidden col-span-4'>
      {p2L !== null &&
      <div id="left-player" className='row-start-2 row-end-5 col-start-1 col-end-2 flex flex-col justify-center items-center '>
        {displayOtherHands(p2L, 'left')}
      </div>}
      <div id="top-player" className='row-start-1 row-end-2 col-start-3 col-end-5  flex justify-center'>
        {displayOtherHands(p3L, 'top')}
      </div>
      <div id="middle-stack" className='row-start-3 row-end-4 col-start-2 col-end-6 flex justify-center items-end gap-7'>
        <button onClick={drawCard}>
          <OtherCard ref={stackRef} side='mid' />
        </button>
        {lastCardPlayed
        ? <PlayerCard key={lastCardPlayed.id} card={lastCardPlayed}  />
        : <div className='w-[200px] h-[271px]'
        style={{
          background:
            `linear-gradient(to right, black 4px, transparent 4px) 0 0,
            linear-gradient(to right, black 4px, transparent 4px) 0 100%,
            linear-gradient(to left, black 4px, transparent 4px) 100% 0,
            linear-gradient(to left, black 4px, transparent 4px) 100% 100%,
            linear-gradient(to bottom, black 4px, transparent 4px) 0 0,
            linear-gradient(to bottom, black 4px, transparent 4px) 100% 0,
            linear-gradient(to top, black 4px, transparent 4px) 0 100%,
            linear-gradient(to top, black 4px, transparent 4px) 100% 100%`,
          backgroundSize: '40px 40px',
          backgroundRepeat: 'no-repeat'
        }}
        ></div>}
      </div>
      {!firstLoad && <div
      id="bottom-player"
      className='row-start-5 row-end-6 col-start-2 col-end-6 flex justify-center items-end gap-2 bg-red-300'
      ref={playerAreaRef}
      draggable={false}
      >
        {myHand.map((card, i) =>
          <PlayerCard key={card.id} card={card} playerArea={playerArea} stackPosition={stackPosition} idx={i} playCard={playCard} />
        )}
      </div>}
      {p4L &&
      <div id="right-player" className='row-start-2 row-end-5 col-start-6 col-end-7 flex flex-col justify-center items-center'>
        {displayOtherHands(p4L, 'right')}
      </div>}

    </div>
  )
}

export default Board
