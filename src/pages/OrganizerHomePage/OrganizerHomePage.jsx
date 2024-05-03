import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState, useEffect } from "react";
import axios from "../../utils/AxiosInstance";
import { useNavigate } from "react-router-dom";
import ShowAllEvents from "../../components/organizerComponents/showAllEvents";
import VenueLists from "../../components/organizerComponents/venueLists";
import CreateVenue from "../../components/adminComponents/createVenue";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Box, styled } from "@mui/material";
// import ChatPage from "../../components/organizerComponents/organizerChats";

const SideBars = styled(Sidebar)`
  .ps-sidebar-container {
    background: transparent;
  }
`;

function OrganizerHomePage() {
  const nav = useNavigate();
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/getallvenues");

      setData(response.data.data);
    } catch (err) {
      console.error("venue fetching error:", err);
      console.log("Response:", err.response);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log(data);

  const { collapseSidebar } = useProSidebar();
  const [children, setChildren] = useState(<ShowAllEvents />);

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
              <h2>Organizer</h2>
            </MenuItem>
            <MenuItem
              icon={<AddBoxIcon />}
              onClick={() => setChildren(<CreateVenue data={data} />)}
            >
              Create New venue
            </MenuItem>

            <MenuItem
              icon={<AddCircleOutlineIcon />}
              onClick={() => setChildren(<VenueLists data={data} />)}
            >
              Create New Event
            </MenuItem>
            <MenuItem
              onClick={() => setChildren(<ShowAllEvents />)}
              icon={<PeopleOutlinedIcon />}
            >
              Events
            </MenuItem>
            <MenuItem
              onClick={() => {
                nav("/signin");
                localStorage.removeItem("organizerId");
              }}
              icon={<LogoutIcon />}
            >
              Logout
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

export default OrganizerHomePage;
