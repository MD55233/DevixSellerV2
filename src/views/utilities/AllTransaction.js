import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress, Grid } from '@mui/material';
import axios from 'axios';
import { useAuth } from 'views/pages/authentication/AuthContext';

const TransactionHistory = () => {
  const { username } = useAuth(); // Get username from auth context
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/transactions/${username}`);
        setTransactions(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching transaction history:', error);
        setError('Error fetching transaction history. Please try again.');
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [username]);

  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12}>
        <Typography variant="h3" gutterBottom sx={{ color: 'secondary.main', textAlign: 'center' }}>
          Transaction History
        </Typography>
      </Grid>

      <Grid item xs={12} sm={8}>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error" variant="h6">{error}</Typography>
        ) : transactions.length === 0 ? (
          <Typography variant="h6">No transactions found.</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction._id}>
                    <TableCell>{new Date(transaction.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>{transaction.type}</TableCell>
                    <TableCell align="right">${transaction.amount}</TableCell>
                    <TableCell>{transaction.status}</TableCell>
                    <TableCell>{transaction.details}</TableCell>
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

export default TransactionHistory;
