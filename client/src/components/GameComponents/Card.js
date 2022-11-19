import React from 'react'
import lqTran from '../../assets/cards/lqTran.png';

const Card = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <img src={lqTran} width="250px" height="auto" />
    </div>
  )
}

export default Card
