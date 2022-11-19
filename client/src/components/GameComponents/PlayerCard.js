import React from 'react'
import lqTran from '../../assets/cards/lqTran.png';

import { motion } from 'framer-motion';

const PlayerCard = ({ card }) => {

  const checkPlay = (event, info) => {
    console.log(info.point.x, info.point.y);
  }

  return (
    <motion.div
    drag
    dragSnapToOrigin
    onDragEnd={checkPlay}
    whileHover={{
      scale: 1.1
    }}
    whileTap={{
      scale: 1
    }}

    >
      <img src={lqTran} className='pointer-events-none w-52 h-auto' alt="playing card" />
    </motion.div>
  )
}

export default PlayerCard;
