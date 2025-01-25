import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Typography, Card, Avatar, Button } from '@mui/material';
import { green } from '@mui/material/colors';

import GroupIcon from '../dashboard/Default/icons/group.gif'; // Official Group Icon
import SalaryIcon from '../dashboard/Default/icons/salary.gif'; // Salary Icon
import InviteFriendsIcon from '../dashboard/Default/icons/referral.gif'; // Invite Friends Icon
import PaymentAccountsIcon from '../dashboard/Default/icons/wallet.gif'; // Payment Accounts Icon
import TopUpRecordsIcon from '../dashboard/Default/icons/house.gif'; // Top-Up Records Icon
import WithdrawRecordsIcon from '../dashboard/Default/icons/profit.gif'; // Withdraw Records Icon
import PersonalInfoIcon from '../dashboard/Default/icons/location.gif'; // Personal Information Icon
import BankInfoIcon from '../dashboard/Default/icons/wallet.gif'; // Bank Information Icon
import AccountSecurityIcon from '../dashboard/Default/icons/cyber-security.gif'; // Account Security Icon
import SignOutIcon from '../dashboard/Default/icons/turn-left.gif'; // Sign Out Icon
import TotalIncomeLightCard from '../dashboard/Default/TotalIncomeLightCard';
import { useAuth } from 'views/pages/authentication/AuthContext';

const MorePage = () => {
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Official Group', icon: <img src={GroupIcon} alt="Official Group" style={{ width: '40px', height: '40px' }} />, route: '/community/official-group' },
    { label: 'Salary', icon: <img src={SalaryIcon} alt="Salary" style={{ width: '40px', height: '40px' }} />, route: '/payments/salary' },
    { label: 'My Financial Management', icon: <img src={PersonalInfoIcon} alt="My Financial Management" style={{ width: '40px', height: '40px' }} />, route: '/dashboard/default' },
    { label: 'Invite Friends', icon: <img src={InviteFriendsIcon} alt="Invite Friends" style={{ width: '40px', height: '40px' }} />, route: '/payments/referral/plans' },
    { label: 'Our Payment Accounts', icon: <img src={PaymentAccountsIcon} alt="Payment Accounts" style={{ width: '40px', height: '40px' }} />, route: '/payment-accounts' },
    { label: 'Top-up Records', icon: <img src={TopUpRecordsIcon} alt="Top-up Records" style={{ width: '40px', height: '40px' }} />, route: '/Transactions/deposit-history' },
    { label: 'Withdraw Records', icon: <img src={WithdrawRecordsIcon} alt="Withdraw Records" style={{ width: '40px', height: '40px' }} />, route: '/payments/withdraw' },
    { label: 'Personal Information', icon: <img src={PersonalInfoIcon} alt="Personal Information" style={{ width: '40px', height: '40px' }} />, route: '/utilities/userInfoPage' },
    { label: 'Bank Information', icon: <img src={BankInfoIcon} alt="Bank Information" style={{ width: '40px', height: '40px' }} />, route: '/wallet/all' },
    { label: 'Account Security', icon: <img src={AccountSecurityIcon} alt="Account Security" style={{ width: '40px', height: '40px' }} />, route: '/password-change' },
    { label: 'Sign Out', icon: <img src={SignOutIcon} alt="Sign Out" style={{ width: '40px', height: '40px' }} />, route: '/pages/login/login3' },
  ];

  const [isLoading, setLoading] = useState(true);
  const [installPromptEvent, setInstallPromptEvent] = useState(null);
  const [isInstallVisible, setInstallVisible] = useState(false);

  useEffect(() => {
    setLoading(false);

    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      setInstallPromptEvent(event);
      setInstallVisible(true);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', () => {});
    };
  }, []);

  const { setAuthenticatedUsername } = useAuth();

  const handleLogout = async () => {
    try {
      setAuthenticatedUsername(null);
      navigate('/pages/login/login3');
      console.log('Logged Out!');
    } catch (error) {
      console.error('There was an error logging out!', error);
    }
  };

  const handleMenuItemClick = (route) => {
    if (route === '/pages/login/login3') {
      handleLogout();
    } else {
      navigate(route);
    }
  };

  const handleInstallClick = () => {
    if (installPromptEvent) {
      installPromptEvent.prompt();
      installPromptEvent.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the PWA install prompt');
        } else {
          console.log('User dismissed the PWA install prompt');
        }
        setInstallVisible(false);
      });
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

      {isInstallVisible && (
        <Box sx={{ textAlign: 'center', marginBottom: 3 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleInstallClick}
            sx={{
              padding: '10px 20px',
              borderRadius: '8px',
              backgroundColor: green[700],
              '&:hover': {
                backgroundColor: green[800],
              },
            }}
          >
            Install App
          </Button>
        </Box>
      )}

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
              onClick={() => handleMenuItemClick(item.route)}
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