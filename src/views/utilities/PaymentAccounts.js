import React, { useState, useEffect } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogContent,
  CircularProgress,
  IconButton,
  Grid,
} from '@mui/material';
import axios from 'axios';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

// Import images
import SadaPayImage from './accountimg/sadapay.png';
import JazzCashImage from './accountimg/jazzcash.png';
import EasyPaisaImage from './accountimg/easypaisa.png';
import NayaPayImage from './accountimg/nayapay.png';
import UBLImage from './accountimg/ubl.png';
import HBLImage from './accountimg/hbl.png';
import UPaisaImage from './accountimg/upaisa.png';
import MCBImage from './accountimg/mcb.png';
import AlliedImage from './accountimg/allied.png';
import MeezanImage from './accountimg/meezan.png';
import DefaultImage from './accountimg/default.png';

// Map images to platforms
const platformImages = {
  SadaPay: SadaPayImage,
  JazzCash: JazzCashImage,
  EasyPaisa: EasyPaisaImage,
  NayaPay: NayaPayImage,
  UBL: UBLImage,
  HBL: HBLImage,
  UPaisa: UPaisaImage,
  MCB: MCBImage,
  Allied: AlliedImage,
  Meezan: MeezanImage,
};

const PaymentAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null); // For modal/dialog
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch all payment accounts
  const fetchPaymentAccounts = async () => {
    try {
      const response = await axios.get('https://api1.laikostar.com/payment-accounts'); // Replace with your actual API endpoint
      setAccounts(response.data);
    } catch (error) {
      console.error('Error fetching payment accounts:', error);
    } finally {
      setLoading(false); // Set loading to false after data is fetched
    }
  };

  useEffect(() => {
    fetchPaymentAccounts();
  }, []);

  // Function to copy text to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        alert('Copied to clipboard!');
      },
      (err) => {
        console.error('Failed to copy text: ', err);
      }
    );
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Payment Accounts
      </Typography>

      {loading ? (
        // Show loading spinner while data is being fetched
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
          <CircularProgress size={50} />
        </div>
      ) : (
        // Show list of cards
        <Grid container spacing={2}>
          {accounts.map((account) => (
            <Grid item xs={12} sm={6} md={4} key={account._id}>
              <Card
                style={{
                  cursor: 'pointer',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                }}
                onClick={() => setSelectedAccount(account)} // Open modal on click
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={platformImages[account.platform] || DefaultImage}
                  alt={account.platform}
                  style={{ objectFit: 'contain', padding: '10px' }}
                />
                <CardContent>
                  <Typography variant="h6" align="center">
                    {account.platform}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Dialog to show account details */}
      {selectedAccount && (
        <Dialog
          open={Boolean(selectedAccount)}
          onClose={() => setSelectedAccount(null)}
          maxWidth="sm"
          fullWidth
        >
          <DialogContent>
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <Typography variant="h5">{selectedAccount.platform}</Typography>
              <div
                style={{
                  marginTop: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="body1" style={{ marginRight: '10px' }}>
                  <strong>Title:</strong> {selectedAccount.accountTitle}
                </Typography>
                <IconButton onClick={() => copyToClipboard(selectedAccount.accountTitle)}>
                  <ContentCopyIcon />
                </IconButton>
              </div>
              <div
                style={{
                  marginTop: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="body1" style={{ marginRight: '10px' }}>
                  <strong>Account #:</strong> {selectedAccount.accountNumber}
                </Typography>
                <IconButton onClick={() => copyToClipboard(selectedAccount.accountNumber)}>
                  <ContentCopyIcon />
                </IconButton>
              </div>
              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: '20px' }}
                onClick={() => setSelectedAccount(null)}
              >
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default PaymentAccounts;
