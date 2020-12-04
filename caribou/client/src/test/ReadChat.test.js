import React from 'react';
import ReactDOM from 'react-dom';
import ReadChat from '../ReadChat';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <ReadChat />
    </BrowserRouter>
    , div);
  ReactDOM.unmountComponentAtNode(div);
});