import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Card, CardContent, Typography, Button, Avatar, Box, TextField, IconButton, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../Auth/AuthContext'; // Ensure this context provides the token and userId

const DetailsPage = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const [chatMessage, setChatMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const { userId, accessToken } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const loadEventDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/postGame/${eventId}`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                setEvent(response.data);
            } catch (error) {
                console.error('Failed to fetch event details', error);
            }
        };

        loadEventDetails();
    }, [eventId, accessToken]);

    // Check if the user is authorized to view/edit this post
    useEffect(() => {
        if (event && userId) {
            if (event.users_id !== userId) {
                alert('Unauthorized. Please log in.');
                navigate('/login'); // Redirect to login if unauthorized
            }
        }
    }, [event, userId, navigate]);

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
        navigate('/home'); // Navigate to the homepage
    };

    const handleEditPost = () => {
        // Navigate to the edit post page
        navigate(`/edit/${eventId}`);
    };

    if (!event) {
        return <Typography>Loading...</Typography>; // Placeholder while loading event data
    }

    const {
        profilePic,
        username,
        postTime,
        image,
        nameGames,
        dateMeet,
        timeMeet,
        detailPost,
        numPeople,
        maxParticipants,
        participants
    } = event;

    // Format the meeting date and time
    const formattedDateMeet = dateMeet ? new Date(dateMeet).toLocaleDateString() : 'Unknown Date';
    const formattedTimeMeet = timeMeet ? new Date(`1970-01-01T${timeMeet}Z`).toLocaleTimeString() : 'Unknown Time';

    return (
        <Box sx={{ p: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white' }}>
            {/* Event Summary */}
            <Card sx={{ width: '100%', maxWidth: 800, mb: 2, backgroundColor: 'black', color: 'white' }}>
                <CardContent>
                    <Typography variant="h4" gutterBottom>{nameGames || 'Untitled Event'}</Typography>
                    <Typography variant="subtitle1">{`${formattedDateMeet} at ${formattedTimeMeet}`}</Typography>
                    <Typography variant="subtitle1">{detailPost || 'No content available'}</Typography>
                    <Typography variant="subtitle1">{`Location: ${event.location || 'Unknown Location'}`}</Typography>
                    <Typography variant="subtitle1">{`Number of Players: ${numPeople || 0}/${maxParticipants || 'N/A'}`}</Typography>
                    <Button variant="contained" color="secondary" onClick={handleJoinEvent} sx={{ mt: 2, mr: 2 }}>Join</Button>
                    <Button variant="contained" color="secondary" onClick={handleReturnHome} sx={{ mt: 2 }}>Return to Home</Button>
                    {event.users_id === userId && (
                        <Button variant="contained" color="primary" onClick={handleEditPost} sx={{ mt: 2 }}>Edit Post</Button>
                    )}
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
