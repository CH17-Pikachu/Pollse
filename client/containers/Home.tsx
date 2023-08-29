import React from 'react';
import { NavLink } from 'react-router-dom';

function Home() {
  return (
    <div>
      <div>
        <img src='../assets/Pollse.png' alt='logo'/>
      </div>
      <div>
        <NavLink className='presenter-btn' to='/presenter'>Create Poll</NavLink>
        <br />
        <NavLink className='audience-btn' to='/audience'>Join Room</NavLink>
      </div>
    </div>
  );
}

export default Home;
