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

const WithdrawalHistory = () => {
  const { username } = useAuth(); // Get username from auth context
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWithdrawals = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/withdrawals/${username}`);

        // Process the response to include the necessary fields
        const withdrawalsData = response.data.map(item => ({
          ...item,
          status: item.status || 'unknown', // Assuming there's a status field, fallback to 'unknown' if not present
        }));

        // Sort withdrawals by date in descending order
        withdrawalsData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setWithdrawals(withdrawalsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching withdrawal history:', error);
        setError('Error fetching withdrawal history. Please try again.');
        setLoading(false);
      }
    };

    fetchWithdrawals();
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
          Withdrawal History
        </Typography>
      </Grid>

      <Grid item xs={12} sm={8}>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error" variant="h6">{error}</Typography>
        ) : withdrawals.length === 0 ? (
          <Typography variant="h6">No withdrawals found.</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Account Number</TableCell>
                  <TableCell>Gateway</TableCell>
                  <TableCell>Remarks</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {withdrawals.map((withdrawal) => (
                  <TableRow key={withdrawal._id}>
                    <TableCell>{new Date(withdrawal.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>Rs,{withdrawal.amount}</TableCell>
                    <TableCell>
                      <Box sx={{
                        ...getStatusStyles(withdrawal.status),
                        padding: '4px 8px',
                        borderRadius: '4px',
                        display: 'inline-block'
                      }}>
                        {withdrawal.status}
                      </Box>
                    </TableCell>
                    <TableCell>{withdrawal.accountNumber || '-'}</TableCell>
                    <TableCell>{withdrawal.gateway || '-'}</TableCell>
                    <TableCell>{withdrawal.remarks || '-'}</TableCell>
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

export default WithdrawalHistory;
