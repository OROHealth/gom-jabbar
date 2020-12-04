import React from 'react';
import ReactDOM from 'react-dom';
import Tracker from '../Tracker';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Tracker />
    </BrowserRouter>
    , div);
  ReactDOM.unmountComponentAtNode(div);
});