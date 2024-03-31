import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useState, useEffect } from "react";
import axios from "../../utils/AxiosInstance";
import ShowAllEvents from "../../components/organizerComponents/showAllEvents";
import VenueLists from "../../components/organizerComponents/venueLists";
import { Box } from "@mui/material";

function OrganizerHomePage() {
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
                <Sidebar style={{ height: "100vh", background: "darkblue" }}>
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

                        <MenuItem icon={<HomeOutlinedIcon />} onClick={() => setChildren(<VenueLists data={data} />)}>
                            Create New Event
                        </MenuItem>
                        <MenuItem onClick={() => setChildren(<ShowAllEvents />)} icon={<PeopleOutlinedIcon />}>
                            Events
                        </MenuItem>
                    </Menu>
                </Sidebar>
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
