import React from 'react';
import { Box, BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Home, Assignment, PersonAdd, MoreHoriz } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const Footer = () => {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate(); // Create a navigate function

  const handleNavigation = (newValue) => {
    setValue(newValue); // Update the selected value

    switch (newValue) {
      case 0:
        navigate('/dashboard/default'); // Navigate to Products page
        break;
      case 1:
        navigate('/payments/task-center'); // Navigate to Locate page
        break;
      case 2:
        navigate('/payments/referral/referral-link'); // Navigate to Discounts page
        break;
      case 3:
        navigate('/utilities/more'); // Navigate to Contact page
        break;
      default:
        break;
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        position: 'fixed',
        bottom: 0,
        backgroundColor: '#f8f9fa', // Light theme color
        borderTop: '1px solid #dee2e6',
        zIndex: 1200,
      }}
    >
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => handleNavigation(newValue)} // Use the handleNavigation function
        showLabels
        sx={{ backgroundColor: '#f8f9fa' }}
      >
        <BottomNavigationAction
          label="Home"
          icon={<Home />}
          sx={{color: '#91bcb6',
            '&.Mui-selected': {
              color: '#00b57b', // Icon color when active
              backgroundColor: '#dbffe6', // Light green background when active
              borderRadius: '100px', // Small curve for the active button
              height: '100%', // Full height of the BottomNavigation
            },
          }}
        />
        <BottomNavigationAction
          label="Tasks"
          icon={<Assignment />}
          sx={{color: '#91bcb6',
            '&.Mui-selected': {
              color: '#00b57b', // Icon color when active
              backgroundColor: '#dbffe6', // Light green background when active
              borderRadius: '100px', // Small curve for the active button
              height: '100%', // Full height of the BottomNavigation
            },
          }}
        />
        <BottomNavigationAction
          label="Add Referral"
          icon={<PersonAdd />}
          sx={{color: '#91bcb6',
            '&.Mui-selected': {
              color: '#00b57b', // Icon color when active
              backgroundColor: '#dbffe6', // Light green background when active
              borderRadius: '100px', // Small curve for the active button
              height: '100%', // Full height of the BottomNavigation
            },
          }}
        />
        <BottomNavigationAction
          label="More"
          icon={<MoreHoriz />}
          sx={{color: '#91bcb6',
            '&.Mui-selected': {
              color: '#00b57b', // Icon color when active
              backgroundColor: '#dbffe6', // Light green background when active
              borderRadius: '100px', // Small curve for the active button
              height: '100%', // Full height of the BottomNavigation
            },
          }}
        />
      </BottomNavigation>
    </Box>
  );
};

export default Footer;
