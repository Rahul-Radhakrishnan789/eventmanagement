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
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
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
  height: 400px;
  width: 100%;
  cursor: pointer;
  position: relative;
`;
const ImageBox = styled(Box)`
  height: 50%;
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
  const [open, setOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalTickets, setTotalTickets] = useState(0);
  const [userDetails, setUserDetails] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    Ticketprice: "",
    date:""
  });

  console.log("selectedevent", selectedEvent?._id);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // delete event

  const handleDeleteEvent = (eventId) => {
    try {
      const response = axios.delete(`/api/deleteevent/${eventId}`);

      setData((prevEventData) =>
        prevEventData.filter((event) => event._id !== eventId)
      );

      console.log(response);
    } catch (error) {
      console.error("Error deleting organizer:", error);
    }
  };

  //edit event

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `/api/editevent/${selectedEvent?._id}`,
        formData
      );    
      window.location.reload()
    } catch (err) {
      console.error("Error editing bid:", err);
    }
  };

  useEffect(() => {
    if (data.length > 0 && selectedEvent?._id) {
      const selectedBid = data.find((bid) => bid._id === selectedEvent?._id);
      if (selectedBid) {
        setFormData({
          title: selectedBid.title,
          category: selectedBid.category,
          description: selectedBid.description,
          Ticketprice: selectedBid.Ticketprice,
          date: selectedBid.date,
        });
      } else {
        console.error("Selected bid not found");
      }
    }
  }, [data, selectedEvent?._id]);
  

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

      const organizerId = localStorage.getItem("organizerId")
      const response = await axios.get(`/api/getallevents/${organizerId}`);
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
              <Cards>
                <ImageBox>
                  <img src={event?.image?.url} alt="event Image" />
                </ImageBox>
                <CardContents>
                  <Lists>
                    <Box sx={{ display: "flex" }}>
                      <ListItems id="listPlace">
                        <ListItemIcon className="listIcon">
                          <FoundationIcon />
                        </ListItemIcon>
                        <ListItemText secondary={event?.title} />
                      </ListItems>
                      <ListItems>
                        <ListItemIcon className="listIcon">
                          <LocationOnIcon />
                        </ListItemIcon>
                        <ListItemText secondary={event?.venue?.place} />
                      </ListItems>
                    </Box>
                    <Box sx={{ display: "flex" }}>
                      <ListItems id="listSeats">
                        <ListItemIcon className="listIcon">
                          <DateRangeIcon />
                        </ListItemIcon>
                        <ListItemText secondary={event?.date} />
                      </ListItems>
                      <ListItems>
                        <ListItemIcon className="listIcon">
                          <CurrencyRupeeIcon />
                        </ListItemIcon>
                        <ListItemText
                          id="more"
                          secondary={event?.Ticketprice}
                        />
                      </ListItems>
                    </Box>
                  </Lists>
                  <Button
                    sx={{
                      background: "lightgreen",
                      color: "white",
                      width: "100%",
                    }}
                    onClick={() => handleCardClick(event)}
                  >
                    view details
                  </Button>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      margin: 0.5,
                    }}
                  >
                    <Box>
                      <Button
                        onClick={() => {
                          setOpen(true);
                          setSelectedEvent(event);
                        }}
                        sx={{ background: "lightblue", color: "white" }}
                      >
                        EDIT
                      </Button>
                      <Modal open={open} onClose={() => setOpen(false)}>
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
                          }}
                        >
                          <form style={{ width: "100%" }}>
                            <Box sx={sx.form}>
                              <TextField
                                label="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                sx={sx.inputBox}
                              />
                              <FormControl fullWidth>
                                <TextField
                                  label="Category"
                                  name="category"
                                  value={formData.category}
                                  onChange={handleChange}
                                  required
                                  sx={sx.inputBox}
                                />
                              </FormControl>
                              <TextField
                                label="Description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                multiline
                                rows={4}
                                sx={sx.inputBox}
                              />
                              <TextField
                                label="Date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                sx={sx.inputBox}
                              />

                              <TextField
                                label="Ticketprice"
                                name="Ticketprice"
                                value={formData.Ticketprice}
                                onChange={handleChange}
                                type="number"
                                required
                                sx={sx.inputBox}
                              />
                              <Button
                                sx={sx.submitButton}
                                type="submit"
                                variant="contained"
                                onClick={(e) => handleEdit(e)}
                              >
                                Apply changes
                              </Button>
                            </Box>
                          </form>
                        </Box>
                      </Modal>
                    </Box>
                    <Box>
                      <Button
                        sx={{ background: "red", color: "white" }}
                        onClick={() => handleDeleteEvent(event._id)}
                      >
                        DELETE
                      </Button>
                    </Box>
                  </Box>
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
              bgcolor: "black",
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
              overflowY: "scroll",
              bgcolor: "black",
              padding: "16px",
            }}
          >
            {userDetails.map((user, index) => (
              <Box
                key={index}
                sx={{
                  bgcolor: user?.isCancelled ? "red" : "green",
                  color: "white",
                  padding: "8px",
                  marginBottom: "8px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span>
                  <Typography color={"coral"}>Username: </Typography>
                  {user?.userId?.username}
                </span>
                <span>
                  {" "}
                  <Typography color={"coral"}>Email:</Typography>{" "}
                  {user?.userId?.email}
                </span>
                <span>
                  <Typography color={"coral"}>Total Amount:</Typography>{" "}
                  {user?.totalAmount}{" "}
                </span>
                <span>
                  <Typography color={"coral"}>Total Tickets:</Typography>
                  {user?.totalTickets}
                </span>
                <span>
                  {user?.isCancelled ? ("ORDER CANCELLED") : ("")}
                </span>
              </Box>
            ))}
          </Box>
        </Box>
      </Modal>
    </MainContainer>
  );
}

export default ShowAllEvents;

const sx = {
  mainContainer: {
    maxWidth: { xs: "100%", sm: "70%", md: "50%" },
    display: "flex",
    justifyContent: "space-between",
    overflow: "scroll",
    margin: "0 auto",
    padding: { xs: "0", sm: "10px" },
  },
  inputBox: {
    backgroundColor: "white",
    marginBottom: "5%",
    borderRadius: "10px",
  },
  submitButton: {
    width: "100%",
    marginTop: "5%",
    boxShadow: "0px 11px 16.799999237060547px rgba(0, 0, 0, 0.25)",
    borderRadius: 20,
    fontSize: { xs: 10, sm: 14, md: 14, lg: 14 },
    textTransform: "none",
    color: "#fff",
    fontFamily: "var(--font-dmsanslight)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    padding: "5%",
    background: "#BFBFBF",
    borderRadius: "10px",
  },
};
