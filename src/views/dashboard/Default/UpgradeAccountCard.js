import PropTypes from 'prop-types';
import { Card, Typography, Button, Box } from '@mui/material';
import upgradeImage from './upgradeaccount.svg'; 
const UpgradeAccountCard = ({ isLoading, onUpgradeClick }) => {
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Card
          sx={{
            display: 'flex',
            alignItems: 'center',
            borderRadius: '16px',
            background: 'linear-gradient(90deg, #6a11cb, #2575fc)', // Purple to Blue gradient
            boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
            padding: '20px',
            color: '#FFFFFF',
            gap: '16px',
          }}
        >
          {/* Left Side: Heading, Description, and Button */}
          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{
                fontSize: '1.5rem',
                fontWeight: 700,
                marginBottom: '12px',
              }}
            >
              Upgrade Your Account
            </Typography>
            <Typography
              sx={{
                fontSize: '1rem',
                fontWeight: 400,
                marginBottom: '20px',
              }}
            >
              Unlock exclusive features and enjoy premium benefits by upgrading your account today!
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#FFD700', // Golden Yellow
                color: '#000000',
                fontWeight: 600,
                padding: '10px 20px',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#FFC107', // Slightly lighter shade
                },
              }}
              onClick={onUpgradeClick}
            >
              Upgrade Now
            </Button>
          </Box>

          {/* Right Side: Image */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img
          src={upgradeImage}
              alt="Upgrade Illustration"
              style={{
                width: '100%',
                maxWidth: '300px',
                borderRadius: '16px',
              }}
            />
          </Box>
        </Card>
      )}
    </>
  );
};

UpgradeAccountCard.propTypes = {
  isLoading: PropTypes.bool,
  onUpgradeClick: PropTypes.func.isRequired,
};

export default UpgradeAccountCard;
