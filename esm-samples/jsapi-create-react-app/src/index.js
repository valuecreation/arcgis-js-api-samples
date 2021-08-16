import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <header>
      <h2>World's biggest cities</h2>
      <p>
        <span>Shanghai</span> is the most populated city in the world with 24
        million inhabitants, followed by <span>Beijing</span> with 21 million.
        In third place is the city of <span>Delhi</span> with 16 million
        people.
      </p>
    </header>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
