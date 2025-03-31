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
  Divider,
  Chip,
  Stack,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  CardMembership,
  Check,
  Schedule,
  Payment,
  Autorenew,
  VerifiedUser,
  AttachMoney
} from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { format, addMonths } from 'date-fns';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`pass-tabpanel-${index}`}
      aria-labelledby={`pass-tab-${index}`}
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

export default function SeasonPassManagement() {
  const [tabValue, setTabValue] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [passType, setPassType] = useState('monthly');
  const [submitted, setSubmitted] = useState(false);
  
  // Mock data for demonstration
  const myPasses = [
    { 
      id: 1, 
      type: 'Monthly', 
      route: 'Colombo - Kandy', 
      validFrom: '2023-09-01', 
      validTo: '2023-09-30', 
      status: 'Active',
      cost: '$45.00'
    },
  ];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const calculateEndDate = (months) => {
    const monthMap = {
      'monthly': 1,
      'quarterly': 3,
      'biannual': 6,
      'annual': 12
    };
    return format(addMonths(startDate, monthMap[passType] || 1), 'yyyy-MM-dd');
  };

  const handlePassTypeChange = (event) => {
    setPassType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // In a real app, you would send form data to your backend
    console.log("Season pass application submitted");
    setSubmitted(true);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" gutterBottom>
        Season Pass Management
      </Typography>
      
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Apply for Season Pass" />
          <Tab label="My Season Passes" />
        </Tabs>
        
        <TabPanel value={tabValue} index={0}>
          {!submitted ? (
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Paper elevation={3} sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Apply for a Season Pass
                  </Typography>
                  <Box component="form" onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Full Name"
                          variant="outlined"
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="ID Number"
                          variant="outlined"
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Email"
                          variant="outlined"
                          type="email"
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Phone Number"
                          variant="outlined"
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="From Station"
                          variant="outlined"
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="To Station"
                          variant="outlined"
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth required>
                          <InputLabel>Pass Type</InputLabel>
                          <Select
                            label="Pass Type"
                            value={passType}
                            onChange={handlePassTypeChange}
                          >
                            <MenuItem value="monthly">Monthly (30 days)</MenuItem>
                            <MenuItem value="quarterly">Quarterly (90 days)</MenuItem>
                            <MenuItem value="biannual">Bi-Annual (180 days)</MenuItem>
                            <MenuItem value="annual">Annual (365 days)</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth required>
                          <InputLabel>Class</InputLabel>
                          <Select
                            label="Class"
                            defaultValue="economy"
                          >
                            <MenuItem value="economy">Economy</MenuItem>
                            <MenuItem value="business">Business</MenuItem>
                            <MenuItem value="first">First Class</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            label="Start Date"
                            value={startDate}
                            onChange={(newDate) => setStartDate(newDate)}
                            renderInput={(params) => <TextField {...params} fullWidth required />}
                            minDate={new Date()}
                          />
                        </LocalizationProvider>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="End Date"
                          variant="outlined"
                          value={calculateEndDate()}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Additional Comments"
                          multiline
                          rows={4}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button 
                          variant="contained" 
                          startIcon={<CardMembership />}
                          size="large"
                          type="submit"
                          fullWidth
                        >
                          Submit Application
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper elevation={3} sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Season Pass Benefits
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <AttachMoney color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Save up to 40%" 
                        secondary="Season passes offer significant discounts compared to buying individual tickets" 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Check color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Guaranteed Seat" 
                        secondary="Priority seating for season pass holders" 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Schedule color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Flexible Travel" 
                        secondary="Travel any time on your selected route" 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Autorenew color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Easy Renewal" 
                        secondary="Simple renewal process with additional loyalty discounts" 
                      />
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
            </Grid>
          ) : (
            <Box textAlign="center" py={4}>
              <VerifiedUser color="success" sx={{ fontSize: 60, mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                Your Season Pass Application Has Been Submitted!
              </Typography>
              <Typography variant="body1" paragraph>
                Your application is now being processed. You will receive a confirmation email within 24 hours.
              </Typography>
              <Button 
                variant="contained" 
                onClick={() => {
                  setSubmitted(false);
                  setTabValue(1);
                }}
              >
                View My Passes
              </Button>
            </Box>
          )}
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom>
            Your Season Passes
          </Typography>
          
          {myPasses.length > 0 ? (
            <Grid container spacing={3}>
              {myPasses.map((pass) => (
                <Grid item xs={12} md={6} key={pass.id}>
                  <Card sx={{ position: 'relative', overflow: 'visible' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Typography variant="h6" gutterBottom>
                          {pass.type} Season Pass
                        </Typography>
                        <Chip 
                          label={pass.status} 
                          color={pass.status === 'Active' ? 'success' : 'default'} 
                          size="small" 
                        />
                      </Box>
                      <Divider sx={{ mb: 2 }} />
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography variant="subtitle1" gutterBottom>
                            Route: {pass.route}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="textSecondary">
                            Valid From
                          </Typography>
                          <Typography variant="body1">
                            {pass.validFrom}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="textSecondary">
                            Valid To
                          </Typography>
                          <Typography variant="body1">
                            {pass.validTo}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="body2" color="textSecondary">
                            Cost
                          </Typography>
                          <Typography variant="body1">
                            {pass.cost}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                    <CardActions>
                      <Button startIcon={<Payment />} variant="outlined">
                        View Pass Details
                      </Button>
                      <Button startIcon={<Autorenew />} color="primary" variant="contained">
                        Renew Pass
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box textAlign="center" py={4}>
              <Typography variant="body1" color="textSecondary" paragraph>
                You don't have any active season passes.
              </Typography>
              <Button 
                variant="contained" 
                startIcon={<CardMembership />}
                onClick={() => setTabValue(0)}
              >
                Apply for a Season Pass
              </Button>
            </Box>
          )}
        </TabPanel>
      </Paper>
    </Box>
  );
} 