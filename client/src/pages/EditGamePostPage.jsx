import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Box,
    Grid,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const EditGamePostPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [gameData, setGameData] = useState({
        name: '',
        details: '',
        date: null,
        time: null,
        numPlayers: '',
        location: '',
        image: null,
    });

    useEffect(() => {
        // Load the game data from the API using the id
        const fetchGameData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/postGame/${id}`);
                setGameData({
                    name: response.data.name_games,
                    details: response.data.detail_post,
                    date: response.data.date_meet,
                    time: response.data.time_meet,
                    numPlayers: response.data.num_people,
                    location: response.data.location, // Assuming the API provides a location field
                    image: null, // Image handling can be complex; this is a placeholder
                });
            } catch (error) {
                console.error('Failed to load game data', error);
            }
        };

        fetchGameData();
    }, [id]);

    const handleInputChange = (e) => {
        setGameData({ ...gameData, [e.target.name]: e.target.value });
    };

    const handleDateChange = (date) => {
        setGameData({ ...gameData, date });
    };

    const handleTimeChange = (time) => {
        setGameData({ ...gameData, time });
    };

    const handleImageUpload = (e) => {
        setGameData({ ...gameData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add your update logic here
        try {
            const formData = new FormData();
            formData.append('name_games', gameData.name);
            formData.append('detail_post', gameData.details);
            formData.append('date_meet', gameData.date);
            formData.append('time_meet', gameData.time);
            formData.append('num_people', gameData.numPlayers);
            formData.append('location', gameData.location);
            if (gameData.image) {
                formData.append('image', gameData.image);
            }

            await axios.put(`http://localhost:8080/api/postGame/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            alert('Game post updated successfully!');
            navigate('/');
        } catch (error) {
            console.error('Failed to update game post', error);
            alert('Failed to update game post. Please try again.');
        }
    };

    return (
        <Container maxWidth="md" sx={{ padding: '2rem 0', marginTop: '2rem' }}>
            <Paper elevation={3} sx={{ padding: 4, backgroundColor: '#2c2c2c', color: 'white' }}>
                <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', marginBottom: 4 }}>
                    Edit Board Game Post
                </Typography>
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
                    sx={{ '& .MuiTextField-root': { mb: 3 }, '& .MuiButton-root': { mb: 3 } }}
                >
                    <TextField
                        fullWidth
                        label="Board game name"
                        variant="outlined"
                        name="name"
                        value={gameData.name}
                        onChange={handleInputChange}
                        InputLabelProps={{ shrink: true }}
                        sx={{ input: { color: 'white' }, backgroundColor: '#1c1c1c', borderRadius: '4px' }}
                    />
                    <TextField
                        fullWidth
                        label="Post details"
                        variant="outlined"
                        name="details"
                        multiline
                        rows={4}
                        value={gameData.details}
                        onChange={handleInputChange}
                        InputLabelProps={{ shrink: true }}
                        sx={{ input: { color: 'white' }, backgroundColor: '#1c1c1c', borderRadius: '4px' }}
                    />
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Select an appointment date"
                                    value={gameData.date}
                                    onChange={handleDateChange}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            fullWidth
                                            variant="outlined"
                                            InputLabelProps={{ shrink: true }}
                                            sx={{
                                                input: { color: 'white' },
                                                backgroundColor: '#1c1c1c',
                                                borderRadius: '4px',
                                            }}
                                        />
                                    )}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimePicker
                                    label="Select an appointment time"
                                    value={gameData.time}
                                    onChange={handleTimeChange}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            fullWidth
                                            variant="outlined"
                                            InputLabelProps={{ shrink: true }}
                                            sx={{
                                                input: { color: 'white' },
                                                backgroundColor: '#1c1c1c',
                                                borderRadius: '4px',
                                            }}
                                        />
                                    )}
                                />
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                    <TextField
                        fullWidth
                        label="Select Number of Player"
                        variant="outlined"
                        name="numPlayers"
                        value={gameData.numPlayers}
                        onChange={handleInputChange}
                        InputLabelProps={{ shrink: true }}
                        sx={{ input: { color: 'white' }, backgroundColor: '#1c1c1c', borderRadius: '4px' }}
                    />
                    <TextField
                        fullWidth
                        label="Appointment location"
                        variant="outlined"
                        name="location"
                        value={gameData.location}
                        onChange={handleInputChange}
                        InputLabelProps={{ shrink: true }}
                        sx={{ input: { color: 'white' }, backgroundColor: '#1c1c1c', borderRadius: '4px' }}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3 }}>
                        <Button
                            variant="outlined"
                            component="label"
                            startIcon={<UploadFileIcon />}
                            sx={{ color: 'white', borderColor: 'white', mb: 2 }}
                        >
                            Upload Image
                            <input
                                type="file"
                                hidden
                                onChange={handleImageUpload}
                            />
                        </Button>
                        <Typography variant="body2" sx={{ color: 'gray' }}>
                            PNG, JPG (max. 3MB)
                        </Typography>
                    </Box>
                    <Button
                        type="submit"
                        variant="contained"
                        color="error"
                        fullWidth
                        sx={{
                            marginTop: 3,
                            backgroundColor: '#ffcc00',
                            '&:hover': { backgroundColor: '#e6b800' },
                            fontWeight: 'bold',
                        }}
                    >
                        Update Post
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default EditGamePostPage;
