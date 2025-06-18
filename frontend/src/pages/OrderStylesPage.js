/*import React, { useState, useEffect } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { getOrderStyles, deleteOrderStyle } from '../api/orderService';
import OrderStyleForm from '../components/OrderStyleForm'; // We will create this next

const OrderStylesPage = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await getOrderStyles();
      // The DataGrid needs each row to have a unique 'id' property.
      // Your model already has an 'id' from Django, so this should work directly.
      setRows(response.data);
    } catch (error) {
      console.error("Failed to fetch order styles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleOpenDialog = (order = null) => {
    setCurrentOrder(order);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setCurrentOrder(null);
    setDialogOpen(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        await deleteOrderStyle(id);
        fetchOrders(); // Refresh data after delete
      } catch (error) {
        console.error('Failed to delete order style:', error);
      }
    }
  };

  // Define columns for the DataGrid. Choose the most important fields.
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'order_no', headerName: 'Order No', width: 150 },
    { field: 'style_name', headerName: 'Style Name', width: 200 },
    { field: 'customer_id', headerName: 'Customer ID', width: 120 },
    { field: 'quantity', headerName: 'Quantity', type: 'number', width: 120 },
    { field: 'final_delv_date', headerName: 'Delivery Date', width: 150, type: 'dateTime',
        valueGetter: (params) =>
            {
                if (!params || !params.value) {
                    return null; 
                }
            return new DataGrid(params.value)
            },
        },
    { field: 'closed', headerName: 'Closed', width: 100, type: 'boolean' },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <>
          <Button onClick={() => handleOpenDialog(params.row)} size="small">Edit</Button>
          <Button onClick={() => handleDelete(params.row.id)} size="small" color="error">Delete</Button>
        </>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4">Order Styles Management</Typography>
        <Button variant="contained" onClick={() => handleOpenDialog()}>
          Create New Order Style
        </Button>
      </Box>

      <Box sx={{ height: 600, width: '100%' }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            checkboxSelection
            disableSelectionOnClick
            sx={{
              // This targets the row on hover
              '& .MuiDataGrid-row:hover': {
                backgroundColor: '#37a912', // A soft, pleasant yellow
                cursor: 'pointer' // Changes the cursor to a pointer to indicate interactivity
              },
            }}

          />
        )}
      </Box>

      {/* The Create/Edit form Dialog }
      <OrderStyleForm
        open={dialogOpen}
        onClose={handleCloseDialog}
        order={currentOrder}
        refreshData={fetchOrders}
      />
    </Box>
  );
};

export default OrderStylesPage;


/*#***********************************
### The Correct Code

I will provide the complete, corrected code for the `OrderStylesPage.js` file. The key change is in the `sx` prop of the `<DataGrid>` component.

```javascript
// src/pages/OrderStylesPage.js*/

import React, { useState, useEffect } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { getOrderStyles, deleteOrderStyle } from '../api/orderService';
import OrderStyleForm from '../components/OrderStyleForm';

const OrderStylesPage = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await getOrderStyles();
      // Ensure the data is in a 'results' key if using DRF pagination
      const data = response.data.results || response.data;
      if (Array.isArray(data)) {
        setRows(data);
      } else {
        setRows([]);
      }
    } catch (error) {
      console.error("Failed to fetch order styles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleOpenDialog = (order = null) => {
    setCurrentOrder(order);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setCurrentOrder(null);
    setDialogOpen(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        await deleteOrderStyle(id);
        fetchOrders(); // Refresh data after delete
      } catch (error) {
        console.error('Failed to delete order style:', error);
      }
    }
  };

  // Define columns for the DataGrid.
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'order_no', headerName: 'Order No', width: 150 },
    { field: 'style_name', headerName: 'Style Name', width: 200 },
    { field: 'customer_id', headerName: 'Customer ID', width: 120 },
    { field: 'quantity', headerName: 'Quantity', type: 'number', width: 120 },
    { 
      field: 'final_delv_date', 
      headerName: 'Delivery Date', 
      width: 180, // Increased width for datetime
      type: 'dateTime',
      valueGetter: (params) => {
        // Correcting the typo here: new Date() not new DataGrid()
        if (!params || !params.value) {
            return null; 
        }
        return new Date(params.value);
      },
    },
    { field: 'closed', headerName: 'Closed', width: 100, type: 'boolean' },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <>
          <Button onClick={() => handleOpenDialog(params.row)} size="small">Edit</Button>
          <Button onClick={() => handleDelete(params.row.id)} size="small" color="error">Delete</Button>
        </>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4">Order Styles Management</Typography>
        <Button variant="contained" onClick={() => handleOpenDialog()}>
          Create New Order Style
        </Button>
      </Box>

      <Box sx={{ height: 600, width: '100%' }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            checkboxSelection
            disableSelectionOnClick
            sx={{
              // --- THIS IS THE CORRECTED CODE FOR CELL HIGHLIGHTING ---
              
              // Target the individual cell component on hover
              '& .MuiDataGrid-cell:hover': {
                backgroundColor: 'hsla(69, 93.40%, 47.60%, 0.97)', // A pleasant, semi-transparent yellow
                color: 'black' // Ensure text remains readable
              },
            }}
          />
        )}
      </Box>

      {/* The Create/Edit form Dialog */}
      <OrderStyleForm
        open={dialogOpen}
        onClose={handleCloseDialog}
        order={currentOrder}
        refreshData={fetchOrders}
      />
    </Box>
  );
};

export default OrderStylesPage;
/*```

### Explanation of the Key Change

The magic happens inside the `sx` prop of the `<DataGrid>` component.

**Your previous code:**
```javascript
sx={{
  '& .MuiDataGrid-row:hover': {
    backgroundColor: '#37a912', // This targets the entire row
  },
}}
```

**The new, correct code:**
```javascript
sx={{
  '& .MuiDataGrid-cell:hover': {
    backgroundColor: 'rgba(255, 238, 88, 0.7)', // Targets only the cell
    color: 'black' 
  },
}}*/