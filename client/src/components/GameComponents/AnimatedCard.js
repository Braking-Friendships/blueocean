import React, { useEffect, useRef, useState } from 'react'
import { motion, useAnimationControls } from 'framer-motion';

const AnimatedCard = ({ getStackPos, firstLoad, idx, side, shuffle, children }) => {
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
    let stackPosition = getStackPos();
    console.log(stackPosition);
    x = stackPosition.x - x;
    let y = stackPosition.bottom - bottom;
    if(side === 'top'){
    }
    if(side === 'left' || side === 'right' || side==='top') {
      y = stackPosition.top - top;
    }
    return {x, y}
  }


  useEffect(() => {
    if(side === 'mid' || getStackPos === undefined){
      return;
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
          delay: firstLoad ? idx * 0.2 : 0,
          ease: 'easeInOut',
        }
      })

      cardControls.start({
        width: set.width,
        transition: {
          duration: 0.5,
          delay:  firstLoad ? ((8 - idx) * 0.2) - 0.2 : 0,
          ease: 'easeIn'
        }
      })
    };
    animate();

  }, []);

  const shuffleAnimate = async () => {
    await cardControls.start({
      rotateY: 1080,
      transition: {
        duration: 2.5,
        ease: 'easeInOut'
      }
    })
    cardControls.start({
      rotateY: 0,
      transition: {
        duration: 0
      }
    })
  }

  useEffect(() => {
    if(shuffle === true && side === 'mid'){
      shuffleAnimate();
    }
  }, [shuffle]);

  return (
    <motion.div
      layout
      ref={cardRef}
      className={`relative min-h-0 min-w-0 p-0 h-auto ${side === 'mid' ? 'z-10 min-h-[271px]' : 'z-[5]'}`}
      animate={cardControls}
      whileHover={side !== 'mid' ? {'zIndex': 11} : null}
    >
      {children}
    </motion.div>
  )
}

export default AnimatedCard
