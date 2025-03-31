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
  CardActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import { 
  Feedback, 
  Send, 
  AccessTime,
  CheckCircle,
  Error
} from '@mui/icons-material';

export default function ComplaintsManagement() {
  const [complaintType, setComplaintType] = useState('');
  const [complaint, setComplaint] = useState('');
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  
  // Mock data for demonstration
  const myComplaints = [
    { 
      id: 1, 
      type: 'Service Issue', 
      subject: 'Delayed Train on September 10th',
      date: '2023-09-12',
      status: 'In Progress',
      response: 'We are looking into this issue and will get back to you shortly.',
      description: 'The train from Colombo to Kandy was delayed by more than 2 hours without any announcement.'
    },
    { 
      id: 2, 
      type: 'Facility Concern', 
      subject: 'Poor Condition of Restrooms',
      date: '2023-09-05',
      status: 'Resolved',
      response: 'Thank you for bringing this to our attention. We have addressed this issue and improved the cleanliness protocols.',
      description: 'The restrooms at Colombo Fort Station were not clean and lacked basic supplies.'
    },
  ];

  const handleComplaintTypeChange = (event) => {
    setComplaintType(event.target.value);
  };

  const handleComplaintChange = (event) => {
    setComplaint(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // In a real app, you would send complaint data to the backend
    console.log("Complaint submitted:", { type: complaintType, complaint });
    setSuccessDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSuccessDialogOpen(false);
    // Reset form after submission
    setComplaintType('');
    setComplaint('');
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" gutterBottom>
        Complaints Management
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Submit a Complaint
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>Complaint Type</InputLabel>
                    <Select
                      value={complaintType}
                      label="Complaint Type"
                      onChange={handleComplaintTypeChange}
                    >
                      <MenuItem value="schedule">Schedule Issue</MenuItem>
                      <MenuItem value="service">Service Issue</MenuItem>
                      <MenuItem value="facility">Facility Concern</MenuItem>
                      <MenuItem value="staff">Staff Behavior</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Subject"
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Complaint Details"
                    multiline
                    rows={6}
                    variant="outlined"
                    value={complaint}
                    onChange={handleComplaintChange}
                    required
                    placeholder="Please provide detailed information about your complaint..."
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Contact Information (optional)"
                    variant="outlined"
                    placeholder="Additional contact information if different from your account"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button 
                    variant="contained" 
                    startIcon={<Send />}
                    size="large"
                    type="submit"
                    fullWidth
                    disabled={!complaintType || !complaint}
                  >
                    Submit Complaint
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, maxHeight: '600px', overflow: 'auto' }}>
            <Typography variant="h6" gutterBottom>
              Your Previous Complaints
            </Typography>
            
            {myComplaints.map((complaint) => (
              <Card key={complaint.id} sx={{ mb: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="h6">
                      {complaint.subject}
                    </Typography>
                    <Chip 
                      label={complaint.status} 
                      color={complaint.status === 'Resolved' ? 'success' : 'primary'} 
                      size="small" 
                      icon={complaint.status === 'Resolved' ? <CheckCircle /> : <AccessTime />}
                    />
                  </Box>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    {complaint.type} • Submitted on {complaint.date}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body2" paragraph>
                    {complaint.description}
                  </Typography>
                  
                  {complaint.response && (
                    <Box sx={{ mt: 2, p: 1, bgcolor: 'background.default', borderRadius: 1 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Response from Customer Service:
                      </Typography>
                      <Typography variant="body2">
                        {complaint.response}
                      </Typography>
                    </Box>
                  )}
                </CardContent>
                <CardActions>
                  <Button size="small">View Details</Button>
                  {complaint.status !== 'Resolved' && (
                    <Button size="small" color="secondary">Follow Up</Button>
                  )}
                </CardActions>
              </Card>
            ))}
            
            {myComplaints.length === 0 && (
              <Typography variant="body1" color="textSecondary" align="center" sx={{ py: 4 }}>
                You haven't submitted any complaints yet.
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
      
      {/* Success Dialog */}
      <Dialog
        open={successDialogOpen}
        onClose={handleCloseDialog}
      >
        <DialogTitle>{"Complaint Submitted Successfully"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your complaint has been received. Our customer service team will review it and respond within 48 hours.
            You can track the status of your complaint in the "Your Previous Complaints" section.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 