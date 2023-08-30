import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  function navigateToAudience() {
    const pollId = (document.getElementById('pollId') as HTMLFormElement)
      .value as string;

    navigate(`/audience/${pollId}`);
  }

  return (
    <div>
      <div>
        <img src='../assets/Pollse.png' alt='logo' />
      </div>
      <div>
        <NavLink className='presenter-btn' to='/presenter'>
          Create Poll
        </NavLink>
        <br />
        {/* <NavLink className='audience-btn' to='/audience/1'>Join Room</NavLink> */}
        <input type='text' id='pollId' placeholder='Poll ID' />
        <button type='button' onClick={navigateToAudience}>
          Enter Room
        </button>
      </div>
    </div>
  );
}

export default Home;
