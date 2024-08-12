import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
    Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, Button, Typography
} from '@mui/material';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthContext';

function EventCard(props) {
    const { username: authUsername, profilePic: authProfilePic } = useContext(AuthContext);
    const {
        profilePic = authProfilePic,
        username = authUsername,
        postTime,
        image,
        nameGames,
        dateMeet,
        timeMeet,
        detailPost,
        numPeople,
        maxParticipants,
        eventId
    } = props;

    const navigate = useNavigate();

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
                subheader={postTime || 'Unknown Time'}
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
    profilePic: PropTypes.string,
    username: PropTypes.string,
    postTime: PropTypes.string,
    image: PropTypes.string,
    nameGames: PropTypes.string,
    dateMeet: PropTypes.string,
    timeMeet: PropTypes.string,
    detailPost: PropTypes.string,
    numPeople: PropTypes.number,
    maxParticipants: PropTypes.number,
    eventId: PropTypes.string.isRequired,
};

export default EventCard;
