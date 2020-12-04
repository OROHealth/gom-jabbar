import React from 'react';
import ReactDOM from 'react-dom';
import Tracker from '../Tracker';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Tracker />
    , div);
  ReactDOM.unmountComponentAtNode(div);
});