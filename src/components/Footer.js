// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Link as MuiLink, 
  Divider, 
  Stack
} from '@mui/material';
import { 
  Email, 
  Phone, 
  Facebook, 
  Twitter, 
  Instagram, 
  LinkedIn 
} from '@mui/icons-material';

const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: '#f5f5f5',
        py: 6,
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* About Us Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sri Lanka Railway operates approximately 310 trains which include 45 Long-Distance and 12 Intercity 
              trains and carries about 0.29 Million passengers daily. SLR owns and maintains 
              1420 km of rail tracks, 175 locomotives, 900 carriages and the signalling network.
            </Typography>
          </Grid>

          {/* Quick Links Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Quick Links
            </Typography>
            <Stack spacing={1}>
              <MuiLink component={Link} to="/trains" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                Trains
              </MuiLink>
              <MuiLink component={Link} to="/booking" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                Booking
              </MuiLink>
              <MuiLink component={Link} to="/login" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                Login
              </MuiLink>
              <MuiLink component={Link} to="/register" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                Register
              </MuiLink>
            </Stack>
          </Grid>

          {/* Contact Us Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Contact Us
            </Typography>
            <Stack spacing={2}>
              <Box display="flex" alignItems="center">
                <Email color="primary" sx={{ mr: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  support@railway.com
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Phone color="primary" sx={{ mr: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  +123 456 7890
                </Typography>
              </Box>
            </Stack>
          </Grid>

          {/* Follow Us Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Follow Us
            </Typography>
            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
              <MuiLink href="https://facebook.com" target="_blank" rel="noopener noreferrer" color="primary">
                <Facebook />
              </MuiLink>
              <MuiLink href="https://twitter.com" target="_blank" rel="noopener noreferrer" color="primary">
                <Twitter />
              </MuiLink>
              <MuiLink href="https://instagram.com" target="_blank" rel="noopener noreferrer" color="primary">
                <Instagram />
              </MuiLink>
              <MuiLink href="https://linkedin.com" target="_blank" rel="noopener noreferrer" color="primary">
                <LinkedIn />
              </MuiLink>
            </Stack>
          </Grid>
        </Grid>
        
        {/* Divider */}
        <Divider sx={{ my: 4 }} />
        
        {/* Copyright */}
        <Typography variant="body2" color="text.secondary" align="center">
          &copy; {new Date().getFullYear()} Railway Management System. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
