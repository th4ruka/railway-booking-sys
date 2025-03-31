import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Chip
} from '@mui/material';
import {
  Train,
  LocalShipping,
  CardMembership,
  Feedback,
  Notifications,
  DirectionsTransit,
  TrendingUp,
  Info,
  Warning,
  CheckCircle
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function DashboardIndex() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  // Get current date in a readable format
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  // Mock upcoming trips data
  const upcomingTrips = [
    { id: 1, train: 'Udarata Manike', from: 'Colombo', to: 'Kandy', date: '2023-09-20', time: '08:00 AM' },
  ];
  
  // Mock notifications
  const notifications = [
    { id: 1, type: 'info', message: 'Your season pass will expire in 10 days.', date: '2023-09-15' },
    { id: 2, type: 'success', message: 'Your complaint has been resolved.', date: '2023-09-14' },
    { id: 3, type: 'warning', message: 'Train #1082 will be delayed by 15 minutes tomorrow.', date: '2023-09-13' },
  ];
  
  // Quick access buttons
  const quickAccess = [
    { title: 'Book a Ticket', icon: <Train />, path: '/dashboard/tickets' },
    { title: 'Ship Cargo', icon: <LocalShipping />, path: '/dashboard/cargo' },
    { title: 'Apply for Pass', icon: <CardMembership />, path: '/dashboard/passes' },
    { title: 'Submit Complaint', icon: <Feedback />, path: '/dashboard/complaints' },
  ];

  // Helper function to render notification icon based on type
  const getNotificationIcon = (type) => {
    switch(type) {
      case 'info':
        return <Info color="primary" />;
      case 'warning':
        return <Warning color="warning" />;
      case 'success':
        return <CheckCircle color="success" />;
      default:
        return <Notifications color="action" />;
    }
  };

  return (
    <Box>
      <Paper elevation={1} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          Welcome, {currentUser?.displayName || 'Passenger'}!
        </Typography>
        <Typography variant="subtitle1">
          Today is {currentDate}
        </Typography>
      </Paper>
      
      <Grid container spacing={3}>
        {/* Quick Access Cards */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Quick Actions
          </Typography>
          <Grid container spacing={2}>
            {quickAccess.map((action, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <Card sx={{ textAlign: 'center', cursor: 'pointer', transition: '0.3s', '&:hover': { transform: 'translateY(-5px)', boxShadow: 6 } }}>
                  <CardContent onClick={() => navigate(action.path)}>
                    <Box sx={{ mb: 2 }}>
                      {React.cloneElement(action.icon, { fontSize: 'large', color: 'primary' })}
                    </Box>
                    <Typography variant="subtitle1">
                      {action.title}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
        
        {/* Upcoming Trips */}
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Upcoming Trips
            </Typography>
            {upcomingTrips.length > 0 ? (
              <Grid container spacing={2}>
                {upcomingTrips.map((trip) => (
                  <Grid item xs={12} key={trip.id}>
                    <Card variant="outlined">
                      <CardContent>
                        <Grid container alignItems="center" spacing={2}>
                          <Grid item>
                            <DirectionsTransit color="primary" fontSize="large" />
                          </Grid>
                          <Grid item xs>
                            <Typography variant="h6">
                              {trip.train}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              {trip.from} to {trip.to}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography variant="body2">
                              {trip.date}
                            </Typography>
                            <Typography variant="body1">
                              {trip.time}
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
                <Grid item xs={12}>
                  <Button 
                    variant="outlined" 
                    fullWidth
                    onClick={() => navigate('/dashboard/tickets')}
                  >
                    View All Trips
                  </Button>
                </Grid>
              </Grid>
            ) : (
              <Box sx={{ py: 4, textAlign: 'center' }}>
                <Typography variant="body1" color="textSecondary" paragraph>
                  You don't have any upcoming trips.
                </Typography>
                <Button 
                  variant="contained" 
                  startIcon={<Train />}
                  onClick={() => navigate('/dashboard/tickets')}
                >
                  Book a Trip
                </Button>
              </Box>
            )}
          </Paper>
        </Grid>
        
        {/* Notifications */}
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Notifications
            </Typography>
            {notifications.length > 0 ? (
              <List>
                {notifications.map((notification) => (
                  <ListItem key={notification.id} sx={{ mb: 1, border: '1px solid #eee', borderRadius: 1 }}>
                    <ListItemIcon>
                      {getNotificationIcon(notification.type)}
                    </ListItemIcon>
                    <ListItemText 
                      primary={notification.message}
                      secondary={notification.date}
                    />
                  </ListItem>
                ))}
                <ListItem>
                  <Button 
                    variant="text" 
                    fullWidth
                  >
                    View All Notifications
                  </Button>
                </ListItem>
              </List>
            ) : (
              <Box sx={{ py: 4, textAlign: 'center' }}>
                <Typography variant="body1" color="textSecondary">
                  You don't have any notifications.
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
        
        {/* Current Train Status */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Latest Train Updates
              </Typography>
              <Chip 
                icon={<TrendingUp />} 
                label="Live" 
                color="success" 
                size="small" 
                variant="outlined" 
              />
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              {[1, 2, 3].map((index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card variant="outlined">
                    <CardContent>
                      <Grid container alignItems="center" spacing={1}>
                        <Grid item>
                          <Avatar sx={{ bgcolor: index === 1 ? 'success.main' : index === 2 ? 'warning.main' : 'error.main' }}>
                            <Train />
                          </Avatar>
                        </Grid>
                        <Grid item xs>
                          <Typography variant="subtitle1">
                            {index === 1 ? 'Udarata Manike' : index === 2 ? 'Ruhunu Kumari' : 'Yal Devi'}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {index === 1 ? 'On time' : index === 2 ? 'Delayed by 10 minutes' : 'Delayed by 30 minutes'}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Box sx={{ mt: 2, textAlign: 'right' }}>
              <Button 
                variant="text" 
                onClick={() => navigate('/dashboard/tracking')}
              >
                Track Your Train
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
} 