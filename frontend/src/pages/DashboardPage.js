/*import React from 'react';
import { Typography } from '@mui/material';

const DashboardPage = () => {
  return (
    <div>
      <Typography variant="h4">Dashboard</Typography>
      <Typography>Welcome to the main dashboard.</Typography>
    </div>
  );
};

export default DashboardPage;*/


// src/pages/DashboardPage.js
import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Paper, List, ListItem, ListItemText, Divider, CircularProgress, Link as MuiLink } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Link } from 'react-router-dom';
import DashboardStatCard from '../components/DashboardStatCard'; // Import your new component
import { getOrderStyles } from '../api/orderService'; // To fetch recent orders

// MUI Icons
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// Import your background image
import dashboardBg from '../assets/images/dashboard_bg.jpg';

const BRAND_NAME = "Hero Fashion";
const BRAND_COLORS = [
  '#E91E63', // Red Pink
  '#2196F3', // Blue
  '#4CAF50', // Green
  '#FFC107', // Amber
  '#9C27B0', // Purple
  '#00BCD4', // Cyan
  '#FF9800', // Orange
];
const BRAND_FONT_FAMILY = "'Pacifico', cursive";

// --- MOCK DATA for Charts/Widgets (replace with real data fetching if needed) ---
const mockKpiData = {
  totalRevenue: "20",
  totalOrders: "420",
  completedOrders: "70",
  pendingOrders: "42"
};

const mockOrderStatusData = [
  { name: 'Completed', value: 420, color: '#4CAF50' }, // Green
  { name: 'Processing', value: 70, color: '#FFC107' }, // Amber
  { name: 'Shipped', value: 90, color: '#2196F3' },    // Blue
  { name: 'Cancelled', value: 120, color: '#F44336' },  // Red
];

// Recharts Pie Chart colors
const PIE_COLORS = ['#4CAF50', '#FFC107', '#2196F3', '#F44336'];


const DashboardPage = () => {
  const [recentOrders, setRecentOrders] = useState([]);
  const [loadingRecentOrders, setLoadingRecentOrders] = useState(true);

  useEffect(() => {
    const fetchRecentOrders = async () => {
      setLoadingRecentOrders(true);
      try {
        const response = await getOrderStyles();
        const data = response.data.results || response.data;
        // Take only the top 5 recent orders for the dashboard list
        setRecentOrders(data.slice(0, 5)); 
      } catch (error) {
        console.error("Failed to fetch recent orders:", error);
        setRecentOrders([]); // Ensure it's an empty array on error
      } finally {
        setLoadingRecentOrders(false);
      }
    };

    fetchRecentOrders();
  }, []);

  return (
    <Box
      sx={{
        // Background Image Styling
        backgroundImage: `url(${dashboardBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed', // Keeps the background static on scroll
        minHeight: 'calc(100vh - 64px)', // Adjust based on your AppBar height
        p: 4, // Padding around the entire dashboard content
        
        // Overlay for readability (lightens dark backgrounds, darkens light ones)
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.75)', // White overlay with 75% opacity
          zIndex: 0, // Behind the content
        },
        // Ensure all content is on top of the overlay
        '& > *': {
          position: 'relative',
          zIndex: 1,
        },
      }}
    >
      {/* Page Title */}
      <Typography variant="h3" gutterBottom sx={{ mb: 4, color: '#263238', fontWeight: 'bold' }}>
        <Box component="span" sx={{ fontFamily: BRAND_FONT_FAMILY, display: 'inline-block' }}>
          {Array.from(BRAND_NAME).map((char, index) => (
            <span
              key={index}
              style={{
                color: BRAND_COLORS[index % BRAND_COLORS.length],
                // Add a small shadow for more pop
                textShadow: '1px 1px 2px rgba(0,0,0,0.2)' 
              }}
            >
              {char === ' ' ? '\u00A0' : char} {/* Handle spaces correctly */}
            </span>
          ))}
        </Box>
        {" : ERP Overview"} {/* The rest of the title */}
      </Typography>

      {/* Section 1: KPI Cards */}
      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardStatCard
            title="Total Products"
            value={mockKpiData.totalRevenue}
            icon={<AttachMoneyIcon />}
            color="#283593" // Deep Indigo
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardStatCard
            title="Total Orders"
            value={mockKpiData.totalOrders}
            icon={<ShoppingCartIcon />}
            color="#00695C" // Dark Teal
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardStatCard
            title="Completed Orders"
            value={mockKpiData.completedOrders}
            icon={<AssignmentTurnedInIcon />}
            color="#388E3C" // Medium Green
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardStatCard
            title="Orders in Progress"
            value={mockKpiData.pendingOrders}
            icon={<ScheduleIcon />}
            color="#EF6C00" // Deep Orange
          />
        </Grid>
      </Grid>

      {/* Section 2: Charts and Recent Activity */}
      <Grid container spacing={4}>
        {/* Order Status Distribution Chart */}
        <Grid item xs={12} lg={6}>
          <Paper elevation={6} sx={{ p: 3, borderRadius: 2, height: 400, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#263238' }}>
              Order Status Distribution
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockOrderStatusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label={(entry) => `${entry.name} (${entry.value})`} // Shows name and value on slice
                >
                  {mockOrderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend layout="vertical" align="right" verticalAlign="middle" />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Recent Orders / Quick Links */}
        <Grid item xs={12} lg={6}>
          <Paper elevation={6} sx={{ p: 3, borderRadius: 2, height: 400, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#263238' }}>
              Recent Order Activities
            </Typography>
            <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
              {loadingRecentOrders ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  <CircularProgress />
                </Box>
              ) : (
                <List dense>
                  {recentOrders.length > 0 ? (
                    recentOrders.map((order) => (
                      <React.Fragment key={order.id}>
                        <ListItem
                          component={Link}
                          to={`/order-styles`} // Link to the OrderStylesPage
                          sx={{ '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' }, cursor: 'pointer' }}
                        >
                          <ListItemText
                            primary={`Order ${order.order_no} - Style: ${order.style_name}`}
                            secondary={`Customer ID: ${order.customer_id || 'N/A'} | Quantity: ${order.quantity || '0'}`}
                          />
                          <ArrowForwardIcon sx={{ color: 'text.secondary', ml: 1 }} />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                      </React.Fragment>
                    ))
                  ) : (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
                      No recent orders to display.
                    </Typography>
                  )}
                </List>
              )}
            </Box>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
                <MuiLink component={Link} to="/order-styles" variant="body1" sx={{ fontWeight: 'bold' }}>
                    View All Orders <ArrowForwardIcon sx={{ verticalAlign: 'middle', fontSize: '1rem' }} />
                </MuiLink>
            </Box>
            
                
             
            

          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;