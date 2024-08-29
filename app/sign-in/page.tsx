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
import { signInWithEmailAndPassword } from "firebase/auth";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    try {
      signInWithEmailAndPassword(auth, email, password);
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
          Sign In
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
            label="Email Address"
            name="email"
            type="email"
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
          <StyledButton type="submit" fullWidth sx={{ marginY: "1rem" }}>
            Sign In
          </StyledButton>
          <Typography variant="body2" align="center">
            Do not have an account?
            <a href="/sign-up"> Sign Up</a>
          </Typography>
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
          Signed in successfully! Redirecting...
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SignInForm;
