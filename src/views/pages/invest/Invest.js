import React, { useState, useEffect } from 'react';
import {
  Typography,
  Grid,
  IconButton,
  Box,
  Button,
  TextField,
  Card,
  CardContent,
  CircularProgress,
} from '@mui/material';
import { ArrowBack, ContentCopy } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'views/pages/authentication/AuthContext'; // Import useAuth
import InvestCard from './InvestCard';

const Invest = () => {
  const { username } = useAuth(); // Get the username from the auth context
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [referralLink, setReferralLink] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (username) {
      // If username exists, generate the referral link
      setReferralLink(`https://account.laikostar.com/pages/register/register3/${username}`);
    } else {
      console.error("Username is not available.");
    }

    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_HOST}/api/plans`)
      .then((response) => {
        setPlans(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('There was an error fetching the plans!', error);
        setLoading(false);
      });
  }, [username]);

  const handleCopyReferralLink = () => {
    if (referralLink) {
      navigator.clipboard.writeText(referralLink);
      alert('Referral link copied to clipboard!');
    }
  };

  const handlePlanClick = (plan) => {
    localStorage.setItem('selectedPlan', JSON.stringify(plan));
    navigate('/payments/referral/upload');
  };

  return (
    <div>
      {/* Back Button */}
      <Box display="flex" alignItems="center" mb={3}>
        <IconButton onClick={() => navigate(-1)} color="primary">
          <ArrowBack />
        </IconButton>
        <Typography
          variant="h3"
          gutterBottom
          sx={{ marginLeft: 2, paddingTop: '7px', color: 'secondary.dark' }}
        >
          Add Referral
        </Typography>
      </Box>

      {/* Add Referral Section (Styled as Card) */}
      <Card sx={{ mb: 4, p: 2, backgroundColor: '#ffffff', boxShadow: 3, borderRadius: '8px' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Add Referral
          </Typography>
          <Typography variant="body1" gutterBottom>
            Share the referral link below to sign up new users under your referral.
          </Typography>
          <Box display="flex" alignItems="center" mt={2}>
            <TextField
              value={referralLink || ''}
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

      {/* Already Paid Section */}
      <Card sx={{ mb: 4, p: 2, backgroundColor: '#fff8e1' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom color="theme.palette.secondary.dark">
            Already Paid?
          </Typography>
          <Typography variant="body1" gutterBottom>
            Choose your investment plan below to approve your bonus.
          </Typography>
        </CardContent>
      </Card>

      {/* Plans Section */}
      <Grid container spacing={3}>
        {loading ? (
          <Grid item xs={12} display="flex" justifyContent="center">
            <CircularProgress />
          </Grid>
        ) : (
          plans.map((plan, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <InvestCard
                plan={plan}
                onClick={() => handlePlanClick(plan)}
                isLoading={loading}
              />
            </Grid>
          ))
        )}
      </Grid>
    </div>
  );
};

export default Invest;
