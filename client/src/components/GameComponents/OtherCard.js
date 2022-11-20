import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import cardback from '../../assets/cards/cardback.png';
import singleCardback from '../../assets/cards/singleCardback.png';

const OtherCard = ({ side  }) => {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    let set = {}
    if(side === 'left'){
      set.rotate = 90;
    } else if (side === 'right') {
      set.rotate = -90;
    }

    setSettings(set)
  }, []);

  return (
    <motion.div
    className='min-w-0 min-h-0'
    initial='false'
    animate={settings}
    >
      <img src={singleCardback} className='pointer-events-none rounded-xl box-border min-w-[150px] w-[150px] h-auto' alt="playing card" />
    </motion.div>
  )
}

export default OtherCard
