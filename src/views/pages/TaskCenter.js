import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useAuth } from 'views/pages/authentication/AuthContext'; // Import useAuth hook
import {
  Box,
  Grid,
  Typography,
  Card,
  Button,
  Dialog,
  DialogContent,
  CircularProgress,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TaskIcon from '@mui/icons-material/AssignmentTurnedIn';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import WAVE_GIF from '../dashboard/Default/wave-92_512.gif'; 


const TaskCenter = ({ apiBaseUrl }) => {
  const [userData, setUserData] = useState({
    commission: 0,
    balance: 0,
    completedTasks: 0,
    taskLimit: 4,
  });
  const [tasks, setTasks] = useState([]);
  const [loadingTask, setLoadingTask] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [taskMessage, setTaskMessage] = useState('');
  const { username } = useAuth(); // Using useAuth for user data

  // Animation state for the wave GIF
  const [showAnimation, setShowAnimation] = useState(true);
  const [animationStyle, setAnimationStyle] = useState({
    transform: 'translateY(100%)', // Start with swipe-up (offscreen)
    transition: 'transform 0.5s ease-in-out',
  });

  // Fetch user data and tasks on component load
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/user/${username}`);
        setUserData({
          commission: response.data.user.pendingCommission || 0,
          balance: response.data.user.balance || 0,
          completedTasks: response.data.user.tasksCompletedToday || 0,
          taskLimit: response.data.user.dailyTaskLimit || 0,
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/tasks`);
        setTasks(response.data.tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    if (username) {
      fetchUserData();
      fetchTasks();
    }
  }, [username, apiBaseUrl]);

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


  const handleCompleteTask = async (taskId) => {
    // Check if today is Sunday
    const today = new Date();
    if (today.getDay() === 4) {
      alert('Task completion is not allowed on Sundays.');
      return;
    }

    setLoadingTask(true);
    setOpenDialog(true);
    setTaskMessage('Processing task... Please wait.');

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}/api/tasks/${taskId}/complete`,
        { username }
      );

      const { redirectLink } = response.data;

      // Remove the completed task from the list
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));

      // Update the user data
      setUserData((prevData) => ({
        ...prevData,
        completedTasks: prevData.completedTasks + 1,
      }));

      // Set success message and redirect
      setTaskMessage('Wait for 10s on other site then comeback and Claim Bonus! Redirecting...');
      if (redirectLink) {
        setTimeout(() => {
          window.location.href = redirectLink;
        }, 2000); // Redirect after a slight delay
      }
    } catch (error) {
      console.error('Error completing task:', error);
      setTaskMessage('An error occurred while completing the task.');
    } finally {
      setLoadingTask(false);
    }
  };

  return (
    <Box p={2}>
      <Card sx={{ mb: 3, p: 2, borderRadius: '16px', backgroundColor: '#E8F5E9' }}>
        <Typography variant="h6" align="center" gutterBottom>
          Task Center
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={6} sm={3} textAlign="center">
            <Typography variant="subtitle2">Today Commission</Typography>
            <Typography variant="h6">Rs {userData.commission.toFixed(2)}</Typography>
          </Grid>
          <Grid item xs={6} sm={3} textAlign="center">
            <Typography variant="subtitle2">Available Balance</Typography>
            <Typography variant="h6">
              <AccountBalanceWalletIcon fontSize="small" /> Rs {userData.balance.toFixed(2)}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3} textAlign="center">
            <Typography variant="subtitle2">Completed Orders Today</Typography>
            <Typography variant="h6">{userData.completedTasks}</Typography>
          </Grid>
          <Grid item xs={6} sm={3} textAlign="center">
            <Typography variant="subtitle2">Daily Order Limit</Typography>
            <Typography variant="h6">{userData.taskLimit}</Typography>
          </Grid>
        </Grid>
      </Card>

      <Typography variant="h6" gutterBottom>
        Available Tasks
      </Typography>
      <Grid container spacing={2}>
        {tasks.map((task) => (
          <Grid item xs={12} sm={6} md={4} key={task._id}>
            <Card
              sx={{
                p: 2,
                borderRadius: '12px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#F1F8E9',
              }}
            >
              <Typography variant="subtitle1" gutterBottom>
                {task.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Reward: Rs {task.reward}
              </Typography>
              <Button
                variant="contained"
                color="success"
                startIcon={<TaskIcon />}
                sx={{ color: 'white',mt: 2 }}
                fullWidth
                onClick={() => handleCompleteTask(task._id)}
              >
                Complete Task
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog}>
        <DialogContent sx={{ textAlign: 'center', p: 4 }}>
          {loadingTask ? (
            <>
              <CircularProgress color="success" />
              <Typography variant="body1" mt={2}>
                {taskMessage}
              </Typography>
            </>
          ) : (
            <>
              <CheckCircleIcon color="success" sx={{ fontSize: '4rem' }} />
              <Typography variant="h6" mt={2}>
                {taskMessage} 
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => setOpenDialog(false)}>
                Close
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
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
    </Box>
  );
};

TaskCenter.propTypes = {
  apiBaseUrl: PropTypes.string.isRequired,
};

export default TaskCenter;
