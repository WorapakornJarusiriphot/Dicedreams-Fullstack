import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
    Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, Button, Typography
} from '@mui/material';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function EventCard(props) {
    const {
        userId,
        postTime,
        image,
        nameGames,
        dateMeet,
        timeMeet,
        detailPost,
        numPeople,
        maxParticipants,
        eventId,
        username: passedUsername, // Rename prop to avoid conflict
        profilePic: passedProfilePic, // Rename prop to avoid conflict
    } = props;

    const [username, setUsername] = useState(passedUsername || '');
    const [profilePic, setProfilePic] = useState(passedProfilePic || '');

    const navigate = useNavigate();

    useEffect(() => {
        console.log("EventCard userId:", userId); // Log userId when component renders
        if (!passedUsername && !passedProfilePic) {
            const fetchUserDetails = async (id) => {
                try {
                    const response = await axios.get(`http://localhost:8080/api/users/${id}`);
                    const { username, user_image } = response.data;
                    console.log("Fetched EventCard User Details:", { username, user_image }); // Log fetched details
                    setUsername(username);
                    setProfilePic(user_image);
                } catch (error) {
                    console.error('Failed to fetch user details', error);
                }
            };

            if (userId) {
                fetchUserDetails(userId);
            }
        }
    }, [userId, passedUsername, passedProfilePic]);

    const formattedDateMeet = dateMeet ? dayjs(dateMeet).format('DD MMM YYYY') : 'Unknown Date';
    const formattedTimeMeet = timeMeet ? dayjs(timeMeet, 'HH:mm:ss').format('h:mm A') : 'Unknown Time';

    const handleJoinClick = () => {
        navigate(`/events/${eventId}?action=join`);
    };

    const handleChatClick = () => {
        navigate(`/events/${eventId}?action=chat`);
    };

    return (
        <Card sx={{ maxWidth: '100%', margin: '16px 0', backgroundColor: '#424242', boxShadow: '0px 6px 4px rgba(0, 0, 0, 0.5)' }}>
            <CardHeader
                avatar={
                    <Avatar
                        sx={{ bgcolor: 'red' }}
                        aria-label="profile-picture"
                        src={profilePic || ''}
                        alt={`${username ? username[0] : 'U'}'s profile picture`}
                    >
                        {username ? username[0] : 'U'}
                    </Avatar>
                }
                title={username || 'Unknown User'}
                subheader={postTime ? dayjs(postTime).format('DD MMM YYYY h:mm A') : 'Unknown Time'}
                sx={{ color: 'white' }}
            />
            <CardMedia
                component="img"
                sx={{ width: '100%', height: 'auto' }}
                image={image || ''}
                alt="Event image"
            />
            <CardContent sx={{ color: 'white' }}>
                <Typography variant="h6" component="div">
                    {nameGames || 'Untitled Event'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {formattedDateMeet} at {formattedTimeMeet}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {detailPost || 'No content available'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Participants: {numPeople || 0}/{maxParticipants || '1'}
                </Typography>
            </CardContent>
            <CardActions disableSpacing sx={{ justifyContent: 'space-between', padding: '16px' }}>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{
                        backgroundColor: 'crimson',
                        color: 'white',
                        padding: '12px 24px',
                        fontSize: '1rem',
                        width: '120px'
                    }}
                    onClick={handleJoinClick}
                >
                    Join
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    sx={{
                        borderColor: 'white',
                        color: 'white',
                        padding: '12px 24px',
                        fontSize: '1rem',
                        width: '120px'
                    }}
                    onClick={handleChatClick}
                >
                    Chat
                </Button>
            </CardActions>
        </Card>
    );
}

EventCard.propTypes = {
    userId: PropTypes.string.isRequired,
    postTime: PropTypes.string,
    image: PropTypes.string,
    nameGames: PropTypes.string,
    dateMeet: PropTypes.string,
    timeMeet: PropTypes.string,
    detailPost: PropTypes.string,
    numPeople: PropTypes.number,
    maxParticipants: PropTypes.number,
    eventId: PropTypes.string.isRequired,
    username: PropTypes.string, // Optional
    profilePic: PropTypes.string, // Optional
};

export default EventCard;
