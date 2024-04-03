import React, { useState } from "react";
import { Box, useMediaQuery, Popover, Button } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

export default function Navbar() {
  const nav = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:850px)");
  const [popoverAnchor, setPopoverAnchor] = useState(null);

  const handleButtonClick = (event) => {
    setPopoverAnchor(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setPopoverAnchor(null);
  };

  const openPopover = Boolean(popoverAnchor);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1%",
        }}
      >
        <Box sx={sx.logoStyle} onClick={() => nav("/")}>
          E V E N T G O
        </Box>
        <button
          onClick={handleButtonClick}
          style={{
            display: isSmallScreen ? "block" : "none",
            paddingLeft: "10px",
            background: "none",
            border: "none",
            cursor: "pointer",
            position: "relative",
          }}
        >
          <MenuIcon style={{ color: "white" }} />
        </button>

        <Popover
          open={openPopover}
          anchorEl={popoverAnchor}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "10px",
              // width:'100%';
            }}
          >
            <Button href="#" color="inherit" sx={sx.popoverButton}>
              Events
            </Button>
            <Button href="#" color="inherit" sx={sx.popoverButton}>
              About
            </Button>
            <Button href="#" color="inherit" sx={sx.popoverButton}>
              My Booking
            </Button>
            <Button href="#" color="inherit" sx={sx.popoverButton}>
              Contact
            </Button>
            <Button href="#" color="inherit" sx={sx.popoverButton}>
              Login&nbsp;/&nbsp;Register
            </Button>
          </div>
        </Popover>
        {!isSmallScreen && (
          <>
            <Box sx={{ display: "flex" }}>
              <Box sx={sx.navLinks} onClick={() => nav("/user/events")}>
                Events
              </Box>
              <Box sx={sx.navLinks}>About</Box>
              <Box sx={sx.navLinks} onClick={() => nav("/user/bookings")}>
                My&nbsp;Booking
              </Box>
              <Box sx={sx.navLinks}>Contact</Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                color: "#23a6f0",
                cursor: "pointer",
              }}
            >
              <PersonOutlineIcon />
              {localStorage.getItem("userId") ? (
                <Box
                  onClick={() =>
                    localStorage.removeItem("userId")
                  }
                >
                  Logout
                </Box>
              ) : (
                <Box onClick={() => nav("/signin")}>
                  Login&nbsp;/&nbsp;Register&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </Box>
              )}
            </Box>
          </>
        )}
      </Box>
    </div>
  );
}

const sx = {
  navLinks: {
    paddingX: "5%",
    cursor: "pointer",
    display: "flex",
  },
  logoStyle: {
    fontSize: { xs: "18px", sm: "20px", md: "22px", lg: "25px" },
    fontWeight: "600",
    cursor: "pointer",
    marginLeft: "10%",
  },
  popoverButton: {
    textTransform: "none",
  },
};
