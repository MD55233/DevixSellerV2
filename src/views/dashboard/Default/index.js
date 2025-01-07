import { useState, useEffect } from 'react';
// material-ui
import { Grid } from '@mui/material';
// project imports
import EarningCard from './EarningCard';
import UpgradeAccountCard from './UpgradeAccountCard';
import NavigationPanel from './NavigationPanel';
import { gridSpacing } from 'store/constant';


// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);
  const handleUpgradeClick = () => {
    window.location.href = '/payments/referral/plans'; // Replace with your upgrade page route
  };
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
      <EarningCard isLoading={isLoading} />
      <NavigationPanel isLoading={isLoading} />
     
      </Grid>
      <Grid item  xs={12}>
      <UpgradeAccountCard isLoading={false} onUpgradeClick={handleUpgradeClick} />;
          </Grid>
    
    </Grid>
  );
};

export default Dashboard;
