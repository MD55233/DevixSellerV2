import { Card, Grid, Typography, Avatar } from '@mui/material';
import TaskIcon from '@mui/icons-material/Task';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SettingsIcon from '@mui/icons-material/Settings';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ArticleIcon from '@mui/icons-material/Article';
import { useNavigate } from 'react-router-dom';

const NavigationCard = ({ title, icon: Icon, onClick }) => (
  <Card
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #F0F8FF 0%, #FFFFFF 100%)',
      borderRadius: '24px',
      boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.15)',
      padding: '20px',
      cursor: 'pointer',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      '&:hover': {
        transform: 'scale(1.1)',
        boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.25)',
      },
    }}
    onClick={onClick}
  >
    <Avatar
      sx={{
        background: 'linear-gradient(135deg, #FF6B6B, #FFD93D)',
        width: 64,
        height: 64,
        marginBottom: '16px',
      }}
    >
      <Icon sx={{ color: '#FFFFFF', fontSize: '2.5rem' }} />
    </Avatar>
    <Typography sx={{ fontSize: '1.2rem', fontWeight: 600, color: '#333', textAlign: 'center' }}>
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
    <Grid container spacing={3} sx={{ padding: '24px' }}>
      <Grid item xs={6} sm={4} md={3}>
        <NavigationCard title="Tasks" icon={TaskIcon} onClick={() => handleNavigation('payments/task-center')} />
      </Grid>
      <Grid item xs={6} sm={4} md={3}>
        <NavigationCard title="Withdrawals" icon={MonetizationOnIcon} onClick={() => handleNavigation('payments/withdraw')} />
      </Grid>
      <Grid item xs={6} sm={4} md={3}>
        <NavigationCard title="Settings" icon={SettingsIcon} onClick={() => handleNavigation('password-change')} />
      </Grid>
      <Grid item xs={6} sm={4} md={3}>
        <NavigationCard title="Add Referral" icon={EmojiEventsIcon} onClick={() => handleNavigation('payments/referral/plans')} />
      </Grid>
      <Grid item xs={6} sm={4} md={3}>
        <NavigationCard title="News" icon={ArticleIcon} onClick={() => window.open('https://www.laikostar.com/news/', '_blank')} />
      </Grid>
      <Grid item xs={6} sm={4} md={3}>
        <NavigationCard title="More" icon={SettingsIcon} onClick={() => handleNavigation('utilities/more')} />
      </Grid>
    </Grid>
  );
};

export default NavigationPanel;
