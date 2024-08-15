import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../Auth/AuthContext';
import { Button, TextField, Typography, Box, Container } from '@mui/material';

const EditGamePostPage = () => {
    const { id } = useParams();
    const { accessToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const [postDetails, setPostDetails] = useState({
        boardGameName: '',
        postDetails: '',
        appointmentDateTime: '',
        playersCount: '',
        location: '',
        image: null,
    });

    useEffect(() => {
        // Fetch the existing post data to populate the form
        const fetchPostData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/postGame/${id}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setPostDetails({
                    boardGameName: response.data.boardGameName,
                    postDetails: response.data.postDetails,
                    appointmentDateTime: response.data.appointmentDateTime,
                    playersCount: response.data.playersCount,
                    location: response.data.location,
                    image: null, // We'll handle image upload separately
                });
            } catch (error) {
                console.error("Error fetching post data", error);
            }
        };

        fetchPostData();
    }, [id, accessToken]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPostDetails({
            ...postDetails,
            [name]: value,
        });
    };

    const handleFileChange = (event) => {
        setPostDetails({
            ...postDetails,
            image: event.target.files[0],
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('boardGameName', postDetails.boardGameName);
        formData.append('postDetails', postDetails.postDetails);
        formData.append('appointmentDateTime', postDetails.appointmentDateTime);
        formData.append('playersCount', postDetails.playersCount);
        formData.append('location', postDetails.location);
        if (postDetails.image) {
            formData.append('image', postDetails.image);
        }

        try {
            await axios.put(`http://localhost:8080/api/postGame/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate(`/events/${id}`); // Redirect to the updated event's detail page
        } catch (error) {
            console.error("Error updating post", error);
        }
    };

    return (
        <Container component="main" maxWidth="md">
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
            >
                <Typography component="h1" variant="h5">
                    Edit Game Post
                </Typography>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="boardGameName"
                    label="Board Game Name"
                    name="boardGameName"
                    value={postDetails.boardGameName}
                    onChange={handleInputChange}
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="postDetails"
                    label="Post Details"
                    name="postDetails"
                    value={postDetails.postDetails}
                    onChange={handleInputChange}
                    multiline
                    rows={4}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="appointmentDateTime"
                    label="Appointment Date and Time"
                    name="appointmentDateTime"
                    type="datetime-local"
                    value={postDetails.appointmentDateTime}
                    onChange={handleInputChange}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="playersCount"
                    label="Number of Players"
                    name="playersCount"
                    value={postDetails.playersCount}
                    onChange={handleInputChange}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="location"
                    label="Location"
                    name="location"
                    value={postDetails.location}
                    onChange={handleInputChange}
                />
                <Button
                    variant="contained"
                    component="label"
                >
                    Upload Image
                    <input
                        type="file"
                        hidden
                        onChange={handleFileChange}
                    />
                </Button>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Save Changes
                </Button>
            </Box>
        </Container>
    );
};

export default EditGamePostPage;
