// SEU index.js (OU main.jsx) DEVE PARECER COM ISSO:
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // <--- IMPORTA O COMPONENTE APP

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App /> 
  </React.StrictMode>
);