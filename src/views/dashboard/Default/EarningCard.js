import PropTypes from 'prop-types';
import axios from 'axios';
import { useAuth } from 'views/pages/authentication/AuthContext';
import { useState, useEffect } from 'react';
// material-ui
import { Grid, Typography, Card, Avatar } from '@mui/material';
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
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '16px',
            background: 'linear-gradient(270deg,rgb(191, 255, 240) -20%, #FFFFFF 30%)',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            padding: '24px',
          }}
        >
          {/* Avatar Section */}
          <Avatar
            sx={{ width: 64, height: 64, marginBottom: '12px' }}
            src={profilePicture ? `${process.env.REACT_APP_API_HOST}/${profilePicture}` : null} // Show profile picture if available
          >
            {!profilePicture && <AccountCircleIcon sx={{ fontSize: '2.5rem', color: '#FFFFFF' }} />} {/* Fallback to default icon */}
          </Avatar>

          <Typography
            sx={{
              fontSize: '1.125rem',
              fontWeight: 600,
              color: '#333',
              marginBottom: '16px',
            }}
          >
            {fullName || 'Name Surname'}
          </Typography>

          {/* Divider Line */}
          <hr style={{ width: '100%', border: '0.5px solid #E0E0E0', margin: '12px 0' }} />

          {/* Balance and Expenses Section */}
          <Grid container justifyContent="space-between" alignItems="center" spacing={2} sx={{ width: '100%' }}>
            <Grid item xs={6} textAlign="center">
              <Typography
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: 400,
                  color: '#2CB693',
                  marginBottom: '4px',
                }}
              >
                Pending Commission
              </Typography>
              <Typography
                sx={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#2CB693',
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
                  color: '#2CB693',
                  marginBottom: '4px',
                }}
              >
                Balance
              </Typography>
              <Typography
                sx={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#2CB693',
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
