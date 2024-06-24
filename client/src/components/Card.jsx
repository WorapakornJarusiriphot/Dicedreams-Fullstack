import React from 'react';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, Typography, Button } from '@mui/material';

function EventCard({ profilePic, username, postTime, image, title, date, content, participants, maxParticipants }) {
    return (
        <Card sx={{ maxWidth: 600, backgroundColor: 'white', boxShadow: '0px 6px 4px rgba(0, 0.5, 0.5, 0.5)' }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: 'red' }} aria-label="profile-picture" src={profilePic}>
                        {username[0]}
                    </Avatar>
                }
                title={username}
                subheader={postTime}
                sx={{ color: 'black' }} // Adjusted text color
            />
            <CardMedia
                component="img"
                sx={{
                    position: 'relative',
                    '& > img': {
                        width: '100%', // Set the width to 100% of the parent container
                        height: '100%', // Set the height to 100% of the parent container
                        objectFit: 'cover', // Ensure the image covers the entire container
                    },
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0.5, 0.5, 0.5)',
                    },
                }}
                image={image}
                alt="Event image"
            />

            <CardContent sx={{ color: 'black' }}> {/* Adjusted text color */}
                <Typography variant="h6" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {date}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {content}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    จำนวนคนตอบไป: {participants}/{maxParticipants}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Button variant="contained" color="primary" sx={{ backgroundColor: 'crimson' }}>
                    <span style={{ color: 'white' }}>join</span>
                </Button>
                <Button variant="outlined" color="secondary" sx={{ borderColor: 'black', color: 'black' }}>
                    <span style={{ color: 'black' }}>comment</span>
                </Button>
            </CardActions>
        </Card>
    );
}

export default EventCard;

