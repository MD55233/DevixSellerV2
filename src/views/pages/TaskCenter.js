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
  const { username } = useAuth(); // Using useAuth for user data

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

  const handleCompleteTask = async (taskId) => {
    // Check if today is Sunday (0 represents Sunday in JavaScript's Date object)
    const today = new Date();
    if (today.getDay() === 0) { // Sunday is represented by 0
      alert('Task completion is not allowed on Sundays.');
      return; // Exit the function if it's Sunday
    }
  
    setLoadingTask(true);
    setOpenDialog(true);
  
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}/api/tasks/${taskId}/complete`,
        { username }
      );
  
      // Get the redirect link from the response
      const { redirectLink } = response.data;
  
      // Remove the completed task from the list
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
  
      // Update the user data (completedTasks count)
      setUserData((prevData) => ({
        ...prevData,
        completedTasks: prevData.completedTasks + 1,
      }));
  
      // Redirect to the task's URL after completion
      if (redirectLink) {
        setTimeout(() => {
          window.location.href = redirectLink; // Redirect after showing success dialog
        }, 2000); // Wait for the dialog to close
      }
    } catch (error) {
      console.error('Error completing task:', error);
    } finally {
      setLoadingTask(false);
      setOpenDialog(false);
    }
  };
  
  return (
    <Box p={2}>
      {/* User Summary Section */}
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

      {/* Task List Section */}
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
                sx={{ mt: 2 }}
                fullWidth
                onClick={() => handleCompleteTask(task._id)}
              >
                Complete Task
              </Button>
            </Card>
          </Grid>
        ))}
         <Box sx={{ mt: 3, padding: '10px', backgroundColor: '#FFEBEE', borderRadius: '8px' }}>
          <Typography variant="body2" color="error">
            Note: Stay on the redirected website for 15 seconds to get the bonus.
          </Typography>
        </Box>
      </Grid>

      {/* Task Completion Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogContent sx={{ textAlign: 'center', p: 4 }}>
          {loadingTask ? (
            <>
              <CircularProgress color="success" />
              <Typography variant="body1" mt={2}>
                Processing task... Please wait.
                
              </Typography>
              <Typography variant="body1" mt={2} color="error">
        Note: Stay on the redirected website for 15 seconds to get the bonus.
      </Typography>
            </>
          ) : (
            <>
              <CheckCircleIcon color="success" sx={{ fontSize: '4rem' }} />
              <Typography variant="h6" mt={2}>
                Task Completed Successfully&excl;
              </Typography>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

TaskCenter.propTypes = {
  apiBaseUrl: PropTypes.string.isRequired,
};

export default TaskCenter;
