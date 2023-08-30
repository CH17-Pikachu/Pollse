import React from 'react';
import './stylesheets/app.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Audience from './containers/Audience';
import AudienceResults from './containers/AudienceResults';
import Home from './containers/Home';
import Presenter from './containers/Presenter';
import PresenterResults from './containers/PresenterResults';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/audience/:pollId' element={<Audience />} />
        <Route path='/audience-results' element={<AudienceResults />} />
        <Route path='/presenter' element={<Presenter />} />
        <Route
          path='/presenter-results/:pollId'
          element={<PresenterResults />}
        />
        <Route path='/' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
