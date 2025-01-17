import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from 'views/pages/authentication/AuthContext';
import { Box, Typography, Button, Grid, Card, CardContent, Collapse, List, ListItem, ListItemText } from '@mui/material';

const DownlineReferrals = () => {
  const { username, fullName } = useAuth(); // Get logged-in user details from AuthContext
  const [directReferrals, setDirectReferrals] = useState([]);
  const [indirectReferrals, setIndirectReferrals] = useState([]);
  const [summary, setSummary] = useState({});
  const [showDirect, setShowDirect] = useState(false);
  const [showIndirect, setShowIndirect] = useState(false);

  useEffect(() => {
    if (!username) return;

    // Fetch downlines and summary
    const fetchDownlines = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/referrals/downline/${username}`);
        setDirectReferrals(response.data.directReferrals);
        setIndirectReferrals(response.data.indirectReferrals);
        setSummary(response.data.summary);
      } catch (error) {
        console.error('Error fetching downlines:', error);
      }
    };

    fetchDownlines();
  }, [username]);

  const getStatusStyles = (status) => {
    switch (status) {
     
      case 'Activated':
        return { backgroundColor: '#d4edda', color: '#155724' }; // Light green background
      case 'Account not activated':
        return { backgroundColor: '#f8d7da', color: '#721c24' }; // Light red background
      case 'More than one account activated':
        return { backgroundColor: '#fff3cd', color: '#856404' }; // Light yellow background
      default:
        return { backgroundColor: '#ffffff', color: '#000000' }; // Default white background
    }
  };
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Referrals of User: {fullName || username}
      </Typography>

      {/* Summary Section */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Direct Referrals Summary</Typography>
              <Typography>Activated: {summary.activatedDirect || 0}</Typography>
              <Typography>Not Activated: {summary.notActivatedDirect || 0}</Typography>
              {summary.planBreakdownDirect &&
                summary.planBreakdownDirect.map((plan) => (
                  <Typography key={plan.planName}>
                    {plan.planName}: {plan.count}
                  </Typography>
                ))}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Indirect Referrals Summary</Typography>
              <Typography>Activated: {summary.activatedIndirect || 0}</Typography>
              <Typography>Not Activated: {summary.notActivatedIndirect || 0}</Typography>
              {summary.planBreakdownIndirect &&
                summary.planBreakdownIndirect.map((plan) => (
                  <Typography key={plan.planName}>
                    {plan.planName}: {plan.count}
                  </Typography>
                ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Direct and Indirect Referrals */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        {/* Direct Referrals Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                Direct Referrals ({directReferrals.length})
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setShowDirect((prev) => !prev)}
                sx={{ mt: 2 }}
              >
                {showDirect ? 'Hide Direct Referrals' : 'Show Direct Referrals'}
              </Button>
              <Collapse in={showDirect}>
                <List>
                  {directReferrals.map((ref) => (
                     <ListItem key={ref.username}>
                     <ListItemText
                       primary={`${ref.fullName} (${ref.username})`}
                       secondary={
                         <>
                           <Typography variant="body2">Email: {ref.email}</Typography>
                           <Typography variant="body2">Plan Activated: {ref.planName || 'No Plan'}</Typography>
                           <Typography variant="body2">Balance: Rs {ref.balance }</Typography>
                           <Box sx={{
                       ...getStatusStyles(ref.planStatus),
                       padding: '4px 8px',
                       borderRadius: '4px',
                       display: 'inline-block'
                     }}>
                       {ref.planStatus}
                     </Box>

                      {/* Separator Line */}
     <Box sx={{ borderTop: '1px solid #ccc', my: 1 }} />

                         </>
                       }
                     />
                   </ListItem>
                  ))}
                </List>
              </Collapse>
            </CardContent>
          </Card>
        </Grid>

        {/* Indirect Referrals Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                Indirect Referrals ({indirectReferrals.length})
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setShowIndirect((prev) => !prev)}
                sx={{ mt: 2 }}
              >
                {showIndirect ? 'Hide Indirect Referrals' : 'Show Indirect Referrals'}
              </Button>
              <Collapse in={showIndirect}>
                <List>
                  {indirectReferrals.map((ref) => (
                    <ListItem key={ref.username}>
                    <ListItemText
                      primary={`${ref.fullName} (${ref.username})`}
                      secondary={
                        <>
                          <Typography variant="body2">Email: {ref.email}</Typography>
                          <Typography variant="body2">Plan Activated: {ref.planName || 'No Plan'}</Typography>
                          <Typography variant="body2">Balance: Rs {ref.balance || '0.00'}</Typography>
                          <Box sx={{
                      ...getStatusStyles(ref.planStatus),
                      padding: '4px 8px',
                      borderRadius: '4px',
                      display: 'inline-block'
                    }}>
                      {ref.planStatus}
                    </Box>

                     {/* Separator Line */}
    <Box sx={{ borderTop: '1px solid #ccc', my: 1 }} />

                        </>
                      }
                    />
                  </ListItem>
                  ))}
                </List>
              </Collapse>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DownlineReferrals;
