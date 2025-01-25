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
  Box,
  Grid,
} from '@mui/material';
import axios from 'axios';
import { useAuth } from 'views/pages/authentication/AuthContext';

const TaskTransactionHistory = () => {
  const { username } = useAuth(); // Get username from auth context
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const taskTransactionsResponse = await axios.get(
          `${process.env.REACT_APP_API_HOST}/api/task-transactions/${username}`
        );

        // Filter out only task-related transactions
        const taskTransactions = taskTransactionsResponse.data.map((item) => ({
          ...item,
          type: 'Task Transaction',
          status: item.status,
          amount: item.amount,
          taskName: item.taskId?.name || 'Task',  // Add task name from populated taskId
          accountNumber: '-',  // Placeholder
          gateway: '-',  // Placeholder
          remarks: item.description,
        }));

        // Sort transactions by date in descending order
        taskTransactions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setTransactions(taskTransactions);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching task transactions:', error);
        setError('Error fetching task transactions. Please try again.');
        setLoading(false);
      }
    };

    fetchTransactions();
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
          Task Transaction History
        </Typography>
      </Grid>

      <Grid item xs={12} sm={8}>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error" variant="h6">{error}</Typography>
        ) : transactions.length === 0 ? (
          <Typography variant="h6">No task transactions found.</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Task Name</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Account Number</TableCell>
                  <TableCell>Gateway</TableCell>
                  <TableCell>Remarks</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction._id}>
                    <TableCell>{new Date(transaction.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>{transaction.taskName}</TableCell>
                    <TableCell>Rs {transaction.amount}</TableCell>
                    <TableCell>
                      <Box sx={{
                        ...getStatusStyles(transaction.status),
                        padding: '4px 8px',
                        borderRadius: '4px',
                        display: 'inline-block'
                      }}>
                        {transaction.status}
                      </Box>
                    </TableCell>
                    <TableCell>{transaction.accountNumber || '-'}</TableCell>
                    <TableCell>{transaction.gateway || '-'}</TableCell>
                    <TableCell>{transaction.remarks || '-'}</TableCell>
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

export default TaskTransactionHistory;
