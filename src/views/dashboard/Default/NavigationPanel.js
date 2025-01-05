import { Card, Grid, Typography, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

// Import the PNG icons
import TaskIcon from './icons/clipboard-checklist.png';
import WithdrawalsIcon from './icons/money-transfer.png';
import SettingsIcon from './icons/settings.png';
import ReferralIcon from './icons/stack-of-books.png';
import NewsIcon from './icons/newspaper.png';
import MoreIcon from './icons/add-referral.png';

const NavigationCard = ({ title, icon, onClick }) => (
  <Card
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFFFFF', // White background for card
      borderRadius: '12px', // Match rounded square style
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
        backgroundColor: '#F5F5F5', // Light gray background for the icon
        width: 48, // Larger size for the avatar
        height: 48,
        marginBottom: '8px',
        borderRadius: '12px', // Rounded square style
      }}
    >
      <img src={icon} alt={`${title} Icon`} style={{ width: '40px', height: '40px' }} />
    </Avatar>
    <Typography
      sx={{
        fontSize: '0.75rem', // Smaller font size
        fontWeight: 500,
        color: '#333333',
        textAlign: 'center', // Center-align the text
      }}
    >
      {title}
    </Typography>
  </Card>
);

const NavigationPanel = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleNavigation = (page) => {
    console.log(`Navigating to ${page}`);
    navigate(`/${page}`); // Use navigate to programmatically navigate to the page
  };

  return (
    <Grid
      container
      spacing={2} // Adjust spacing between grid items
      sx={{
        marginTop: '16px',
        justifyContent: 'center', // Center the grid items
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
          onClick={() => handleNavigation('payments/referral/plans')}
        />
      </Grid>
      <Grid item xs={4}>
        <NavigationCard
          title="News"
          icon={NewsIcon}
          onClick={() => window.open('https://www.laikostar.com/news/', '_blank')}
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
