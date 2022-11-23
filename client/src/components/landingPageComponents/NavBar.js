import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ userInfo, logout }) => {

  return (
    <nav className='flex justify-between text-white bg-[#3D405B] absolute w-screen h-10 pl-4'>
      <Link to='/' className='hover:bg-[#E07A5F] h-10 pt-2'>Braking Friendships</Link>
      <ul className='flex gap-4 mr-4'>
        {/* <li className={listItemStyle}>
          <Link to='/instructions'>Instructions</Link>
        </li> */}
        {userInfo &&
          <>
            <li className={listItemStyle}>
              <Link to='/profile'>Profile</Link>
            </li>
            <li className={listItemStyle} onClick={() => logout()}>
              <Link to='/'>Logout</Link>
            </li>
          </>
        }
        {!userInfo &&
          <>
            <li className={listItemStyle}>
              <Link to='/login'>Profile</Link>
            </li>
            <li className={listItemStyle}>
              <Link to='/login'>Login</Link>
            </li>
          </>
        }
      </ul>
    </nav>
  )
}

const listItemStyle = 'hover:bg-[#E07A5F] h-10 pt-2'

export default NavBar;