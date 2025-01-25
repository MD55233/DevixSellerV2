import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import { Grid, Box, CircularProgress } from '@mui/material'; // Import CircularProgress and Box
import EarningCard from './EarningCard';
import TransactionsPage from './TransactionsPage';
import NavigationPanel from './NavigationPanel';
import { gridSpacing } from 'store/constant';
import { useAuth } from 'views/pages/authentication/AuthContext'; // Import authentication context
import WAVE_GIF from './wave-92_512.gif'; // Import GIF

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  const { username } = useAuth(); // Get username from AuthContext
  const navigate = useNavigate();
  const [showAnimation, setShowAnimation] = useState(true); // Controls animation visibility
  const [animationStyle, setAnimationStyle] = useState({
    transform: 'translateY(100%)', // Start with swipe-up (offscreen)
    transition: 'transform 0.5s ease-in-out',
  });

  useEffect(() => {
    // Redirect to login page if username is not available
    if (!username) {
      navigate('/pages/login/login3');
    } else {
      setLoading(false);
    }
  }, [username, navigate]);

  useEffect(() => {
    // Trigger swipe-up when the page loads
    setTimeout(() => {
      setAnimationStyle((prev) => ({
        ...prev,
        transform: 'translateY(0)', // Swipe up into view
      }));
    }, 100);

    // Trigger swipe-down and hide animation after 10 seconds
    const timer = setTimeout(() => {
      setAnimationStyle((prev) => ({
        ...prev,
        transform: 'translateY(100%)', // Swipe down out of view
      }));
      setTimeout(() => setShowAnimation(false), 500); // Remove the element after animation
    }, 5000);

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  const handleUpgradeClick = () => {
    window.location.href = '/payments/referral/plans'; // Replace with your upgrade page route
  };

  return (
    <>
      <Grid container spacing={gridSpacing}>
        {isLoading ? (
          <Grid item xs={12}>
            <Box
              sx={{
                width: '100%',
                height: '200px', // Height of the loading rectangle
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f5f5f5', // Light gray background for loading
                borderRadius: '8px', // Rounded corners
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Subtle shadow
              }}
            >
              <CircularProgress />
            </Box>
          </Grid>
        ) : (
          <>
            <Grid item xs={12}>
              <EarningCard isLoading={isLoading} />
              <NavigationPanel isLoading={isLoading} />
            </Grid>
            <Grid item xs={12}>
              <TransactionsPage isLoading={false} onUpgradeClick={handleUpgradeClick} />
            </Grid>
          </>
        )}
      </Grid>
      {/* Wave Animation */}
      {showAnimation && (
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '-10px',
            width: '150px',
            height: '150px',
            zIndex: 1000,
            ...animationStyle, // Apply animation styles
          }}
        >
          <img
            src={WAVE_GIF} // Use the constant for the GIF path
            alt="Wave Animation"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      )}
    </>
  );
};

export default Dashboard;
