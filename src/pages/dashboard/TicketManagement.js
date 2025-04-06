import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Divider,
  Chip,
  CircularProgress,
  Alert
} from '@mui/material';
import { Train, Cancel, EventSeat } from '@mui/icons-material';
import { format } from 'date-fns';
import { getAllAvailableTrains, getUserTickets, bookTicket, cancelTicket } from '../../firebase/ticketService';
import { auth } from '../../firebase/config';

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
  const [availableTrains, setAvailableTrains] = useState([]);
  const [loadingTrains, setLoadingTrains] = useState(false);
  const [trainsError, setTrainsError] = useState('');

  const [myTickets, setMyTickets] = useState([]);
  const [loadingMyTickets, setLoadingMyTickets] = useState(false);
  const [myTicketsError, setMyTicketsError] = useState('');

  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingFeedback, setBookingFeedback] = useState({ type: '', message: '' });

  const currentUser = auth.currentUser;

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    if (newValue === 0 && currentUser) {
      fetchAllAvailableTrains();
    } else if (newValue === 1 && currentUser) {
      fetchMyTickets();
    }
  };

  const fetchAllAvailableTrains = async () => {
    setLoadingTrains(true);
    setTrainsError('');
    setAvailableTrains([]);
    setBookingFeedback({ type: '', message: '' });

    try {
      const results = await getAllAvailableTrains();
      setAvailableTrains(results);
      if (results.length === 0) {
        setTrainsError("No trains currently available for booking.");
      }
    } catch (error) {
      console.error("Error in fetchAllAvailableTrains: ", error);
      setTrainsError(error.message || "Failed to fetch available trains.");
    } finally {
      setLoadingTrains(false);
    }
  };

  const fetchMyTickets = async () => {
    if (!currentUser) {
      setMyTicketsError("Please log in to see your tickets.");
      return;
    }
    setLoadingMyTickets(true);
    setMyTicketsError('');
    setMyTickets([]);

    try {
      const tickets = await getUserTickets(currentUser.uid);
      setMyTickets(tickets);
      if (tickets.length === 0) {
        setMyTicketsError("You haven't booked any tickets yet.");
      }
    } catch (error) {
      console.error("Error in fetchMyTickets: ", error);
      setMyTicketsError(error.message || "Failed to load your tickets. Please try again.");
    } finally {
      setLoadingMyTickets(false);
    }
  };

  useEffect(() => {
    if (tabValue === 0 && currentUser) {
      fetchAllAvailableTrains();
    } else if (tabValue === 1 && currentUser) {
      fetchMyTickets();
    }
  }, [currentUser, tabValue]);

  const handleBookTicket = async (train) => {
    if (!currentUser) {
      setBookingFeedback({ type: 'error', message: 'You must be logged in to book tickets.' });
      return;
    }
    if (!train) return;

    setBookingLoading(true);
    setBookingFeedback({ type: '', message: '' });

    try {
      await bookTicket(train, currentUser);
      setBookingFeedback({ type: 'success', message: `Successfully booked ticket for ${train.name || 'this train'}!` });
      if (tabValue === 1) {
        fetchMyTickets();
      }
    } catch (error) {
      console.error("Error in handleBookTicket: ", error);
      setBookingFeedback({ type: 'error', message: error.message || 'Failed to book ticket. Please try again.' });
    } finally {
      setBookingLoading(false);
    }
  };

  const handleCancelTicketClick = (ticket) => {
    setSelectedTicket(ticket);
    setCancelDialogOpen(true);
  };

  const confirmCancelTicket = async () => {
    if (!selectedTicket) return;
    setBookingLoading(true);
    setBookingFeedback({ type: '', message: '' });

    try {
      await cancelTicket(selectedTicket.id);
      setBookingFeedback({ type: 'success', message: 'Ticket cancelled successfully.' });
      fetchMyTickets();
    } catch (error) {
      console.error("Error in confirmCancelTicket: ", error);
      setBookingFeedback({ type: 'error', message: error.message || 'Failed to cancel ticket. Please try again.' });
    } finally {
      setCancelDialogOpen(false);
      setSelectedTicket(null);
      setBookingLoading(false);
    }
  };

  const renderDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    try {
      if (timestamp instanceof Date) {
        return format(timestamp, 'yyyy-MM-dd');
      }
      return format(timestamp.toDate(), 'yyyy-MM-dd');
    } catch (e) {
      console.error("Error formatting date:", e, timestamp);
      return 'Invalid Date';
    }
  };

  const renderTime = (timestampOrString) => {
    if (!timestampOrString) return 'N/A';
    if (typeof timestampOrString === 'string') {
      if (/^\d{1,2}:\d{2}(:\d{2})?\s*(AM|PM)?$/i.test(timestampOrString)) {
        return timestampOrString;
      }
      return 'N/A';
    }
    try {
      if (timestampOrString instanceof Date) {
        return format(timestampOrString, 'hh:mm a');
      }
      return format(timestampOrString.toDate(), 'hh:mm a');
    } catch (e) {
      console.error("Error formatting time:", e, timestampOrString);
      return 'Invalid Time';
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" gutterBottom>
        Ticket Management
      </Typography>
      
      {bookingFeedback.message && (
        <Alert severity={bookingFeedback.type} sx={{ mb: 2 }}>
          {bookingFeedback.message}
        </Alert>
      )}
      
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
          <Typography variant="h6" gutterBottom>
            Available Trains for Booking
          </Typography>
          {loadingTrains && <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />}
          {trainsError && !loadingTrains && (
            <Alert severity="warning" sx={{ mt: 2 }}>{trainsError}</Alert>
          )}
          {!loadingTrains && availableTrains.length > 0 && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              {availableTrains.map((train) => (
                <Grid item xs={12} md={6} lg={4} key={train.id}>
                  <Card>
                    <CardContent>
                      <Grid container spacing={1} alignItems="center">
                        <Grid item xs={2} sm={1} sx={{ textAlign: 'center' }}>
                          <Train fontSize="large" color="primary" />
                        </Grid>
                        <Grid item xs={10} sm={11}>
                          <Typography variant="h6" noWrap>
                            {train.name || 'Train Name Missing'}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Train #{train.trainNumber || 'N/A'}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="textSecondary">From</Typography>
                          <Typography variant="body1">{train.departureStation}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="textSecondary">To</Typography>
                          <Typography variant="body1">{train.arrivalStation}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="textSecondary">Date</Typography>
                          <Typography variant="body1">{renderDate(train.departureDate)}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="textSecondary">Time</Typography>
                          <Typography variant="body1">{renderTime(train.departureTime)}</Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 1 }}>
                          <Chip
                            label={`${train.totalSeats ?? '?'} seats`}
                            size="small"
                            color={(train.totalSeats ?? 0) > 0 ? "success" : "error"}
                            icon={<EventSeat />}
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'flex-end' }}>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleBookTicket(train)}
                        disabled={bookingLoading || (train.totalSeats ?? 0) <= 0}
                      >
                        {bookingLoading ? <CircularProgress size={20} /> : 'Book Now'}
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
          {!loadingTrains && availableTrains.length === 0 && !trainsError && (
            <Typography variant="body1" color="textSecondary" align="center" sx={{ mt: 2 }}>
              No trains are currently scheduled or available for booking.
            </Typography>
          )}
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom>
            Your Booked Tickets
          </Typography>
          
          {loadingMyTickets && <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />}
          {myTicketsError && !loadingMyTickets && (
            <Alert severity={myTickets.length > 0 ? "info" : "warning"} sx={{ mt: 2 }}>{myTicketsError}</Alert>
          )}

          {!loadingMyTickets && myTickets.length > 0 ? (
            <Grid container spacing={2}>
              {myTickets.map((ticket) => (
                <Grid item xs={12} md={6} key={ticket.id}>
                  <Card sx={{ mb: 2 }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {ticket.trainName || 'Unknown Train'}
                      </Typography>
                      <Divider sx={{ mb: 2 }} />
                      <Grid container spacing={1}>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="textSecondary">From</Typography>
                          <Typography variant="body1">{ticket.from}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="textSecondary">To</Typography>
                          <Typography variant="body1">{ticket.to}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="textSecondary">Date</Typography>
                          <Typography variant="body1">{renderDate(ticket.date)}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="textSecondary">Time</Typography>
                          <Typography variant="body1">{renderTime(ticket.time)}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="textSecondary">Seat</Typography>
                          <Typography variant="body1">{ticket.seat || 'Not Assigned'}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="textSecondary">Status</Typography>
                          <Chip label={ticket.status} color="primary" size="small" />
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 1}}>
                          <Typography variant="caption" color="textSecondary">
                            Booking ID: {ticket.id} <br />
                            Booked On: {renderDate(ticket.bookedAt)}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                    <CardActions>
                      <Button 
                        startIcon={<Cancel />} 
                        color="error" 
                        onClick={() => handleCancelTicketClick(ticket)}
                        disabled={bookingLoading}
                      >
                        Cancel Ticket
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            !loadingMyTickets && !myTicketsError && (
            <Typography variant="body1" color="textSecondary" align="center">
                You haven't booked any tickets yet, or check the login status.
            </Typography>
            )
          )}
        </TabPanel>
      </Paper>
      
      <Dialog
        open={cancelDialogOpen}
        onClose={() => !bookingLoading && setCancelDialogOpen(false)}
        aria-labelledby="cancel-dialog-title"
        aria-describedby="cancel-dialog-description"
      >
        <DialogTitle id="cancel-dialog-title">Cancel Ticket Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText id="cancel-dialog-description">
            Are you sure you want to cancel your ticket for {selectedTicket?.trainName} from {selectedTicket?.from} to {selectedTicket?.to} on {renderDate(selectedTicket?.date)}?
            <br />
            This action cannot be undone.
          </DialogContentText>
          {bookingLoading && <CircularProgress sx={{ display: 'block', margin: '10px auto' }} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCancelDialogOpen(false)} disabled={bookingLoading}>
            No, Keep Ticket
          </Button>
          <Button onClick={confirmCancelTicket} color="error" autoFocus disabled={bookingLoading}>
            Yes, Cancel Ticket
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 