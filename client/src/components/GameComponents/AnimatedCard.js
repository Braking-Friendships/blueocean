import React, { useEffect, useRef, useState } from 'react'
import { motion, useAnimationControls } from 'framer-motion';

const AnimatedCard = ({ stackPosition, idx, side, children }) => {
  const cardRef = useRef();
  const cardControls = useAnimationControls();

  let set = {}
  if(side === 'left'){
    set.width = '150px'
    set.rotate = 90;
  } else if (side === 'right') {
    set.width = '150px'
    set.rotate = -90;
  } else if (side === 'top'){
    set.width = '150px';
    set.rotate = 0;
  } else {
    set.width = '200px'
    set.rotate= 0;
  }

  const getTransitionPos = () => {
    let { x, top, bottom } = cardRef.current?.getBoundingClientRect();

    x = stackPosition.x - x;
    let y = stackPosition.bottom - bottom;
    if(side === 'left' || side === 'right') {
      y = stackPosition.top - top;
    }
    return {x, y}
  }

  const animate = async() => {
    let poo = getTransitionPos();

    await cardControls.start({
      rotate: 0,
      x: poo.x,
      y: poo.y,
      width: '200px',
      transition: {
        duration: 0
      }
    })

    await cardControls.start({
      rotate: set.rotate,
      x: 0,
      y: 0,
      transition: {
        duration: 0.5,
        delay: idx * 0.2,
        ease: 'easeInOut',
      }
    })

    cardControls.start({
      width: set.width,
      transition: {
        duration: 0.5,
        delay: ((8 - idx) * 0.2) - 0.2,
        ease: 'easeIn'
      }
    })

  };
  useEffect(() => {
    if(stackPosition){
      animate();
    }
  }, [stackPosition]);

  return (
    <motion.div
      layout
      ref={cardRef}
      className={`relative min-h-0 min-w-0 z-0 p-0 h-auto`}
      animate={cardControls}
      whileHover={{'zIndex': 10}}
    >
      {children}
    </motion.div>
  )
}

export default AnimatedCard
