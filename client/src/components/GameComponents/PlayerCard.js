import React, { useEffect, useRef, useState } from 'react'
import { getTip, getCardImg } from '../../Tools/cardStuff';
import { motion, useAnimationControls } from 'framer-motion';
import AnimatedCard from './AnimatedCard';

const PlayerCard = ({ card, playerArea, stackPosition, idx }) => {
  const [isDragging, setIsDragging] = useState(false);

  const dragStart = () => {
    setIsDragging(true);
  }

  const checkPlay = (event, info) => {
    // console.log(playerArea.y);
    // console.log(info.point.x, info.point.y);
    setTimeout(() => {
      setIsDragging(false);

    }, 500);
    if(info.point.y < playerArea.y) {
      console.log('played card:', card.type);
    }
  }

  const cardContainer = {

    rest: {
      scale: 1,
      /* 'zIndex': 2,
      transition: {
        'zIndex': {
          duration: 0
        }
      } */
    },
    hover: {
      scale: 1.1,
      /* 'zIndex': 10,
      transition: {
        'zIndex': {
          duration: 0
        }
      } */
    },
    tap: {
      scale: 1,
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
    <AnimatedCard
    stackPosition={stackPosition}
    idx={idx}
    >
      <motion.div
      layout
      drag
      dragSnapToOrigin
      dragConstraints={{ bottom: 0 }}
      dragElastic={0.2}
      onDragStart={dragStart}
      onDragEnd={checkPlay}
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
    </AnimatedCard>
  )
}


export default PlayerCard;
