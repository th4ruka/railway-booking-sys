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
  CardActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Divider,
  Chip
} from '@mui/material';
import { Search, Train, Cancel, EventSeat } from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`ticket-tabpanel-${index}`}
      aria-labelledby={`ticket-tab-${index}`}
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

export default function TicketManagement() {
  const [tabValue, setTabValue] = useState(0);
  const [date, setDate] = useState(new Date());
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  
  // Mock data for demonstration
  const myTickets = [
    { id: 1, train: 'Udarata Manike', from: 'Colombo', to: 'Kandy', date: '2023-09-15', time: '08:00 AM', seat: 'A12', status: 'Confirmed' },
    { id: 2, train: 'Ruhunu Kumari', from: 'Colombo', to: 'Matara', date: '2023-10-20', time: '10:00 AM', seat: 'B08', status: 'Confirmed' },
  ];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleCancelTicket = (ticket) => {
    setSelectedTicket(ticket);
    setCancelDialogOpen(true);
  };

  const confirmCancelTicket = () => {
    // Here you would implement the actual cancellation logic
    console.log(`Cancelling ticket: ${selectedTicket.id}`);
    setCancelDialogOpen(false);
    // In a real app, you would update the database and refresh the list
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" gutterBottom>
        Ticket Management
      </Typography>
      
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Book Tickets" />
          <Tab label="My Tickets" />
        </Tabs>
        
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Search for Trains
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      fullWidth
                      label="From"
                      variant="outlined"
                      placeholder="Departure Station"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      fullWidth
                      label="To"
                      variant="outlined"
                      placeholder="Arrival Station"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Travel Date"
                        value={date}
                        onChange={(newDate) => setDate(newDate)}
                        renderInput={(params) => <TextField {...params} fullWidth />}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <FormControl fullWidth>
                      <InputLabel>Class</InputLabel>
                      <Select
                        label="Class"
                        defaultValue=""
                      >
                        <MenuItem value="economy">Economy</MenuItem>
                        <MenuItem value="business">Business</MenuItem>
                        <MenuItem value="first">First Class</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Button 
                      variant="contained" 
                      startIcon={<Search />}
                      size="large"
                      fullWidth
                    >
                      Search Trains
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            
            {/* Search results would appear here */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Available Trains
              </Typography>
              <Grid container spacing={2}>
                {[1, 2, 3].map((train) => (
                  <Grid item xs={12} key={train}>
                    <Card>
                      <CardContent>
                        <Grid container spacing={2} alignItems="center">
                          <Grid item xs={12} md={1}>
                            <Train fontSize="large" color="primary" />
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <Typography variant="h6">
                              Udarata Manike
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              Train #1082
                            </Typography>
                          </Grid>
                          <Grid item xs={12} md={2}>
                            <Typography variant="body1">
                              Colombo
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              08:00 AM
                            </Typography>
                          </Grid>
                          <Grid item xs={12} md={2}>
                            <Typography variant="body1">
                              Kandy
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              12:00 PM
                            </Typography>
                          </Grid>
                          <Grid item xs={12} md={2}>
                            <Typography variant="body1">
                              Duration: 4h
                            </Typography>
                            <Chip 
                              label="42 seats available" 
                              size="small" 
                              color="success" 
                              icon={<EventSeat />} 
                            />
                          </Grid>
                          <Grid item xs={12} md={2}>
                            <Button variant="contained" fullWidth>
                              Book Now
                            </Button>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom>
            Your Booked Tickets
          </Typography>
          
          {myTickets.length > 0 ? (
            <Grid container spacing={2}>
              {myTickets.map((ticket) => (
                <Grid item xs={12} md={6} key={ticket.id}>
                  <Card sx={{ mb: 2 }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {ticket.train}
                      </Typography>
                      <Divider sx={{ mb: 2 }} />
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="textSecondary">
                            From
                          </Typography>
                          <Typography variant="body1">
                            {ticket.from}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="textSecondary">
                            To
                          </Typography>
                          <Typography variant="body1">
                            {ticket.to}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="textSecondary">
                            Date
                          </Typography>
                          <Typography variant="body1">
                            {ticket.date}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="textSecondary">
                            Time
                          </Typography>
                          <Typography variant="body1">
                            {ticket.time}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="textSecondary">
                            Seat
                          </Typography>
                          <Typography variant="body1">
                            {ticket.seat}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="textSecondary">
                            Status
                          </Typography>
                          <Chip 
                            label={ticket.status} 
                            color="primary" 
                            size="small" 
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                    <CardActions>
                      <Button 
                        startIcon={<Cancel />} 
                        color="error" 
                        onClick={() => handleCancelTicket(ticket)}
                      >
                        Cancel Ticket
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body1" color="textSecondary" align="center">
              You haven't booked any tickets yet.
            </Typography>
          )}
        </TabPanel>
      </Paper>
      
      {/* Cancel Ticket Dialog */}
      <Dialog
        open={cancelDialogOpen}
        onClose={() => setCancelDialogOpen(false)}
      >
        <DialogTitle>Cancel Ticket</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to cancel your ticket for {selectedTicket?.train} from {selectedTicket?.from} to {selectedTicket?.to} on {selectedTicket?.date}? 
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCancelDialogOpen(false)}>No, Keep Ticket</Button>
          <Button onClick={confirmCancelTicket} color="error" autoFocus>
            Yes, Cancel Ticket
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 