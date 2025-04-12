import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';55
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth } from 'views/pages/authentication/AuthContext';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Import your logo image here
import logo from 'assets/images/Devix.svg';  // Adjust the path as needed
import backgroundImage from 'assets/images/landscape-3837559_1920.png'; // Import background image

// Create the theme with the updated color scheme
const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#ffff', // Update primary color
    },
    text: {
      primary: '#FFFFFF' // Set text color to white for better contrast
    }
  },
});

export default function LoginForm() {
  const { setAuthenticatedUsername } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [toSignup, setToSignup] = useState(false);
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_HOST}/api/authenticate`, formData);

      if (response.data.success) {
        setAuthenticatedUsername(response.data.username);
        setIsAuthenticated(true);
      } else {
        setError('Try Again, Check your Credentials!');
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      setError('Try Again, Check your Credentials!');
    }
  };

  const handleSignup = () => {
    setToSignup(true);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard/default');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (toSignup) {
      navigate('/pages/register/register3/000000A01');
    }
  }, [toSignup, navigate]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth={false} sx={{ height: '100vh', padding: 0, margin: 0 }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            height: '100vh', // Full page height
            width: '100%', // Full page width
            backgroundImage: `url(${backgroundImage})`, // Use imported image here
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 1.0, // Ensure background is fully visible
          }}
        >
          <Box sx={{
            background: 'rgba(170, 170, 170, 0.18)', // Apply light transparency for glassmorphism
            backdropFilter: 'blur(10px)', // Glassmorphic blur effect
            borderRadius: '10px',
            padding: '30px',
            width: '90%',
            maxWidth: '400px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: 10,
          }}>
            {/* Logo Image */}
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
              <img src={logo} alt="Logo" width="70" /> {/* Adjust logo size as needed */}
            </Box>
            <Typography component="h1" variant="h5" sx={{ color: '#ffffff', fontWeight: 'bold' }}>
              Log In
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="usernameOrEmail"
                    value={formData.usernameOrEmail}
                    onChange={handleChange}
                    required
                    fullWidth
                    id="email"
                    label="Enter Username"
                    autoFocus
                    sx={{
                      '& .MuiInputLabel-root': { color: 'white' },  // Label color white
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: '#ffff' },
                        '&:hover fieldset': { borderColor: '#ffff' },
                        '&.Mui-focused fieldset': { borderColor: '#ffff' },
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    label="Enter Password"
                    id="password"
                    autoComplete="new-password"
                    sx={{
                      '& .MuiInputLabel-root': { color: 'white' },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: '#ffff' },
                        '&:hover fieldset': { borderColor: '#ffff' },
                        '&.Mui-focused fieldset': { borderColor: '#ffff' },
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I Accept terms and conditions."
                    sx={{
                      color: 'white',
                    }}
                  />
                </Grid>
              </Grid>
              {error && <Typography color="error">{error}</Typography>}
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, backgroundColor: 'rgb(118, 255, 159)' }}>
                Sign In
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Button onClick={handleSignup} variant="body1" sx={{ fontSize:'0.7rem',color: 'rgb(247, 247, 247)' }}>
                    Dont have an account? Sign Up
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

function Copyright(props) {
  return (
    <Typography variant="body2" color="primary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Devix.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}