import React from "react";
import {
  Box,
  Avatar,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";

const Profile = () => {
  const rows = [
    {
      userName: "วนัสพร กาญจน์วัฒน์",
      postName: "Werewolf",
      dateTime: "2/12/2566",
      avatar: "https://via.placeholder.com/40", // Placeholder image
      viewLink: "/post/1",
    },
    {
      userName: "ณัฐวุฒิ แก้วมหา",
      postName: "ซาเรม 1692",
      dateTime: "2/12/2566",
      avatar: "https://via.placeholder.com/40", // Placeholder image
      viewLink: "/post/2",
    },
  ];

  return (
    <Box
      sx={{
        height: "100vh", // Full height of the viewport
        width: "100vw", // Full width of the viewport
        backgroundImage: "url(../public/BGmain.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
        sx={{
          margin: 4,
          marginTop: 4,
          backgroundColor: "black",
          padding: 2,
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            height: "20vh",
            width: "20vw",
            backgroundImage: "url(../public/p1.png)",
          }}
        ></Box>
        <Typography variant="h4" gutterBottom sx={{ color: "white" }}>
          Profile {rows[0].userName}
        </Typography>

        <Box></Box>
      </Box>
    </Box>
  );
};

export default Profile;
