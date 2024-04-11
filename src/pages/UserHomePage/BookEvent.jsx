import { Box, Grid, styled, List, ListItem, ListItemIcon, ListItemText, Typography, Button } from "@mui/material";
import axios from "../../utils/AxiosInstance";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import FoundationIcon from "@mui/icons-material/Foundation";
import DateRangeIcon from "@mui/icons-material/DateRange";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ChatBox from "../../components/userComponents/ChatBox";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const MainContainer = styled(Box)`

`;

const Buttons = styled(Box)`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;


const SubContainer = styled(Box)`

`;

const Grids = styled(Grid)``;
const GridItems = styled(Grid)``;

const ImageContainer = styled(Box)`
    /* background-color: red; */
    height: 500px;
    width: 100%;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: hidden;
    padding: 0;
`;

const MainImage = styled(Box)`
    /* background-color: aqua; */
    height: 359px;
    width: 100%;
    padding: 0;

    img {
        height: auto;
        position: center;
        width: 100%;
        object-fit: cover;
    }
    #swipe {
        width: 100%;
        background-color: red;
        height: 100%;
    }
`;

const SubImages = styled(Box)`
    background-color: #00000057;
    height: 129px;
    width: 100%;
    display: flex;
    padding: 0;
    justify-content: space-between;

    img {
        height: 100%;
        width: 100%;
    }
`;
const ImageLists = styled(Box)`
    width: calc(100% / 6);
    height: 100%;
`;

// -----

const DetailsContainer = styled(Box)`
    background-color: #00000057;
    height: 500px;
    width: 100%;
    border-radius: 20px;
    padding: 20px;
`;

const Lists = styled(List)``;
const ListItems = styled(ListItem)`
    .span {
        display: flex;
        padding: 10px;
        align-items: center;

        #textField {
            padding: 0;
            max-width: 80px;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        input {
            width: 80%;
            outline: none;
            height: 100%;
            border: none;
            background: transparent;
            text-align: center;
            color: white;
        }

        /* background-color: red; */
    }

    .span.one {
        display: flex;
        min-width: 200px;
        /* background-color: red;    */
    }
`;
const MapContainer = styled(Box)`
    height: 195px;
    width: 100%;
`;

const BookEvent = () => {
    const [datas, setData] = useState([]);
    const [images, setImages] = useState([]);
    const [count, setCount] = useState(1);
    const nav = useNavigate();
    const { id } = useParams();

    const fetchData = async () => {
        try {
            const response = await axios.get("/api/getallevents");
            setData(response.data?.data?.filter((itm) => itm._id === id));

            const eventImage = response.data?.data?.filter((itm) => itm._id === id)[0]?.image;
            const eventImages = response.data?.data?.filter((itm) => itm._id === id)[0]?.venue.images;

            setImages([eventImage, ...eventImages]);
        } catch (err) {
            console.error("event fetching error:", err);
            console.log("Response:", err.response);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    console.log(datas);

    //payment integration

    const incrementCount = () => {
        setCount((prevCount) => prevCount + 1);
    };

    const decrementCount = () => {
        if (count > 0) {
            setCount((prevCount) => prevCount - 1);
        }
    };

    const handleOrders = () => {
        nav("/user/bookings");
    };

    const initPayment = (data) => {
        const options = {
            amount: datas.amount,
            currency: data.currency,
            description: "Test Transaction",
            image: "https://img.freepik.com/premium-vector/fast-play-symbol-logo-with-letter-f_45189-7.jpg?w=740",
            order_id: data.id,
            handler: async (response) => {
                try {
                    const additionalCredentials = {
                        totalAmount: datas[0]?.Ticketprice * Number(count),
                        totalTickets: count,
                    };
                    const user = localStorage.getItem("userId");

                    console.log("uid", user);

                    const { data } = await axios.post(`/api/paymentfinal/${id}/${user}`, {
                        ...response,
                        ...additionalCredentials,
                    });
                    console.log(data);
                    if (data) {
                        handleOrders();
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            theme: {
                color: "#3399cc",
            },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    };

    const handleClick = async () => {
        try {
            const { data } = await axios.post("/api/paymentstart", {
                amount: datas[0]?.Ticketprice * Number(count),
            });
            console.log(data);
            initPayment(data.data);
        } catch (error) {
            console.error("error:", error);
        }
    };

    // console.log(datas);
    return (
        <MainContainer sx={{ padding: { xs: "5px", sm: "15px", lg: "30px" } }}>
            <Buttons>
                <Button onClick={() => nav("/user/events")} sx={{ width: "fit-content", color: "white", outline: "none" }}>
                    <ArrowBackIosNewIcon />
                </Button>
                <ChatBox />
            </Buttons>
            <SubContainer sx={{ padding: { xs: "0", sm: "5", lg: "30px" } }}>
                <Grids container spacing={2}>
                    <GridItems item xs={12} md={7}>
                        <ImageContainer>
                            <MainImage>
                                <Swiper spaceBetween={30} slidesPerView={1} style={{ height: "100%", width: "100%" }}>
                                    {images.map((img) => (
                                        <SwiperSlide id="swipe">
                                            <img src={img?.url} alt="" />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </MainImage>
                            <SubImages>
                                <Box sx={{ padding: "0", width: "100%" }}>
                                    <Typography sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                        <RadioButtonCheckedIcon />
                                        {datas[0]?.description}
                                    </Typography>
                                    <List sx={{ width: "100%", display: "flex" }}>
                                        {datas[0]?.venue.Facilities.map((amenity, index) => (
                                            <ListItem key={index} sx={{ width: "fitContent" }}>
                                                <ListItemIcon sx={{ minWidth: "30px" }}>
                                                    <CheckCircleIcon sx={{ fontSize: 28, color: "#00ff00" }} />
                                                </ListItemIcon>
                                                <ListItemText primary={amenity} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Box>
                            </SubImages>
                        </ImageContainer>
                    </GridItems>

                    <GridItems item xs={12} md={5}>
                        <DetailsContainer sx={{ height: { xs: "fitContent", md: "auto" } }}>
                            <Typography variant="h3">{datas[0]?.title}</Typography>
                            <Lists>
                                <ListItems
                                    sx={{
                                        flexDirection: { xs: "column", md: "row" },
                                        textAlign: { xs: "left" },
                                        alignItems: { xs: "flex-start" },
                                        padding: { xs: "0" },
                                    }}
                                >
                                    <span className="span one">
                                        <ListItemIcon
                                            sx={{
                                                color: "white",
                                                minWidth: { xs: "52px", sm: " 35px", lg: "52px" },
                                            }}
                                        >
                                            <FoundationIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={datas[0]?.venue.title}></ListItemText>
                                    </span>
                                    <span className="span">
                                        <ListItemIcon
                                            sx={{
                                                color: "white",
                                                minWidth: { xs: "52px", sm: " 35px", lg: "52px" },
                                            }}
                                        >
                                            <LocationOnIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={datas[0]?.venue.place}></ListItemText>
                                    </span>
                                </ListItems>

                                <ListItems
                                    sx={{
                                        flexDirection: { xs: "column", md: "row" },
                                        textAlign: { xs: "left" },
                                        alignItems: { xs: "flex-start" },
                                        padding: { xs: "0" },
                                    }}
                                >
                                    <span className="span one">
                                        <ListItemIcon
                                            sx={{
                                                color: "white",
                                                minWidth: { xs: "52px", sm: " 35px", lg: "52px" },
                                            }}
                                        >
                                            <EventSeatIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={datas[0]?.venue.maximumSeats}></ListItemText>
                                    </span>
                                    <span className="span">
                                        <ListItemIcon
                                            sx={{
                                                color: "white",
                                                minWidth: { xs: "52px", sm: " 35px", lg: "52px" },
                                            }}
                                        >
                                            <DateRangeIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={datas[0]?.date}></ListItemText>
                                    </span>
                                </ListItems>

                                <ListItems
                                    sx={{
                                        flexDirection: { xs: "column", md: "row" },
                                        textAlign: { xs: "left" },
                                        alignItems: { xs: "flex-start" },
                                        padding: { xs: "0" },
                                    }}
                                >
                                    <span className="span one">
                                        <ListItemIcon
                                            sx={{
                                                color: "white",
                                                minWidth: { xs: "52px", sm: " 35px", lg: "52px" },
                                            }}
                                        >
                                            <PeopleAltIcon />
                                        </ListItemIcon>
                                        <span id="textField">
                                            <span style={{ cursor: "pointer" }} onClick={decrementCount}>
                                                -
                                            </span>
                                            <input value={count} readOnly />
                                            <span style={{ cursor: "pointer" }} onClick={incrementCount}>
                                                +
                                            </span>
                                        </span>
                                    </span>
                                    <span className="span">
                                        <ListItemIcon
                                            sx={{
                                                color: "white",
                                                minWidth: { xs: "52px", sm: " 35px", lg: "52px" },
                                            }}
                                        >
                                            <CurrencyRupeeIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={datas[0]?.Ticketprice * Number(count)}></ListItemText>
                                    </span>
                                </ListItems>

                                <ListItems
                                    sx={{
                                        flexDirection: { xs: "column", md: "row" },
                                        textAlign: { xs: "left" },
                                        alignItems: { xs: "flex-start" },
                                        padding: { xs: "0" },
                                        justifyContent: { md: "flex-end" },
                                    }}
                                >
                                    <button onClick={handleClick}>Book Now</button>
                                </ListItems>
                            </Lists>
                            <MapContainer>
                                <iframe
                                    src={
                                        datas[0]?.mapUrl ??
                                        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4016656.570775538!2d73.49503316704077!3d10.538720521185303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0812ffd49cf55b%3A0x64bd90fbed387c99!2sKerala!5e0!3m2!1sen!2sin!4v1712819618842!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade'
                                    }
                                    width="100%"
                                    height="100%"
                                    style={{ border: "0" }}
                                    loading="lazy"
                                ></iframe>
                            </MapContainer>
                        </DetailsContainer>
                    </GridItems>
                </Grids>
            </SubContainer>
        </MainContainer>
    );
};

export default BookEvent;
