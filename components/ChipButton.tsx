import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const ChipButton = ({ change }: { change: number }) => {
  const isNegativeChange = change < 0;
  return (
    <Button
      size="small"
      sx={{
        backgroundColor: isNegativeChange ? "error.dark" : "success.dark",
        color: isNegativeChange ? "error.main" : "success.main",
        "&:hover": {
          backgroundColor: isNegativeChange ? "error.dark" : "success.dark",
        },
      }}
    >
      {isNegativeChange ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}

      {change}
    </Button>
  );
};
export default ChipButton;
