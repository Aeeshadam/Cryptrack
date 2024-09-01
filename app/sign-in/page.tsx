"use client";
import React, { useEffect, useState } from "react";
import { TextField, Typography, Container, Box } from "@mui/material";
import { StyledButton } from "@/components/StyledButton";
import { useAuth } from "@/contexts/AuthContext";

const SignInForm = () => {
  const { signIn, error, loading, setError } = useAuth();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setError("");
  }, [password, email]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const success = await signIn(email, password);

    if (success) {
      window.location.href = "/";
    }
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
    </Container>
  );
};

export default SignInForm;
