import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
  Stepper,
  Step,
  StepLabel,
  Divider,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { 
  Search, 
  Train, 
  LocalShipping, 
  LocationOn,
  CheckCircle,
  PendingActions,
  ScheduleSend,
  Inventory
} from '@mui/icons-material';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tracking-tabpanel-${index}`}
      aria-labelledby={`tracking-tab-${index}`}
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

export default function TrackingSystem() {
  const [tabValue, setTabValue] = useState(0);
  const [trainTrackingNumber, setTrainTrackingNumber] = useState('');
  const [cargoTrackingNumber, setCargoTrackingNumber] = useState('');
  const [showTrainResults, setShowTrainResults] = useState(false);
  const [showCargoResults, setShowCargoResults] = useState(false);
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const handleTrainTrack = () => {
    // In a real app, you would fetch tracking data from the backend
    setShowTrainResults(true);
  };
  
  const handleCargoTrack = () => {
    // In a real app, you would fetch tracking data from the backend
    setShowCargoResults(true);
  };

  const trainSteps = [
    { label: 'Departed Colombo', completed: true },
    { label: 'Arrived at Gampaha', completed: true },
    { label: 'Departed Gampaha', completed: true },
    { label: 'En Route to Kandy', completed: false },
    { label: 'Arrived at Kandy', completed: false },
  ];
  
  const cargoSteps = [
    { label: 'Package Received', completed: true, icon: <Inventory /> },
    { label: 'Processing at Origin', completed: true, icon: <PendingActions /> },
    { label: 'In Transit', completed: true, icon: <ScheduleSend /> },
    { label: 'Arrived at Destination', completed: false, icon: <LocationOn /> },
    { label: 'Ready for Pickup', completed: false, icon: <CheckCircle /> },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" gutterBottom>
        Track Train & Cargo
      </Typography>
      
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Track Train" icon={<Train />} />
          <Tab label="Track Cargo" icon={<LocalShipping />} />
        </Tabs>
        
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Track Your Train
                </Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} md={8}>
                    <TextField
                      fullWidth
                      label="Train Number or Name"
                      variant="outlined"
                      placeholder="e.g., Udarata Manike or 1082"
                      value={trainTrackingNumber}
                      onChange={(e) => setTrainTrackingNumber(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Button 
                      variant="contained" 
                      startIcon={<Search />}
                      size="large"
                      fullWidth
                      onClick={handleTrainTrack}
                      sx={{ height: '56px' }}
                      disabled={!trainTrackingNumber}
                    >
                      Track Train
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            
            {showTrainResults && (
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Train fontSize="large" color="primary" sx={{ mr: 2 }} />
                      <Box>
                        <Typography variant="h6">
                          Udarata Manike (Train #1082)
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Colombo - Kandy
                        </Typography>
                      </Box>
                      <Box sx={{ ml: 'auto' }}>
                        <Chip 
                          label="On Time" 
                          color="success" 
                          size="small" 
                        />
                      </Box>
                    </Box>
                    
                    <Divider sx={{ mb: 3 }} />
                    
                    <Typography variant="subtitle1" gutterBottom>
                      Current Location: Between Gampaha and Kandy
                    </Typography>
                    
                    <Box sx={{ mb: 3 }}>
                      <Stepper activeStep={3} alternativeLabel>
                        {trainSteps.map((step, index) => (
                          <Step key={index} completed={step.completed}>
                            <StepLabel>{step.label}</StepLabel>
                          </Step>
                        ))}
                      </Stepper>
                    </Box>
                    
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Paper elevation={2} sx={{ p: 2 }}>
                          <Typography variant="subtitle2" gutterBottom>
                            Departure
                          </Typography>
                          <Typography variant="body1">
                            Colombo Fort Station
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Departed at 08:00 AM
                          </Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Paper elevation={2} sx={{ p: 2 }}>
                          <Typography variant="subtitle2" gutterBottom>
                            Arrival (Expected)
                          </Typography>
                          <Typography variant="body1">
                            Kandy Station
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Expected at 12:00 PM
                          </Typography>
                        </Paper>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            )}
          </Grid>
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Track Your Cargo
                </Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} md={8}>
                    <TextField
                      fullWidth
                      label="Cargo Tracking Number"
                      variant="outlined"
                      placeholder="e.g., CRG1234567"
                      value={cargoTrackingNumber}
                      onChange={(e) => setCargoTrackingNumber(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Button 
                      variant="contained" 
                      startIcon={<Search />}
                      size="large"
                      fullWidth
                      onClick={handleCargoTrack}
                      sx={{ height: '56px' }}
                      disabled={!cargoTrackingNumber}
                    >
                      Track Cargo
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            
            {showCargoResults && (
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <LocalShipping fontSize="large" color="primary" sx={{ mr: 2 }} />
                      <Box>
                        <Typography variant="h6">
                          Tracking Number: CRG1234567
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Colombo to Kandy
                        </Typography>
                      </Box>
                      <Box sx={{ ml: 'auto' }}>
                        <Chip 
                          label="In Transit" 
                          color="primary" 
                          size="small" 
                        />
                      </Box>
                    </Box>
                    
                    <Divider sx={{ mb: 3 }} />
                    
                    <Typography variant="subtitle1" gutterBottom>
                      Shipment Progress
                    </Typography>
                    
                    <List>
                      {cargoSteps.map((step, index) => (
                        <ListItem key={index}>
                          <ListItemIcon>
                            {step.icon}
                          </ListItemIcon>
                          <ListItemText 
                            primary={step.label} 
                            secondary={index === 2 ? "September 15, 2023 - 10:30 AM" : index < 2 ? "September 15, 2023" : ""} 
                          />
                          {step.completed && (
                            <Chip 
                              label="Completed" 
                              size="small" 
                              color="success" 
                              variant="outlined" 
                            />
                          )}
                        </ListItem>
                      ))}
                    </List>
                    
                    <Box sx={{ mt: 3 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Estimated Delivery Time
                      </Typography>
                      <Typography variant="body1">
                        September 16, 2023 - Between 9:00 AM and 12:00 PM
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            )}
          </Grid>
        </TabPanel>
      </Paper>
    </Box>
  );
} 