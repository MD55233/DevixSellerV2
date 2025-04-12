import React, { useState, useEffect, Suspense } from 'react';
import {
  Typography,
  Box,
  Button,
  TextField,
  Card,
  CardContent,
  CircularProgress,
} from '@mui/material';
import { ContentCopy } from '@mui/icons-material';
import { useAuth } from 'views/pages/authentication/AuthContext'; // Import useAuth
import axios from 'axios';

// Lazy load the DownlineReferrals component
const DownlineReferrals = React.lazy(() => import('../dashboard/Default/DownlineReferrals')); // Adjust the import path

const ReferralLink = () => {
  const { username } = useAuth(); // Fetch username from auth context
  const [dailyTaskLimit, setDailyTaskLimit] = useState(null); // State for task limit
  const [loading, setLoading] = useState(true); // State for loading indicator

  const referralLink = username
    ? `https://pk.Devix.com/pages/register/register3/${username}`
    : 'Username not available';

  // Fetch user's details and daily task limit
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `https://api1.Devix.com/api/user/${username}` // Replace with your actual API endpoint
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

  // Copy referral link to clipboard
  const handleCopyReferralLink = () => {
    if (referralLink) {
      navigator.clipboard.writeText(referralLink);
      alert('Referral link copied to clipboard!');
    }
  };

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
              Please activate your account to unlock the referral program.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    );
  }

  // Show referral link if dailyTaskLimit is 2 or more
  return (
    <Box display="flex" flexDirection="column" alignItems="center"  sx={{ paddingTop: '2rem' }}>
      {/* Referral Link Section */}
      <Card sx={{ p: 3, backgroundColor: '#ffffff', boxShadow: 3, borderRadius: '8px', mb: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Your Referral Link
          </Typography>
          <Typography variant="body1" gutterBottom>
            Share this link to sign up new users under your referral.
          </Typography>
          <Box display="flex" alignItems="center" mt={2}>
            <TextField
              value={referralLink}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              size="small"
              sx={{
                backgroundColor: '#fff',
                borderRadius: 1,
                boxShadow: 1,
              }}
            />
            <Button
              variant="contained"
              color="primary"
              startIcon={<ContentCopy />}
              onClick={handleCopyReferralLink}
              sx={{ ml: 2 }}
            >
              Copy Link
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Downline Referrals Section */}
      <Suspense fallback={<CircularProgress size={50} />}>
        <DownlineReferrals />
      </Suspense>
    </Box>
  );
};

export default ReferralLink;
