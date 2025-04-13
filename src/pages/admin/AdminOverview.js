import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, CardContent, Typography, CircularProgress } from '@mui/material';
import { 
  DirectionsRailway, 
  ConfirmationNumber, 
  People,
  Feedback 
} from '@mui/icons-material';
import { db } from '../../firebase/config';
import { collection, getDocs, query, where, Timestamp } from 'firebase/firestore';

const StatCard = ({ title, value, icon, color }) => (
  <Card sx={{ height: '100%', bgcolor: color }}>
    <CardContent>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          {icon}
        </Grid>
        <Grid item xs>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
            {value}
          </Typography>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

export default function AdminOverview() {
  const [stats, setStats] = useState({
    totalTrains: 0,
    activeBookings: 0,
    totalUsers: 0,
    pendingComplaints: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setLoading(true);

        // Get current date for filtering active bookings
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayTimestamp = Timestamp.fromDate(today);

        // Fetch total active trains
        const trainsSnapshot = await getDocs(
          query(collection(db, "trains"), where("departureDate", ">=", todayTimestamp))
        );
        
        // Fetch active bookings
        const bookingsSnapshot = await getDocs(
          query(collection(db, "bookings"), 
            where("status", "==", "Confirmed"),
            where("date", ">=", todayTimestamp)
          )
        );
        
        // Fetch total users (excluding admins)
        const usersSnapshot = await getDocs(
          query(collection(db, "users"), where("role", "!=", "admin"))
        );
        
        // Fetch pending complaints
        const complaintsSnapshot = await getDocs(
          query(collection(db, "complaints"), where("status", "==", "Pending"))
        );

        setStats({
          totalTrains: trainsSnapshot.size,
          activeBookings: bookingsSnapshot.size,
          totalUsers: usersSnapshot.size,
          pendingComplaints: complaintsSnapshot.size
        });

        setLoading(false);
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
        setError("Failed to load dashboard statistics");
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom component="div">
        Dashboard Overview
      </Typography>
      
      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Active Trains" 
            value={stats.totalTrains} 
            icon={<DirectionsRailway sx={{ fontSize: 40, color: '#fff' }} />}
            color="#1976d2"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Active Bookings" 
            value={stats.activeBookings} 
            icon={<ConfirmationNumber sx={{ fontSize: 40, color: '#fff' }} />}
            color="#2e7d32"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Registered Users" 
            value={stats.totalUsers} 
            icon={<People sx={{ fontSize: 40, color: '#fff' }} />}
            color="#ed6c02"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Pending Complaints" 
            value={stats.pendingComplaints} 
            icon={<Feedback sx={{ fontSize: 40, color: '#fff' }} />}
            color="#d32f2f"
          />
        </Grid>
      </Grid>
    </Box>
  );
} 