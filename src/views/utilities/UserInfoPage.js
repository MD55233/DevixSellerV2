import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Card, Avatar, Grid, Divider } from '@mui/material';
import { green } from '@mui/material/colors';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from 'views/pages/authentication/AuthContext';

const UserInfoPage = () => {
  const { username } = useAuth();
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/user/${username}`);
        setUserInfo(response.data.user);
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };

    if (username) {
      fetchUserInfo();
    }
  }, [username]);

  const {
    fullName,
    email,
    phoneNumber,
    address,
    profilePicture,
    location,
  } = userInfo;

  return (
    <Box
      sx={{
        padding: '16px',
        backgroundColor: green[50],
        minHeight: '100vh',
      }}
    >
      <Typography
        variant="h5"
        sx={{
          textAlign: 'center',
          fontWeight: 700,
          marginBottom: '24px',
          color: green[800],
        }}
      >
        User Information
      </Typography>

      <Card
        sx={{
          padding: '24px',
          borderRadius: '16px',
          backgroundColor: '#fff',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <Avatar
            sx={{ width: 80, height: 80, marginBottom: '16px' }}
            src={profilePicture ? `${process.env.REACT_APP_API_HOST}/${profilePicture}` : null}
          >
            {!profilePicture && <AccountCircleIcon sx={{ fontSize: '3rem', color: green[800] }} />}
          </Avatar>
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, color: green[900], marginBottom: '8px' }}
          >
            {fullName || 'Name Surname'}
          </Typography>
          <Typography variant="body2" sx={{ color: green[700], marginBottom: '16px' }}>
            {email || 'Email not available'}
          </Typography>
        </Box>

        <Divider sx={{ margin: '16px 0' }} />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body1" sx={{ fontWeight: 500, color: green[800] }}>
              Phone:
            </Typography>
            <Typography variant="body2" sx={{ color: green[700] }}>
              {phoneNumber || 'Phone number not available'}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body1" sx={{ fontWeight: 500, color: green[800] }}>
              Address:
            </Typography>
            <Typography variant="body2" sx={{ color: green[700] }}>
              {address || 'Address not available'}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body1" sx={{ fontWeight: 500, color: green[800] }}>
              Location:
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', color: green[700] }}>
              <LocationOnIcon />
              <Typography variant="body2">
                {location || 'Location not available'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default UserInfoPage;
