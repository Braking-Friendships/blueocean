import react from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
return (
    <nav className='flex justify-between text-white bg-[#3D405B] p-3 absolute w-screen'>
      <a href='/'>Braking Friendships</a>
      <ul className='flex gap-2'>
        <li>
          <Link to='/profile'>Profile</Link>
        </li>
        <li>
          <Link to='/instructions'>Instructions</Link>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar;