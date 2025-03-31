import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Trains from "./pages/Trains";
import Booking from "./pages/Booking";
import TrainSchedule from "./pages/TrainSchedule";
import TicketCategories from "./pages/TicketCategories";
import SpecialTrains from "./pages/SpecialTrains";  // ✅ Add Special Trains
import Login from "./pages/Login";
import Register from "./pages/Register";
import AGWarrant from "./pages/AGWarrant";
import TourismPackages from "./pages/TourismPackages";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import "./styles/style.css";

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
      fontWeight: 600,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Normalizes CSS across browsers */}
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/trains" element={<Trains />} />
            <Route path="/schedule" element={<TrainSchedule />} />
            <Route path="/tickets" element={<TicketCategories />} />
            <Route path="/special-trains" element={<SpecialTrains />} /> 
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/warrant" element={<AGWarrant />} />
            <Route path="/tourism" element={<TourismPackages />} />
            
            {/* Protected routes */}
            <Route path="/booking" element={
              <ProtectedRoute>
                <Booking />
              </ProtectedRoute>
            } />
            
            {/* Dashboard routes */}
            <Route path="/dashboard/*" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            {/* Redirect to dashboard if user is logged in and trying to access public routes */}
            <Route path="/login" element={
              <AuthRedirect>
                <Login />
              </AuthRedirect>
            } />
            
            <Route path="/register" element={
              <AuthRedirect>
                <Register />
              </AuthRedirect>
            } />
            
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

// Helper component to redirect authenticated users
function AuthRedirect({ children }) {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
}

export default App;
