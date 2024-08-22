import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Post from "../components/storePost";
import MailIcon from "@mui/icons-material/Mail";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const Store = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState(null);

  const menuOpen = Boolean(anchorEl);
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const userId = localStorage.getItem("users_id"); // Use 'users_id' instead of 'user_id'
      console.log("sssss", userId);

      if (!token) {
        throw new Error("No token found");
      }

      if (!userId) {
        console.error("User ID not found");
        return;
      }

      const url = `http://localhost:8080/api/users/${userId}`;
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

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    // getUser();
  }, []);

  return (
    <Box sx={{ marginTop: 8 }}>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "black",
          padding: 8,
        }}
      >
        <Box sx={{ width: "80%", alignItems: "center" }}>
          <Avatar sx={{ width: 200, height: 200 }}>Profile Image</Avatar>
          <Typography variant="h5" sx={{ marginTop: 2 }}>
            Username
          </Typography>

          <Box sx={{ marginTop: 2, width: "100%" }}>
            <Tabs value={activeTab} onChange={handleTabChange}>
              <Tab label="POST" />
              <Tab label="PROFILE EDIT" />
            </Tabs>

            <Box sx={{ marginTop: 4 }}>
              {activeTab === 0 && (
                <Box sx={{}}>
                  <Post data={""}></Post>
                </Box>
              )}
              {activeTab === 1 && <Box>All files</Box>}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Store;
