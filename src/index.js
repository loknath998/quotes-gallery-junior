import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import {RowProvider} from './context';

ReactDOM.render(
  <RowProvider>
    <Router >
      <App />
    </Router>  
  </RowProvider>
    ,
  document.getElementById('root')
);

