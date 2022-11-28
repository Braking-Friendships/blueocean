import React, { useEffect, useState } from 'react';
import { BsArrowDown } from 'react-icons/bs';
import { motion, useAnimationControls } from 'framer-motion';

const ArrowPointer = ({ myId, currentPlayer, initialOrder }) => {
  const [deg, setDeg] = useState(0);
  const arrowControls = useAnimationControls();

  useEffect(() => {
    let myIdx = initialOrder?.indexOf(myId);
    let arrowIdx = initialOrder?.indexOf(currentPlayer);
    let len = initialOrder?.length;

    if(myIdx === arrowIdx) {
      setDeg(360);
    }
    if(len === 2) {
      if(arrowIdx === (myIdx + 1) % len) {
        setDeg(180);
      }
    } else if (len === 3) {
      if(arrowIdx === (myIdx + 1) % len) {
        setDeg(90);
      } else if(arrowIdx === (myIdx + 2) % len) {
        setDeg(180);
      }
    } else {
      if(arrowIdx === (myIdx + 1) % len) {
        setDeg(90);
      } else if(arrowIdx === (myIdx + 2) % len) {
        setDeg(180);
      } else if(arrowIdx === (myIdx + 3) % len) {
        setDeg(270);
      }
    }
  }, [currentPlayer]);

  const animateRotation = async () => {
    await arrowControls.start({
      rotate: deg,
      transition: {
        duration: 0.75,
        ease: 'backOut'
      }
    })
    if(deg === 360) {
      arrowControls.start({
        rotate: 0,
        transition: {
          duration: 0
        }
      })
    }
  }

  useEffect(() => {
    animateRotation();
  }, [deg]);

  return (
    <motion.div
    className='text-7xl'
    animate={arrowControls}
    >
      <BsArrowDown />
    </motion.div>
  )
}

export default ArrowPointer
