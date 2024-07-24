import React, { useState, useRef } from "react";
import {
  Box,
  Avatar,
  Typography,
  Button,
  TextField,
  IconButton,
  Input, 
} from "@mui/material";
import UploadIcon from "@mui/icons-material/UploadFile";
import { useNavigate } from "react-router-dom";
// import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
// import { List, ListItem } from "@material-ui/core";

const ProfileEdit = () => {
  const navigate = useNavigate();
  const rows = [
    {
      userName: "วนัสพร กาญจน์วัฒน์",
      id: "2565655",
      password: "1199900211125",
      user_bio: "Hello, I'm ready to play with you 👋",
      tel_no: "0884561234",
      avatar: "https://via.placeholder.com/60",
    },
  ];

  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleSave = () => {
    // Save logic here
    navigate("/profile");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer.files;
    // Handle the dropped files here
    console.log(files);
  };

  const chooseFile = () => {
    fileInputRef.current.click();
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        padding: 3,
        backgroundColor: "#000",
        borderRadius: 2,
        marginLeft: 20,
        marginRight: 20,
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ color: "white" }}>
        Edit Profile
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Avatar
          src={rows[0].avatar}
          sx={{ width: 60, height: 60, marginRight: 2 }}
        />
        <Box>
          <Typography variant="h6" sx={{ color: "white" }}>
            {rows[0].userName}
          </Typography>
          <Typography variant="body2" sx={{ color: "lightgray" }}>
            ID: {rows[0].id}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
        <TextField
          fullWidth
          label="Full Name"
          variant="outlined"
          defaultValue={rows[0].userName}
          sx={{
            flex: 1,
            "& .MuiInputLabel-root": {
              color: "white",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
            },
            "& .MuiInputBase-input": {
              color: "white",
            },
          }}
        />
        <TextField
          fullWidth
          label="Password"
          type="text"
          variant="outlined"
          defaultValue={rows[0].password}
          sx={{
            flex: 1,
            "& .MuiInputLabel-root": {
              color: "white",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
            },
            "& .MuiInputBase-input": {
              color: "white",
            },
          }}
        />
      </Box>
      <TextField
        fullWidth
        label="Bio"
        variant="outlined"
        defaultValue={rows[0].user_bio}
        multiline
        rows={4}
        sx={{
          marginBottom: 2,
          "& .MuiInputLabel-root": {
            color: "white",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "white",
            },
            "&:hover fieldset": {
              borderColor: "white",
            },
            "&.Mui-focused fieldset": {
              borderColor: "white",
            },
          },
          "& .MuiInputBase-input": {
            color: "white",
          },
        }}
      />
      <TextField
        fullWidth
        label="Telephone Number"
        variant="outlined"
        defaultValue={rows[0].tel_no}
        sx={{
          marginBottom: 2,
          "& .MuiInputLabel-root": {
            color: "white",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "white",
            },
            "&:hover fieldset": {
              borderColor: "white",
            },
            "&.Mui-focused fieldset": {
              borderColor: "white",
            },
          },
          "& .MuiInputBase-input": {
            color: "white",
          },
        }}
      />

      {/* drag and drop */}
      <Box
        sx={{
          border: "2px dashed white",
          borderRadius: 1,
          height: 300,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          backgroundColor: dragging ? "rgba(255,255,255,0.1)" : "transparent",
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={chooseFile}
      >
        <Box sx={{ textAlign: "center" }}>
          <IconButton
            color="primary"
            component="label"
            sx={{ textAlign: "center" }}
          >
            <UploadIcon sx={{ color: "white" }} />
            <Input
              type="file"
              hidden
              inputRef={fileInputRef}
              style={{ display: 'none' }}
              onChange={(e) => {
                // Handle file selection here
                console.log(e.target.files);
              }}
            />
          </IconButton>
          <Typography color="white">
            Click to upload or drag and drop
          </Typography>
          <Typography color="white">SVG, PNG, JPG or GIF (max. 3MB)</Typography>
        </Box>
      </Box>

      <Box sx={{ marginTop: 3, display: "flex", justifyContent: "flex-end" }}>
        <Button
          onClick={() => navigate("/profile")}
          sx={{
            color: "#fff",
            backgroundColor: "#444",
            borderColor: "#555",
            "&:hover": {
              backgroundColor: "#555",
            },
            marginRight: 1,
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          sx={{
            color: "#fff",
            backgroundColor: "#007bff", // Blue background for button
            borderColor: "#007bff",
            "&:hover": {
              backgroundColor: "#0056b3",
            },
          }}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileEdit;
