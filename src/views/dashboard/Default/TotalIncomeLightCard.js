import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Avatar,
  Modal,
  TextField,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';
import { useAuth } from 'views/pages/authentication/AuthContext';

// styles
const CardWrapper = styled(MainCard)(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  minHeight: '200px',
  maxHeight: '200px',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(210.04deg, ${theme.palette.warning.dark} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: '50%',
    top: -30,
    right: -180,
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(140.9deg, ${theme.palette.warning.dark} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
    borderRadius: '50%',
    top: -160,
    right: -130,
  },
}));

const TotalIncomeLightCard = () => {
  const { username } = useAuth();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    fullName: '',
    username: '',
    email: '',
    phone: '',
    profilePicture: '',
    referredBy: '',
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [updatedData, setUpdatedData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      if (username) {
        await fetchUserProfile();
        await fetchParentName();
      }
    };

    fetchData();
  }, [username]);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/user/${username}`);
      const user = response.data.user;
      setUserData(user);
      setUpdatedData(user);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false); // Ensure loading is set to false after fetching
    }
  };

  const fetchParentName = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/user/${username}/parent`);
      setUserData((prevData) => ({
        ...prevData,
        referredBy: response.data.parent.fullName || response.data.parent.username,
      }));
    } catch (error) {
      console.error('Error fetching parent name:', error);
    }
  };

  const handleEditProfile = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setUpdatedData(userData); // Reset to original data on close
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      // Handle file input
      setUpdatedData((prevData) => ({ ...prevData, profilePicture: files[0] })); // Changed to update only profilePicture
    } else {
      // Handle text input
      setUpdatedData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const formData = new FormData();

      // Append only the changed fields to FormData
      Object.entries(updatedData).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          formData.append(key, value);
        }
      });

      // Log the FormData to see what is being sent
      for (let [key, value] of formData.entries()) {
        console.log(`FormData Key: ${key}, Value:`, value);
      }

      // Make the request only if formData has entries
      if (formData.has('fullName') || formData.has('email') || formData.has('phone') || formData.has('profilePicture')) {
        const response = await axios.put(`${process.env.REACT_APP_API_HOST}/api/user/${username}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // Update user data with the latest response
        setUserData(response.data.user);
        setUpdatedData({ // Reset updated data to the latest user data
          fullName: response.data.user.fullName,
          email: response.data.user.email,
          phone: response.data.user.phone,
          profilePicture: '', // Reset to empty for the file input
        });
        handleModalClose();
      } else {
        console.log('No changes detected, not updating.');
      }
    } catch (error) {
      console.error('Error updating profile:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <CardWrapper border={false} content={false}>
      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '400px' }}>
        <Avatar
          src={userData.profilePicture ? `${process.env.REACT_APP_API_HOST}/${userData.profilePicture}` : '/path-to-default-avatar.jpg'}
          alt={userData.username}
          sx={{ width: 70, height: 70, mb: 2 }}
        />
        <Typography variant="h5">{userData.fullName || 'Your Name'}</Typography>
        <Typography variant="subtitle2">Referred by: {userData.referredBy || 'N/A'}</Typography>
        <Button variant="contained" color="primary" onClick={handleEditProfile}>
          Edit Profile
        </Button>
      </Box>

      {/* Modal for editing user profile */}
      <Modal open={modalOpen} onClose={handleModalClose}>
        <Box sx={{ p: 3, backgroundColor: 'white', borderRadius: '8px', width: '400px', mx: 'auto', mt: '20%' }}>
          <Typography variant="h6">Edit Profile</Typography>
          <TextField
            label="Full Name"
            name="fullName"
            value={updatedData.fullName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={updatedData.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone"
            name="phone"
            value={updatedData.phone}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Profile Picture"
            name="profilePicture"
            type="file"
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <Button variant="contained" color="primary" onClick={handleUpdateProfile}>
            Update
          </Button>
        </Box>
      </Modal>

      {/* Loading state */}
      {loading && <CircularProgress />}
    </CardWrapper>
  );
};

export default TotalIncomeLightCard;
