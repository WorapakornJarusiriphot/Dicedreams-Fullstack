import React, { useContext, useState, useEffect } from 'react';
import {
  Container, Grid, Typography, Paper, Select, MenuItem, Card, CardHeader, CardMedia, CardContent,
  CardActions, Avatar, Button
} from '@mui/material';
import { getPostGames } from './apiService'; // Import the API service

function EventCard(props) {
  const {
    profilePic,
    username,
    postTime,
    image,
    title,
    date,
    content,
    participants,
    maxParticipants
  } = props;

  return (
    <Card sx={{ maxWidth: 600, margin: '16px auto', backgroundColor: 'white', boxShadow: '0px 6px 4px rgba(0, 0, 0, 0.5)' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'red' }} aria-label="profile-picture" src={profilePic || ''}>
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
          {title || 'Untitled Event'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {date || 'Unknown Date'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {content || 'No content available'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          จำนวนคนตอบไป: {participants || 0}/{maxParticipants || 'N/A'}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button variant="contained" color="primary" sx={{ backgroundColor: 'crimson', color: 'white' }}>
          Join
        </Button>
        <Button variant="outlined" color="secondary" sx={{ borderColor: 'black', color: 'black' }}>
          Comment
        </Button>
      </CardActions>
    </Card>
  );
}

function RecipeReviewCard() {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getPostGames();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredEvents = filter === 'new' ? [...events].reverse() :
    filter === 'old' ? events :
      events;

  return (
    <Container sx={{ padding: '2rem 0' }}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12}>
          <Paper sx={{ padding: '1rem', marginBottom: '2rem', textAlign: 'center' }}>
            <Typography variant="h4" component="div" gutterBottom>
              Featured Games
            </Typography>
            <Select
              value={filter}
              onChange={handleFilterChange}
              sx={{ marginBottom: '1rem', minWidth: '150px' }}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="new">New</MenuItem>
              <MenuItem value="old">Old</MenuItem>
            </Select>
          </Paper>
        </Grid>
        {filteredEvents.map((event) => (
          <Grid item key={event.id} xs={12} sm={8} md={6} lg={4} xl={3}>
            <EventCard {...event} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default RecipeReviewCard;




