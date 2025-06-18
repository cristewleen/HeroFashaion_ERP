import React from 'react';
import { Box } from '@mui/material';

// A very simple layout component that just renders its children
const Layout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      {/* In a real app, a sidebar and header would go here */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;