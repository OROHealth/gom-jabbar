import React from 'react';
import ReactDOM from 'react-dom';
import LandingPage from '../LandingPage';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <BrowserRouter>
            <LandingPage />
        </BrowserRouter>
        , div);
    ReactDOM.unmountComponentAtNode(div);
});