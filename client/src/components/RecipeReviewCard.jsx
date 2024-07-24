import React, { useState, useEffect } from 'react';
import {
  Container, Grid, Typography, Paper, Select, MenuItem, CircularProgress, Alert
} from '@mui/material';
import { getPostGames } from '../components/apiService'; // Import the API service
import EventCard from '../components/EventCrad'; // Corrected import name

function RecipeReviewCard() {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getPostGames();
        setEvents(data);
      } catch (error) {
        setError('Error fetching events: ' + error.message);
      } finally {
        setLoading(false);
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
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          filteredEvents.map((event) => (
            <Grid item key={event.post_games_id} xs={12} sm={10} md={8}> {/* Adjusted the grid sizes */}
              <EventCard
                profilePic={event.games_image}
                username={event.username} // Assuming username is included in the API response
                postTime={event.creation_date}
                image={event.games_image}
                nameGames={event.name_games}
                dateMeet={event.date_meet}
                detailPost={event.detail_post}
                numPeople={event.num_people}
                maxParticipants={event.maxParticipants} // Adjust as needed if maxParticipants is a different field
              />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
}

export default RecipeReviewCard;




