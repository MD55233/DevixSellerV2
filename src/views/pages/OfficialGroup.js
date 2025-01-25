import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
} from '@mui/material';
import { useAuth } from 'views/pages/authentication/AuthContext'; // Import useAuth
import axios from 'axios';

const OfficialGroup = () => {
  const { username } = useAuth(); // Fetch username from auth context
  const [dailyTaskLimit, setDailyTaskLimit] = useState(null); // State for activation status
  const [loading, setLoading] = useState(true); // State for loading indicator

  // Fetch user's details and daily task limit
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `https://api1.laikostar.com/api/user/${username}` // Replace with your actual API endpoint
        );
        setDailyTaskLimit(response.data.user.dailyTaskLimit); // Get task limit from API response
      } catch (error) {
        console.error('Error fetching user details:', error);
      } finally {
        setLoading(false); // Stop loading after fetching data
      }
    };

    if (username) {
      fetchUserDetails();
    }
  }, [username]);

  // Show loading spinner while fetching data
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress size={50} />
      </Box>
    );
  }

  // If dailyTaskLimit is less than 2, show account activation message
  if (dailyTaskLimit < 2) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Card sx={{ p: 3, backgroundColor: '#ffffff', boxShadow: 3, borderRadius: '8px' }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Account Activation Required
            </Typography>
            <Typography variant="body1">
              Please activate your account to access the official group.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    );
  }

  // Show official group message and button for activated users
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Card sx={{ p: 3, backgroundColor: '#ffffff', boxShadow: 3, borderRadius: '8px' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Join Our Official WhatsApp Group
          </Typography>
          <Typography variant="body1" gutterBottom>
            Click the button below to join the official group. Please wait for admin approval after joining.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            href="https://chat.whatsapp.com/BaTy7a2zoPC6nv9cR5xdf2 " // Replace with the actual WhatsApp group invite link
            target="_blank"
            sx={{ mt: 2 }}
          >
            Join Group
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default OfficialGroup;