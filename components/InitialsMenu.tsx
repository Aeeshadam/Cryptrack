import { useRouter } from "next/navigation";
import * as React from "react";

import { useAuth } from "@/contexts/AuthContext";
import { Box, Button, Menu, MenuItem } from "@mui/material";

export default function InitialsMenu({ name }: { name: string }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const router = useRouter();
  const { logOut } = useAuth();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogOut = async () => {
    await logOut();
    setAnchorEl(null);
    router.push("/sign-in");
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
