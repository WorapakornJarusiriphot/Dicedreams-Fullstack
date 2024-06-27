import React from 'react';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, Typography, Button } from '@mui/material';

function RecipeReviewCard(props) {
  const { profilePic, username, postTime, image, title, date, content, participants, maxParticipants } = props;

  return (
    <Card sx={{ maxWidth: 600, margin: '16px auto', backgroundColor: 'white', boxShadow: '0px 6px 4px rgba(0, 0.5, 0.5, 0.5)' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'red' }} aria-label="profile-picture" src={profilePic}>
            {username[0]}
          </Avatar>
        }
        title={username}
        subheader={postTime}
        sx={{ color: 'black' }}
      />
      <CardMedia
        component="img"
        sx={{
          position: 'relative',
          '& > img': {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          },
        }}
        image={image}
        alt="Event image"
      />
      <CardContent sx={{ color: 'black' }}>
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

export default RecipeReviewCard;



