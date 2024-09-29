import * as React from "react";

import { Box, CircularProgress } from "@mui/material";

export default function LoadingSpinner() {
  return (
    <Box
      data-testid="loading-spinner"
      sx={{ display: "flex", alignItem: "center", justifyContent: "center" }}
    >
      <CircularProgress />
    </Box>
  );
}
