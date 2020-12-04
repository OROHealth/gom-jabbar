import React from 'react';
import ReactDOM from 'react-dom';
import AddPost from '../AddPost';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <AddPost />
    </BrowserRouter>
    , div);
  ReactDOM.unmountComponentAtNode(div);
});