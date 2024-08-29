import React from "react";
import { Avatar, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";

const Footer = () => {
  return (
    <Box
      component="div"
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={3}
      pt={6}
      marginTop="auto"
    >
      <Box display="flex" gap="1rem">
        <Avatar
          sx={{
            backgroundColor: "secondary.dark",
            padding: "1.5rem",
            boxShadow: 2,
            cursor: "pointer",
          }}
        >
          <TwitterIcon sx={{ color: "common.white" }} />
        </Avatar>

        <Avatar
          sx={{
            backgroundColor: "secondary.dark",
            padding: "1.5rem",
            boxShadow: 2,
            cursor: "pointer",
          }}
        >
          <InstagramIcon sx={{ color: "common.white" }} />
        </Avatar>

        <Avatar
          sx={{
            backgroundColor: "secondary.dark",
            padding: "1.5rem",
            boxShadow: 2,
            cursor: "pointer",
          }}
        >
          <YouTubeIcon sx={{ color: "common.white" }} />
        </Avatar>
      </Box>
      <Box
        component={"div"}
        borderTop={1}
        borderColor={"grey.300"}
        textAlign="center"
        py={3}
        width="100%"
      >
        <Typography variant="body1" color="grey">
          © 2022 Cryptrack. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
