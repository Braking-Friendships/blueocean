import React from 'react'
import { motion } from 'framer-motion'

const HandHolder = React.forwardRef(({children, className}, ref) => {
  const HandVar = {
    onLoad: {

    },
    done: {
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.2
      }
    }
  }

  return (
    <motion.div
      id="bottom-player"
      ref={ref}
      className={className}
      variants={HandVar}
      initial='onLoad'
      animate='done'
      draggable={false}
    >
      {children}

    </motion.div>
  )
})

export default HandHolder
