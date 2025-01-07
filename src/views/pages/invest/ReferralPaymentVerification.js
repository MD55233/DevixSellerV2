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
  Card,
  CardMedia,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'views/pages/authentication/AuthContext';

const ReferralPaymentVerification = () => {
  const navigate = useNavigate();
  const { username } = useAuth();
  const selectedPlan = JSON.parse(localStorage.getItem('selectedPlan')); // Plan details from localStorage

  const [transactionId, setTransactionId] = useState('');
  const [transactionAmount, setTransactionAmount] = useState('');
  const [gateway, setGateway] = useState('');
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (selectedPlan) {
      setTransactionAmount(selectedPlan.price || '');
    }
  }, [selectedPlan]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
    } else {
      alert('Please upload a valid image file.');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!transactionId || !transactionAmount || !gateway || !image || !username || !selectedPlan) {
      setErrorMessage('All fields are required, including the image.');
      setSuccessMessage('');
      return;
    }

    const formData = new FormData();
    formData.append('username', username);
    formData.append('transactionId', transactionId);
    formData.append('transactionAmount', transactionAmount);
    formData.append('gateway', gateway);
    formData.append('image', image);
    formData.append('planName', selectedPlan.name);
    formData.append('planPrice', selectedPlan.price);
    formData.append('directBonus', selectedPlan.DirectBonus);
    formData.append('indirectBonus', selectedPlan.IndirectBonus);
    formData.append('DailyTaskLimit', selectedPlan.DailyTaskLimit);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_HOST}/api/referral-payment/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Success:', response.data);

      setSuccessMessage('Referral payment details uploaded successfully.');
      setErrorMessage('');
      setTransactionId('');
      setGateway('');
      setImage(null);
      localStorage.removeItem('selectedPlan');

      setTimeout(() => {
        navigate('/payments/referral/plans');
      }, 2000);
    } catch (error) {
      const errMsg = error.response?.data?.message || 'Error submitting the form. Please try again.';
      setErrorMessage(errMsg);
      setSuccessMessage('');
    }
  };

  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12}>
        <Typography variant="h3" gutterBottom sx={{ color: 'secondary.main', textAlign: 'center' }}>
          Upload Payment Verification Details
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <form onSubmit={handleSubmit}>
            <TextField
              required
              fullWidth
              id="transactionId"
              label="Transaction ID"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              margin="normal"
              variant="outlined"
            />
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel id="transactionAmount-label">Transaction Amount</InputLabel>
              <Select
                labelId="transactionAmount-label"
                id="transactionAmount"
                value={transactionAmount}
                onChange={(e) => setTransactionAmount(e.target.value)}
                label="Transaction Amount"
              >
                <MenuItem value={transactionAmount}>{transactionAmount}</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel id="gateway-label">Gateway/Bank</InputLabel>
              <Select
                labelId="gateway-label"
                id="gateway"
                value={gateway}
                onChange={(e) => setGateway(e.target.value)}
                label="Gateway/Bank"
              >
                <MenuItem value="JazzCash">JazzCash</MenuItem>
                <MenuItem value="Easypaisa">Easypaisa</MenuItem>
                <MenuItem value="NayaPay">NayaPay</MenuItem>
                <MenuItem value="SadaPay">SadaPay</MenuItem>
                <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
              </Select>
            </FormControl>
            <input accept="image/*" id="image-upload" type="file" onChange={handleFileChange} style={{ display: 'none' }} />
            <label htmlFor="image-upload">
              <Button variant="outlined" component="span" sx={{ marginTop: 2 }}>
                Upload Screenshot (Image)
              </Button>
            </label>
            {image && (
              <Card sx={{ maxWidth: 300, marginTop: 2 }}>
                <CardMedia component="img" height="auto" image={URL.createObjectURL(image)} alt="Uploaded Screenshot" />
              </Card>
            )}
            <Box display="flex" justifyContent="center" sx={{ marginTop: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!transactionId || !transactionAmount || !gateway || !image}
              >
                Submit
              </Button>
            </Box>
          </form>
          {successMessage && (
            <Typography variant="h4" color="success.main" sx={{ marginTop: 2, textAlign: 'center' }}>
              {successMessage}
            </Typography>
          )}
          {errorMessage && (
            <Typography variant="h6" color="error.main" sx={{ marginTop: 2, textAlign: 'center' }}>
              {errorMessage}
            </Typography>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ReferralPaymentVerification;
