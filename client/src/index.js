import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

console.log(process.env.REACT_APP_API_URL, "API URL")

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>  
    <BrowserRouter >
      <App />
    </BrowserRouter>
  </React.StrictMode>
);