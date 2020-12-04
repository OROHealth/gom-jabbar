import React from 'react';
import ReactDOM from 'react-dom';
import AddPost from '../AddPost';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render( 
    <AddPost />
    , div);
  ReactDOM.unmountComponentAtNode(div);
});