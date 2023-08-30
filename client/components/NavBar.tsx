import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar() {
  return (
    <div className='nav-bar'>
      <div className='logo'>
        <img
          id='logo'
          src='https://i.ibb.co/88ZbQVd/Pollse-7.png'
          height={80}
        />
      </div>
      <div id='home'>
        <NavLink to='/'>Home</NavLink>
      </div>
    </div>
  );
}

export default NavBar;
