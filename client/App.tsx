import React, { useState } from 'react';
import './stylesheets/app.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Audience from './containers/Audience';
import AudienceResult from './containers/AudienceResults';
import Home from './containers/Home';
import Presenter from './containers/Presenter';
import PresenterResult from './containers/PresenterResults';
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
    <Router>
      <div >
        <img src='./assets/Pollse.png' alt='logo' />
        <p>{world}</p>
        <button type='button' onClick={testFetch}>
          CHANGE THE WORLD
        </button>
      </div>

      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/audience' component={Audience} />
        <Route path='/audience-results' component={AudienceResult} />
        <Route path='/presenter' component={Presenter} />
        <Route path='/presenter-results' component={PresenterResult} />
      </Switch>

    </Router>
  );
}

export default App;
