import { useState,useEffect } from "react";
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
  Button,
  Modal,
  TextField,
  FormControl
} from "@mui/material";
import axios from "../../utils/AxiosInstance"

import FoundationIcon from "@mui/icons-material/Foundation";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import DownloadDoneIcon from "@mui/icons-material/DownloadDone";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useNavigate } from "react-router-dom";

const MainContainer = styled(Box)``;
const Cards = styled(Card)`
  height: 350px;
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
  padding-bottom: 30px;
  position: relative;

  .availablility {
    position: absolute;
    right: 2px;
    top: 2px;
    height: fit-content;
    width: fit-content;
    font-size: 12px;
  }
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

const VenueLists = ({ data }) => {
  const [datas,setDatas] = useState(data);
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    place: "",
    maximumSeats: "",
    price:""
  });

  console.log("selectedEvent",selectedEvent)
  const navigate = useNavigate();
  console.log("datas", data);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // delete venue

  const handleDeleteVenue = (venueId) => {
    try {
      const response = axios.delete(`/api/deletevenue/${venueId}`);

      setDatas((prevEventData) =>
        prevEventData.filter((event) => event._id !== venueId)
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
        `/api/editvenue/${selectedEvent?._id}`,
        formData
      );    
      console.log("editedData",response.data.data)
      setDatas((prevData) =>
      prevData.map((venue) =>
        venue._id === selectedEvent?._id ? response.data.data : venue
      )
    );
      setOpen(false)
      // window.location.reload()
    } catch (err) {
      console.error("Error editing bid:", err);
    }
  };


  useEffect(() => {
    if (datas.length > 0 && selectedEvent?._id) {
      const selectedBid = datas.find((bid) => bid._id === selectedEvent?._id);
      if (selectedBid) {
        setFormData({
          title: selectedBid.title,
          place: selectedBid.place,
          Facilities: selectedBid.Facilities,
          price: selectedBid.price,
          maximumSeats: selectedBid.maximumSeats,
        });
      } else {
        console.error("Selected bid not found");
      }
    }
  }, [data, selectedEvent?._id]);
  


  return (
    <MainContainer>
      {data.length === 0 ? (
        <div>Create a venue first.</div>
      ) : (
        <Grid container spacing={2}>
          {datas.map((venue) => (
            <Grid item xs={12} sm={6} lg={3}>
              <Cards>
                <ImageBox>
                  <img src={venue?.images[0].url} alt="Venue Image" />
                </ImageBox>
                <CardContents>
                  <Chip
                    className="availablility"
                    variant="outlined"
                    label={venue.available ? "Book now" : "not available"}
                    color={venue.available ? "success" : "warning"}
                    onClick={() => navigate(`/organizer/venue/${venue._id}`)}
                  ></Chip>
                  <Lists>
                    <ListItems>
                      <ListItemIcon className="listIcon">
                        <FoundationIcon />
                      </ListItemIcon>
                      <ListItemText id="more" secondary={venue?.title} />
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
                        <ListItemText id="more" secondary={"Ac, Parking lot"} />
                      </ListItems>
                    </Box>
                  </Lists>
                  
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-around",
                      margin: 1.5,
                    }}
                  >
                    <Box>
                      <Button
                        onClick={() => {
                          setOpen(true);
                          setSelectedEvent(venue);
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
                                  label="place"
                                  name="place"
                                  value={formData.place}
                                  onChange={handleChange}
                                  required
                                  sx={sx.inputBox}
                                />
                              </FormControl>
                             
                              <TextField
                                label="price"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                type="number"
                                sx={sx.inputBox}
                              />

                              <TextField
                                label="maximumSeats"
                                name="maximumSeats"
                                value={formData.maximumSeats}
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
                        onClick={() => handleDeleteVenue(venue._id)}
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
      )}
    </MainContainer>
  );
};

export default VenueLists;


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

