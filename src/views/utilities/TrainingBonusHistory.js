import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Grid,
  Box,
} from '@mui/material';
import axios from 'axios';
import { useAuth } from 'views/pages/authentication/AuthContext';

const TrainingBonusHistory = () => {
  const { username } = useAuth(); // Get username from auth context
  const [bonuses, setBonuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBonuses = async () => {
      try {
        const [
          pendingBonusesResponse,
          approvedBonusesResponse,
          rejectedBonusesResponse,
        ] = await Promise.all([
            axios.get(`${process.env.REACT_APP_API_HOST}/api/training-bonus/${username}`),
            axios.get(`${process.env.REACT_APP_API_HOST}/api/approvals/approve/${username}`), // Approved bonuses
            axios.get(`${process.env.REACT_APP_API_HOST}/api/approvals/reject/${username}`), // Rejected bonuses
        ]);

        // Combine all training bonus types into a single array
        const combinedBonuses = [
          ...pendingBonusesResponse.data.map(item => ({
            ...item,
            type: 'Pending Training Bonus',
            status: 'pending',
          })),
          ...approvedBonusesResponse.data.map(item => ({
            ...item,
            type: 'Approved Training Bonus',
            status: 'approved',
          })),
          ...rejectedBonusesResponse.data.map(item => ({
            ...item,
            type: 'Rejected Training Bonus',
            status: 'rejected',
            remarks: item.feedback || 'No feedback provided',
          })),
        ];

        // Sort bonuses by date in descending order
        combinedBonuses.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setBonuses(combinedBonuses);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching training bonus history:', error);
        setError('Error fetching training bonus history. Please try again.');
        setLoading(false);
      }
    };

    fetchBonuses();
  }, [username]);

  const getStatusStyles = (status) => {
    switch (status) {
      case 'approved':
        return { backgroundColor: '#d4edda', color: '#155724' }; // Light green background
      case 'rejected':
        return { backgroundColor: '#f8d7da', color: '#721c24' }; // Light red background
      case 'pending':
        return { backgroundColor: '#fff3cd', color: '#856404' }; // Light yellow background
      default:
        return { backgroundColor: '#ffffff', color: '#000000' }; // Default white background
    }
  };

  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12}>
        <Typography variant="h3" gutterBottom sx={{ color: 'secondary.main', textAlign: 'center' }}>
          Training Bonus History
        </Typography>
      </Grid>

      <Grid item xs={12} sm={8}>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error" variant="h6">{error}</Typography>
        ) : bonuses.length === 0 ? (
          <Typography variant="h6">No training bonuses found.</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Remarks</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bonuses.map((bonus) => (
                  <TableRow key={bonus._id}>
                    <TableCell>{new Date(bonus.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>{bonus.type}</TableCell>
                    <TableCell>Rs,{bonus.transactionAmount || bonus.amount}</TableCell>
                    <TableCell>
                      <Box sx={{
                        ...getStatusStyles(bonus.status),
                        padding: '4px 8px',
                        borderRadius: '4px',
                        display: 'inline-block'
                      }}>
                        {bonus.status}
                      </Box>
                    </TableCell>
                    <TableCell>{bonus.remarks || '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Grid>
    </Grid>
  );
};

export default TrainingBonusHistory;
