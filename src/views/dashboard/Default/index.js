import { useState, useEffect } from 'react';
// material-ui
import { Grid } from '@mui/material';
// project imports
import EarningCard from './EarningCard';
import NavigationPanel from './NavigationPanel';
import { gridSpacing } from 'store/constant';


// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
      <EarningCard isLoading={isLoading} />
      <NavigationPanel isLoading={isLoading} />
     
      </Grid>
      <Grid item lg={4} md={6} sm={6} xs={12}>
           
          </Grid>
    
    </Grid>
  );
};

export default Dashboard;
