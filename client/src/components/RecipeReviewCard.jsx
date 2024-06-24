import React, { useState } from 'react';
import { Container, Grid, Typography, Paper, Select, MenuItem, Box } from '@mui/material';
import EventCard from './Card';

const events = [
  {
    profilePic: "url_to_profile_picture1",
    username: "Vorapong J.",
    postTime: "30 เมษายน เวลา 21:59 น.",
    image: "G1.png",
    title: "UNO",
    date: "วันอาทิตย์ที่ 1 พฤษภาคม พ.ศ. 2567 เวลา 15.00 น.",
    content: "หาเพื่อนเล่นบอร์ดเกม UNO ชิวๆไม่ซีเรียส สี่-5 คน สถานที่: ร้าน outcast gaming",
    participants: 1,
    maxParticipants: 5,
  },
  {
    profilePic: "url_to_profile_picture2",
    username: "Jane D.",
    postTime: "2 พฤษภาคม เวลา 18:00 น.",
    image: "G2.jpg",
    title: "Werewolf",
    date: "วันพฤหัสบดีที่ 3 พฤษภาคม พ.ศ. 2567 เวลา 19.00 น.",
    content: "หาเพื่อนเล่น Werewolf กลางคืน สนุกสนาน",
    participants: 2,
    maxParticipants: 10,
  },
  {
    profilePic: "url_to_profile_picture3",
    username: "John S.",
    postTime: "5 พฤษภาคม เวลา 20:00 น.",
    image: "G3.webp",
    title: "Magic the Gathering",
    date: "วันเสาร์ที่ 6 พฤษภาคม พ.ศ. 2567 เวลา 14.00 น.",
    content: "Magic the Gathering commander game, new players welcome.",
    participants: 3,
    maxParticipants: 6,
  },
  {
    profilePic: "url_to_profile_picture4",
    username: "Emily R.",
    postTime: "7 พฤษภาคม เวลา 17:00 น.",
    image: "G4.avif",
    title: "Catan",
    date: "วันอาทิตย์ที่ 8 พฤษภาคม พ.ศ. 2567 เวลา 16.00 น.",
    content: "เล่นบอร์ดเกม Catan หาเพื่อนใหม่",
    participants: 4,
    maxParticipants: 4,
  },
];

function RecipeReviewCard() {
  const [filter, setFilter] = useState(''); // State for filter selection, defaulting to "All"

  const handleFilterChange = (event) => {
    setFilter(event.target.value); // Update the filter state when selection changes
  };

  const filteredEvents = filter === 'new' ? events.slice().reverse() : events;

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
        {filteredEvents.map((event, index) => (
          <Grid item key={index} xs={12} sm={8} md={6} lg={4} xl={3}>
            <EventCard {...event} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default RecipeReviewCard;


