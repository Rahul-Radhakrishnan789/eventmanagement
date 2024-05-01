import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Grid,
  Typography,
  List,
  ListItem,
  Button,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from "../../utils/AxiosInstance";

const ChatPage = () => {
  const [messageList, setMessageList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserEmail, setSelectedUserEmail] = useState("");

  const organizerId = localStorage.getItem("organizerId");

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`/api/messages`);
      const allMessages = response.data;

      const filteredMessages = allMessages.filter(
        (message) => message.reciever === organizerId
      );

      setMessageList(filteredMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const groupMessagesBySender = (messages) => {
    const groupedMessages = [];
    messages.forEach((message) => {
      const senderId = message.sender._id;
      if (!groupedMessages[senderId]) {
        groupedMessages[senderId] = [message];
      } else {
        groupedMessages[senderId].push(message);
      }
    });
    return groupedMessages;
  };

  const combinedMessages = groupMessagesBySender(messageList);

  const handleUserClick = (senderId) => {
    setSelectedUser(senderId);
    const userEmail = getEmailById(senderId);
    setSelectedUserEmail(userEmail);
  };

  const getEmailById = (senderId) => {
    const userMessage = messageList.find(
      (message) => message.sender._id === senderId
    );
    return userMessage?.sender.email || "";
  };

  const handleSendEmail = () => {
    const subject = "Reply regarding Queries from EVENTGO";
    const mailtoLink = `mailto:${selectedUserEmail}?subject=${encodeURIComponent(
      subject
    )}`;
    window.location.href = mailtoLink;
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Box
            sx={{
              height: "80vh",
              overflow: "auto",
              borderRight: "1px solid #ccc",
              cursor: "pointer",
            }}
          >
            <List>
              {Object.keys(combinedMessages).map((senderId) => (
                <ListItem
                  key={senderId}
                  onClick={() => handleUserClick(senderId)}
                >
                  <Typography variant="h6">
                    {combinedMessages[senderId][0].sender.username}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>
        <Grid item xs={9}>
          <Box flexGrow={1} mb={2} sx={{ overflow: "auto" }}>
            {messageList
              .filter((message) => message.sender._id === selectedUser)
              .map((message, index) => (
                <Typography
                  key={index}
                  sx={{
                    background: "black",
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
              ))}
          </Box>
          {selectedUser ? (
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                position: "absolute",
                bottom: "10%",
                right:"20%"
              }}
              onClick={handleSendEmail}
            >
              <a style={{ marginRight: "8px", color: "#fff", }}>
                Send Reply mail
              </a>
              <SendIcon style={{ cursor: "pointer" }} />
            </Box>
          ) : null}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ChatPage;
