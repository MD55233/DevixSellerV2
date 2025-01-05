import PropTypes from 'prop-types';
import axios from 'axios';
import { useAuth } from 'views/pages/authentication/AuthContext';
import { useState, useEffect } from 'react';
// material-ui
import { Grid, Typography, Card, Avatar, Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const EarningCard = ({ isLoading }) => {
  const [balance, setBalance] = useState(0);
  const [pendingCommission, setPendingCommission] = useState(0);
  const [profilePicture, setProfilePicture] = useState(null); // State to store profile picture URL
  const { username, fullName } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/user/${username}`);
        setBalance(response.data.user.balance);
        setPendingCommission(response.data.user.pendingCommission || 0);
        setProfilePicture(response.data.user.profilePicture); // Fetch profile picture URL
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (username) {
      fetchUserData();
    }
  }, [username]);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: '16px',
            background: 'linear-gradient(270deg, #870000, #190A05)', // Red gradient background
            boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
            padding: '20px',
            color: '#FFFFFF',
          }}
        >
          {/* Profile Picture Section */}
          <Avatar
            sx={{ width: 64, height: 64, marginBottom: '8px', border: '2px solid #FFFFFF' }}
            src={profilePicture ? `${process.env.REACT_APP_API_HOST}/${profilePicture}` : null} // Show profile picture if available
          >
            {!profilePicture && <AccountCircleIcon sx={{ fontSize: '2.5rem', color: '#FFFFFF' }} />} {/* Fallback to default icon */}
          </Avatar>

          {/* Full Name Section */}
          <Typography
            sx={{
              fontSize: '1.2rem',
              fontWeight: 600,
              marginBottom: '12px',
            }}
          >
            {fullName || 'Name Surname'}
          </Typography>

          {/* Divider Line */}
          <Box
            sx={{
              width: '90%',
              height: '1px',
              background: 'rgba(255, 255, 255, 0.3)',
              marginBottom: '16px',
            }}
          />

          {/* Balance and Commission Section */}
          <Grid container justifyContent="space-between" alignItems="center" spacing={2} sx={{ width: '100%' }}>
            <Grid item xs={6} textAlign="center">
              <Typography
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: 400,
                  color: '#FFD700', // Golden Yellow
                  marginBottom: '4px',
                }}
              >
                Pending Commission
              </Typography>
              <Typography
                sx={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                }}
              >
                Rs {pendingCommission.toFixed(2)}
              </Typography>
            </Grid>

            <Grid item xs={6} textAlign="center">
              <Typography
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: 400,
                  color: '#FFD700', // Golden Yellow
                  marginBottom: '4px',
                }}
              >
                Balance
              </Typography>
              <Typography
                sx={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                }}
              >
                Rs {balance.toFixed(2)}
              </Typography>
            </Grid>
          </Grid>
        </Card>
      )}
    </>
  );
};

EarningCard.propTypes = {
  isLoading: PropTypes.bool,
};

export default EarningCard;