// import React, { useEffect, useState } from "react";
// import io from "socket.io-client";
// import axios from "../../utils/AxiosInstance";
// import { Container, IconButton, TextField, Typography } from "@mui/material";
// import SendIcon from "@mui/icons-material/Send";
// import { Box, Slide, Paper, Button } from "@mui/material";
// import ChatIcon from "@mui/icons-material/Chat";
// import CloseIcon from "@mui/icons-material/Close";

// const socket = io.connect("http://localhost:3000");

// const ChatBox = ({OrganizerId}) => {
//     const [currentMessage, setCurrentMessage] = useState("");
//     const [messageList, setMessageList] = useState([]);

//     // // console.log("messages",messageList)
//     // console.log("OrganizerId",OrganizerId)

//     const userId = localStorage.getItem("userId");

//     const room = "12345";

//     const joinRoom = () => {
//         socket.emit("join_room", room);
//     };

//     const sendMessage = () => {
//         if (currentMessage !== "") {
//             const messageData = {
//                 userId: userId,
//                 reciever: OrganizerId,
//                 message: currentMessage,
//             };
//             console.log("messageData", messageData);
//             socket.emit("send_message", messageData);
//             setCurrentMessage("");
//             fetchMessages();
//         }
//     };

//     const fetchMessages = async () => {
//         try {
//             const response = await axios.get(`/api/messages`);
//             const allMessages = response.data.messages;

//             console.log("allMessages",allMessages)

         
//             const filteredMessages = allMessages.filter(message => 
//                 message?.sender?._id.toString() === userId && message?.reciever?.toString() === OrganizerId
//               );
          
        
//             setMessageList(filteredMessages);
//         } catch (error) {
//             console.error("Error fetching messages:", error);
//         }
//     };

   
//     useEffect(() => {
//         joinRoom();
//         fetchMessages();
    
//         socket.on("receive_message", (data) => {
//           if (data.userId === userId && data.receiver === OrganizerId || data.userId === OrganizerId && data.receiver === userId) {
//             setMessageList((prevList) => [...prevList, data]);
//           }
//         });
    
     
//         return () => {
//           socket.off("receive_message");
//         };
//       }, [userId,currentMessage]);
    



//     // -----------------chatBOx-------------

//     const [open, setOpen] = useState(false);
//     const [message, setMessage] = useState("");

//     const handleOpen = () => {
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//     };

//     // -----------------chatBOx-------------

//     return (
//         <div className="App">
//             <Container>
//                 <IconButton size="medium" onClick={handleOpen}>
//                     <ChatIcon sx={{ color: "white", fontSize: "30px", width: "fit-content" }} />
//                 </IconButton>
//                 <Slide direction="left" in={open} mountOnEnter unmountOnExit>
//                     <Paper
//                         elevation={3}
//                         sx={{
//                             position: "fixed",
//                             bottom: 5,
//                             right: 0,
//                             width: "300px",
//                             height: "100%",
//                             p: 2,
//                             zIndex: "9999",
//                         }}
//                     >
//                         <CloseIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
//                         <Box display="flex" flexDirection="column" height="100%">
//                             <Box flexGrow={1} mb={2} sx={{ overflow: "auto" }}>
                             
//                                 {messageList.map((message, index) => (
                                 
//                                     <Typography
//                                         sx={{
//                                             background: "#eddbdb",
//                                             display: "flex",
//                                             width: "fit-content",
//                                             alignItems: "flex-end",
//                                             padding: "7px",
//                                             gap: ".5rem",
//                                             margin: "5px 0",
//                                             borderRadius: "0 10px 10px 20px",
//                                         }}
//                                     >
//                                         {message.message}
//                                         <span style={{ fontSize: "10px" }}>{message.time}</span>
//                                     </Typography>

                                  
//                                 ))}
//                             </Box>
//                             <Box display="flex" padding={2}>
//                                 <TextField
//                                     variant="standard"
//                                     placeholder="Type a message..."
//                                     value={currentMessage}
//                                     onChange={(e) => setCurrentMessage(e.target.value)}
//                                     fullWidth
//                                 />
//                                 <IconButton
//                                     size="medium"
//                                     disableRipple
//                                     color="primary"
//                                     onClick={sendMessage}
//                                     sx={{ width: "fit-content" }}
//                                 >
//                                     <SendIcon />
//                                 </IconButton>
//                             </Box>
//                         </Box>
//                     </Paper>
//                 </Slide>
//             </Container>
//         </div>
//     );
// };

// export default ChatBox;

