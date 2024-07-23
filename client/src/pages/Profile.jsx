import React, { useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  Button,
  TextField,
  ButtonGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Link } from "react-router-dom";
import "../profile.css";

const Profile = () => {
  const [open, setOpen] = useState(false);

  const rows = [
    {
      userName: "วนัสพร กาญจน์วัฒน์",
      id: "2565655",
      postName: "Werewolf",
      dateTime: "2/12/2566",
      avatar: "https://via.placeholder.com/40",
      viewLink: "/post/1",
    },
    {
      userName: "ณัฐวุฒิ แก้วมหา",
      id: "11111",
      postName: "ซาเรม 1692",
      dateTime: "2/12/2566",
      avatar: "https://via.placeholder.com/40",
      viewLink: "/post/2",
    },
  ];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ marginTop: 4 }}>
      <Box
        sx={{
          backgroundColor: "#222",
          borderRadius: 2,
          marginLeft: 20,
          marginRight: 20,
          marginTop: 20,
        }}
      >
        <Box
          sx={{
            height: "20vh",
            width: "20%",
            backgroundImage: "url(../public/p1.png)",
            backgroundSize: "contain",
            backgroundPosition: "left",
            backgroundRepeat: "no-repeat",
            borderRadius: "0.5rem",
          }}
        ></Box>
        <br />
        <Box sx={{ marginLeft: 2, marginRight: 2, marginTop: 2 }}>
          <Typography variant="h4" gutterBottom sx={{ color: "white" }}>
            {rows[0].userName}
          </Typography>
          <Typography variant="h8" gutterBottom sx={{ color: "white" }}>
            ID: {rows[0].id}
          </Typography>

          <Box sx={{ margin: 2 }}>
            <div>
              <TextField
                id="outlined-required"
                label="Bio"
                defaultValue="Hello, I'm ready to play with you 👋"
                variant="outlined"
                multiline
                rows={4}
                InputLabelProps={{
                  style: { color: "white" },
                }}
                InputProps={{
                  style: { color: "white", borderColor: "white" },
                }}
                sx={{
                  width: "100%",
                  height: "100px",
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
                  "& .MuiInputLabel-root": {
                    color: "white",
                  },
                  "& .MuiInputBase-input": {
                    color: "white",
                  },
                }}
              />
            </div>
          </Box>

          <Box
            sx={{
              marginLeft: 3,
              marginRight: 2,
              marginTop: 5,
              paddingBottom: 2,
            }}
          >
            <ButtonGroup
              variant="outlined"
              aria-label="Basic button group"
              sx={{
                "& .MuiButtonGroup-grouped": {
                  borderColor: "#63c5da",
                  textTransform: "none",
                },
              }}
            >
              <Button
                sx={{
                  color: "#fff",
                  borderColor: "#112233",
                  "&:hover": {
                    borderColor: "#112233",
                    backgroundColor: "rgba(17,34,51,0.1)",
                  },
                  paddingLeft: "40px",
                }}
              >
                Post
              </Button>
              <Button
                sx={{
                  color: "#0492c2",
                  borderColor: "#112233",
                  "&:hover": {
                    borderColor: "#112233",
                    backgroundColor: "rgba(17,34,51,0.1)",
                  },
                }}
              >
                Participation History
              </Button>
              <Button
                onClick={handleClickOpen}
                sx={{
                  color: "#1944ba",
                  borderColor: "#112233",
                  "&:hover": {
                    borderColor: "#112233",
                    backgroundColor: "rgba(17,34,51,0.1)",
                  },
                }}
              >
                Edit Profile
              </Button>
            </ButtonGroup>
          </Box>
        </Box>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
        sx={{ "& .MuiDialog-paper": { width: "60%", marginTop: "10%" } }}
      >
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
            <Avatar
              src={rows[0].avatar}
              sx={{ width: 40, height: 40, marginRight: 2 }}
            />
            <Typography variant="h6">{rows[0].userName}</Typography>
            <Typography variant="body2" sx={{ marginLeft: 2 }}>
              ID: {rows[0].id}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
            <TextField
              fullWidth
              label="Full Name"
              variant="outlined"
              sx={{ flex: 1 }}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              sx={{ flex: 1 }}
            />
          </Box>
          <TextField
            fullWidth
            label="Bio"
            variant="outlined"
            multiline
            rows={4}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Telephone Number"
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />
          <Box
            sx={{
              border: "2px dashed #ccc",
              borderRadius: 1,
              height: 300,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            Click to upload or drag and drop for upload
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Profile;
