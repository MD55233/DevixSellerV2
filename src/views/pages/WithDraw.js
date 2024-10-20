import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Typography,
  Grid,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useAuth } from 'views/pages/authentication/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Ensure framer-motion is installed

const WithdrawBalance = () => {
  const { username } = useAuth(); // Get the username from auth context
  const navigate = useNavigate();

  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [selectedWallet, setSelectedWallet] = useState('');
  const [wallets, setWallets] = useState([]); // State to store fetched wallets
  const [accountNumber, setAccountNumber] = useState(''); // Initialize account number
  const [accountTitle, setAccountTitle] = useState(''); // Initialize account title
  const [errorMessage, setErrorMessage] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false); // State for dialog open/close
  const [confirmationData, setConfirmationData] = useState(null); // Store data for confirmation
  const [showSuccess, setShowSuccess] = useState(false); // State to show success message

  // Fetch user wallets on component mount
  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/user-accounts/${username}`);
        setWallets(response.data);
      } catch (error) {
        console.error('Error fetching wallets:', error);
      }
    };
    fetchWallets();
  }, [username]);

  const handleWalletChange = (event) => {
    const walletId = event.target.value;
    const wallet = wallets.find((w) => w._id === walletId);
    setSelectedWallet(walletId);
    setAccountNumber(wallet ? wallet.accountNumber : ''); // Set account number
    setAccountTitle(wallet ? wallet.accountTitle : '');   // Set account title
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Prepare the data for confirmation
    const formData = {
      username,
      withdrawAmount,
      gateway: wallets.find((w) => w._id === selectedWallet)?.gateway || '', // Fetch gateway from selected wallet
      accountNumber,
      accountTitle,
    };

    // Set confirmation data and open the dialog
    setConfirmationData(formData);
    setDialogOpen(true);
  };

  const handleConfirm = async () => {
    try {
      const token = localStorage.getItem('token'); // Assuming you store the token in local storage
      const response = await axios.post(`${process.env.REACT_APP_API_HOST}/api/withdraw-balance`, confirmationData, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
      console.log('Withdrawal request submitted:', response.data);
      
      // Reset form state after submission
      setWithdrawAmount('');
      setSelectedWallet('');
      setAccountNumber(''); // Reset account number
      setAccountTitle(''); // Reset account title
      setShowSuccess(true); // Show success message in dialog
    } catch (error) {
      console.error('Error submitting withdrawal request:', error);
      setErrorMessage('Error submitting form. Please try again.');
      setDialogOpen(false); // Close the dialog in case of error
    }
  };

  const handleCancel = () => {
    setDialogOpen(false); // Close the dialog without taking action
  };

  const handleAddWallet = () => {
    navigate('/wallet/add'); // Navigate to the add wallet page
  };

  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12}>
        <Typography variant="h3" gutterBottom sx={{ color: 'secondary.main', textAlign: 'center' }}>
          Withdraw Balance
        </Typography>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Paper elevation={3} sx={{ padding: 2 }}>
          {wallets.length === 0 ? ( // Check if there are wallets available
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
              <Typography variant="h6" color="text.secondary" sx={{ marginBottom: 2 }}>
                No wallets added. Please add a wallet to proceed.
              </Typography>
              <Button variant="contained" color="primary" onClick={handleAddWallet}>
                Add Wallet
              </Button>
            </Box>
          ) : (
            <form onSubmit={handleSubmit}>
              <TextField
                required
                fullWidth
                id="withdrawAmount"
                label="Withdraw Amount"
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                margin="normal"
                variant="outlined"
              />

              <FormControl fullWidth margin="normal" variant="outlined">
                <InputLabel id="wallet-label">Select Wallet</InputLabel>
                <Select
                  labelId="wallet-label"
                  id="wallet"
                  value={selectedWallet}
                  onChange={handleWalletChange}
                  label="Select Wallet"
                >
                  {wallets.map((wallet) => (
                    <MenuItem key={wallet._id} value={wallet._id}>
                      {wallet.gateway}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                required
                fullWidth
                id="accountNumber"
                label="Account Number"
                value={accountNumber}
                margin="normal"
                variant="outlined"
                disabled // Disable to prevent manual entry
              />

              <TextField
                required
                fullWidth
                id="accountTitle"
                label="Account Title"
                value={accountTitle}
                margin="normal"
                variant="outlined"
                disabled // Disable to prevent manual entry
              />

              <Box display="flex" justifyContent="center" sx={{ marginTop: 2 }}>
                <Button type="submit" variant="contained" color="primary" disabled={!withdrawAmount || !selectedWallet}>
                  Submit Withdraw Request
                </Button>
                <Button variant="outlined" onClick={handleAddWallet} sx={{ marginLeft: 2 }}>
                  Add More Wallet
                </Button>
              </Box>
            </form>
          )}

          {errorMessage && (
            <Typography variant="h6" color="error.main" sx={{ marginTop: 2, textAlign: 'center' }}>
              {errorMessage}
            </Typography>
          )}
        </Paper>
      </Grid>

      {/* Confirmation Dialog */}
      <Dialog open={dialogOpen} onClose={handleCancel}>
        <DialogTitle>Confirm Withdrawal</DialogTitle>
        <DialogContent>
          {!showSuccess ? (
            <DialogContentText>
              Are you sure you want to withdraw {withdrawAmount} using the selected wallet? This action cannot be undone.
            </DialogContentText>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.5 }}
              style={{ textAlign: 'center', marginTop: 20 }}
            >
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                margin: '0 auto',
              }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#13E880"
                  width="64px"
                  height="64px"
                >
                  <circle cx="12" cy="12" r="10" stroke="#13E880" strokeWidth="2" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2l4-4" />
                </svg>
              </div>
              <Typography variant="h6" color="success.main" sx={{ marginTop: 2 }}>
                Your withdrawal request has been submitted and is waiting for approval.
              </Typography>
            </motion.div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary" disabled={showSuccess}>
            Cancel
          </Button>
          <Button onClick={showSuccess ? handleCancel : handleConfirm} color="primary">
            {showSuccess ? 'Close' : 'Confirm'}
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default WithdrawBalance;
