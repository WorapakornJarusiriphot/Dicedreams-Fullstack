import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";

const stPost = ({ data }) => {
  // Default values
  const defaultImage = "../../public/Necrons2.jpg";
  let store_name = "Outcast Gaming";
  let dateE = "03-01-2024";
  let timeE = "13:00 น.";
  let bio =
    "กิจกรรมกระชับมิตรครั้งแรกของผู้เล่น Commander \nเข้าร่วมฟรี เล่นไม่เป็นสอนให้เป็นในงานเลย";

  const formatDateToThai = (isoDateString) => {
    const thaiDays = [
      "วันอาทิตย์",
      "วันจันทร์",
      "วันอังคาร",
      "วันพุธ",
      "วันพฤหัสบดี",
      "วันศุกร์",
      "วันเสาร์",
    ];

    const thaiMonths = [
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฎาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤศจิกายน",
      "ธันวาคม",
    ];

    const date = new Date(isoDateString);

    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear() + 543; // Buddhist Era
    const weekday = thaiDays[date.getDay()];

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedTime = `${hours}:${minutes} น.`;

    return `${weekday} ที่ ${day} ${thaiMonths[month]} พ.ศ. ${year} เวลา ${formattedTime}`;
  };

  const dateth = formatDateToThai(data?.updatedAt || data?.createdAt);

  // State for managing the Menu
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  console.log("data-->", data);

  return (
    <Box
      sx={{
        backgroundColor: "#400467",
        borderRadius: "1rem",
        paddingTop: 1,
      }}
    >
      <Box
        sx={{
          backgroundColor: "#400467",
          height: "8vh",
          width: "100%",
          borderRadius: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "white",
          p: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            sx={{ bgcolor: "red", marginRight: 2 }}
            aria-label="profile-picture"
            src={defaultImage}
            alt={"No Image"}
          />
          <Box>
            <Typography variant="h6">{store_name}</Typography>
            <Typography variant="h10">{dateE + " เวลา " + timeE}</Typography>
          </Box>
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
                maxHeight: 48 * 4.5,
                width: "20ch",
              },
            }}
          >
            {["Option 1", "Option 2", "Option 3"].map((option) => (
              <MenuItem key={option} onClick={handleMenuClose}>
                {option}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Box>

      <Box
        sx={{
          marginLeft: 2,
          marginRight: 2,
          marginBottom: 2,
        }}
      >
        <img
          src={defaultImage} // test image source
          alt={store_name}
          style={{ width: "100%", borderRadius: 4 }}
        />
      </Box>

      <Box
        sx={{
          margin: 2,
          paddingBottom: 3,
        }}
      >
        <Typography variant="h6">{store_name}</Typography>
        <Typography variant="body1">
          วันที่กิจกรรมเริ่ม: {dateth || dateE}
        </Typography>
        <Typography variant="body1">เวลาที่กิจกรรมเริ่ม: {timeE}</Typography>
        <Typography variant="body1">สถานที่: {store_name}</Typography>
        <Typography variant="body1">{bio}</Typography>
      </Box>
    </Box>
  );
};

export default stPost;
