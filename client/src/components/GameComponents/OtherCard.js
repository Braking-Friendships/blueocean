import React from 'react'
import { motion } from 'framer-motion';
import cardback from '../../assets/cards/cardback.png';
import singleCardback from '../../assets/cards/singleCardback.png';

const OtherCard = ({ orientation,  }) => {
  const animate = {
    rotate: orientation || 0
  }

  return (
    <motion.div
    initial={false}
    animate={animate}
    >
      <img src={singleCardback} width="150px" height="auto" className='pointer-events-none rounded-xl' alt="playing card" />
    </motion.div>
  )
}

export default OtherCard
