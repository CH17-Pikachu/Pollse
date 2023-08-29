import React from 'react';
import { NavLink } from 'react-router-dom';

function Home() {
  return (
    <div>
      <NavLink className='presenter-btn' to='/presenter'>
        Create Poll
      </NavLink>
      <br />
      <NavLink className='audience-btn' to='/audience'>
        Join Room
      </NavLink>
    </div>
  );
}

export default Home;
