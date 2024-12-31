import { Card, Grid, Typography, Avatar } from '@mui/material';
import TaskIcon from '@mui/icons-material/Task';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SettingsIcon from '@mui/icons-material/Settings';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ArticleIcon from '@mui/icons-material/Article';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const NavigationCard = ({ title, icon: Icon, onClick }) => (
  <Card
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #Fff 0%, #FFFFFF 100%)',
      borderRadius: '16px',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      padding: '16px',
      cursor: 'pointer',
      transition: 'transform 0.2s ease-in-out',
      '&:hover': {
        transform: 'scale(1.05)',
      },
    }}
    onClick={onClick}
  >
    <Avatar sx={{ backgroundColor: '#2CB693', width: 56, height: 56, marginBottom: '12px' }}>
      <Icon sx={{ color: '#FFFFFF', fontSize: '2rem' }} />
    </Avatar>
    <Typography sx={{ fontSize: '1rem', fontWeight: 500, color: '#333' }}>{title}</Typography>
  </Card>
);

const NavigationPanel = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleNavigation = (page) => {
    console.log(`Navigating to ${page}`);
    navigate(`/${page}`); // Use navigate to programmatically navigate to the page
  };

  return (
    <Grid container spacing={2} sx={{ marginTop: '24px' }}>
      <Grid item xs={6} sm={4} md={3}>
        <NavigationCard title="Tasks" icon={TaskIcon} onClick={() => handleNavigation('payments/task-center')} />
      </Grid>
      <Grid item xs={6} sm={4} md={3}>
        <NavigationCard 
          title="Withdrawals" 
          icon={MonetizationOnIcon} 
          onClick={() => handleNavigation('payments/withdraw')} // Navigate to payments/withdraw
        />
      </Grid>
      <Grid item xs={6} sm={4} md={3}>
        <NavigationCard title="Settings" icon={SettingsIcon} onClick={() => handleNavigation('settings')} />
      </Grid>
      <Grid item xs={6} sm={4} md={3}>
        <NavigationCard title="Add Referral" icon={EmojiEventsIcon} onClick={() => handleNavigation('payments/referral/plans')} />
      </Grid>
      <Grid item xs={6} sm={4} md={3}>
        <NavigationCard 
          title="News" 
          icon={ArticleIcon} 
          onClick={() => window.open('https://www.laikostar.com/news/', '_blank')} // Opens in a new tab
        />
      </Grid>
      <Grid item xs={6} sm={4} md={3}>
        <NavigationCard title="More" icon={SettingsIcon} onClick={() => handleNavigation('utilities/more')} />
      </Grid>
    </Grid>
  );
};

export default NavigationPanel;
