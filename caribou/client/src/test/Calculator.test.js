import React from 'react';
import ReactDOM from 'react-dom';
import Calculator from '../Calculator';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  <BrowserRouter>
    <Calculator />
  </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});