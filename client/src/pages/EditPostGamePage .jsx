import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Container, Paper, Typography, Button, TextField, Box } from '@mui/material';

const EditPostGamePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const { userId, accessToken, role } = location.state || {
        userId: sessionStorage.getItem('users_id'),
        accessToken: sessionStorage.getItem('access_token'),
        role: sessionStorage.getItem('role')
    };

    const [event, setEvent] = useState({
        name_games: '',
        detail_post: '',
        num_people: '',
        date_meet: '',
        time_meet: '',
    });

    const [loading, setLoading] = useState(true);

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

                setEvent(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch event details', error);
                alert('Failed to fetch event details. Please try again later.');
                navigate('/');
            }
        };

        loadEventDetails();
    }, [id, userId, accessToken, role, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEvent((prevEvent) => ({
            ...prevEvent,
            [name]: value,
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:8080/api/postGame/${id}`, event, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'users_id': userId,
                },
            });

            alert('Event updated successfully!');
            navigate(`/event-details/${id}`);
        } catch (error) {
            console.error('Failed to update event', error);
            alert('Failed to update event. Please try again later.');
        }
    };

    if (loading) {
        return <Typography variant="h6">Loading...</Typography>;
    }

    return (
        <Container maxWidth="md" sx={{ padding: '2rem 0', marginTop: '2rem' }}>
            <Paper elevation={3} sx={{ padding: 5, marginTop: 4, backgroundColor: '#2c2c2c', color: 'white' }}>
                <Typography variant="h4" gutterBottom>
                    Edit Event
                </Typography>
                <form onSubmit={handleFormSubmit}>
                    <TextField
                        label="Game Name"
                        name="name_games"
                        value={event.name_games}
                        onChange={handleInputChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        sx={{ backgroundColor: '#1c1c1c', input: { color: 'white' } }}
                    />
                    <TextField
                        label="Details"
                        name="detail_post"
                        value={event.detail_post}
                        onChange={handleInputChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        multiline
                        rows={4}
                        sx={{ backgroundColor: '#1c1c1c', input: { color: 'white' } }}
                    />
                    <TextField
                        label="Number of Participants"
                        name="num_people"
                        value={event.num_people}
                        onChange={handleInputChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        sx={{ backgroundColor: '#1c1c1c', input: { color: 'white' } }}
                    />
                    <TextField
                        label="Date"
                        name="date_meet"
                        type="date"
                        value={event.date_meet}
                        onChange={handleInputChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        sx={{ backgroundColor: '#1c1c1c', input: { color: 'white' } }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        label="Time"
                        name="time_meet"
                        type="time"
                        value={event.time_meet}
                        onChange={handleInputChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        sx={{ backgroundColor: '#1c1c1c', input: { color: 'white' } }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Save Changes
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => navigate(`/event-details/${id}`)}
                        >
                            Cancel
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
};

export default EditPostGamePage;
