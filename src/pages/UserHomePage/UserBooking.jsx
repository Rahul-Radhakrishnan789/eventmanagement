import React, { useState, useEffect } from "react";
import QRCode from "qrcode.react";
import axios from "../../utils/AxiosInstance";

import {
    Box,
    Card,
    CardContent,
    Grid,
    ListItem,
    ListItemIcon,
    ListItemText,
    styled,
    List,
    Chip,
    Modal,
    Typography,
    Button,
} from "@mui/material";

import FoundationIcon from "@mui/icons-material/Foundation";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import DateRangeIcon from "@mui/icons-material/DateRange";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

import Navbar from "../../components/userComponents/navbar";
import Footer from "../../components/userComponents/Footer";

const MainContainer = styled(Box)`
    padding: 0;
`;

const SubContainer = styled(Box)`
    padding: 0;
    min-height: 100vh;
`;

const Cards = styled(Card)`
    height: fit-content;
    width: 100%;
    cursor: pointer;
    position: relative;
`;
const ImageBox = styled(Box)`
    height: 256px;
    width: 100%;
    display: grid;
    place-items: center;
`;
const CardContents = styled(CardContent)`
    height: fit-content;
    padding: 20px;
    position: relative;
`;

const Lists = styled(List)`
    padding: 0;
    #listSeats {
        width: 250px;
    }
    #listPlace {
        width: 250px;
    }
`;
const ListItems = styled(ListItem)`
    margin-bottom: 10px;
    padding: 0;
    .listIcon {
        min-width: 30px;
    }
    #more {
        display: -webkit-box !important;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        white-space: pre-line;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 250px, dis;
    }
`;

export const UserBooking = () => {
    const [bookingData, setBookingData] = useState([]);

    console.log("bookingdata", bookingData);

    const fetchData = async () => {
        try {
            const response = await axios.get("/api/fetchallbooking");
            setBookingData(response.data?.data);
        } catch (err) {
            console.error("event fetching error:", err);
            console.log("Response:", err.response);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleClick = async (id) => {
        try {
            const amount = bookingData.totalAmount;
            const razorpay_payment_id = id;

            console.log(razorpay_payment_id);

            const response = await axios.post("/api/refund", {
                amount: amount,
                paymentId: razorpay_payment_id,
            });
            console.log("Refund response:", response.data);
        } catch (err) {
            console.error("refund fetching error:", err);
            console.log("Response:", err.response);
        }
        handleClose();
        await fetchData();
    };

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <MainContainer>
            <Navbar />
            <SubContainer>
                <Grid container spacing={2} p={4}>
                    {bookingData.map((event) => (
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <Cards>
                                <ImageBox>
                                    <QRCode size={200} value={event._id} level="H" includeMargin={true} />
                                </ImageBox>
                                <CardContents>
                                    <Lists>
                                        <Box sx={{ display: "flex" }}>
                                            <ListItems id="listPlace">
                                                <ListItemIcon className="listIcon">
                                                    <FoundationIcon />
                                                </ListItemIcon>
                                                <ListItemText id="more" secondary={event.event.title} />
                                            </ListItems>
                                            <ListItems>
                                                <ListItemIcon className="listIcon">
                                                    <LocationOnIcon />
                                                </ListItemIcon>
                                                <ListItemText id="more" secondary={event.event.venue.place} />
                                            </ListItems>
                                        </Box>
                                        <Box sx={{ display: "flex" }}>
                                            <ListItems id="listSeats">
                                                <ListItemIcon className="listIcon">
                                                    <DateRangeIcon />
                                                </ListItemIcon>
                                                <ListItemText secondary={event.event.date} />
                                            </ListItems>
                                            <ListItems>
                                                <ListItemIcon className="listIcon">
                                                    <PeopleAltIcon />
                                                </ListItemIcon>
                                                <ListItemText id="more" secondary={event.totalTickets} />
                                            </ListItems>
                                        </Box>
                                        <Box sx={{ display: "flex" }}>
                                            <ListItems>
                                                <ListItemIcon className="listIcon">
                                                    <CurrencyRupeeIcon />
                                                </ListItemIcon>
                                                <ListItemText id="more" secondary={event.totalAmount} />
                                            </ListItems>
                                            <button onClick={handleOpen}>Cancel</button>
                                        </Box>
                                    </Lists>
                                </CardContents>
                            </Cards>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box
                                    sx={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)",
                                        width: 400,
                                        bgcolor: "background.paper",
                                        boxShadow: 24,
                                        p: 4,
                                        borderRadius: "20px",
                                    }}
                                >
                                    <Typography
                                        id="modal-modal-description"
                                        variant="h5"
                                        sx={{ color: "black", textAlign: "center" }}
                                    >
                                        Proceed with cancellation
                                    </Typography>
                                    <span style={{ display: "flex", width: "100%", justifyContent: "space-around" }}>
                                        <Button onClick={() => handleClick(event._id)} sx={{ mt: 2, color: "green" }}>
                                            Yes
                                        </Button>
                                        <Button onClick={handleClose} sx={{ mt: 2, color: "red" }}>
                                            No
                                        </Button>
                                    </span>
                                </Box>
                            </Modal>
                        </Grid>
                    ))}
                </Grid>
            </SubContainer>
            <Footer />
        </MainContainer>
    );
};

// <div>hi</div>
