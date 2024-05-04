import React from "react";
import {
  Box,
  Typography,
  Button,
  useMediaQuery,
  Container,
} from "@mui/material";

export default function Footer() {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  return (
    <Container  id="targetFooter" sx={sx.mainContainer}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginLeft: "5%",
          justifyContent: isSmallScreen ? "center" : "space-between",
          flexDirection: isSmallScreen ? "column" : "row",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            paddingRight: "15%",
          }}
        >
          {isSmallScreen ? null : (
            <Typography variant="h5" fontFamily={"var(--font-abel)"}>
             E V E N T G O
            </Typography>
          )}
          <Typography
            sx={{
              marginTop: isSmallScreen ? "10%" : "20%",
              fontFamily: "var(--font-dmsanslight)",
            }}
          >
            Follow us on
          </Typography>
          <Box sx={sx.sourceLogos}>
            <a
             
              underline="none"
            >
              <img src="/gitbook.svg" alt="Photos" width="25" height="25" />
            </a>
            <a href="#" underline="none">
              <img src="/telegram.svg" alt="Photos" width="25" height="25" />
            </a>
            <a href="#" underline="none">
              <img src="/medium.svg" alt="Photos" width="25" height="25" />
            </a>
            <abbr href="#" underline="none">
              <img src="/discord.svg" alt="Photos" width="25" height="25" />
            </abbr>
            <a href="#" underline="none">
              <img src="/twitter.svg" alt="Photos" width="25" height="25" />
            </a>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            maxWidth: "auto",
            flexDirection: "row",
            marginBottom: isSmallScreen ? "20px" : "0",
          }}
        >
          <Box
            sx={{
              paddingRight: "15%",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <Button href="#" variant="text" color="inherit">
              <Typography sx={sx.inquirees}>Learn</Typography>
            </Button>
            <Button href="#" variant="text" color="inherit">
              <Typography sx={sx.inquirees}>Github</Typography>
            </Button>
            <Button href="#" variant="text" color="inherit">
              <Typography sx={sx.inquirees}>Documentation</Typography>
            </Button>
          </Box>
          <Box sx={{ paddingRight: "10%" }}>
            <Button href="#" variant="text" color="inherit">
              <Typography sx={sx.inquirees}>Contact us</Typography>
            </Button>
            <Button href="#" variant="text" color="inherit">
              <Typography sx={sx.inquirees}>Media Inquiries</Typography>
            </Button>
          </Box>
        </Box>
      </Box>
      <Box>
      </Box>
    </Container>
  );
}

const sx = {
  logoStyle: {
    width: "100%",
    fontFamily: "Inter, sans-serif",
    fontSize: { xs: "24px", sm: "24px", md: "24px", lg: "28px" },
    display: "flex",
    alignItems: "center",
  },

  sourceLogos: {
    display: "flex",
    gap: "10px",
    paddingTop: "10%",
    paddingBottom: "10%",
  },
  mainContainer: {
    borderTop: "1px solid #333333",
    position: "relative",
    width: "100%",
    paddingY: "5%",
  },
  inquirees: {
    textTransform: "none",
    color: "rgb(115, 115, 115)",
    fontFamily: "var(--font-dmsanslight)",
  },
};
