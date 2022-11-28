import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import cardback from '../../assets/cards/cardback.png';
import singleCardback from '../../assets/cards/singleCardback.png';
import AnimatedCard from './AnimatedCard';

const OtherCard = React.forwardRef(({ side, getStackPos, firstLoad, idx, shuffle }, ref) => {

  return (
    <AnimatedCard
    shuffle={shuffle}
    side={side}
    getStackPos={getStackPos}
    firstLoad={firstLoad}
    idx={idx}
    >
      <motion.div
      ref={ref || null}
      className={`min-w-0 p-0 min-h-0 h-[271px]`}
      >
        <img src={singleCardback}
        className={`pointer-events-none rounded-xl box-border h-auto border-black border-[2px] bg-red-900 min-w-[150px] w-[200px]

        `}
        alt="playing card" />
      </motion.div>
    </AnimatedCard>
  )
});

export default OtherCard
//${side==='mid' ? 'min-w-[200px] ' : 'min-w-[150px] w-[150px]'}