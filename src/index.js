import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Router } from 'react-router-dom';
import App from './App';
import reducer, { initialState } from './context/reducer';
import { StateProvider } from './context/StateProvider';

import "./index.scss"

ReactDOM.render(
  <BrowserRouter>
    <StateProvider reducer={reducer} initialState={initialState}>
      <App />
    </StateProvider >
  </BrowserRouter >,
  document.getElementById('root')
);
