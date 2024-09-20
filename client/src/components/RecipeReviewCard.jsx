import React, { useState, useEffect, useRef } from 'react';
import {
  Container, Grid, Typography, Paper, Select, MenuItem, CircularProgress, Alert
} from '@mui/material';
import { getPostGames } from '../components/apiService';
import EventCard from './EventCard';

function RecipeReviewCard() {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState('new');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const lastEventRef = useRef(null);  // To reference the last added EventCard
  const scrollPosRef = useRef(0);  // To store the original scroll position

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Fetch only events with 'active' status
        const data = await getPostGames({ status_post: 'active' });
        console.log("Fetched Events:", data); // Log fetched events
        setEvents(data);
      } catch (error) {
        setError('Error fetching events: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    // Capture the original scroll position before updating the events
    scrollPosRef.current = window.scrollY;

    // Scroll to the last event card when the event list updates
    if (lastEventRef.current) {
      lastEventRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [events]);  // This will trigger whenever `events` is updated

  useEffect(() => {
    // Restore the scroll position to the original after the list is updated
    window.scrollTo(0, scrollPosRef.current);
  }, [events]);  // Runs after the list update to move to the original position

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // Apply sorting based on selected filter
  const filteredEvents = filter === 'old' ? [...events].reverse() :
    filter === 'new' ? events :
      events;

  return (
    <Container sx={{ padding: '2rem 0' }} id="recipe-review-container">
      <Grid container spacing={3} justifyContent="center" id="recipe-review-grid">
        <Grid item xs={12}>
          <Paper
            sx={{
              padding: '1rem',
              marginBottom: '2rem',
              textAlign: 'center',
              backgroundColor: 'rgba(85, 0, 27, 0.5)'
            }}
            id="recipe-review-paper"
          >
            <Typography
              variant="h4"
              component="div"
              gutterBottom
              sx={{ color: 'white', fontWeight: 'bold' }}
              id="recipe-review-title"
            >
              Featured Games
            </Typography>
            <Select
              value={filter}
              onChange={handleFilterChange}
              sx={{ marginBottom: '1rem', minWidth: '150px', color: 'white', fontWeight: 'bold' }}
              id="filter-select"
            >
              <MenuItem value="new" id="filter-new">New</MenuItem>
              <MenuItem value="old" id="filter-old">Old</MenuItem>
            </Select>
          </Paper>
        </Grid>
        {loading ? (
          <CircularProgress id="loading-spinner" />
        ) : error ? (
          <Alert severity="error" id="error-alert">{error}</Alert>
        ) : (
          filteredEvents.map((event, index) => (
            <Grid
              item
              key={event.post_games_id}
              xs={12}
              sm={10}
              md={8}
              ref={index === filteredEvents.length - 1 ? lastEventRef : null}  // Ref for the last event
              id={`event-card-grid-${event.post_games_id}`}
            >
              <EventCard
                userId={event.users_id}
                profilePic={event.user_image} // Ensure this is returned by your API
                username={event.username} // Ensure this is included in the API response
                postTime={event.creation_date}
                image={event.games_image}
                nameGames={event.name_games}
                dateMeet={event.date_meet}
                timeMeet={event.time_meet}
                detailPost={event.detail_post}
                numPeople={event.num_people}
                maxParticipants={event.maxParticipants}
                eventId={event.post_games_id}
                id={`event-card-${event.post_games_id}`}
              />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
}

export default RecipeReviewCard;
