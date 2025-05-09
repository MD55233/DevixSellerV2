import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Box,
  Button,
  ButtonBase,
  CardActions,
 
  ClickAwayListener,
  Divider,
  Grid,
  Paper,
  Popper,
  Stack,
  TextField,
  Typography,
  useMediaQuery
} from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';
import NotificationList from './NotificationList';

// assets
import { IconBell } from '@tabler/icons';

// notification status options
const status = [
  {
    value: 'all',
    label: 'All Notification'
  },
  {
    value: 'new',
    label: 'New'
  },
  {
    value: 'unread',
    label: 'Unread'
  },
  {
    value: 'other',
    label: 'Other'
  }
];

// ==============================|| NOTIFICATION ||============================== //

const NotificationSection = () => {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  /**
   * anchorRef is used on different componets and specifying one type leads to other components throwing an error
   * */
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const handleChange = (event) => {
    if (event?.target.value) setValue(event?.target.value);
  };

  return (
    <>
      <Box
        sx={{
          ml: 2,
          mr: 3,
          [theme.breakpoints.down('md')]: {
            mr: 2
          }
        }}
      >
        <ButtonBase sx={{ borderRadius: '12px' }}>
          <Avatar
            variant="rounded"
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.mediumAvatar,
              transition: 'all .2s ease-in-out',
              background: theme.palette.secondary.light,
              color: theme.palette.secondary.dark,
              '&[aria-controls="menu-list-grow"],&:hover': {
                background: theme.palette.secondary.dark,
                color: theme.palette.secondary.light
              }
            }}
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            color="inherit"
          >
            <IconBell stroke={1.5} size="1.3rem" />
          </Avatar>
        </ButtonBase>
      </Box>
 <Popper
  placement={matchesXs ? 'bottom' : 'bottom-end'}
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
          offset: [matchesXs ? 5 : 0, 20] // Adjust the offset if necessary
        }
      },
      {
        name: 'preventOverflow',
        options: {
          boundary: 'viewport', // Prevents overflow from the viewport
        }
      },
      {
        name: 'flip',
        options: {
          fallbackPlacements: ['bottom', 'bottom-start', 'bottom-end'], // Flips the placement if there's no space
        }
      }
    ]
  }}
  style={{
    zIndex: 1300, // Ensure it's above other elements
    maxWidth: '90vw', // Constrain the width to prevent overflow
  }}
>
  {({ TransitionProps }) => (
    <Transitions position={matchesXs ? 'top' : 'top-right'} in={open} {...TransitionProps}>
      <Paper   sx={{
    maxWidth: '320px', // Restrict the overall width of the notification container
    maxHeight: '80vh',
    overflow: 'auto',
  }}>
        <ClickAwayListener onClickAway={handleClose}>
          <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
            <Grid container direction="column" spacing={2}>
              <Grid item xs={12}>
                <Grid container alignItems="center" justifyContent="space-between" sx={{ pt: 2, px: 2 }}>
                  <Grid item>
                    <Stack direction="row" spacing={2}>
                      <Typography sx={{ marginRight: 4 }} variant="subtitle1">
                        All Notification
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item>
                    <Typography
                      sx={{ marginLeft: 4 }}
                      component={Link}
                      to="#"
                      variant="subtitle2"
                      color="primary"
                    >
                      Mark as all read
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <PerfectScrollbar style={{ height: '100%', maxHeight: 'calc(100vh - 205px)', overflowX: 'hidden' }}>
                  <Grid container direction="column" spacing={2}>
                    <Grid item xs={12}>
                      <Box sx={{ px: 2, pt: 0.25 }}>
                        <TextField
                          id="outlined-select-currency-native"
                          select
                          fullWidth
                          value={value}
                          onChange={handleChange}
                          SelectProps={{
                            native: true
                          }}
                        >
                          {status.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </TextField>
                      </Box>
                    </Grid>
                    <Grid item xs={12} p={0}>
                      <Divider sx={{ my: 0 }} />
                    </Grid>
                  </Grid>
                  <NotificationList />
                </PerfectScrollbar>
              </Grid>
            </Grid>
            <Divider />
            <CardActions sx={{ p: 1.25, justifyContent: 'center' }}>
              <Button size="small" disableElevation>
                View All
              </Button>
            </CardActions>
          </MainCard>
        </ClickAwayListener>
      </Paper>
    </Transitions>
  )}
</Popper>

    </>
  );
};

export default NotificationSection;
