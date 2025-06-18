// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom'; // <--- IMPORT THIS

// If you are using the AuthContext from before, keep this import too
// import { AuthProvider } from './context/AuthContext'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* The BrowserRouter must wrap your entire App */}
    <BrowserRouter>
      {/* If you have AuthProvider, it goes inside BrowserRouter */}
      {/* 
      <AuthProvider>
        <App />
      </AuthProvider>
      */}

      {/* If you don't have AuthProvider yet, just wrap App */}
      <App />

    </BrowserRouter>
  </React.StrictMode>
);