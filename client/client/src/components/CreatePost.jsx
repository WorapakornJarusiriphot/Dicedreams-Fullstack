import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Stack from '@mui/material/Stack';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';

const CreatePost = ({ addEvent }) => {
  const navigate = useNavigate();
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

    const newEvent = {
      profilePic: "url_to_profile_picture_new",
      username: "New User",
      postTime: dayjs().format('DD MMMM เวลา HH:mm น.'),
      image: formValues.image,
      title: formValues.boardGameName,
      date: selectedDate && timeValue
        ? `${selectedDate.format('วันddddที่ D MMMM พ.ศ. YYYY')} เวลา ${timeValue.format('HH.mm น.')}`
        : '',
      content: formValues.postDetails,
      participants: 1,
      maxParticipants: numberOfPlayers,
    };

    addEvent(newEvent); // Add the new event
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
        backgroundColor: '#000000',
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
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ mb: 2 }}>
              <Stack spacing={2} sx={{ minWidth: 305 }}>
                <TimePicker
                  label="Choose an appointment time"
                  value={timeValue}
                  onChange={setTimeValue}
                  referenceDate={dayjs('2022-04-17')}
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



