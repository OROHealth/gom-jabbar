import React from 'react';
import ReactDOM from 'react-dom';
import ReadChat from '../ReadChat';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <ReadChat />
    , div);
  ReactDOM.unmountComponentAtNode(div);
});