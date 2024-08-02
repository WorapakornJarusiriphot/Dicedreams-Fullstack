import React, { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import dayjs from 'dayjs';
import { AuthContext } from '../Auth/AuthContext'; // Adjust the import path based on your file structure

const CreatePost = () => {
  const { userId, accessToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeValue, setTimeValue] = useState(null);
  const [numberOfPlayers, setNumberOfPlayers] = useState(0);
  const [formValues, setFormValues] = useState({
    name_games: '',
    detail_post: '',
    games_image: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const fileInputRef = useRef(null);

  const handleNumberChange = (event) => {
    let value = event.target.value;
    if (parseInt(value) < 0) {
      value = 0;
    }
    setNumberOfPlayers(value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormValues((prevValues) => ({
          ...prevValues,
          games_image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formValues.name_games) {
      setSnackbar({ open: true, message: 'Please enter the game name', severity: 'error' });
      return;
    }
    if (!selectedDate) {
      setSnackbar({ open: true, message: 'Please enter the date', severity: 'error' });
      return;
    }
    if (!timeValue) {
      setSnackbar({ open: true, message: 'Please enter the time', severity: 'error' });
      return;
    }
    if (numberOfPlayers <= 0) {
      setSnackbar({ open: true, message: 'Please enter the number of players', severity: 'error' });
      return;
    }

    const currentDateTime = dayjs();
    const selectedDateTime = dayjs(selectedDate).hour(timeValue.hour()).minute(timeValue.minute());
    const hoursDifference = selectedDateTime.diff(currentDateTime, 'hour');

    if (hoursDifference < 12) {
      setSnackbar({ open: true, message: 'Meeting time must be at least 12 hours in the future', severity: 'error' });
      return;
    }

    const requestData = {
      name_games: formValues.name_games,
      detail_post: formValues.detail_post,
      num_people: numberOfPlayers,
      date_meet: selectedDate.format('YYYY-MM-DD'),
      time_meet: timeValue.format('HH:mm:ss'),
      games_image: formValues.games_image,
      status_post: 'active',
      users_id: userId,
    };

    try {
      const response = await fetch('http://localhost:8080/api/postGame', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`, // Use the access token from context
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('Response Data:', responseData);
      setSnackbar({ open: true, message: 'Post created successfully!', severity: 'success' });
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
      setSnackbar({ open: true, message: 'Error creating post. Please try again.', severity: 'error' });
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: '', severity: 'success' });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>Create a board game post</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              id="name_games"
              label="Board game name"
              name="name_games"
              value={formValues.name_games}
              onChange={handleInputChange}
              placeholder="mtg werewolf monopoly game and others"
              multiline
              sx={{ mb: 2 }}
              required
            />
            <TextField
              fullWidth
              id="detail_post"
              label="Post details"
              name="detail_post"
              value={formValues.detail_post}
              onChange={handleInputChange}
              placeholder="Details"
              multiline
              sx={{ mb: 2 }}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box sx={{ mb: 2 }} id="date_meet">
                <DatePicker
                  label="Select an appointment date"
                  value={selectedDate}
                  onChange={(newValue) => setSelectedDate(newValue)}
                  renderInput={(params) => <TextField fullWidth {...params} required />}
                />
              </Box>
              <Box sx={{ mb: 2 }} id="time_meet">
                <Stack spacing={2} sx={{ minWidth: 305 }}>
                  <TimePicker
                    label="Choose an appointment time"
                    value={timeValue}
                    onChange={setTimeValue}
                    renderInput={(params) => <TextField {...params} required />}
                  />
                </Stack>
              </Box>
            </LocalizationProvider>
            <TextField
              fullWidth
              id="num_people"
              type="number"
              label="Number of Players"
              placeholder="Enter number of players"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              inputProps={{ min: 2 }}
              value={numberOfPlayers}
              onChange={handleNumberChange}
              onBlur={handleNumberChange}
              sx={{ mb: 2 }}
              required
            />
            <Button
              variant="contained"
              startIcon={<CloudUploadIcon />}
              sx={{ mb: 2, backgroundColor: 'crimson', color: 'white' }}
              onClick={handleUploadClick}
            >
              Upload Image
            </Button>
            <input
              ref={fileInputRef}
              accept="image/*"
              style={{ display: 'none' }}
              id="games_image"
              type="file"
              onChange={handleImageChange}
            />
            {imageFile && <Typography>{imageFile.name}</Typography>}
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              sx={{ color: 'white', borderColor: 'white' }}
              type="submit"
            >
              Create Post
            </Button>
          </form>
        </CardContent>
      </Card>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CreatePost;
