import React, { useRef, useState } from 'react'
import lqTran from '../../assets/cards/lqTran.png';
import { getTip, getCardImg } from '../../Tools/cardStuff';
import { motion } from 'framer-motion';

const PlayerCard = ({ card, playerArea }) => {
  const cardRef = useRef();
  const [isDragging, setIsDragging] = useState(false);

  const dragStart = () => {
    setIsDragging(true);
  }

  const checkPlay = (event, info) => {
    // console.log(playerArea.y);
    // console.log(info.point.x, info.point.y);
    console.log(cardRef.current);
    setTimeout(() => {
      setIsDragging(false);

    }, 500);
    if(info.point.y < playerArea.y) {
      console.log('played card:', card.type);
    }
  }

  const cardContainer = {
    hover: {
      scale: 1.1,
      'zIndex': 10,
      transition: {
        'zIndex': {
          duration: 0
        }
      }
    },
    rest: {
      scale: 1,
      'zIndex': 2,
      transition: {
        'zIndex': {
          duration: 0
        }
      }
    },
    tap: {
      scale: 1,
      'zIndex': 10,
      transition: {
        'zIndex': {
          duration: 0
        }
      }
    }

  }
  const tooltip = {
    hover: {
      opacity: 1,
      transition: {
        duration: 1,
        ease: [0, 1, 1, 1]
      }
    },
    rest: {
      opacity: 0,
      transition: {
        duration: 0,
        ease: 'anticipate'
      }
    }
  }

  return (
    <motion.div
    ref={cardRef}
    className={`relative min-h-0 min-w-0`}
    drag
    dragSnapToOrigin
    dragConstraints={{bottom: 0}}
    dragElastic={0.2}
    onDragStart={dragStart}
    onDragEnd={checkPlay}
    initial='rest'
    whileHover='hover'
    whileTap='tap'
    variants={cardContainer}
    draggable={false}
    >
      <img src={getCardImg(card.img)}
      className='min-w-[200px] w-52 h-auto rounded-xl'
      draggable={false}
      alt="playing card" />
      {!isDragging
      ? <motion.div id='tooltip'
      className='bg-black text-white rounded-lg p-2 w-52 absolute origin-bottom bottom-[275px] -left-1 opacity-0 pointer-events-none flex justify-center items-center'
      variants={tooltip}
      >
        {getTip(card)}
      </motion.div>
      : null}

    </motion.div>
  )
}


export default PlayerCard;
