import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Avatar,
  Divider,

  List,
  ListItem,
  ListItemAvatar,

  ListItemText,
  Typography
} from '@mui/material';
import User1 from 'assets/images/users/user-round.svg'; // Update with your path
import axios from 'axios';
import { useAuth } from 'views/pages/authentication/AuthContext'; // Importing AuthContext for username

const ListItemWrapper = styled('div')(({ theme }) => ({
  cursor: 'pointer',
  padding: 16,
  display: 'flex',
  flexDirection: 'column',
  '&:hover': {
    background: theme.palette.primary.light
  },
}));

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);
  const { username } = useAuth(); // Get username from your auth context (same as in EarningCard)

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!username) return; // Exit if username is not available
      try {
        // Fetch notifications by username
        const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/notifications/${username}`);
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    if (username) {
      fetchNotifications(); // Fetch notifications when username is available
    }
  }, [username]);
  const handleNotificationClick = async (notificationId) => {
    try {
      // Assuming the username is available and notifications are fetched by username
      if (!username) return; // Ensure username is available
  
      // Update notification status to 'read' using the notification ID and username
      await axios.put(`${process.env.REACT_APP_API_HOST}/api/notifications/${username}/${notificationId}`, {
        status: 'read'
      });
  
      // Update the local state for immediate feedback in UI
      setNotifications(notifications.map(n => n._id === notificationId ? { ...n, status: 'read' } : n));
    } catch (error) {
      console.error('Error updating notification status:', error);
    }
  };

  return (
    <List>
      {notifications.length > 0 ? notifications.map(notification => (
        <ListItemWrapper key={notification._id} onClick={() => handleNotificationClick(notification._id)}>
          <ListItem alignItems="flex-start" sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
            <ListItemAvatar>
              <Avatar alt="User" src={User1} />
            </ListItemAvatar>
            <ListItemText
  primary={
    <Typography 
      variant="subtitle1" 
      noWrap={false} 
      sx={{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'normal', // Allow text to wrap to the next line
        wordWrap: 'break-word', // Break long words if needed
        maxWidth: '250px', // Set a fixed width for the text box
      }}
    >
      {notification.message}
    </Typography>
  }
  secondary={
    <Typography variant="caption">
      {new Date(notification.timestamp).toLocaleTimeString()}
    </Typography>
  }
/>

           
          </ListItem>
          <Divider />
        </ListItemWrapper>
      )) : (
        <Typography variant="subtitle1" align="center" sx={{ padding: 2 }}>
          No notifications available.
        </Typography>
      )}
    </List>
  );
};

export default NotificationList;
