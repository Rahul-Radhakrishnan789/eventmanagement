import { Box, Card, CardContent, Grid, ListItem, ListItemIcon, ListItemText, styled, List } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "../../utils/AxiosInstance";
import FoundationIcon from "@mui/icons-material/Foundation";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import DownloadDoneIcon from "@mui/icons-material/DownloadDone";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

const MainContainer = styled(Box)``;
const Cards = styled(Card)`
    height: 280px;
    width: 100%;
`;
const ImageBox = styled(Box)`
    height: 60%;
    width: 100%;

    img {
        height: 100%;
        width: 100%;
    }
`;
const CardContents = styled(CardContent)`
    height: fit-content;
    padding-bottom: 30px;
`;

const Lists = styled(List)`
    padding: 0;
    #listSeats {
        width: 200px;
    }
    #listPlace {
        width: 200px;
    }
`;
const ListItems = styled(ListItem)`
    margin-bottom: 1px;
    padding: 0;
    .listIcon {
        min-width: 30px;
    }
    #facilities {
        display: -webkit-box !important;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        white-space: pre-line;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 250px, dis;
    }
`;

const ShowAllVenue = () => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get("/api/getallvenues");

            setData(response?.data?.data);
        } catch (err) {
            console.error("venue fetching error:", err);
            console.log("Response:", err.response);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    console.log(data);

    return (
        <MainContainer>
            <Grid container spacing={2}>
                {data.map((venue) => (
                    <Grid item xs={12} sm={6} lg={3}>
                        <Cards>
                            <ImageBox>
                                <img src={venue?.images[0]?.url} alt="Venue Image" />
                            </ImageBox>
                            <CardContents>
                                <Lists>
                                    <ListItems>
                                        <ListItemIcon className="listIcon">
                                            <FoundationIcon />
                                        </ListItemIcon>
                                        <ListItemText secondary={venue?.title} />
                                    </ListItems>
                                    <Box sx={{ display: "flex" }}>
                                        <ListItems id="listPlace">
                                            <ListItemIcon className="listIcon">
                                                <LocationOnIcon />
                                            </ListItemIcon>
                                            <ListItemText secondary={venue?.place} />
                                        </ListItems>
                                        <ListItems>
                                            <ListItemIcon className="listIcon">
                                                <CurrencyRupeeIcon />
                                            </ListItemIcon>
                                            <ListItemText secondary={venue?.price} />
                                        </ListItems>
                                    </Box>
                                    <Box sx={{ display: "flex" }}>
                                        <ListItems id="listSeats">
                                            <ListItemIcon className="listIcon">
                                                <EventSeatIcon />
                                            </ListItemIcon>
                                            <ListItemText secondary={venue?.maximumSeats} />
                                        </ListItems>
                                        <ListItems>
                                            <ListItemIcon className="listIcon" id="listChair">
                                                <DownloadDoneIcon />
                                            </ListItemIcon>
                                            <ListItemText id="facilities" secondary={venue?.Facilities} />
                                        </ListItems>
                                    </Box>
                                </Lists>
                                
                            </CardContents>
                        </Cards>
                    </Grid>
                ))}
            </Grid>
        </MainContainer>
    );
};

export default ShowAllVenue;
