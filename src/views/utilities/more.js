import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Typography, Card, Avatar } from '@mui/material';
import { green } from '@mui/material/colors';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import HistoryIcon from '@mui/icons-material/History';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonIcon from '@mui/icons-material/Person';
import CreditCardIcon from '@mui/icons-material/CreditCard'; // Import CreditCardIcon
import TotalIncomeLightCard from '../dashboard/Default/TotalIncomeLightCard';
import { useAuth } from 'views/pages/authentication/AuthContext';

const MorePage = () => {
  const navigate = useNavigate();

  const menuItems = [
    { label: 'My Financial Management', icon: <AccountBalanceWalletIcon />, route: '/dashboard/default' },
    { label: 'Invite Friends', icon: <MonetizationOnIcon />, route: '/payments/referral/plans' },
    { label: 'Our Payment Accounts', icon: <CreditCardIcon />, route: '/payment-accounts' }, // New item for payment accounts
    { label: 'Top-up Records', icon: <HistoryIcon />, route: '/Transactions/deposit-history' },
    { label: 'Withdraw Records', icon: <HistoryIcon />, route: '/payments/withdraw' },
    { label: 'Personal Information', icon: <PersonIcon />, route: '/utilities/userInfoPage' },
    { label: 'Bank Information', icon: <AccountBalanceWalletIcon />, route: '/wallet/all' },
    { label: 'Account Security', icon: <SettingsIcon />, route: '/password-change' },
   
    { label: 'Sign Out', icon: <ExitToAppIcon />, route: '/pages/login/login3' },
  ];

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const { setAuthenticatedUsername } = useAuth();
  const handleLogout = async () => {
    try {
      setAuthenticatedUsername(null); // Clear the username from context (if applicable)
      navigate('/pages/login/login3'); // Navigate to the login page
      console.log('Logged Out!');
    } catch (error) {
      console.error('There was an error logging out!', error);
    }
  };

  const handleMenuItemClick = (route) => {
    if (route === '/pages/login/login3') {
      handleLogout(); // If 'Sign Out' is clicked, call the handleLogout function
    } else {
      navigate(route); // Otherwise, navigate to the regular route
    }
  };

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
        Member Centre
      </Typography>
      <Grid item lg={4} md={6} sm={6} xs={12} sx={{ marginBottom: 2 }}>
        <TotalIncomeLightCard isLoading={isLoading} />
      </Grid>

      <Grid container spacing={2}>
        {menuItems.map((item, index) => (
          <Grid item xs={12} key={index}>
            <Card
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px 16px',
                cursor: 'pointer',
                backgroundColor: '#fff',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)',
                },
              }}
              onClick={() => handleMenuItemClick(item.route)} // Use handleMenuItemClick instead of navigate directly
            >
              <Avatar
                sx={{
                  marginRight: '16px',
                  backgroundColor: green[100],
                  color: green[700],
                }}
              >
                {item.icon}
              </Avatar>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 500,
                  color: green[900],
                }}
              >
                {item.label}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MorePage;
