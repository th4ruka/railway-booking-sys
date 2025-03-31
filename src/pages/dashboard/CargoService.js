import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  InputAdornment,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Divider,
  Chip
} from '@mui/material';
import { LocalShipping, Send, Search } from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`cargo-tabpanel-${index}`}
      aria-labelledby={`cargo-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function CargoService() {
  const [tabValue, setTabValue] = useState(0);
  const [date, setDate] = useState(new Date());
  const [activeStep, setActiveStep] = useState(0);
  const [weight, setWeight] = useState(10);
  
  // Mock data for demonstration
  const myCargos = [
    { id: 1, trackingNumber: 'CRG1234567', from: 'Colombo', to: 'Kandy', date: '2023-09-15', status: 'In Transit' },
    { id: 2, trackingNumber: 'CRG7654321', from: 'Colombo', to: 'Matara', date: '2023-10-20', status: 'Delivered' },
  ];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const steps = [
    {
      label: 'Cargo Details',
      description: `Provide details about your cargo shipment.`,
      content: (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Sender Name"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Recipient Name"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="From Station"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="To Station"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Shipping Date"
                value={date}
                onChange={(newDate) => setDate(newDate)}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Cargo Type</InputLabel>
              <Select
                label="Cargo Type"
                defaultValue=""
              >
                <MenuItem value="general">General</MenuItem>
                <MenuItem value="fragile">Fragile</MenuItem>
                <MenuItem value="perishable">Perishable</MenuItem>
                <MenuItem value="dangerous">Dangerous Goods</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Typography gutterBottom>Weight (kg)</Typography>
            <Slider
              value={weight}
              onChange={(e, newValue) => setWeight(newValue)}
              aria-labelledby="weight-slider"
              valueLabelDisplay="auto"
              step={1}
              marks
              min={1}
              max={100}
            />
            <TextField
              value={weight}
              onChange={e => setWeight(Number(e.target.value))}
              InputProps={{
                endAdornment: <InputAdornment position="end">kg</InputAdornment>,
              }}
              type="number"
              sx={{ mt: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Special Instructions"
              multiline
              rows={4}
              variant="outlined"
            />
          </Grid>
        </Grid>
      ),
    },
    {
      label: 'Review and Confirm',
      description: 'Review your cargo information before confirming.',
      content: (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Cargo Booking Summary
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="textSecondary">From</Typography>
                <Typography variant="body1">Colombo</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="textSecondary">To</Typography>
                <Typography variant="body1">Kandy</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="textSecondary">Date</Typography>
                <Typography variant="body1">{date.toLocaleDateString()}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="textSecondary">Cargo Type</Typography>
                <Typography variant="body1">General</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="textSecondary">Weight</Typography>
                <Typography variant="body1">{weight} kg</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="textSecondary">Estimated Cost</Typography>
                <Typography variant="body1">$25.00</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="textSecondary">Special Instructions</Typography>
                <Typography variant="body1">Handle with care, fragile items inside.</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ),
    },
    {
      label: 'Payment',
      description: `Complete payment to finalize your cargo booking.`,
      content: (
        <Typography>
          Payment form would go here. For demo purposes, we'll assume the payment is complete.
        </Typography>
      ),
    },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" gutterBottom>
        Cargo Services
      </Typography>
      
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Book Cargo Service" />
          <Tab label="My Cargo Shipments" />
          <Tab label="Track Cargo" />
        </Tabs>
        
        <TabPanel value={tabValue} index={0}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel>{step.label}</StepLabel>
                <StepContent>
                  <Typography>{step.description}</Typography>
                  <Box sx={{ mb: 2 }}>
                    {step.content}
                    <Box sx={{ mb: 2, mt: 2 }}>
                      <div>
                        <Button
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          Back
                        </Button>
                        <Button
                          variant="contained"
                          onClick={handleNext}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          {activeStep === steps.length - 1 ? 'Finish' : 'Continue'}
                        </Button>
                      </div>
                    </Box>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length && (
            <Paper square elevation={0} sx={{ p: 3 }}>
              <Typography>Cargo booking complete - your tracking number is <strong>CRG1234567</strong></Typography>
              <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                Book Another Cargo
              </Button>
            </Paper>
          )}
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom>
            Your Cargo Shipments
          </Typography>
          
          <Grid container spacing={2}>
            {myCargos.map((cargo) => (
              <Grid item xs={12} md={6} key={cargo.id}>
                <Card sx={{ mb: 2 }}>
                  <CardContent>
                    <Grid container alignItems="center" spacing={2}>
                      <Grid item>
                        <LocalShipping color="primary" fontSize="large" />
                      </Grid>
                      <Grid item xs>
                        <Typography variant="h6">
                          Tracking #: {cargo.trackingNumber}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Chip 
                          label={cargo.status} 
                          color={cargo.status === 'Delivered' ? 'success' : 'primary'} 
                          size="small" 
                        />
                      </Grid>
                    </Grid>
                    <Divider sx={{ my: 2 }} />
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="textSecondary">
                          From
                        </Typography>
                        <Typography variant="body1">
                          {cargo.from}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="textSecondary">
                          To
                        </Typography>
                        <Typography variant="body1">
                          {cargo.to}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="body2" color="textSecondary">
                          Shipping Date
                        </Typography>
                        <Typography variant="body1">
                          {cargo.date}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>
        
        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" gutterBottom>
            Track Your Cargo
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={9}>
                    <TextField
                      fullWidth
                      label="Enter Tracking Number"
                      variant="outlined"
                      placeholder="e.g., CRG1234567"
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Button 
                      variant="contained" 
                      startIcon={<Search />}
                      size="large"
                      fullWidth
                      sx={{ height: '56px' }}
                    >
                      Track Cargo
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>
    </Box>
  );
} 