import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from '../../utils/AxiosInstance';
import {
  Container,
  IconButton,
  TextField,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';


const socket = io.connect('http://localhost:3000');

const ChatBox = () => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  const room = '12345';

  const joinRoom = () => {
    socket.emit('join_room', room);
  };

  const sendMessage = () => {
    if (currentMessage !== '') {
      const messageData = {
        room: room,
        userId: '660c10b053cf37f9d4d21ddb',
        reciever:'66056e67b1170229125860a6',
        message: currentMessage,
      };
      console.log("messageData",messageData)
      socket.emit('send_message', messageData);
      setCurrentMessage('');
    }
  };

  const fetchMessages = async () => {
    try {

      const userId = localStorage.getItem("userId")

      const response = await axios.get(`/api/messages/${userId}`);
      setMessageList(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    joinRoom();
    socket.on('receive_message', (data) => {
      setMessageList((list) => [...list, data]);
    });

    fetchMessages();

    return () => {
      socket.off('receive_message');
    };
  }, [currentMessage]);

  return (
    <div className="App">
    <Container>
 <div className="message_body">
  {messageList.map((message, index) => (
   <p>{message.message}</p>
  
  ))}
</div>
<div style={{ backgroundColor: '#444254', bottom: '0px', width: '50%',height:'50%', paddingBottom: '10px' }}>
  <div style={{ display: 'flex', alignItems: 'center', background: '#0a0408', borderRadius: '50px', padding: '10px' }}>
    <TextField
      variant="standard"
      placeholder="Type a message..."
      value={currentMessage}
      onChange={(e) => setCurrentMessage(e.target.value)}
      fullWidth
    />
    <IconButton color="primary" onClick={sendMessage}>
      <SendIcon />
    </IconButton>
  </div>
</div>
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
