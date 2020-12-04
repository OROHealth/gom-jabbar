import React from 'react';
import ReactDOM from 'react-dom';
import LiveChat from '../LiveChat';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <BrowserRouter>
            <LiveChat />
        </BrowserRouter>
        , div);
    ReactDOM.unmountComponentAtNode(div);
});