import React, { useEffect, useRef, useState } from 'react'
import { getTip, getCardImg } from '../../Tools/cardStuff';
import { motion } from 'framer-motion';

const PlayerCard = ({ card, playerArea, stackPosition }) => {
  const cardRef = useRef();
  const [isDragging, setIsDragging] = useState(false);
  // const [initialAnimation, setInitialAnimation] = useState(getTransitionPos());

  /* useEffect(() => {
    setInitialAnimation(getTransitionPos());
  }, [stackPosition]); */

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
  const getTransitionPos = () => {
    let { x, y } = cardRef.current?.getBoundingClientRect();

    x = stackPosition.x - x;
    y = stackPosition.y - y;
    return {x, y}
  }
  const startingPOI = getTransitionPos();
  const initialAnimation = {
    onLoad: {
      y: startingPOI.y,
      x: startingPOI.x
    },
    done:  {
      y: 0,
      x: 0
    }
  }

  const cardContainer = {

    rest: {
      scale: 1,
      'zIndex': 2,
      transition: {
        'zIndex': {
          duration: 0
        }
      }
    },
    hover: {
      scale: 1.1,
      'zIndex': 10,
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
      variants={initialAnimation}
      initial='onLoad'
      animate='done'

    >
      <motion.div
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
    </motion.div>
  )
}


export default PlayerCard;
