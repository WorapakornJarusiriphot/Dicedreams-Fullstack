import React, { useState, useCallback } from 'react';
import { Card, CardContent, Typography, Button, Avatar, Box, TextField, IconButton, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useParams } from 'react-router-dom'; // Import useHistory

const DetailsPage = () => {
    const { eventId } = useParams();
    const [chatMessage, setChatMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);


    const handleJoinEvent = useCallback(() => {
        // Implement join event logic here
    }, []);

    const handleChatChange = (event) => {
        setChatMessage(event.target.value);
    };

    const handleChatSubmit = () => {
        if (chatMessage.trim() !== '') {
            setChatHistory([...chatHistory, chatMessage]);
            setChatMessage('');
        }
    };

    const handleReturnHome = () => {
        history.push('/home'); // Navigate to the homepage
    };

    // Sample participants data
    const participants = [
        { id: 1, name: 'Alice', avatar: '/path/to/avatar1.jpg' },
        { id: 2, name: 'Bob', avatar: '/path/to/avatar2.jpg' },
        // Add more participants here
    ];

    return (
        <Box sx={{ p: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white' }}>
            {/* Event Summary */}
            <Card sx={{ width: '100%', maxWidth: 800, mb: 2, backgroundColor: 'black', color: 'white' }}>
                <CardContent>
                    <Typography variant="h4" gutterBottom>UNO</Typography>
                    <Typography variant="subtitle1">วันศุกร์ที่ 1 มีนาคม พ.ศ. 2567 เวลา 15.00 น.</Typography>
                    <Typography variant="subtitle1">หาผู้เล่นเพื่อร่วม UNO ชาวไร้เดียงสา สีลม 4-5 คน</Typography>
                    <Typography variant="subtitle1">สถานที่: ร้าน outcast gaming</Typography>
                    <Typography variant="subtitle1">จำนวนคนถึงไป: 3/5</Typography>
                    <Button variant="contained" color="secondary" onClick={handleJoinEvent} sx={{ mt: 2, mr: 2 }}>Join</Button>
                    <Button variant="contained" color="secondary" onClick={handleReturnHome} sx={{ mt: 2 }}>Return to Home</Button>
                </CardContent>
            </Card>

            {/* Participants Section */}
            <Card sx={{ width: '100%', maxWidth: 800, mb: 2, backgroundColor: 'black', color: 'white' }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>Participants</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {participants.map((participant) => (
                            <Avatar key={participant.id} alt={participant.name} src={participant.avatar || '/path/to/defaultAvatar.jpg'} sx={{ mr: 2 }} />
                        ))}
                    </Box>
                </CardContent>
            </Card>

            {/* Chat Section */}
            <Card sx={{ width: '100%', maxWidth: 800, backgroundColor: 'black', color: 'white' }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>Chat</Typography>
                    <List>
                        {chatHistory.map((message, index) => (
                            <ListItem key={index}>
                                <ListItemAvatar>
                                    <Avatar>{/* Insert Avatar Here */}</Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={message} />
                            </ListItem>
                        ))}
                    </List>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <TextField
                            fullWidth
                            placeholder="Add a chat..."
                            value={chatMessage}
                            onChange={handleChatChange}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    handleChatSubmit();
                                }
                            }}
                            sx={{ mr: 2, backgroundColor: 'white', borderRadius: 1 }}
                            aria-label="chat input"
                        />
                        <IconButton color="primary" onClick={handleChatSubmit} aria-label="send chat">
                            <SendIcon />
                        </IconButton>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default DetailsPage;
