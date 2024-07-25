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
import dayjs from 'dayjs';
import { AuthContext } from '../Auth/AuthContext';

const CreatePost = ({ addEvent }) => {
  const navigate = useNavigate();
  const { accessToken, userId } = useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeValue, setTimeValue] = useState(null);
  const [numberOfPlayers, setNumberOfPlayers] = useState(0);
  const [formValues, setFormValues] = useState({
    boardGameName: '',
    postDetails: '',
    image: '',
  });
  const [imageFile, setImageFile] = useState(null);

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
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!formValues.boardGameName || !formValues.postDetails || !selectedDate || !timeValue) {
      alert('Please fill out all required fields.');
      return;
    }

    const requestData = {
      name_games: formValues.boardGameName,
      detail_post: formValues.postDetails,
      num_people: numberOfPlayers,
      date_meet: selectedDate.format('MM/DD/YYYY'),
      time_meet: timeValue.format('HH:mm:ss'),
      games_image: formValues.image,
      status_post: 'active',
      creation_date: dayjs().format('MM/DD/YYYY HH:mm:ss'),
      users_id: userId,
    };

    console.log('Request Data:', requestData);

    fetch('http://localhost:8080/api-docs/#/PostGames/post_postGame', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(requestData),
    })
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => { throw new Error(text) });
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
        addEvent(data);
        setFormValues({
          boardGameName: '',
          postDetails: '',
          image: '',
        });
        setSelectedDate(null);
        setTimeValue(null);
        setNumberOfPlayers(0);
        setImageFile(null);
        navigate('/');
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error creating post. Please try again.');
      });
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
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
          <TextField
            fullWidth
            label="Board game name"
            name="boardGameName"
            value={formValues.boardGameName}
            onChange={handleInputChange}
            placeholder="mtg werewolf monopoly game and others"
            multiline
            sx={{ mb: 2 }}
            required
          />
          <TextField
            fullWidth
            label="Post details"
            name="postDetails"
            value={formValues.postDetails}
            onChange={handleInputChange}
            placeholder="Details"
            multiline
            sx={{ mb: 2 }}
            required
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ mb: 2 }}>
              <DatePicker
                label="Select an appointment date"
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                renderInput={(params) => <TextField fullWidth {...params} required />}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
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
            type="number"
            label="Number of Players"
            placeholder="Enter number of players"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            inputProps={{ min: 0 }}
            value={numberOfPlayers}
            onChange={handleNumberChange}
            onBlur={handleNumberChange}
            sx={{ mb: 2 }}
            required
          />
          <Button
            variant="contained"
            startIcon={<CloudUploadIcon />}
            sx={{ mb: 2 }}
            onClick={handleUploadClick}
          >
            Upload Image
          </Button>
          <input
            ref={fileInputRef}
            accept="image/*"
            style={{ display: 'none' }}
            id="upload-file"
            type="file"
            onChange={handleImageChange}
          />
          {imageFile && <Typography>{imageFile.name}</Typography>}
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            sx={{ color: 'black', borderColor: 'black' }}
            onClick={handleSubmit}
          >
            Create Post
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CreatePost;

