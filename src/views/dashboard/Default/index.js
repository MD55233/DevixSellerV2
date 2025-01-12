import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
// material-ui
import { Grid } from '@mui/material';
// project imports
import EarningCard from './EarningCard';
import UpgradeAccountCard from './UpgradeAccountCard';
import NavigationPanel from './NavigationPanel';
import DownlineReferrals from './DownlineReferrals';
import { gridSpacing } from 'store/constant';
import { useAuth } from 'views/pages/authentication/AuthContext'; // Import authentication context
import WAVE_GIF from './wave-92_512.gif';

// Constant for the GIF path


// ==============================|| DEFAULT DASHBOARD ||============================== //

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
        <Grid item xs={12}>
          <EarningCard isLoading={isLoading} />
          <NavigationPanel isLoading={isLoading} />
        </Grid>
        <Grid item xs={12}>
          <UpgradeAccountCard isLoading={false} onUpgradeClick={handleUpgradeClick} />
          <DownlineReferrals isLoading={isLoading} />
        </Grid>
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