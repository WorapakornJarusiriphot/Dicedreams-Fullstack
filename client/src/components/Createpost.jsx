import * as React from 'react';
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


const VisuallyHiddenInput = (props) => (
  <input
    accept="image/*"
    className="visually-hidden"
    id="upload-file"
    multiple
    type="file"
    {...props}
  />
);

export default function CreatePost() {
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [value, setValue] = React.useState(null);
  const [numberOfPlayers, setNumberOfPlayers] = React.useState(0);

  const handleNumberChange = (event) => {
    let value = event.target.value;
    // Convert to number and check if it's less than 0
    if (parseInt(value) < 0) {
      // If less than 0, set it to 0
      value = 0;
    }
    setNumberOfPlayers(value);
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
            placeholder="mtg werewolf monopoly game and others"
            multiline
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Post details"
            placeholder="Details"
            multiline
            sx={{ mb: 2 }}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ mb: 2 }}>
              <DatePicker
                label="Select an appointment date"
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </Box>
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ mb: 2 }}>
              <Stack spacing={2} sx={{ minWidth: 305 }}>
                <TimePicker
                  label= "Choose an appointment time "
                  value={value}
                  onChange={setValue}
                  referenceDate={dayjs('2022-04-17')}
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
            onChange={handleNumberChange} // Call the handleNumberChange function on change
            onBlur={handleNumberChange} // Call the handleNumberChange function on blur
            sx={{ mb: 2 }}
          />
          <label htmlFor="upload-file">
            <Button
              variant="contained"
              startIcon={<CloudUploadIcon />}
              InputLabelProps={{ shrink: true }}
              inputProps={{ min: 0 }} // Set the minimum value to 0
              sx={{ mb: 2 }}
            >
              <VisuallyHiddenInput />
            </Button>
          </label>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            sx={{ color: 'black', borderColor: 'black' }}
          >
            Create Post
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
