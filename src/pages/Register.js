import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { 
  Container, 
  Typography, 
  Box, 
  TextField, 
  Button, 
  Paper, 
  Grid, 
  Link as MuiLink, 
  Alert,
  CircularProgress
} from '@mui/material';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      return setError("Passwords do not match!");
    }
    
    try {
      setError("");
      setLoading(true);
      
      // Create new user with Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Then create a document in Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        email: email,
        role: "passenger", // or "user"
        displayName: name,
        createdAt: Timestamp.now()
      });

      // Update user profile with name
      await updateProfile(userCredential.user, {
        displayName: name
      });
      
      // Redirect to login page
      navigate("/login");
    } catch (err) {
      console.error("Registration error:", err);
      setError("Failed to create an account. " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            Register
          </Typography>
          
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          
          <Box component="form" onSubmit={handleRegister} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Register"}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <MuiLink component={Link} to="/login" variant="body2">
                  {"Already have an account? Login"}
                </MuiLink>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register;
