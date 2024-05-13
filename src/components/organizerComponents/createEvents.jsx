import React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  FormControl,
  FormHelperText,
  CircularProgress
} from "@mui/material";
import axios from "../../utils/AxiosInstance";


function CreateEvents() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    venue: "",
    date: "",
    Ticketprice: 0,
    maximumSeats: 0,
  });

  const [venueData, setVenueData] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  console.log(venueData);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/getallvenues");

      setVenueData(response.data.data);
    } catch (err) {
      console.error("venue fetching error:", err);
      console.log("Response:", err.response);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    console.log("main form data", formData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("first");
    
    try {
      setIsLoading(true)
      if (!formData.title || !formData.category || !formData.Ticketprice) {
        alert("Please fill in all required fields!");
        return;
      }
      const response = await axios.post("/api/postevent", {
        title: formData.title,
        category: formData.category,
        description: formData.description,
        venue: formData.venue,
        date: formData.date,
        Ticketprice: formData.Ticketprice,
        maximumSeats: formData.maximumSeats,
      });
      console.log("Registration successful:", response.data);

      console.log("Submitting form:", formData);

    
    } catch (error) {
      setIsLoading(false)
      console.error("Event Registration error:", error);
      console.log("Response:", error.response);
    }
  };

  return (
    <Box sx={sx.mainContainer}>
      <form onSubmit={handleSubmit}>
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
            <FormHelperText>Required</FormHelperText>
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
            label="Venue"
            name="venue"
            value={formData.venue}
            onChange={handleChange}
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
            accept="image/jpeg, image/webp"
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
  );
}

const sx = {
  mainContainer: {
    minWidth: "80%",
    display: "flex",
    justifyContent: "space-between",
    overflow: "hidden",
    background: "#0c1022",
    padding: "10px",
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
    minWidth: "150%",
    background: "#BFBFBF",
    borderRadius: "10px",
    marginLeft: "70%",
  },
};

export default CreateEvents;
