import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
// material-ui
import { Grid } from '@mui/material';
// project imports
import EarningCard from './EarningCard';
import UpgradeAccountCard from './UpgradeAccountCard';
import NavigationPanel from './NavigationPanel';
import DownlineReferrals from './DownlineReferrals';
import { gridSpacing } from 'store/constant';
import { useAuth } from 'views/pages/authentication/AuthContext'; // Import authentication context

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  const { username } = useAuth(); // Get username from AuthContext
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login page if username is not available
    if (!username) {
      navigate('/pages/login/login3');
    } else {
      setLoading(false);
    }
  }, [username, navigate]);

  const handleUpgradeClick = () => {
    window.location.href = '/payments/referral/plans'; // Replace with your upgrade page route
  };

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <EarningCard isLoading={isLoading} />
        <NavigationPanel isLoading={isLoading} />
      </Grid>
      <Grid item xs={12}>
        <UpgradeAccountCard isLoading={false} onUpgradeClick={handleUpgradeClick} />
        <DownlineReferrals isLoading={isLoading} />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
