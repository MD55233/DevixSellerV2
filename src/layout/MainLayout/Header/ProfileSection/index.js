import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Box,
  Chip,
  ClickAwayListener,
  Divider,
  Grid,
  Paper,
  Popper,
  Stack,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useAuth } from 'views/pages/authentication/AuthContext';
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';

import { IconLogout, IconSettings } from '@tabler/icons';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const ProfileSection = () => {
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);
  const navigate = useNavigate();
  const { username, setAuthenticatedUsername } = useAuth();

  const [userData, setUserData] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [selectedIndex] = useState(-1);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  useEffect(() => {
    const fetchUserdata = async () => {
      try {
        const userResponse = await axios.get(`${process.env.REACT_APP_API_HOST}/api/user/${username}`);
        const referralResponse = await axios.get(`${process.env.REACT_APP_API_HOST}/api/referrals`, {
          params: { username }
        });
  
        setUserData(userResponse.data.user);
        setProfilePicture(userResponse.data.user.profilePicture);
        
        setUserData((prevData) => ({
          ...prevData,
          directReferrals: referralResponse.data.DirectCount,
          indirectReferrals: referralResponse.data.IndirectCount
        }));
      } catch (error) {
        console.error('Error fetching user data or referrals:', error);
      }
    };
  
    if (username) {
      fetchUserdata();
    }
  }, [username]);
  

  const handleLogout = async () => {
    try {
      setAuthenticatedUsername(null); // Clear the username from context
      navigate('/pages/login/login3'); // Navigate to the login page
      console.log('Logged Out!');
    } catch (error) {
      console.error('There was an error logging out!', error);
    }
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const handlePasswordChange = () => {
    navigate('/password-change');
    setOpen(false);
  };

  return (
    <>
      <Chip
        sx={{
          height: '48px',
          alignItems: 'center',
          borderRadius: '27px',
          transition: 'all .2s ease-in-out',
          borderColor: theme.palette.secondary.light,
          backgroundColor: theme.palette.secondary.light,
          '&[aria-controls="menu-list-grow"], &:hover': {
            borderColor: theme.palette.secondary.main,
            background: `${theme.palette.secondary.main}!important`,
            color: theme.palette.secondary.light,
            '& svg': {
              stroke: theme.palette.secondary.light
            }
          },
          '& .MuiChip-label': {
            lineHeight: 0
          }
        }}
        icon={
          <Avatar
            sx={{ width: 48, height: 48, cursor: 'pointer' }}
            src={profilePicture ? `${process.env.REACT_APP_API_HOST}/${profilePicture}` : null} // Use profile picture if available
          >
            {!profilePicture && <AccountCircleIcon sx={{ fontSize: '2rem', color: '#FFFFFF' }} />} {/* Fallback icon */}
          </Avatar>
        }
        label={<IconSettings stroke={1.5} size="1.5rem" color={theme.palette.primary.main} />}
        variant="outlined"
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="primary"
      />
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 14]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions in={open} {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                  <Box sx={{ p: 2 }}>
                    <Stack>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <Typography variant="h4">Hi,</Typography>
                        <Typography component="span" variant="h4" sx={{ fontWeight: 400 }}>
                          {userData ? userData.fullName : 'Loading...'}
                        </Typography>
                      </Stack>
                      <Typography variant="subtitle2" sx={{ color: 'secondary.main' }}>
                       Username: {userData ? userData.username : 'Loading...'}
                      </Typography>
                    </Stack>
                    <Divider />
                  </Box>
                  <PerfectScrollbar style={{ height: '100%', maxHeight: 'calc(100vh - 250px)', overflowX: 'hidden' }}>
                    <Box sx={{ p: 2 }}>
                      <Grid container spacing={3} direction="column">
                        <Grid item>
                          <Typography variant="subtitle1" sx={{ color: 'secondary.main' }}>
                            Email: {userData ? userData.email : 'Loading...'}
                          </Typography>
                        </Grid>
                        <Grid item>
  <Typography variant="subtitle1" sx={{ color: 'secondary.main' }}>
    Direct Referrals: {userData?.directReferrals ?? 'Loading...'}
  </Typography>
</Grid>
<Grid item>
  <Typography variant="subtitle1" sx={{ color: 'secondary.main' }}>
    Indirect Referrals: {userData?.indirectReferrals ?? 'Loading...'}
  </Typography>
</Grid>
                        <Grid item>
                          <Typography variant="subtitle1" sx={{ color: 'secondary.main' }}>
                          Daily Task Limit: {userData ? userData.dailyTaskLimit : 'Loading...'}
                          </Typography>
                        </Grid>
                        {/* Add Username and Email Here */}
                        <Grid item>
                          <Typography variant="subtitle1" sx={{ color: 'secondary.main' }}>
                          Phone #: {userData ? userData.phoneNumber : 'Loading...'}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="subtitle1" sx={{ color: 'secondary.main' }}>
                          Withdrawable Balance: {userData ? userData.balance : 'Loading...'}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Divider />
                      <List
                        component="nav"
                        sx={{
                          width: '100%',
                          maxWidth: 350,
                          minWidth: 300,
                          backgroundColor: theme.palette.background.paper,
                          borderRadius: '10px',
                          [theme.breakpoints.down('md')]: {
                            minWidth: '100%'
                          },
                          '& .MuiListItemButton-root': {
                            mt: 0.5
                          }
                        }}
                      >
                        <ListItemButton sx={{ borderRadius: `${customization.borderRadius}px` }} onClick={handlePasswordChange}>
                          <ListItemIcon>
                            <IconSettings stroke={1.5} size="1.3rem" />
                          </ListItemIcon>
                          <ListItemText primary={<Typography variant="body2">Password Change</Typography>} />
                        </ListItemButton>
                        <ListItemButton
                          sx={{ borderRadius: `${customization.borderRadius}px` }}
                          selected={selectedIndex === 4}
                          onClick={handleLogout}
                        >
                          <ListItemIcon>
                            <IconLogout stroke={1.5} size="1.3rem" />
                          </ListItemIcon>
                          <ListItemText primary={<Typography variant="body2">Logout</Typography>} />
                        </ListItemButton>
                      </List>
                    </Box>
                  </PerfectScrollbar>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </>
  );
};

export default ProfileSection;
