import React, { useEffect, useRef, useState } from 'react';
import PlayerCard from './PlayerCard';
import OtherCard from './OtherCard';
import { socket, emitters } from '../../socket.js';
import PickButtons from './PickButtons';

// socket.on('card-countdown', timer => console.log(timer))

const Board = ({ myId }) => {
  const playerAreaRef = useRef();
  const stackRef = useRef();

  const [firstLoad, setFirstLoad] = useState(true);
  const [playerArea, setPlayerArea] = useState(null);
  const [myHand, setMyHand] = useState([]);
  const [p2L, setP2L] = useState(null);
  const [p3L, setP3L] = useState(null);
  const [p4L, setP4L] = useState(null);
  const [stackL, setStackL] = useState(52);
  const [playerOrder, setPlayerOrder] = useState(null);
  const [initialOrder, setInitialOrder] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [lastCardPlayed, setLastCardPlayed] = useState(null);
  const [BOMB, setBOMB] = useState(null);
  const [bombTimer, setBombTimer] = useState(null);
  const [cardTimer, setCardTimer] = useState(null);
  const [pickSteal, setPickSteal] = useState(null);
  // pickSteal: [cardIdxs]

  useEffect(() => {
    setPlayerArea(playerAreaRef.current?.getBoundingClientRect());
  }, [firstLoad]);

  useEffect(() => {
    socket.on('game-state', gameState => {
      emitters.updateSocket(gameState);
      console.log('in useEffect in board.js', gameState);
      //replace 'c' with myId
      let myIdx = gameState.initialOrder.indexOf(myId);
      let playerCount = gameState.initialOrder.length;

      setMyHand(gameState[gameState.initialOrder[myIdx]]);

      if(playerCount === 2) {
        setP3L(gameState[gameState.initialOrder[(myIdx+1) % playerCount]]?.length);
      } else if (playerCount === 3) {
        setP2L(gameState[gameState.initialOrder[(myIdx+1) % playerCount]]?.length);
        setP3L(gameState[gameState.initialOrder[(myIdx+2) % playerCount]]?.length);
      } else {
        setP2L(gameState[gameState.initialOrder[(myIdx+1) % playerCount]]?.length);
        setP3L(gameState[gameState.initialOrder[(myIdx+2) % playerCount]]?.length);
        setP4L(gameState[gameState.initialOrder[(myIdx+3) % playerCount]]?.length);
      }

      setStackL(gameState.deck.length);
      setPlayerOrder(gameState.playerOrder);
      setInitialOrder(gameState.initialOrder);
      setCurrentPlayer(gameState.currentPlayer);
      let card = gameState.prevTurns[gameState.prevTurns.length - 1]?.userCardType;

      if(card) {
        setLastCardPlayed({type: card, img: card, id: 100});
      }
    });

    socket.on('bomb', (newCard, gameState) => {
      setStackL(gameState.deck.length);
      setBOMB(newCard);
    });
    socket.on('bomb-countdown', (timer) => {
      if(timer === 0) {
        setBombTimer(null);
      } else {
        setBombTimer(timer);
      }
    })
    socket.on('card-countdown', (timer) => {
      if(timer === 0) {
        setCardTimer(null);
      } else {
        setCardTimer(timer);
      }
    })
    socket.on('show-future', (cards)=>{
      console.log(cards)
    })
    socket.on('defuse', () => {
      setBombTimer(null);
      setBOMB(null);
    });
    socket.on('nope-effect', () => emitters.clearInterval());
  }, []);

  useEffect(() => {
    let timer = setTimeout(() => {
      setFirstLoad(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const playCard = (idx) => {
    let tempHand = [...myHand];
    let tempCard = tempHand.splice(idx, 1)[0];

    if(tempCard.type === 'nope') {
      console.log('me card timer', cardTimer);
      if(cardTimer !== null) {
        emitters.nope(myId, [idx]);
        setCardTimer(null);
        return;
      } else {
        return;
      }
    } else if(cardTimer !== null) {
      return;
    } else if(currentPlayer !== myId) {
      return;
    } else if(tempCard.type === 'defuse'){
      if(BOMB === null) {
        return;
      }
      setBOMB(null);
      emitters.defuse(Math.floor(Math.random()*stackL), [idx]);
      return;
    }

    setCardTimer(6);
    if (tempCard.type === 'favor') {
      setPickSteal({ card: tempCard, idxs: [idx] });
    } else if(tempCard.type.includes('cat')) {
      //if type is cat, ask for another cat
      let secondIdx = findMatch(tempCard.type, idx);
      if(secondIdx !== null) {
        setPickSteal({ card: tempCard, idxs: [idx, secondIdx] });
      } else {
        //Maybe show an error(needs 2 copies)
        return;
      }
    } else {
      emitters.playCard(tempCard.type, [idx]);
    }
    //if action is a steal, ask for player input on who to steal from
    setLastCardPlayed(tempCard);
    // setMyHand(tempHand);
  }
  const getStackPos = () => {
    return stackRef.current?.getBoundingClientRect();
  }

  const findMatch = (type, currIdx) => {
    for(let i = 0; i < myHand.length; i++) {
      if(myHand[i].type === type && i !== currIdx ) {
        return i;
      }
    }
    return null;
  }

  const steal = (userCardType, userCardIdxs, opponent) => {
    emitters.playCard(userCardType, userCardIdxs, opponent);
    setPickSteal(null);
  }

  const drawCard = () => {
    if(currentPlayer === myId) {
      emitters.drawCard();
    }
  }

  const displayOtherHands = (count, side) => {
    let cards = [];
    for(let i = 0; i < count; i++) {
      cards.push(<OtherCard key={i} side={side} getStackPos={getStackPos} firstLoad={firstLoad} idx={i} />)
    }
    return cards;
  }

  return (
    <div id="board" className='grid grid-cols-6 grid-rows-5 bg-blue-300 h-screen overflow-hidden col-span-4'>
      {p2L !== null &&
      <div id="left-player" className='row-start-2 row-end-5 col-start-1 col-end-2 flex flex-col justify-center items-center '>
        {displayOtherHands(p2L, 'left')}
      </div>}
      <div
      className='row-start-3 row-end-4 col-start-2 col-end-3 flex justify-center items-start text-2xl'
      >
        {initialOrder !== null && (initialOrder.length > 2 ? initialOrder[(initialOrder.indexOf(myId) + 1) % initialOrder.length] : null)}
      </div>
      <div id="top-player" className='row-start-1 row-end-2 col-start-3 col-end-5  flex justify-center'>
        {displayOtherHands(p3L, 'top')}
      </div>
      <div
      className='row-start-2 row-end-3 col-start-3 col-end-5 flex justify-center items-start text-2xl'
      >
        {initialOrder !== null && (initialOrder.length === 2 ? initialOrder[(initialOrder.indexOf(myId) + 1) % initialOrder.length] : initialOrder[(initialOrder.indexOf(myId) + 2) % initialOrder.length])}
      </div>
      <div id="middle-stack" className='row-start-3 row-end-4 col-start-3 col-end-5 flex justify-center items-end gap-7 bg-white'>
        {BOMB ? <PlayerCard key={BOMB.id} card={BOMB} /> : null}

        <button
        className='relative'
        onClick={drawCard}>
          <OtherCard ref={stackRef} side='mid' />
          <div className='absolute bottom-4 right-4 text-4xl z-20'>{stackL}</div>
        </button>

        {lastCardPlayed
        ? <PlayerCard key={lastCardPlayed.id} card={lastCardPlayed} firstLoad={firstLoad} />
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

        <div
        className='bg-green-300 rounded-md flex flex-col justify-center items-center h-full p-10'
        >
          {cardTimer ? <div>Card Timer: {cardTimer}</div> : null}
          {bombTimer ? <div className='text-red-600'>Bomb Timer: {bombTimer}</div> : null}
          <div>Current Player:</div>
          <div>{currentPlayer}</div>
          <div> ---> </div>
        </div>
      </div>
      <div
        className='row-start-4 row-end-5 col-start-2 col-end-6 flex justify-center items-end text-2xl p-20'
      >
        {myId}
      </div>
      <div
      id="bottom-player"
      className='row-start-5 row-end-6 col-start-2 col-end-6 flex justify-center items-end gap-2 bg-red-300'
      ref={playerAreaRef}
      draggable={false}
      >
        {myHand?.map((card, i) =>
          <PlayerCard key={card.id} card={card} playerArea={playerArea} firstLoad={firstLoad} getStackPos={getStackPos} idx={i} playCard={playCard} />
        )}
      </div>
      <div
      className='row-start-3 row-end-4 col-start-5 col-end-6 flex justify-center items-start text-2xl'
      >
        {initialOrder !== null && (initialOrder.length === 4 ? initialOrder[(initialOrder.indexOf(myId) + 3) % initialOrder.length] : null)}
      </div>
      {p4L &&
      <div id="right-player" className='row-start-2 row-end-5 col-start-6 col-end-7 flex flex-col justify-center items-center'>
        {displayOtherHands(p4L, 'right')}
      </div>}
      {pickSteal ? <PickButtons steal={steal} pickSteal={pickSteal} playerOrder={playerOrder} currentPlayer={currentPlayer} /> : null}
    </div>
  )
}

export default Board
