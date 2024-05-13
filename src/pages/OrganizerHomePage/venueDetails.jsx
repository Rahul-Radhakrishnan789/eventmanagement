import {
    Box,
    Grid,
    styled,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    Button,
    Modal,
    TextField,
    FormControl,
    Snackbar,
    CircularProgress,
    IconButton,
} from "@mui/material";
import axios from "../../utils/AxiosInstance";
import toast, { Toaster } from "react-hot-toast";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import DownloadDoneIcon from "@mui/icons-material/DownloadDone";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CloseIcon from "@mui/icons-material/Close";

const MainContainer = styled(Box)``;
const SubContainer = styled(Box)``;

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
  background-color: aqua;
  height: 359px;
  width: 100%;
  padding: 0;
  img {
      height: 100%;
      width: 100%;
      object-fit: fill;
  }
`;

const SubImages = styled(Box)`
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
const ListItems = styled(ListItem)``;
const MapContainer = styled(Box)`
  height: 195px;
  width: 100%;
`;

const VenueDetails = () => {
    const [data, setData] = useState([]);
    const [image, setImage] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    console.log(data)

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        title: "",
        category: "",
        description: "",
        date: "",
        Ticketprice: null,
        maximumSeats: null,
        image: null,
    });

    // --taost--------------------
    const [opent, setOpent] = useState(false);
    const handleClick = () => {
        setOpent(true);
    };

    const handleCloses = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpent(false);
    };

    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleCloses}>
                UNDO
            </Button>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloses}>
                <CloseIcon sx={{ border: "none" }} fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    // ---------toast-----------

    const fetchData = async () => {
        try {
            const response = await axios.get("/api/gettotalvenues");
            setData(response.data.data.filter((itm) => itm._id === id));
        } catch (err) {
            console.error("venue fetching error:", err);
            console.log("Response:", err.response);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    //   const images = data.length > 0 ? data[0].images : [];

    //   const imageView = (prop) => {
    //     setImage(images[prop]?.url);
    //   };

    //   modal feature implementation

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleImageUpload = (event) => {
        const files = event.target.files;
        setFormData({
            ...formData,
            image: files,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setIsLoading(true)
            const organizerId = localStorage.getItem("organizerId");
            const formDataToSend = new FormData();

            for (const key in formData) {
                if (key === "image") {
                    formDataToSend.append("image", formData.image[0]);
                } else {
                    formDataToSend.append(key, formData[key]);
                }
            }

            if (!formData.title || !formData.category || !formData.Ticketprice) {
                alert("Please fill in all required fields!");
                return;
            }


            const response = await axios.post(`/api/postevent/${id}/${organizerId}`, formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            handleClose();
            console.log("Registration successful:", response.data);

            console.log("Submitting form:", formData);
            toast.success("Event creation Successful", {
                duration: 5000,
                style: {
                    borderRadius: "10px",
                    color: "#000",
                },
            });
        } catch (error) {
            setIsLoading(false)
            toast.error(error.response.data.message, {
                duration: 3000,
                style: {
                    borderRadius: "10px",
                    background: "#e24242",
                    color: "#fff",
                },
            });
            console.error("Event Registration error:", error);
            console.log("Response:", error.response);
        }

        setFormData({
            title: "",
            category: "",
            description: "",
            date: "",
            Ticketprice: null,
            maximumSeats: null,
            image: null,
        });

        setOpen(false);

        handleClick();
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const images = data.length > 0 ? data[0].images : [];
    const imageView = (prop) => {
        setImage(images[prop]?.url);
    };
    const facilities = data[0]?.Facilities.join(",");

    return (
        <>
            <MainContainer sx={{ padding: { xs: "5px", sm: "15px", lg: "30px" } }}>
                <Button
                    sx={{ width: "fit-content", color: "white", outline: "none" }}
                    onClick={() => navigate("/organizer")}
                >
                    <ArrowBackIosNewIcon />
                </Button>
                <SubContainer sx={{ padding: { xs: "0", sm: "5", lg: "30px" } }}>
                    <Grids container spacing={2}>
                        <GridItems item xs={12} sm={7}>
                            <ImageContainer>
                                <MainImage>
                                    <img src={image.length == 0 ? images[0]?.url : image} alt="" />
                                </MainImage>
                                <SubImages>
                                    <ImageLists onClick={() => imageView(0)}>
                                        <img src={images[0]?.url} alt="" />
                                    </ImageLists>
                                    <ImageLists onClick={() => imageView(1)}>
                                        <img src={images[1]?.url} alt="" />
                                    </ImageLists>
                                    <ImageLists onClick={() => imageView(2)}>
                                        <img src={images[2]?.url} alt="" />
                                    </ImageLists>
                                    <ImageLists onClick={() => imageView(3)}>
                                        <img src={images[3]?.url} alt="" />
                                    </ImageLists>
                                    <ImageLists onClick={() => imageView(4)}>
                                        <img src={images[4]?.url} alt="" />
                                    </ImageLists>
                                </SubImages>
                            </ImageContainer>
                        </GridItems>
                        <GridItems item xs={12} sm={5}>
                            <DetailsContainer>
                                <Typography variant="h3">{data[0]?.title}</Typography>
                                <Lists>
                                    <ListItems>
                                        <ListItemIcon sx={{ color: "white" }}>
                                            <LocationOnIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={data[0]?.place}></ListItemText>
                                    </ListItems>
                                    <ListItems>
                                        <ListItemIcon sx={{ color: "white" }}>
                                            <EventSeatIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={data[0]?.maximumSeats}></ListItemText>
                                    </ListItems>
                                    <ListItems>
                                        <ListItemIcon sx={{ color: "white" }}>
                                            <DownloadDoneIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={facilities}></ListItemText>
                                    </ListItems>
                                    <ListItems>
                                        <ListItemIcon sx={{ color: "white" }}>
                                            <CurrencyRupeeIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={data[0]?.price}></ListItemText>
                                        <button onClick={handleOpen}>Book Venue</button>
                                    </ListItems>
                                </Lists>
                                <MapContainer>
                                    <iframe
                                        src={
                                            data[0]?.mapUrl ??
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

            <Modal open={open} onClose={handleClose}>
                <Box sx={sx.modalContainer}>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <Box sx={sx.form}>
                            <h2 style={{ color: "#0c1022" }}>Create New Event</h2>
                            <TextField
                                label="Title"
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
                                label="Ticket Price"
                                name="Ticketprice"
                                value={formData.Ticketprice}
                                onChange={handleChange}
                                type="number"
                                required
                                sx={sx.inputBox}
                            />
                            <TextField
                                label="Maximum Seats"
                                name="maximumSeats"
                                value={formData.maximumSeats}
                                onChange={handleChange}
                                type="number"
                                sx={sx.inputBox}
                            />
                            <TextField
                                required={true}
                                sx={sx.inputBox}
                                type="file"
                                name="image"
                                accept=".png, .jpg, .jpeg"
                                onChange={handleImageUpload}
                                showFileNamesInPreview={true}
                                maxFileSize={10000000}
                                onDrop={console.log}
                                dropzoneText="Add an image here"
                            />

                            {isLoading ? (
                                <CircularProgress />
                            ) : (
                                <Button sx={sx.submitButton} type="submit" variant="contained">
                                    Submit
                                </Button>
                            )}

                        </Box>
                    </form>
                </Box>
            </Modal>
            <Toaster />
        </>
    );
};

export default VenueDetails;

const sx = {
    modalContainer: {
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        position: "absolute",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
        maxHeight: "80vh",
        overflowY: "auto",
    },
    inputBox: {
        backgroundColor: "white",
        marginTop: "5%",
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