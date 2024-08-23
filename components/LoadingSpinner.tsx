import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

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
