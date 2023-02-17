import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import "./styles/icons/icons.css";

import App from './App';
import reportWebVitals from './reportWebVitals';

//Router
import { BrowserRouter as Router } from 'react-router-dom'

//Redux
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from './reducers'

const store = createStore(rootReducer, composeWithDevTools())

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();