import React, { useEffect, useRef, useState } from 'react';
import PlayerCard from './PlayerCard';
import OtherCard from './OtherCard';
import createDeck from '../../Tools/createDeck';
import { socket, emitters } from '../../socket.js';
import PickButtons from './PickButtons';

socket.on('card-countdown', timer => console.log(timer))

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
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [lastCardPlayed, setLastCardPlayed] = useState(null);
  const [BOMB, setBOMB] = useState(null);
  const [bombTimer, setBombTimer] = useState(null);
  const [pickSteal, setPickSteal] = useState(null);
  // pickSteal: [cardIdxs]
  const [nopeable, setNopeable] = useState(false);

  useEffect(() => {
    setPlayerArea(playerAreaRef.current?.getBoundingClientRect());
  }, [firstLoad]);

  useEffect(() => {

    socket.on('game-state', gameState => {
      console.log(gameState);
      //replace 'c' with myId
      let myIdx = gameState.initialOrder.indexOf(myId);
      let playerCount = gameState.initialOrder.length;

      setMyHand(gameState[gameState.initialOrder[myIdx]]);

      if(playerCount === 2) {
        setP3L(gameState[gameState.initialOrder[(myIdx+1) % playerCount]].length);
      } else {
        setP2L(gameState[gameState.initialOrder[(myIdx+1) % playerCount]].length);
        setP3L(gameState[gameState.initialOrder[(myIdx+2) % playerCount]].length);
        setP4L(gameState[gameState.initialOrder[(myIdx+3) % playerCount]].length);
      }
      setStackL(gameState.deck.length);
      setPlayerOrder(gameState.playerOrder);
      setCurrentPlayer(gameState.currentPlayer);
    });

    socket.on('bomb', (newCard, gameState) => {
      setStackL(gameState.deck.length);
      setBOMB(newCard);
    });
    socket.on('bomb-countdown', (timer) => {
      setBombTimer(timer);
    })
    socket.on('card-countdown', (timer) => {
      if(timer === 0){
        setNopeable(false);
      } else {
        setNopeable(true);
      }
    })
    socket.on('show-future', (cards)=>{
      console.log(cards)
    })
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
      if(nopeable) {
        emitters.nope('nope', [idx]);
      } else {
        return;
      }
    } else if(currentPlayer !== myId) {
      return;
    }
    else if(tempCard.type === 'defuse'){
      if(BOMB === null) {
        return;
      }
      setBOMB(null);
      emitters.defuse(Math.floor(Math.random()*stackL), [idx]);
    } else if (tempCard.type === 'favor') {
      // pickPlayer();
    } else if(tempCard.type.includes('cat')) {
      //if type is cat, ask for another cat
      let secondIdx = findMatch(tempCard.type, idx);
      if(secondIdx !== null) {
        setPickSteal([idx, secondIdx]);
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

  const steal = (userCardIdxs, opponent) => {
    emitters.playCard('steal', userCardIdxs, opponent);
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
      <div id="top-player" className='row-start-1 row-end-2 col-start-3 col-end-5  flex justify-center'>
        {displayOtherHands(p3L, 'top')}
      </div>
      <div id="middle-stack" className='row-start-3 row-end-4 col-start-2 col-end-6 flex justify-center items-end gap-7'>
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
      {p4L &&
      <div id="right-player" className='row-start-2 row-end-5 col-start-6 col-end-7 flex flex-col justify-center items-center'>
        {displayOtherHands(p4L, 'right')}
      </div>}
      {pickSteal ? <PickButtons steal={steal} pickSteal={pickSteal} playerOrder={playerOrder} currentPlayer={currentPlayer} /> : null}
    </div>
  )
}

export default Board
