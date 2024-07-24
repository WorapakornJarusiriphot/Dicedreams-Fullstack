import React from 'react';
import PropTypes from 'prop-types';
import {
    Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, Button, Typography
} from '@mui/material';

function EventCard(props) {
    const {
        profilePic,
        username,
        postTime,
        image,
        nameGames,
        dateMeet,
        detailPost,
        numPeople,
        maxParticipants
    } = props;

    return (
        <Card sx={{ maxWidth: '100%', margin: '16px 0', backgroundColor: 'white', boxShadow: '0px 6px 4px rgba(0, 0, 0, 0.5)' }}>
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
                sx={{ color: 'black' }}
            />
            <CardMedia
                component="img"
                sx={{ width: '100%', height: 'auto' }}
                image={image || ''}
                alt="Event image"
            />
            <CardContent sx={{ color: 'black' }}>
                <Typography variant="h6" component="div">
                    {nameGames || 'Untitled Event'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {dateMeet || 'Unknown Date'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {detailPost || 'No content available'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    จำนวนคนตอบไป: {numPeople || 0}/{maxParticipants || 'N/A'}
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
                >
                    Join
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    sx={{
                        borderColor: 'black',
                        color: 'black',
                        padding: '12px 24px',
                        fontSize: '1rem',
                        width: '120px'
                    }}
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
    detailPost: PropTypes.string,
    numPeople: PropTypes.number,
    maxParticipants: PropTypes.number, // Make sure this is a number
};

EventCard.defaultProps = {
    profilePic: '',
    username: 'Unknown User',
    postTime: 'Unknown Time',
    image: '',
    nameGames: 'Untitled Event',
    dateMeet: 'Unknown Date',
    detailPost: 'No content available',
    numPeople: 0,
    maxParticipants: 'N/A',
};

export default EventCard;


