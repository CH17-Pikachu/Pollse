import React, { useState } from 'react';
import './stylesheets/app.scss';

function App() {
  const [world, setWorld] = useState('Hello world');

  function testFetch() {
    fetch('/test')
      .then(response => response.json())
      .then(data => setWorld(data as string))
      .catch(err => console.log(`error: ${err}`));
  }

  return (
    <div>
      <p>{world}</p>
      <button type='button' onClick={testFetch}>
        CHANGE THE WORLD
      </button>
    </div>
  );
}

export default App;
