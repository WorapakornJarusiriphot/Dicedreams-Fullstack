import React from 'react';
import PropTypes from 'prop-types';
import {
    Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, Button, Typography
} from '@mui/material';

function PostActivity(props) {
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
        <Card sx={{ maxWidth: '100%', margin: '16px 0', backgroundColor: '#400467', boxShadow: '0px 6px 4px rgba(0, 0, 0, 0.5)' }}>
            <CardHeader
                avatar={
                    <Avatar
                        sx={{ bgcolor: 'blue' }}
                        aria-label="profile-picture"
                        src={profilePic || ''}
                        alt={`${username ? username[0] : 'U'}'s profile picture`}
                    >
                        {username ? username[0] : 'U'}
                    </Avatar>
                }
                title={username || 'Unknown User'}
                subheader={postTime || 'Unknown Time'}
            />
            <CardMedia
                component="img"
                sx={{ width: '100%', height: 'auto' }}
                image={image || ''}
                alt="Event image"
            />
            <CardContent >
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
            <CardActions disableSpacing sx={{ justifyContent: 'flex-end', padding: '16px' }}>
            </CardActions>
        </Card>
    );
}

PostActivity.propTypes = {
    profilePic: PropTypes.string,
    username: PropTypes.string,
    postTime: PropTypes.string,
    image: PropTypes.string,
    nameGames: PropTypes.string,
    dateMeet: PropTypes.string,
    detailPost: PropTypes.string,
    numPeople: PropTypes.number,
    maxParticipants: PropTypes.number,
};

PostActivity.defaultProps = {
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

export default PostActivity;
