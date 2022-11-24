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
  const [BOMB, setBOMB] = useState(null);
  const [bombTimer, setBombTimer] = useState(null);
  const [pickSteal, setPickSteal] = useState(null);
  // pickSteal: [cardIdxs]

  useEffect(() => {
    socket.on('game-state', gameState => {
      console.log(gameState);
      setMyHand(gameState.hand1);
      setP2L(gameState.hand2.length || null);
      setP3L(gameState.hand3.length);
      setP4L(gameState.hand4.length || null);
      setStackL(gameState.deck.length);
    });

    socket.on('bomb', (newCard) => {
      console.log(newCard)
      setBOMB(newCard);
    });
    socket.on('countdown', (timer) => {
      setBombTimer(timer);
    })

  }, [])

  useEffect(() => {
    let decks = createDeck(4);

    /* setMyHand(decks.hand1);
    setP2L(decks.hand2.length || null);
    setP3L(decks.hand3.length);
    setP4L(decks.hand4.length || null);
    // setP5L(decks.hand5.length);
    setStackL(decks.deck.length); */

    emitters.startGame(decks);

    let timer = setTimeout(() => {
      setFirstLoad(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const playCard = (idx) => {
    let tempHand = [...myHand];
    let tempCard = tempHand.splice(idx, 1)[0];

    if(tempCard.type === 'defuse'){
      console.log('defuse');
      if(BOMB === null) {
        return;
      }
      setBOMB(null);
      emitters.defuse(null, [idx]);
    } else if (tempCard.type === 'favor') {
      // pickPlayer();
    } else if(tempCard.type.includes('cat')) {
      //if type is cat, ask for another cat
      let secondIdx = findMatch(tempCard.type, idx);
      if(secondIdx !== null) {
        setPickSteal([idx, secondIdx]);
        // emitters.playCard(tempCard.type, [idx, secondIdx]);
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

  const steal = (userCardIdxs, opponent) => {
    emitters.steal(userCardIdxs, opponent);
  }

  const drawCard = () => {
    emitters.drawCard();
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

        <button onClick={drawCard}>
          <OtherCard ref={stackRef} side='mid' />
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

    </div>
  )
}

export default Board
