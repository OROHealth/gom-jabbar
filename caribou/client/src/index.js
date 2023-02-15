import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createGlobalStyle } from "styled-components";

const GlobalStyles=createGlobalStyle`
    p,h1,h2,h3,h4,button,div{
        font-family:'gill sans';
    }
`
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyles/>
    <App />
  </React.StrictMode>
);
