"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  TextField,
  Typography,
  Container,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { StyledButton } from "@/components/StyledButton";
import { useAuth } from "@/contexts/AuthContext";

const SignUpForm = () => {
  const { signUp, error, loading, setError } = useAuth();
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setError("");
    setLocalError("");
  }, [confirmPassword, password]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const email = (event.target as any).email.value;

    if (password !== confirmPassword) {
      setLocalError("Passwords do not match");
      console.log("Local Error:", localError);
      return;
    }

    const sucess = await signUp(email, password, name);

    if (sucess) {
      setOpenSnackbar(true);

      setTimeout(() => {
        router.push("/");
      }, 1000);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container component="main" sx={{ height: "60vh" }} maxWidth="sm">
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
            label="Name"
            name="name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            type="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
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
            Sign Up
          </StyledButton>
          <Typography variant="body2" align="center">
            Already have an account?
            <a href="/sign-in"> Sign In</a>
          </Typography>
          {(error || localError) && (
            <Typography variant="body2" color="error.main" align="center">
              {error || localError}
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
