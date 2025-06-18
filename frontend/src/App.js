// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout'; // Assuming you have a Layout component
import DashboardPage from './pages/DashboardPage';
import OrderStylesPage from './pages/OrderStylesPage'; // <-- IMPORT YOUR NEW PAGE
// ... other imports for auth

function App() {
  // ... your existing App logic for auth etc.
  
  return (
    // ... ThemeProvider, etc.
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/order-styles" element={<OrderStylesPage />} /> {/* <-- ADD THE ROUTE */}
          {/* ... other routes */}
        </Routes>
      </Layout>
    // ...
  );
}

export default App;