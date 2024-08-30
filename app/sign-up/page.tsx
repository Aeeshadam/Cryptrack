"use client";
import React, { useState } from "react";
import {
  TextField,
  Typography,
  Container,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { StyledButton } from "@/components/StyledButton";
import { auth } from "@/firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (password !== confirmPassword) return setError("Passwords do not match");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setOpenSnackbar(true);
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container component="main" sx={{ height: "50vh" }} maxWidth="sm">
      <Box
        sx={{
          width: "100%",
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h3" fontWeight="600">
          Register
        </Typography>
        <Box
          component="form"
          autoComplete="off"
          onSubmit={handleSubmit}
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            type="email"
            label="Email Address"
            name="email"
            autoComplete="new-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Confirm Password"
            type="password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <StyledButton type="submit" fullWidth sx={{ marginY: "1rem" }}>
            Sign In
          </StyledButton>
          <Typography variant="body2" align="center">
            Already have an account?
            <a href="/sign-in"> Sign In</a>
          </Typography>
          {error && (
            <Typography variant="body2" color="error.main" align="center">
              {error}
            </Typography>
          )}
        </Box>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Signed up successfully! Redirecting...
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SignUpForm;
