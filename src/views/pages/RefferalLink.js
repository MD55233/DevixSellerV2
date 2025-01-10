import React from 'react';
import {
  Typography,
  Box,
  Button,
  TextField,
  Card,
  CardContent,
} from '@mui/material';
import { ContentCopy } from '@mui/icons-material';
import { useAuth } from 'views/pages/authentication/AuthContext'; // Import useAuth

const ReferralLink = () => {
  const { username } = useAuth();

  const referralLink = username
    ? `https://pk.laikostar.com/pages/register/register3/${username}`
    : 'Username not available';

  const handleCopyReferralLink = () => {
    if (referralLink) {
      navigator.clipboard.writeText(referralLink);
      alert('Referral link copied to clipboard!');
    }
  };

  return (
    <Box display="flex" justifyContent="top" alignItems="top">
      <Card sx={{ p: 3, backgroundColor: '#ffffff', boxShadow: 3, borderRadius: '8px' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Your Referral Link
          </Typography>
          <Typography variant="body1" gutterBottom>
            Share this link to sign up new users under your referral.
          </Typography>
          <Box display="flex" alignItems="center" mt={2}>
            <TextField
              value={referralLink}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              size="small"
              sx={{
                backgroundColor: '#fff',
                borderRadius: 1,
                boxShadow: 1,
              }}
            />
            <Button
              variant="contained"
              color="primary"
              startIcon={<ContentCopy />}
              onClick={handleCopyReferralLink}
              sx={{ ml: 2 }}
            >
              Copy Link
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ReferralLink;
