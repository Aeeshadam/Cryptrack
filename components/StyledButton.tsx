import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

export const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.black,
  borderWidth: 1,
  borderStyle: "solid",
  borderRadius: 0,
  whiteSpace: "nowrap",
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(1, 2),
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
  },
}));
