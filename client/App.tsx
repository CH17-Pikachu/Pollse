import React from 'react';
import './stylesheets/app.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Audience from './containers/Audience';
import AudienceResult from './containers/AudienceResults';
import Home from './containers/Home';
import Presenter from './containers/Presenter';
import PresenterResult from './containers/PresenterResults';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/audience/:pollId' element={<Audience />} />
        <Route path='/audience-results' element={<AudienceResult />} />
        <Route path='/presenter' element={<Presenter />} />
        <Route path='/presenter-results' element={<PresenterResult />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
