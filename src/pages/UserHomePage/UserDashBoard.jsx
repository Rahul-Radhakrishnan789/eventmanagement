import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EventSeatIcon from '@mui/icons-material/EventSeat';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import UserEvents from "./UserEvents";
import { UserBooking } from "./UserBooking";
import { Box, styled } from "@mui/material";

const SideBars = styled(Sidebar)`
  .ps-sidebar-container {
    background: transparent;
  }
`;

function UserDashBoard() {
  const nav = useNavigate();
 

  const { collapseSidebar } = useProSidebar();
  const [children, setChildren] = useState(<UserEvents />);

  return (
    <>
      <div style={({ height: "100vh" }, { display: "flex" })}>
        <SideBars style={{ height: "100vh" }}>
          <Menu>
            <MenuItem
              icon={<MenuOutlinedIcon />}
              onClick={() => {
                collapseSidebar();
              }}
              style={{ textAlign: "center" }}
            >
              {" "}
              <h2>Hello User</h2>
            </MenuItem>
        

            <MenuItem
              icon={<EventSeatIcon />}
              onClick={() => setChildren(<UserEvents />)}
            >
           Events
            </MenuItem>
            <MenuItem
              onClick={() => setChildren(<UserBooking />)}
              icon={<ShoppingCartIcon />}
            >
              My Bookings
            </MenuItem>
          
            <MenuItem
              onClick={() => {
                nav("/");
              }}
              icon={<LogoutIcon />}
            >
              Home
            </MenuItem>
          </Menu>
        </SideBars>
        <Box sx={sx.renderComponent}>{children}</Box>
      </div>
    </>
  );
}

const sx = {
  mainContainer: {
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    overflow: "hidden",
  },
  sidebar: {
    width: "20%",
    height: "auto",
    background: "linear-gradient(7deg, #181921 0%, #242535 47%, #292A3D 100%)",
    boxShadow: "14px 4px 55px 12px rgba(0, 0, 0, 0.25)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingY: "3%",
    position: "relative",
  },

  logoStyle: {
    fontSize: { xs: "16px", sm: "18px", md: "20px", lg: "24px" },
    marginBottom: "30%",
  },
  services: {
    width: "90%",
  },
  serviceItems: {
    display: "flex",
    width: "100%",
    gap: "6vh",
    marginBottom: "5%",
    padding: "5%",
    position: "relative",

    "&:hover": {
      boxShadow: "4px 4px 16px 4px rgba(1, 1, 1, 0.25)",
      cursor: "pointer",
      background: " #47476b",
    },
  },
  backButton: {
    background: "#1F202D",
    boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.25)",
    borderRadius: 20,
    fontSize: { xs: 10, sm: 14, md: 14, lg: 14 },
    textTransform: "none",
    color: "#fff",
    paddingX: "5%",
    width: "150px",
    position: "absolute",
    bottom: "50px",
    left: "40px",
  },

  cardBox: {
    width: "100%",
    height: "90%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedBox: {
    width: "1px",
    height: "45px",
    display: "flex",
    alignItems: "center",
  },
  innerSelectedBox: { width: "inherit", height: "50%", background: "#fff" },
  inputTitle: {
    textTransform: "none",
  },
  renderComponent: {
    height: "100vh",
    width: "100%",
    overflow: "auto",
    padding: "30px",
  },
};

export default UserDashBoard;
