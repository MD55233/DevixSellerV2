import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom'; // Import for navigation
import axios from 'axios';
import { useAuth } from 'views/pages/authentication/AuthContext';
import MainCard from 'ui-component/cards/MainCard';
import TotalIncomeCard from 'ui-component/cards/Skeleton/TotalIncomeCard';

// Styles for the card wrapper
const CardWrapper = styled(MainCard)(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(210.04deg, ${theme.palette.warning.dark} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: '50%',
    top: -30,
    right: -180
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(140.9deg, ${theme.palette.warning.dark} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
    borderRadius: '50%',
    top: -160,
    right: -130
  }
}));

const Wallet = ({ isLoading }) => {
  const navigate = useNavigate(); // Hook for navigation
  const { username } = useAuth(); // Fetch username from AuthContext
  const [accounts, setAccounts] = useState([]); // List of user accounts
  const [editDialogOpen, setEditDialogOpen] = useState(false); // Edit dialog state
  const [selectedAccount, setSelectedAccount] = useState(null); // Currently selected account
  const [formData, setFormData] = useState({
    gateway: '',
    accountNumber: '',
    accountTitle: ''
  }); // Form data for editing accounts

  // Fetch accounts on component mount
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/user-accounts/${username}`);
        setAccounts(response.data);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };
    fetchAccounts();
  }, [username]);

  // Handle deleting an account
  const handleDelete = async (accountId) => {
    if (window.confirm('Are you sure you want to delete this wallet?')) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_HOST}/api/user-accounts/delete/${accountId}`);
        setAccounts(accounts.filter((account) => account._id !== accountId));
      } catch (error) {
        console.error('Error deleting account:', error);
      }
    }
  };

  // Open edit dialog and populate form data
  const handleEdit = (account) => {
    setSelectedAccount(account);
    setFormData({
      gateway: account.gateway || '',
      accountNumber: account.accountNumber || '',
      accountTitle: account.accountTitle || ''
    });
    setEditDialogOpen(true);
  };

  // Save the updated account information
  const handleSave = async () => {
    if (!selectedAccount) return;

    try {
      await axios.put(
        `${process.env.REACT_APP_API_HOST}/api/user-accounts/edit/${selectedAccount._id}`,
        formData
      );

      setAccounts((prevAccounts) =>
        prevAccounts.map((account) =>
          account._id === selectedAccount._id ? { ...account, ...formData } : account
        )
      );

      setEditDialogOpen(false);
      setSelectedAccount(null);
    } catch (error) {
      console.error('Error updating account:', error);
    }
  };

  // Update form data on input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Navigate to the Add Wallet page
  const handleAddWallet = () => {
    navigate('/wallet/add');
  };

  return (
    <>
      {isLoading ? (
        <TotalIncomeCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h3" gutterBottom sx={{ color: 'secondary.main', mt: 2 , marginLeft: 6}}>
                My Wallets
              </Typography>
              <Button variant="contained" color="primary" onClick={handleAddWallet} sx={{ mt: 2 , marginRight:6}}>
                Add Wallet
              </Button>
            </Grid>
            {accounts.map((account) => (
              <Grid item xs={12} sm={6} md={4}  sx={{marginRight:3, marginLeft:3}} key={account._id}>
                <Card
                  sx={{
                    border: '1px solid #ccc',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                    padding: '16px'
                  }}
                >
                  <CardContent>
                    <Typography variant="h5">{account.gateway}</Typography>
                    <Typography variant="body1">Account Number: {account.accountNumber}</Typography>
                    <Typography variant="body1">Account Title: {account.accountTitle}</Typography>
                    <Button
                      variant="outlined"
                      color="primary"
                      sx={{ marginRight: '8px', marginTop: '8px' }}
                      onClick={() => handleEdit(account)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      sx={{ marginTop: '8px' }}
                      onClick={() => handleDelete(account._id)}
                    >
                      Delete
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardWrapper>
      )}

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Wallet</DialogTitle>
        <DialogContent>
          <TextField
            label="Gateway"
            name="gateway"
            fullWidth
            margin="dense"
            value={formData.gateway}
            onChange={handleInputChange}
          />
          <TextField
            label="Account Number"
            name="accountNumber"
            fullWidth
            margin="dense"
            value={formData.accountNumber}
            onChange={handleInputChange}
          />
          <TextField
            label="Account Title"
            name="accountTitle"
            fullWidth
            margin="dense"
            value={formData.accountTitle}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

Wallet.propTypes = {
  isLoading: PropTypes.bool
};

export default Wallet;
