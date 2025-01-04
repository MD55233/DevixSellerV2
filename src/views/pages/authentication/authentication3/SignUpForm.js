import React, { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router";
import { GoogleLogin } from "@react-oauth/google";

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
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    referrerPin: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isGoogleUser] = useState(false);
  const navigate = useNavigate();

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

  const handleGoogleSignupSuccess = async (credentialResponse) => {
    const { credential } = credentialResponse;
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}/api/google-signup`,
        { credential, phoneNumber: formData.phoneNumber, referrerPin: formData.referrerPin }
      );
      if (response.data.success) {
        alert("Google signup successful! Check your email for credentials.");
        navigate("/pages/login/login3");
      } else {
        setErrorMessage(response.data.message || "Google signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Google Signup Error:", error);
      setErrorMessage("Google signup failed. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isGoogleUser && !validateForm()) {
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_HOST}/api/signup`, formData);
      if (response.data.success) {
        alert("Signup successful! Check your email for credentials.");
        navigate("/pages/login/login3");
      } else {
        setErrorMessage(response.data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      setErrorMessage(error.response?.data?.message || "Signup failed. Please try again.");
    }
  };

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
              onChange={handleInputChange}
              required
              fullWidth
              label="Referrer PIN"
              error={!!formErrors.referrerPin}
              helperText={formErrors.referrerPin}
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
          <GoogleLogin
            onSuccess={handleGoogleSignupSuccess}
            onError={() => setErrorMessage("Google signup failed. Please try again.")}
          />
        </Box>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="#" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}