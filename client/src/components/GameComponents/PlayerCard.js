import React from 'react'
import lqTran from '../../assets/cards/lqTran.png';
import { getTip } from '../../Tools/cardStuff';
import { motion } from 'framer-motion';

const PlayerCard = ({ card, playerArea }) => {

  const checkPlay = (event, info) => {
    // console.log(playerArea.y);
    // console.log(info.point.x, info.point.y);
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
    drag: {
      'pointer-events': 'none'

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
    className='relative min-h-0 min-w-0'
    drag
    dragSnapToOrigin
    dragConstraints={{bottom: 0}}
    dragElastic={0.2}
    onDragEnd={checkPlay}
    initial='rest'
    whileHover='hover'
    whileDrag='drag'
    whileTap='rest'
    variants={cardContainer}
    >
      <img src={lqTran}
      className='min-w-[200px] w-52 h-auto rounded-xl'
      draggable={false}
      alt="playing card" />
      <motion.div id='tooltip'
      className='bg-black text-white rounded-lg p-2 w-52 absolute origin-bottom bottom-[275px] -left-1 opacity-0 pointer-events-none flex justify-center items-center'
      variants={tooltip}
      >
        {getTip(card)}
      </motion.div>
    </motion.div>
  )
}

export default PlayerCard;
