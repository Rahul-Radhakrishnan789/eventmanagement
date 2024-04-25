import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LogoutIcon from '@mui/icons-material/Logout';
import { useState, useEffect } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import EngineeringIcon from '@mui/icons-material/Engineering';
import { Box, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ShowAllEvents from "../../components/organizerComponents/showAllEvents";
import CreateVenue from "../../components/adminComponents/createVenue";
import ShowAllVenue from "../../components/adminComponents/showAllVenue";
import UserTable from "../../components/adminComponents/userTable";
import OrganizerTable from "../../components/adminComponents/organizerTable";

const SideBars = styled(Sidebar)`
    .ps-sidebar-container {
        background: transparent;
    }
`;

const AdminHomePage = () => {
    const { collapseSidebar } = useProSidebar();
    const [children, setChildren] = useState(<ShowAllEvents />);
    const nav = useNavigate()

    return (
        <>
            <div style={{ height: "100vh", display: "flex" }}>
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
                            <h2>Admin</h2>
                        </MenuItem>
                        <MenuItem onClick={() => setChildren(<ShowAllEvents />)} icon={<PeopleOutlinedIcon />}>
                            Events
                        </MenuItem>
                        <MenuItem onClick={() => setChildren(<UserTable />)} icon={<AssignmentIndIcon />}>
                            Users
                        </MenuItem>
                        <MenuItem onClick={() => setChildren(<OrganizerTable />)} icon={<EngineeringIcon />}>
                            Organizers
                        </MenuItem>
                        <MenuItem onClick={() => nav("/")} icon={<LogoutIcon />}>
                            Logout
                        </MenuItem>
                    </Menu>
                </SideBars>
                <Box sx={sx.renderComponent}>{children}</Box>
            </div>
        </>
    );
};

const sx = {
    renderComponent: {
        height: "100vh",
        width: "100%",
        overflow: "auto",
        padding: "30px",
    },
};

export default AdminHomePage;
