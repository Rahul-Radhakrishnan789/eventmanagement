import { useEffect, useState } from "react";
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
  Typography,
  Modal,
} from "@mui/material";
import axios from "../../utils/AxiosInstance";
import FoundationIcon from "@mui/icons-material/Foundation";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import DateRangeIcon from "@mui/icons-material/DateRange";

const MainContainer = styled(Box)`
  padding: 0;
`;

const SubContainer = styled(Box)`
  padding: 0;
  min-height: 100vh;
`;

const Cards = styled(Card)`
  height: 280px;
  width: 100%;
  cursor: pointer;
  position: relative;
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

function ShowAllEvents() {
  const [data, setData] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalTickets, setTotalTickets] = useState(0);
  const [userDetails, setUserDetails] = useState([]);

  const handleCardClick = (event) => {
    setSelectedEvent(event);
    setOpenModal(true);
    getEventData(event._id);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/getallevents");
      setData(response.data.data);
    } catch (err) {
      console.error("event fetching error:", err);
      console.log("Response:", err.response);
    }
  };

  const getEventData = async (eventId) => {
    try {
      const response = await axios.get(`/api/geteventdata/${eventId}`);

      setTotalPrice(response.data.data.totalAmount);
      setTotalTickets(response.data.data.totalTickets);
      setUserDetails(response.data.data.populatedOrders);

      console.log("userDetails", userDetails);
      // console.log('response',response)
    } catch (err) {
      console.error("eventData fetching error:", err);
      console.log("Response:", err.response);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <MainContainer>
      <SubContainer>
        <Grid container spacing={2} p={0}>
          {data.map((event) => (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Cards onClick={() => handleCardClick(event)}>
                <ImageBox>
                  <img src={event.image.url} alt="event Image" />
                </ImageBox>
                <CardContents>
                  <Lists>
                    <Box sx={{ display: "flex" }}>
                      <ListItems id="listPlace">
                        <ListItemIcon className="listIcon">
                          <FoundationIcon />
                        </ListItemIcon>
                        <ListItemText secondary={event.title} />
                      </ListItems>
                      <ListItems>
                        <ListItemIcon className="listIcon">
                          <LocationOnIcon />
                        </ListItemIcon>
                        <ListItemText secondary={event.venue.place} />
                      </ListItems>
                    </Box>
                    <Box sx={{ display: "flex" }}>
                      <ListItems id="listSeats">
                        <ListItemIcon className="listIcon">
                          <DateRangeIcon />
                        </ListItemIcon>
                        <ListItemText secondary={event.date} />
                      </ListItems>
                      <ListItems>
                        <ListItemIcon className="listIcon">
                          <CurrencyRupeeIcon />
                        </ListItemIcon>
                        <ListItemText id="more" secondary={event.Ticketprice} />
                      </ListItems>
                    </Box>
                  </Lists>
                </CardContents>
              </Cards>
            </Grid>
          ))}
        </Grid>
      </SubContainer>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          sx={{
            width: "90vh",
            height: "80vh",
            bgcolor: "background.paper",
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            overflow: "visible",
          }}
        >
          <Typography sx={{ color: "purple" }}>
            {selectedEvent && selectedEvent.title}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "red",
              padding: "16px",
            }}
          >
            <Typography>Total Tickets Sold: {totalTickets} </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "black",
              padding: "16px",
            }}
          >
            <Typography>Total Revenue: {totalPrice} </Typography>
          </Box>
          <Box
            sx={{
             
            overflowY:'scroll',
              bgcolor: "black",
              padding: "16px",
            }}
          >
         
            {userDetails.map((user, index) => (
              <Box key={index}
              sx={{
                bgcolor: index % 2 === 0 ? "black" : "gray", 
                color: "white", 
                padding: "8px", 
                marginBottom: "8px", 
                display:'flex',
                flexDirection:'column'
              }}>
               <span><Typography color={'coral'}>Username: </Typography>{user?.userId?.username}</span> 
                <span> <Typography  color={'coral'}>Email:</Typography>  {user?.userId?.email}</span>
                <span><Typography  color={'coral'}>Total Amount:</Typography> {user?.totalAmount} </span> 
                <span><Typography  color={'coral'}>Total Tickets:</Typography>{user?.totalTickets}</span> 
              </Box>
            ))}
          </Box>
        </Box>
      </Modal>
    </MainContainer>
  );
}

export default ShowAllEvents;
