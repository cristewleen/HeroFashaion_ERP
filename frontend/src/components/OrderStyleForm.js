import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid, Box, Tabs, Tab, Checkbox, FormControlLabel } from '@mui/material';
import { createOrderStyle, updateOrderStyle } from '../api/orderService';

// A helper component for the tab content
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const OrderStyleForm = ({ open, onClose, order, refreshData }) => {
  const [formData, setFormData] = useState({});
  const [tabIndex, setTabValue] = useState(0);

  useEffect(() => {
    if (order) {
      setFormData(order); // Populate form with existing data for editing
    } else {
      // Set default values for a new record, matching your SQL defaults
      setFormData({
        // Fields you already had
        order_no: '',
        style_name: '',
        company_id: 0,
        year: new Date().getFullYear(),
        item_no: 1,
        quantity: 0,
        
        // --- ADDING DEFAULTS FOR ALL THE REQUIRED FIELDS FROM THE ERROR ---
        
        // Required Integer/SmallInt Fields
        no: '0', // Assuming 'no' is a varchar/char field as per the model
        packing_type: 0,
        order_conf_year: new Date().getFullYear(),
        order_conf_no: 0,
        style_id: 0,
        final_insp_by: 0,
        test_agency_id: 0,
        measurement_scale: 0,
        
        // Required Boolean (Checkbox) Fields
        acce_authorized: false,
        mp_authorized: false,
        authorized: false, // You had this one already
        
        completed_acl: false,
        completed_apl: false,
        completed_des: false,
        completed_doc: false,
        completed_lt: false,
        completed_mc: false,
        completed_sp: false,
        completed_wo: false,
        
        fabric_supplied: false,
        yarn_supplied: false,
        
        is_embroided: false,
        is_others: false,
        is_printed: false,
        
        shipment_completed: false,
        closed: false, // You had this one already
        
        // --- You should also add defaults for any other fields ---
        // that are NOT NULL in your Django model but are not in the error list yet.
        // For example:
        production_type: 0,
        production_id: 0,
        merchandiser_id: 0,
        qlty_controller_id: 0,
        supplier_id: 0,
        status_id: 3, // Your DB default is 3
        purchase_price: '0.00',
        purchase_price_type: 0,
        re_calculate_pl: 1, // Your DB default is 1
        
        // Set other fields that can be null to empty strings or null
        style_desc: '',
        comments: '',
        po_no: '',
        final_delv_date: null,
      });
    }
  }, [order, open]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (order && order.id) {
        // Update existing record
        await updateOrderStyle(order.id, formData);
      } else {
        // Create new record
        await createOrderStyle(formData);
      }
      refreshData(); // Refresh the grid
      onClose(); // Close the dialog
    } catch (error) {
      console.error("Failed to save order style:", error);
      // You could add an error message state to display to the user
        if (error.response && error.response.data) {
        // The detailed validation errors are in error.response.data
        console.error("Validation Errors:", error.response.data);
        
        // You can convert the error object to a string to display it
        const errorMessages = Object.entries(error.response.data)
            .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
            .join('\n');
        alert("Please fix the following errors:\n\n" + errorMessages);
      } else {
        alert("An unexpected error occurred. Please try again.");
      }

    }
  };
  
  // To avoid errors if formData is not yet populated
  if (!formData) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{order ? 'Edit Order Style' : 'Create New Order Style'}</DialogTitle>
      <DialogContent>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabIndex} onChange={handleTabChange}>
            <Tab label="Main Details" />
            <Tab label="Production" />
            <Tab label="Status & Flags" />
          </Tabs>
        </Box>
        
        {/* TAB 1: Main Details */}
        <TabPanel value={tabIndex} index={0}>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}><TextField name="order_no" label="Order No" value={formData.order_no || ''} onChange={handleInputChange} fullWidth required /></Grid>
            <Grid item xs={12} sm={6}><TextField name="style_name" label="Style Name" value={formData.style_name || ''} onChange={handleInputChange} fullWidth required /></Grid>
            <Grid item xs={12} sm={6}><TextField name="customer_id" label="Customer ID" type="number" value={formData.customer_id || ''} onChange={handleInputChange} fullWidth /></Grid>
            <Grid item xs={12} sm={6}><TextField name="quantity" label="Quantity" type="number" value={formData.quantity || ''} onChange={handleInputChange} fullWidth /></Grid>
            <Grid item xs={12} sm={6}><TextField name="po_no" label="PO No" value={formData.po_no || ''} onChange={handleInputChange} fullWidth /></Grid>
            <Grid item xs={12} sm={6}><TextField name="final_delv_date" label="Final Delivery Date" type="datetime-local" value={formData.final_delv_date ? formData.final_delv_date.substring(0, 16) : ''} onChange={handleInputChange} fullWidth InputLabelProps={{ shrink: true }} /></Grid>
            {/* ... Add more fields relevant to Main Details here ... */}
          </Grid>
        </TabPanel>

        {/* TAB 2: Production */}
        <TabPanel value={tabIndex} index={1}>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}><TextField name="supplier_id" label="Supplier ID" type="number" value={formData.supplier_id || ''} onChange={handleInputChange} fullWidth /></Grid>
            <Grid item xs={12} sm={6}><TextField name="production_id" label="Production ID" type="number" value={formData.production_id || ''} onChange={handleInputChange} fullWidth /></Grid>
            <Grid item xs={12} sm={6}><TextField name="merchandiser_id" label="Merchandiser ID" type="number" value={formData.merchandiser_id || ''} onChange={handleInputChange} fullWidth /></Grid>
            <Grid item xs={12}><TextField name="comments" label="Comments" value={formData.comments || ''} onChange={handleInputChange} fullWidth multiline rows={3} /></Grid>
            {/* ... Add more fields relevant to Production here ... */}
          </Grid>
        </TabPanel>

        {/* TAB 3: Status & Flags */}
        <TabPanel value={tabIndex} index={2}>
           <Grid container spacing={2} sx={{ mt: 1 }}>
             <Grid item xs={6} sm={4}><FormControlLabel control={<Checkbox name="authorized" checked={formData.authorized || false} onChange={handleInputChange} />} label="Authorized" /></Grid>
             <Grid item xs={6} sm={4}><FormControlLabel control={<Checkbox name="shipment_completed" checked={formData.shipment_completed || false} onChange={handleInputChange} />} label="Shipment Completed" /></Grid>
             <Grid item xs={6} sm={4}><FormControlLabel control={<Checkbox name="closed" checked={formData.closed || false} onChange={handleInputChange} />} label="Closed" /></Grid>
             <Grid item xs={6} sm={4}><FormControlLabel control={<Checkbox name="order_cancelled" checked={formData.order_cancelled || false} onChange={handleInputChange} />} label="Order Cancelled" /></Grid>
             {/* ... Add more boolean flags here ... */}
           </Grid>
        </TabPanel>

      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">{order ? 'Update' : 'Create'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderStyleForm;