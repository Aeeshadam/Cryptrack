import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import { useAuth } from "@/contexts/AuthContext";

export default function InitialsMenu({ name }: { name: string }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const { logOut } = useAuth();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogOut = async () => {
    await logOut();
    setAnchorEl(null);
    window.location.href = "/sign-in";
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          overflow: "hidden",
          marginLeft: "1rem",
        }}
      >
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
          variant="outlined"
          size="small"
          sx={{
            minWidth: "100%",
            minHeight: "100%",
            borderRadius: "50%",
            padding: 0,
          }}
        >
          {name}
        </Button>
      </Box>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogOut}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
