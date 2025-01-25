import React from 'react';
import { Card, Grid, Typography, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Import the PNG icons
import TaskIcon from './icons/tasks.gif';
import WithdrawalsIcon from './icons/share.gif';
import SettingsIcon from './icons/settings.gif';
import ReferralIcon from './icons/referral.gif';
import NewsIcon from './icons/newspaper.gif';
import MoreIcon from './icons/more.gif';
import GroupIcon from './icons/group.gif'; // New icon for Official Group
import SalaryIcon from './icons/salary.gif'; // New icon for Salary
import WalletIcon from './icons/wallet.gif'; // New icon for Wallets

const NavigationCard = ({ title, icon, onClick }) => (
  <Card
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFFFFF',
      borderRadius: '12px',
      boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
      padding: '12px',
      cursor: 'pointer',
      transition: 'transform 0.2s ease-in-out',
      '&:hover': {
        transform: 'scale(1.05)',
      },
    }}
    onClick={onClick}
  >
    <Avatar
      sx={{
        backgroundColor: '#F5F5F5',
        width: 48,
        height: 48,
        marginBottom: '8px',
        borderRadius: '12px',
      }}
    >
      <img src={icon} alt={`${title} Icon`} style={{ width: '40px', height: '40px' }} />
    </Avatar>
    <Typography
      sx={{
        fontSize: '0.75rem',
        fontWeight: 500,
        color: '#333333',
        textAlign: 'center',
      }}
    >
      {title}
    </Typography>
  </Card>
);

const NavigationPanel = () => {
  const navigate = useNavigate();

  const handleNavigation = (page) => {
    console.log(`Navigating to ${page}`);
    navigate(`/${page}`);
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        marginTop: '16px',
        justifyContent: 'center',
      }}
    >
      <Grid item xs={4}>
        <NavigationCard
          title="Tasks"
          icon={TaskIcon}
          onClick={() => handleNavigation('payments/task-center')}
        />
      </Grid>
      <Grid item xs={4}>
        <NavigationCard
          title="Withdrawals"
          icon={WithdrawalsIcon}
          onClick={() => handleNavigation('payments/withdraw')}
        />
      </Grid>
      <Grid item xs={4}>
        <NavigationCard
          title="Settings"
          icon={SettingsIcon}
          onClick={() => handleNavigation('password-change')}
        />
      </Grid>
      <Grid item xs={4}>
        <NavigationCard
          title="Ad Referral"
          icon={ReferralIcon}
          onClick={() => handleNavigation('payments/referral/referral-link')}
        />
      </Grid>
      <Grid item xs={4}>
        <NavigationCard
          title="News"
          icon={NewsIcon}
          onClick={() => window.open('https://www.laikostar.com/news/', '_blank')}
        />
      </Grid>
       {/* New Boxes */}
       <Grid item xs={4}>
        <NavigationCard
          title="Official Group"
          icon={GroupIcon}
          onClick={() => handleNavigation('community/official-group')}
        />
      </Grid>
      <Grid item xs={4}>
        <NavigationCard
          title="Salary"
          icon={SalaryIcon}
          onClick={() => handleNavigation('payments/salary')}
        />
      </Grid>
      <Grid item xs={4}>
        <NavigationCard
          title="Wallets"
          icon={WalletIcon}
          onClick={() => handleNavigation('wallet/all')}
        />
      </Grid>

      <Grid item xs={4}>
        <NavigationCard
          title="More"
          icon={MoreIcon}
          onClick={() => handleNavigation('utilities/more')}
        />
      </Grid>

     
    </Grid>
  );
};

export default NavigationPanel;
