import React, { useEffect, useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  Button,
  TextField,
  ButtonGroup,
  Menu,
  MenuItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "../profile.css";
import UserPosts from "../components/UPost";

import axios from "axios";

import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState(null);

  const menuOpen = Boolean(anchorEl);
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        throw new Error("No token found");
      }
      // console.log("token -->", token);
      const user_id = "065a9e78-50bc-4d43-acda-3080af58d155"; // test
      // const user_id = "5ab17ae8-707b-43f9-baf1-1ecda4c691cd"; // dream

      const url = `http://localhost:8080/api/users/${user_id}`;
      // const url = `http://localhost:8080/api/users`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
      console.log("User data fetched successfully", response.data);
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  console.log(user.username);

  const handleEditProfileClick = () => {
    navigate("/profile/edit");
  };

  return (
    <Box sx={{ marginTop: 4 }}>
      <Box
        sx={{
          backgroundColor: "#222",
          borderRadius: 2,
          width: "60%", 
          margin: "20px auto",
          padding: 2, 
        }}
      >
        <Box
          sx={{
            height: "20vh",
            width: "20%",
            // backgroundImage: `url(${
            //   user.user_image ? user.user_image : "../public/p1.png"
            // })`,

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
            {user.username ? user.username : user.username}
          </Typography>
          <Typography variant="h8" gutterBottom sx={{ color: "white" }}>
            ID: {user.users_id ? user.users_id : "ไม่พบข้อมูล"}
          </Typography>

          <Box sx={{ margin: 2 }}>
            <div>
              <TextField
                id="outlined-required"
                label="Bio"
                defaultValue="Hello, I'm ready to play with you 👋"
                variant="outlined"
                multiline
                rows={3}
                InputLabelProps={{
                  readOnly: true,
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
              marginTop: 4,
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
                onClick={handleEditProfileClick}
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

      <UserPosts user={user} />
    </Box>
  );
};

export default Profile;
