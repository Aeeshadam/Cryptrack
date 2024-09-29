import React from "react";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Button, Typography } from "@mui/material";
import { formatPercentage } from "@/utils/utils";


const ChipButton = ({
  change,
  detailPage,
}: {
  change: number;
  detailPage?: boolean;
}) => {
  const isNegativeChange = Number(change) < 0;
  return (
    <Button
      sx={{
        padding: 0,
        color: isNegativeChange ? "error.main" : "success.main",
        "&:hover": {
          backgroundColor: "transparent",
          cursor: "default",
        },
      }}
    >
      {isNegativeChange ? (
        <KeyboardArrowDownIcon data-testid="KeyboardArrowDownIcon" />
      ) : (
        <KeyboardArrowUpIcon data-testid="KeyboardArrowUpIcon" />
      )}
      <Typography
        sx={{
          fontSize: detailPage ? "20px" : "14px",
          fontWeight: detailPage ? "500" : "400",
        }}
      >
        {formatPercentage(change)}
      </Typography>
    </Button>
  );
};
export default ChipButton;
