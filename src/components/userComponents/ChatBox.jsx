import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "../../utils/AxiosInstance";
import { Container, IconButton, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Box, Slide, Paper, Button } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";

const socket = io.connect("http://localhost:3000");

const ChatBox = () => {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const room = "12345";

    const joinRoom = () => {
        socket.emit("join_room", room);
    };

    const sendMessage = () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                userId: "660c10b053cf37f9d4d21ddb",
                reciever: "66056e67b1170229125860a6",
                message: currentMessage,
            };
            console.log("messageData", messageData);
            socket.emit("send_message", messageData);
            setCurrentMessage("");
        }
    };

    const fetchMessages = async () => {
        try {
            const userId = localStorage.getItem("userId");

            const response = await axios.get(`/api/messages/${userId}`);
            setMessageList(response.data);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    useEffect(() => {
        joinRoom();
        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data]);
        });

        fetchMessages();

        return () => {
            socket.off("receive_message");
        };
    }, [currentMessage]);

    // -----------------chatBOx-------------

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSend = () => {
        // Add your send message logic here
        console.log("Sending message:", message);
        // Clear the message input after sending
        setMessage("");
    };
    // -----------------chatBOx-------------

    return (
        <div className="App">
            <Container>
                <IconButton size="medium" onClick={handleOpen}>
                    <ChatIcon sx={{ color: "white", fontSize: "30px", width: "fit-content" }} />
                </IconButton>
                <Slide direction="left" in={open} mountOnEnter unmountOnExit>
                    <Paper
                        elevation={3}
                        sx={{
                            position: "fixed",
                            bottom: 0,
                            right: 0,
                            width: "300px",
                            height: "100%",
                            p: 2,
                            zIndex: "9999",
                        }}
                    >
                        <CloseIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
                        <Box display="flex" flexDirection="column" height="100%">
                            <Box flexGrow={1} mb={2} sx={{ overflow: "auto" }}>
                                {/* Chat messages can be displayed here */}
                                {messageList.map((message, index) => (
                                    // <div style={{flexDirection:'column'}}>
                                    <Typography
                                        sx={{
                                            background: "#eddbdb",
                                            display: "flex",
                                            width: "fit-content",
                                            alignItems: "flex-end",
                                            padding: "7px",
                                            gap: ".5rem",
                                            margin: "5px 0",
                                            borderRadius: "0 10px 10px 20px",
                                        }}
                                    >
                                        {message.message}
                                        <span style={{ fontSize: "10px" }}>{message.time}</span>
                                    </Typography>

                                    // </div>
                                ))}
                            </Box>
                            <Box display="flex">
                                <TextField
                                    variant="standard"
                                    placeholder="Type a message..."
                                    value={currentMessage}
                                    onChange={(e) => setCurrentMessage(e.target.value)}
                                    fullWidth
                                />
                                <IconButton
                                    size="medium"
                                    disableRipple
                                    color="primary"
                                    onClick={sendMessage}
                                    sx={{ width: "fit-content" }}
                                >
                                    <SendIcon />
                                </IconButton>
                            </Box>
                        </Box>
                    </Paper>
                </Slide>
            </Container>
        </div>
    );
};

export default ChatBox;

// <Container>
// <div className="message_body">
//   {messageList.map((message, index) => (
//    <p>{message.message}</p>

//   ))}
// </div>
// <div style={{ backgroundColor: '#444254', position: 'fixed', bottom: '0px', width: '100%', paddingBottom: '10px' }}>
//   <div style={{ display: 'flex', alignItems: 'center', background: '#0a0408', borderRadius: '50px', padding: '10px' }}>
//     <TextField
//       variant="standard"
//       placeholder="Type a message..."
//       value={currentMessage}
//       onChange={(e) => setCurrentMessage(e.target.value)}
//       fullWidth
//     />
//     <IconButton color="primary" onClick={sendMessage}>
//       <SendIcon />
//     </IconButton>
//   </div>
// </div>
// </Container>
