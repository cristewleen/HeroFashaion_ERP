// src/components/DashboardStatCard.js
import React from 'react';
import { Paper, Box, Typography } from '@mui/material';

const DashboardStatCard = ({ title, value, icon, color }) => {
  return (
    <Paper
      elevation={6} // Stronger shadow for a professional feel
      sx={{
        p: 3, // More padding
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between', // Space out value/title and icon
        borderRadius: 2, // Slightly rounded corners
        backgroundColor: color, // Dynamic background color
        color: 'white', // White text for contrast
        transition: 'transform 0.2s ease-in-out', // Smooth hover effect
        '&:hover': {
          transform: 'translateY(-5px)', // Lift card on hover
        },
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="div" sx={{ mb: 0.5 }}>
          {title}
        </Typography>
        <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
          {value}
        </Typography>
      </Box>
      <Box sx={{ ml: 2 }}>
        {React.cloneElement(icon, { sx: { fontSize: 50, opacity: 0.8 } })}
      </Box>
    </Paper>
  );
};

export default DashboardStatCard;