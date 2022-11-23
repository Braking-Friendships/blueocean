import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import cardback from '../../assets/cards/cardback.png';
import singleCardback from '../../assets/cards/singleCardback.png';
import AnimatedCard from './AnimatedCard';

const OtherCard = React.forwardRef(({ side, stackPosition, idx }, ref) => {

  return (
    <AnimatedCard
    side={side}
    stackPosition={stackPosition}
    idx={idx}
    >
      <motion.div
      ref={ref || null}
      className={`min-w-0  p-0 ${ref ? 'min-h-[271px]' : 'min-h-0'}`}
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