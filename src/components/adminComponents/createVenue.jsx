import React from "react";
import { useState } from "react";
import { Box, TextField, Button, FormControl, FormHelperText, Snackbar, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import axios from "../../utils/AxiosInstance";

const CreateVenue = () => {
    const [formData, setFormData] = useState({
        title: "",
        place: "",
        facilities: [],
        price: 0,
        maximumSeats: 0,
        mapUrl: "",
        images: [],
    });

    // --taost--------------------
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
                UNDO
            </Button>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <CloseIcon sx={{ border: "none" }} fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    // ---------toast-----------

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === "facilities") {
            setFormData({
                ...formData,
                facilities: value.split(","),
            });
        } else {
            setFormData({ ...formData, [name]: value });
            console.log("main form data", formData);
        }
    };

    const handleImageUpload = (event) => {
        const files = event.target.files;
        setFormData({
            ...formData,
            images: files,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formData);
        try {
            const formDataToSend = new FormData();

            for (const key in formData) {
                if (key === "images") {
                    for (let i = 0; i < formData.images.length; i++) {
                        formDataToSend.append("images", formData.images[i]);
                    }
                } else {
                    formDataToSend.append(key, formData[key]);
                }
            }

            if (!formData.title || !formData.place) {
                alert("Please fill in all required fields!");
                return;
            }
            const response = await axios.post("/api/createvenue", formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("Registration successful:", response.data);

            console.log("Submitting form:", formData);
        } catch (error) {
            console.error("venue Registration error:", error);
            console.log("Response:", error.response);
        }

        await setFormData({
            title: "",
            place: "",
            facilities: [],
            price: 0,
            maximumSeats: 0,
            mapUrl: "",
            images: [],
        });

        await handleClick();
    };

    return (
        <Box sx={sx.mainContainer}>
            <form style={{ width: "100%" }} onSubmit={handleSubmit}>
                <Box sx={sx.form}>
                    <h2 style={{ color: "#0c1022" }}>Create New Venue</h2>
                    <TextField
                        label="Name"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        sx={sx.inputBox}
                    />
                    <FormControl fullWidth>
                        <TextField
                            label="Place"
                            name="place"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            sx={sx.inputBox}
                        />
                    </FormControl>
                    <TextField
                        label="Facilities"
                        name="facilities"
                        value={formData.facilities}
                        onChange={handleChange}
                        sx={sx.inputBox}
                    />
                    <TextField
                        label="Map url"
                        name="mapUrl"
                        value={formData.mapUrl}
                        onChange={handleChange}
                        sx={sx.inputBox}
                    />
                    <TextField
                        label="Amount to be paid"
                        name="price"
                        value={formData.price}
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
                        required
                        sx={sx.inputBox}
                    />
                    <input
                        required={true}
                        type="file"
                        name="images"
                        accept=".png, .jpg, .jpeg"
                        maxfilesize={10000000}
                        multiple
                        onChange={handleImageUpload}
                    />
                    <Button sx={sx.submitButton} type="submit" variant="contained">
                        Submit
                    </Button>
                </Box>
            </form>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Venue Created"
                action={action}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            />
        </Box>
    );
};

const sx = {
    mainContainer: {
        maxWidth: { xs: "100%", sm: "70%", md: "50%" },
        display: "flex",
        justifyContent: "space-between",
        overflow: "hidden",
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
        width: "100% !important",
    },
};

export default CreateVenue;
