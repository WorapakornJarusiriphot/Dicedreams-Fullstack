import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Container, Paper, Typography, Button, Box, Avatar, TextField } from '@mui/material';

const DetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const { userId, accessToken, role } = location.state || {};

    const [event, setEvent] = useState(null);

    useEffect(() => {
        if (!userId || !accessToken || !role) {
            alert('Please log in to access this page.');
            navigate('/login');
            return;
        }

        if (role !== 'user') {
            alert('You do not have permission to access this page.');
            navigate('/');
            return;
        }

        const loadEventDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/postGame/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'users_id': userId,
                    },
                });

                console.log('Event details:', response.data);
                setEvent(response.data);
            } catch (error) {
                console.error('Failed to fetch event details', error);
                alert('Failed to fetch event details. Please try again later.');
                navigate('/');
            }
        };

        loadEventDetails();
    }, [id, userId, accessToken, role, navigate]);

    if (!event) {
        return <Typography variant="h6">Loading...</Typography>;
    }

    const {
        name_games,
        detail_post,
        num_people,
        date_meet,
        time_meet,
        users_id: eventOwnerId,
    } = event;

    const isOwner = userId === eventOwnerId;

    return (
        <Container maxWidth="md" sx={{ padding: '2rem 0', marginTop: '2rem' }}>
            <Paper elevation={3} sx={{ padding: 5, marginTop: 4, backgroundColor: '#2c2c2c', color: 'white' }}>
                <Typography variant="h4" gutterBottom>
                    {name_games || 'Untitled Event'}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {`${new Date(date_meet).toLocaleDateString()} at ${new Date(`1970-01-01T${time_meet}Z`).toLocaleTimeString()}`}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {detail_post || 'No content available'}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Location: ร้าน outcast gaming
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Participants: {num_people || 1}
                </Typography>

                {/* Buttons for Event Owner */}
                {isOwner ? (
                    <>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate('/')}
                            sx={{ marginTop: 3 }}
                        >
                            Return to Home
                        </Button>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => navigate(`/edit-participants/${id}`)}
                            sx={{ marginTop: 3, marginLeft: 2 }}
                        >
                            Edit Participants
                        </Button>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => navigate(`/edit-event/${id}`)}
                            sx={{ marginTop: 3, marginLeft: 2 }}
                        >
                            Edit Post
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => {/* Add logic to end the post */ }}
                            sx={{ marginTop: 3, marginLeft: 2 }}
                        >
                            End Post
                        </Button>
                    </>
                ) : (
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => navigate('/')}
                        sx={{ marginTop: 3 }}
                    >
                        Join
                    </Button>
                )}
            </Paper>

            <Paper elevation={3} sx={{ padding: 5, marginTop: 4, backgroundColor: '#2c2c2c', color: 'white' }}>
                <Typography variant="h5" gutterBottom>
                    Participants
                </Typography>
                <Box sx={{ display: 'flex', gap: 3 }}>
                    <Avatar alt="Participant 1" src="https://via.placeholder.com/40" />
                    <Avatar alt="Participant 2" src="https://via.placeholder.com/40" />
                    {/* Add more participants as needed */}
                </Box>
            </Paper>

            <Paper elevation={3} sx={{ padding: 5, marginTop: 4, backgroundColor: '#2c2c2c', color: 'white' }}>
                <Typography variant="h5" gutterBottom>
                    Chat
                </Typography>
                {/* Chat component or functionality will go here */}
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', marginTop: 2 }}>
                    <TextField
                        variant="outlined"
                        placeholder="Add a chat..."
                        fullWidth
                        sx={{ input: { color: 'white' }, backgroundColor: '#1c1c1c', borderRadius: '4px' }}
                    />
                    <Button variant="contained" color="error">
                        Send
                    </Button>
                </Box>
            </Paper>

            {/* Return to Home Button */}
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>

            </Box>
        </Container>
    );
};

export default DetailsPage;
