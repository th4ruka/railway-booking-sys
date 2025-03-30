import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Home.css"; // Import CSS file
import TrainTracker from "../components/TrainTracker";
import Footer from "../components/Footer"; // Import Footer
import { useAuth } from "../contexts/AuthContext";
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardContent,
  CardActionArea, 
  Button,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import { Train as TrainIcon, Schedule, LocalShipping, CardMembership } from '@mui/icons-material';

const Home = () => {
  const [imageSrc, setImageSrc] = useState("/images/train-icon.jpg");
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleBookNowClick = () => {
    if (isAuthenticated) {
      // User is logged in, redirect to booking
      navigate("/booking");
    } else {
      // User is not logged in, show login dialog
      setLoginDialogOpen(true);
    }
  };

  const handleLoginRedirect = () => {
    setLoginDialogOpen(false);
    navigate("/login", { state: { from: "/booking" } });
  };

  const handleDialogClose = () => {
    setLoginDialogOpen(false);
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ pb: 8 }}> {/* Add bottom padding to prevent footer overlap */}
        {/* Hero Section */}
        <Paper elevation={3} sx={{ 
          padding: 4, 
          marginTop: 4, 
          borderRadius: 2,
          background: 'linear-gradient(45deg, #f5f7fa 0%, #c3cfe2 100%)'
        }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" component="h1" gutterBottom>
                Welcome to RAIL-RUNNER
              </Typography>
              <Typography variant="h5" color="textSecondary" paragraph>
                Our platform makes it easy for you to search for trains, view schedules, 
                and book tickets effortlessly.
              </Typography>
              <Button 
                variant="contained" 
                size="large" 
                startIcon={<TrainIcon />}
                onClick={handleBookNowClick}
                sx={{ mt: 2 }}
              >
                Book Now
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              {/* Image that changes on hover */}
              <Box
                component="div"
                onMouseEnter={() => setImageSrc("/images/train-hover.jpg")} 
                onMouseLeave={() => setImageSrc("/images/train-icon.jpg")}
                sx={{ 
                  display: 'flex',
                  justifyContent: 'center',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)'
                  }
                }}
              >
                <Box 
                  component="img" 
                  src={imageSrc} 
                  alt="Train Booking"
                  sx={{ 
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: 2,
                    boxShadow: 3
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Real-Time Train Tracker */}
        <Box mt={6} mb={4}>
          <Typography variant="h4" component="h2" align="center" gutterBottom>
            Track Your Train in Real-Time
          </Typography>
          <Card sx={{ boxShadow: 3 }}>
            <CardContent>
              <TrainTracker />
            </CardContent>
          </Card>
        </Box>

        {/* Quick Access Features */}
        <Box my={6}>
          <Typography variant="h4" component="h2" align="center" gutterBottom>
            Our Services
          </Typography>
          <Grid container spacing={3}>
            {[
              { title: "Book Tickets", description: "Book train tickets quickly and securely", icon: <TrainIcon color="primary" />, link: "/booking" },
              { title: "Train Schedule", description: "Check the latest train schedules", icon: <Schedule color="primary" />, link: "/schedule" },
              { title: "Track Cargo", description: "Track your cargo shipments in real-time", icon: <LocalShipping color="primary" />, link: "/trains" },
              { title: "Season Passes", description: "Apply for season passes at discounted rates", icon: <CardMembership color="primary" />, link: "/tickets" }
            ].map((service, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    transition: '0.3s', 
                    '&:hover': { 
                      transform: 'translateY(-5px)', 
                      boxShadow: 6 
                    } 
                  }}
                >
                  <CardActionArea 
                    onClick={() => !isAuthenticated && service.link === "/booking" ? handleBookNowClick() : navigate(service.link)}
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
                  >
                    <CardContent sx={{ flexGrow: 1, width: '100%' }}>
                      <Box display="flex" alignItems="center" mb={1}>
                        {service.icon}
                        <Typography variant="h6" component="h3" ml={1}>
                          {service.title}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="textSecondary">
                        {service.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
      
      {/* Login Dialog */}
      <Dialog
        open={loginDialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="login-dialog-title"
        aria-describedby="login-dialog-description"
      >
        <DialogTitle id="login-dialog-title">
          {"Login Required"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="login-dialog-description">
            You need to be logged in to book tickets. Would you like to login now?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLoginRedirect} color="primary" autoFocus>
            Login
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Add Footer component */}
      <Footer />
    </>
  );
};

export default Home;
