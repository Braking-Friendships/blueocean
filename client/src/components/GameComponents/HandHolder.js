import React from 'react'
import { motion } from 'framer-motion'

const HandHolder = React.forwardRef(({children, className}, ref) => {
  return (
    <motion.div

      ref={ref}
      className={className}
      draggable={false}
    >
      {children}

    </motion.div>
  )
})

export default HandHolder
