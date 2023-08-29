import React, { useState } from 'react';

function Presenter() {
  // Will have pollId gotten from backend and passed in?
  const pollId = 1;
  const [answers, setAnswers] = useState([]);

  return (
    <div>
      <p>Room ID:{pollId}</p>
      <form>
        <label htmlFor='pollQuestion'>
          Question:
          <input type='text' id='pollQuestion' name='pollQuestion' />
        </label>
        {answers}
      </form>
    </div>
  );
}

export default Presenter;
