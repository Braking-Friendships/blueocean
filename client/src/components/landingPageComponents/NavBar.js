import react from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
return (
    <nav className='flex justify-between text-white bg-[#3D405B] absolute w-screen h-10 pl-4'>
      <a href='/' className='hover:bg-[#E07A5F] h-10 pt-2'>Braking Friendships</a>
      <ul className='flex gap-4 mr-4'>
        <li className={listItemStyle}>
          <Link to='/profile' >Profile</Link>
        </li>
        <li className={listItemStyle}>
          <Link to='/instructions'>Instructions</Link>
        </li>
        <li className={listItemStyle}>
          <Link to='/login'>Login</Link>
        </li>
      </ul>
    </nav>
  )
}

const listItemStyle = 'hover:bg-[#E07A5F] h-10 pt-2'

export default NavBar;