import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  TextField, 
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Snackbar,
  Alert
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { 
  db, 
} from '../../firebase/config';
import { 
  collection, 
  getDocs, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  Timestamp, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { getAllAvailableTrains } from '../../firebase/ticketService';

export default function TrainManagement() {
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentTrain, setCurrentTrain] = useState(null);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  
  const [formData, setFormData] = useState({
    name: '',
    trainNumber: '',
    departureStation: '',
    arrivalStation: '',
    departureDate: '',
    departureTime: '',
    totalSeats: 0
  });

  useEffect(() => {
    fetchTrains();
  }, []);

  const fetchTrains = async () => {
    try {
      setLoading(true);
      const trainData = await getAllAvailableTrains();
      setTrains(trainData);
      setError(null);
    } catch (err) {
      console.error("Error fetching trains:", err);
      setError("Failed to load trains. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOpenDialog = (train = null) => {
    if (train) {
      // Convert Firestore timestamp to input-compatible string format
      const departureDate = train.departureDate instanceof Timestamp 
        ? train.departureDate.toDate().toISOString().split('T')[0]
        : '';
      
      const departureTime = train.departureTime || '';
      
      setFormData({
        name: train.name || '',
        trainNumber: train.trainNumber || '',
        departureStation: train.departureStation || '',
        arrivalStation: train.arrivalStation || '',
        departureDate,
        departureTime,
        totalSeats: train.totalSeats || 0
      });
      
      setCurrentTrain(train);
      setEditMode(true);
    } else {
      setFormData({
        name: '',
        trainNumber: '',
        departureStation: '',
        arrivalStation: '',
        departureDate: '',
        departureTime: '',
        totalSeats: 0
      });
      setCurrentTrain(null);
      setEditMode(false);
    }
    
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSubmit = async () => {
    try {
      // Validate form data
      if (!formData.name || !formData.trainNumber || !formData.departureStation || 
          !formData.arrivalStation || !formData.departureDate || !formData.totalSeats) {
        setNotification({
          open: true,
          message: 'Please fill all required fields',
          severity: 'error'
        });
        return;
      }
      
      // Create date object from form input
      const dateObj = new Date(formData.departureDate);
      
      // Add time if provided
      if (formData.departureTime) {
        const [hours, minutes] = formData.departureTime.split(':');
        dateObj.setHours(parseInt(hours, 10), parseInt(minutes, 10));
      }
      
      const trainData = {
        name: formData.name,
        trainNumber: formData.trainNumber,
        departureStation: formData.departureStation,
        arrivalStation: formData.arrivalStation,
        departureDate: Timestamp.fromDate(dateObj),
        departureTime: formData.departureTime,
        totalSeats: parseInt(formData.totalSeats, 10),
        availableSeats: parseInt(formData.totalSeats, 10) // For new trains, available = total
      };
      
      if (editMode && currentTrain) {
        // Update existing train
        const trainRef = doc(db, "trains", currentTrain.id);
        await updateDoc(trainRef, trainData);
        setNotification({
          open: true,
          message: 'Train updated successfully',
          severity: 'success'
        });
      } else {
        // Add new train
        await addDoc(collection(db, "trains"), trainData);
        setNotification({
          open: true,
          message: 'Train added successfully',
          severity: 'success'
        });
      }
      
      handleCloseDialog();
      fetchTrains(); // Refresh the list
    } catch (err) {
      console.error("Error saving train:", err);
      setNotification({
        open: true,
        message: 'Error saving train: ' + err.message,
        severity: 'error'
      });
    }
  };

  const handleDeleteTrain = async (trainId) => {
    if (window.confirm('Are you sure you want to delete this train?')) {
      try {
        await deleteDoc(doc(db, "trains", trainId));
        setNotification({
          open: true,
          message: 'Train deleted successfully',
          severity: 'success'
        });
        fetchTrains(); // Refresh the list
      } catch (err) {
        console.error("Error deleting train:", err);
        setNotification({
          open: true,
          message: 'Error deleting train: ' + err.message,
          severity: 'error'
        });
      }
    }
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="div">
          Train Management
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add New Train
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Train Number</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>From</TableCell>
              <TableCell>To</TableCell>
              <TableCell>Departure Date</TableCell>
              <TableCell>Departure Time</TableCell>
              <TableCell>Total Seats</TableCell>
              <TableCell>Available Seats</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trains.length > 0 ? (
              trains.map((train) => (
                <TableRow key={train.id}>
                  <TableCell>{train.trainNumber}</TableCell>
                  <TableCell>{train.name}</TableCell>
                  <TableCell>{train.departureStation}</TableCell>
                  <TableCell>{train.arrivalStation}</TableCell>
                  <TableCell>
                    {train.departureDate instanceof Timestamp 
                      ? train.departureDate.toDate().toLocaleDateString() 
                      : 'N/A'}
                  </TableCell>
                  <TableCell>{train.departureTime || 'N/A'}</TableCell>
                  <TableCell>{train.totalSeats}</TableCell>
                  <TableCell>{train.availableSeats || train.totalSeats}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleOpenDialog(train)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDeleteTrain(train.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  No trains found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Train Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>{editMode ? 'Edit Train' : 'Add New Train'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mt: 2 }}>
            <TextField
              label="Train Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
              required
            />
            
            <TextField
              label="Train Number"
              name="trainNumber"
              value={formData.trainNumber}
              onChange={handleInputChange}
              fullWidth
              required
            />
            
            <TextField
              label="From Station"
              name="departureStation"
              value={formData.departureStation}
              onChange={handleInputChange}
              fullWidth
              required
            />
            
            <TextField
              label="To Station"
              name="arrivalStation"
              value={formData.arrivalStation}
              onChange={handleInputChange}
              fullWidth
              required
            />
            
            <TextField
              label="Departure Date"
              name="departureDate"
              type="date"
              value={formData.departureDate}
              onChange={handleInputChange}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
            />
            
            <TextField
              label="Departure Time"
              name="departureTime"
              type="time"
              value={formData.departureTime}
              onChange={handleInputChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            
            <TextField
              label="Total Seats"
              name="totalSeats"
              type="number"
              value={formData.totalSeats}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {editMode ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notification */}
      <Snackbar 
        open={notification.open} 
        autoHideDuration={6000} 
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}