import React from 'react'
import { motion } from 'framer-motion';
import cardback from '../../assets/cards/cardback.png';

const OtherCard = ({ orientation }) => {
  const animate = {
    rotate: orientation || 0
  }

  return (
    <motion.div
    initial={false}
    animate={animate}
    >
      <img src={cardback} width="250px" height="auto" className='pointer-events-none' alt="playing card" />
    </motion.div>
  )
}

export default OtherCard
