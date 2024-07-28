import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import styled from "@mui/material/styles/styled";

const StyledCoinBox = styled(Box)(({ theme }) => ({
  display: "none",

  [theme.breakpoints.up("md")]: {
    display: "block",
    marginTop: "2rem",
    marginBottom: "2rem",
  },
}));

const CommonCoins = () => {
  return (
    <StyledCoinBox>
      <Grid container spacing={12}>
        <Grid item xs>
          <Image src="/Bitcoin.svg" alt="Bitcoin Icon" width={80} height={80} />
        </Grid>
        <Grid item xs>
          <Image src="/Bnb.svg" alt="BNB Icon" width={80} height={80} />
        </Grid>
        <Grid item xs>
          <Image
            src="/Ethereum.svg"
            alt="Ethereum Icon"
            width={80}
            height={80}
          />
        </Grid>
        <Grid item xs>
          <Image src="/Tether.svg" alt="Tether Icon" width={80} height={80} />
        </Grid>
      </Grid>
    </StyledCoinBox>
  );
};
export default CommonCoins;
