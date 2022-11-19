import React from 'react'
import lqTran from '../../assets/cards/lqTran.png';

import { motion } from 'framer-motion';

const PlayerCard = () => {

  const checkPlay = (event, info) => {
    console.log(info.point.x, info.point.y);
  }

  return (
    <motion.div
    drag
    dragSnapToOrigin
    onDragEnd={checkPlay}

    >
      <img src={lqTran} width="250px" height="auto" className='pointer-events-none' alt="playing card" />
    </motion.div>
  )
}

export default PlayerCard;
