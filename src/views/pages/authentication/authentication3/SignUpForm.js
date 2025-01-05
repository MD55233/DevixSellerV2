import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import { useParams } from 'react-router-dom'; // <-- Added import

const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderRadius: "20px",
      borderColor: "#8e44ad",
    },
    "&:hover fieldset": {
      borderColor: "#8e44ad",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#8e44ad",
    },
  },
});

export default function SignUpForm() {
  const { username } = useParams(); // Extract username (referral pin) from URL
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    referrerPin: username || "", // Initialize referrerPin with username from the route
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isGoogleUser] = useState(false);

  useEffect(() => {
    if (!username) {
      // Redirect or show an error if username is missing
      setErrorMessage("Referrer username is required.");
    } else {
      setFormData((prevData) => ({ ...prevData, referrerPin: username }));
    }
  }, [username]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const errors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        errors[key] = "This field is required";
      }
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_HOST}/api/signup`, formData);
      if (response.data.success) {
        alert("Signup successful! Check your email for credentials.");
        window.location.href = "/pages/login/login3";
      } else {
        setErrorMessage(response.data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      setErrorMessage(error.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  if (!username) {
    return (
      <Typography color="error" align="center" variant="h4">
        Referrer username is required.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexGrow: 1,
        overflowY: "auto",
        height: "100vh",
        p: 2,
        width: "100%",
      }}
    >
      <Typography component="h1" variant="h3" sx={{ color: "#5106a4", fontWeight: "bold", py: 3 }}>
        Sign up
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, width: "100%" }}>
        {errorMessage && (
          <Typography color="error" align="center" gutterBottom>
            {errorMessage}
          </Typography>
        )}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomTextField
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              fullWidth
              label="Full Name"
              error={!!formErrors.fullName}
              helperText={formErrors.fullName}
              autoFocus
              disabled={isGoogleUser}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              fullWidth
              label="Email"
              error={!!formErrors.email}
              helperText={formErrors.email}
              disabled={isGoogleUser}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
              fullWidth
              label="Phone Number"
              error={!!formErrors.phoneNumber}
              helperText={formErrors.phoneNumber}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              name="referrerPin"
              value={formData.referrerPin}
              required
              fullWidth
              label="Referrer PIN"
              error={!!formErrors.referrerPin}
              helperText={formErrors.referrerPin}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel control={<Checkbox color="primary" />} label="I Accept terms and conditions." />
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3, mb: 2 }}>
          <Button type="submit" variant="contained" sx={{ px: 10, py: 1, borderRadius: "14px" }}>
            Sign Up
          </Button>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3, mb: 2 }}>
          
        </Box>
      
         
      
      </Box>
    </Box>
  );
}
