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
import axios from "axios";

import { useNavigate } from "react-router-dom";

const Profile = () => {
  const getRandomDate = () => {
    const start = new Date(2024, 0, 1);
    const end = new Date();
    const date = new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
    return date.toLocaleString();
  };

  const getRandomID = () => {
    return Math.floor(Math.random() * 1000000).toString();
  };

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
      const user_id = "065a9e78-50bc-4d43-acda-3080af58d155";
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

  const boardGames = [
    {
      game_name: "Monopoly",
      game_id: getRandomID(),
      img: "../../public/G1.png",
      dateTime: getRandomDate(),
      commend: "มาสร้างแลนมาร์คกันเถอะ",
      location: "ร้าน outcast gaming",
      player_total: 5,
      player_amout: 2,
    },
    {
      game_name: "Catan",
      game_id: getRandomID(),
      img: "../../public/G2.jpg",
      dateTime: getRandomDate(),
      commend: "มาเป็นพ่อค้ากันเถอะ",
      location: "ร้าน outcast gaming",
      player_total: 4,
      player_amout: 2,
    },
    {
      game_name: "Risk",
      game_id: getRandomID(),
      img: "../../public/G3.png",
      dateTime: getRandomDate(),
      commend: "มาพิชิตโลกกันเถอะ",
      location: "ร้าน outcast gaming",
      player_total: 6,
      player_amout: 3,
    },
    {
      game_name: "Carcassonne",
      game_id: getRandomID(),
      img: "../../public/G4.png",
      dateTime: getRandomDate(),
      commend: "มาสร้างเมืองกันเถอะ",
      location: "ร้าน outcast gaming",
      player_total: 4,
      player_amout: 2,
    },
    {
      game_name: "Ticket to Ride",
      game_id: getRandomID(),
      img: "../../public/G5.png",
      dateTime: getRandomDate(),
      commend: "มาสร้างรถไฟกันเถอะ",
      location: "ร้าน outcast gaming",
      player_total: 5,
      player_amout: 3,
    },
  ];

  const handleEditProfileClick = () => {
    navigate("/profile/edit");
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const options = ["เข้าร่วม", "แก้ไขชื่อ", "อื่นๆ"];

  const ITEM_HEIGHT = 48;

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

      <Box
        sx={{
          backgroundColor: "#222",
          borderRadius: 2,
          marginLeft: 20,
          marginRight: 20,
          marginTop: 9,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            margin: 2,
            paddingTop: 2,
            paddingBottom: 2,
          }}
        >
          <Avatar
            src={user.avatar ? user.Avatar : "ไม่พบข้อมูล"}
            sx={{ width: 40, height: 40, marginRight: 2 }}
          />
          <Box>
            <Typography variant="body1" sx={{ color: "white" }}>
              {boardGames[0].userName ? boardGames[0].Avatar : "ไม่พบข้อมูล"}
            </Typography>
            <Typography variant="body2" sx={{ color: "gray" }}>
              {boardGames[0].dateTime ? boardGames[0].Avatar : "ไม่พบข้อมูล"}
            </Typography>
          </Box>

          <Box sx={{ marginLeft: "auto" }}>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={menuOpen ? "long-menu" : undefined}
              aria-expanded={menuOpen ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleMenuClick}
              sx={{ color: "white" }}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={handleMenuClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "20ch",
                },
              }}
            >
              {options.map((option) => (
                <MenuItem key={option} onClick={handleMenuClose}>
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Box>

        <Box
          sx={{
            height: "20vh",
            width: "100%",
            backgroundImage: `url(${boardGames[0].img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            borderRadius: "0.5rem",
          }}
        ></Box>

        <Box
          sx={{
            width: "80%",
            backgroundImage: `url(${boardGames[0].img})`,
            backgroundSize: "contain",
            backgroundPosition: "left",
            backgroundRepeat: "no-repeat",
            borderRadius: "0.5rem",
          }}
        ></Box>
      </Box>
    </Box>
  );
};

export default Profile;
