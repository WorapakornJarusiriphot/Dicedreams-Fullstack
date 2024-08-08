import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Avatar,
  Typography,
  Button,
  TextField,
  IconButton,
  Input,
  CircularProgress,
  LinearProgress,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/UploadFile";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProfileEdit = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState(null);
  const [showUploadBar, setShowUploadBar] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  const fileInputRef = useRef(null);

  const updateUser = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const user_id = localStorage.getItem("user_id");
      if (!token) {
        throw new Error("No token found");
      }

      const fullName = `${firstName} ${lastName}`;
      let birthDay = transformDateFormat(user.birthday);

      const updatedUserData = {
        users_id: user_id || "no_data_now",
        first_name: firstName || "no_data_now",
        last_name: lastName || "no_data_now",
        username: user.username || "no_data_now",
        email: user.email || "no_data_now",
        birthday: birthDay || "no_data_now",
        phone_number: phoneNumber || "no_data_now",
        gender: user.gender || "no_data_now",
        user_image: user.user_image || "no_data_now",
        bio: bio || "no_data_now",
      };

      console.log("---->", updatedUserData);
      const response = await axios.put(
        `http://localhost:8080/api/users/${user_id}`,
        updatedUserData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("User updated successfully", response.data);
      // navigate("/profile");
    } catch (error) {
      console.error("Error updating user", error);
    }
  };

  const handleCloseUploadBar = () => {
    setShowUploadBar(false);
    setUploadProgress(0);
    setUploadError(null);
    setUploading(false);
  };

  const handleFileUpload = async (file) => {
    setUploading(true);
    setUploadProgress(0);
    setUploadError(null);
    setShowUploadBar(true);

    if (file.size > 3000000) {
      alert("ขนาดไฟล์เกิน 3 MB");
      return;
    }

    if (
      ![
        "image/jpeg",
        "image/svg+xml",
        "image/png",
        "image/jpg",
        "image/gif",
      ].includes(file.type)
    ) {
      alert("กรุณาเลือกไฟล์ตามนามสกุลที่ระบุ");
      return;
    }

    try {
      const user_id = localStorage.getItem("user_id");
      const token = localStorage.getItem("access_token");
      if (!token) {
        throw new Error("No token found");
      }

      let birthDay = transformDateFormat(user.birthday);

      const formData = {
        id: user_id || "no_data_now",
        first_name: firstName || "no_data_now",
        last_name: lastName || "no_data_now",
        username: user.username || "no_data_now",
        email: user.email || "no_data_now",
        birthday: birthDay || "no_data_now",
        phone_number: phoneNumber || "no_data_now",
        gender: user.gender || "no_data_now",
        user_image: file.name || "no_data_now", // test
        // user_image: file || "no_data_now", // use
      };

      console.log("formData-->", formData);

      const response = await axios.put(
        `http://localhost:8080/api/users/${user_id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            let percentCompleted = Math.floor((loaded * 100) / total);
            setUploadProgress(percentCompleted);
          },
        }
      );

      setUploading(false);
      setUploadProgress(100);
      setUploadedImageUrl(response.data.user_image);

      setUser((prevUser) => ({
        ...prevUser,
        user_image: response.data.user_image,
      }));
      console.log("File uploaded and user updated successfully", response.data);
      console.log("Uploaded Image URL:-->", uploadedImageUrl);
      console.log("file -->", file);

      getUser();
    } catch (error) {
      setUploading(false);
      setUploadProgress(0);
      setUploadError("File upload failed");
      console.error("Error uploading file", error);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer.files;

    if (files.length > 0) {
      const file = files[0];
      console.log(files);
      handleFileUpload(file);
    }
  };

  const chooseFile = () => {
    fileInputRef.current.click();
  };

  const getUser = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const user_id = localStorage.getItem("user_id");
      // const user_id = "065a9e78-50bc-4d43-acda-3080af58d155"; // test

      if (!token) {
        throw new Error("No token found");
      }
      const url = `http://localhost:8080/api/users/${user_id}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
      setFirstName(response.data.first_name);
      setLastName(response.data.last_name);
      setBio(response.data.bio);
      setPhoneNumber(response.data.phone_number);
      console.log("User data fetched successfully", response.data);
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  function transformDateFormat(dateString) {
    // input date format is YYYY-DD-MM
    const [year, day, month] = dateString.split("-");

    // Return date MM-DD-YYYY format
    return `${month}-${day}-${year}`;
  }

  useEffect(() => {
    getUser();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <Box
        sx={{
          padding: 3,
          backgroundColor: "#000",
          borderRadius: 2,
          marginLeft: 40,
          marginRight: 40,
          marginTop: 10,
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
            src={user.user_image}
            sx={{ width: 60, height: 60, marginRight: 2 }}
          />
          <Box>
            <Typography variant="h6" sx={{ color: "white" }}>
              {user.username}
            </Typography>
            <Typography variant="body2" sx={{ color: "lightgray" }}>
              ID: {user.users_id}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
          <TextField
            fullWidth
            label="First Name"
            variant="outlined"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
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
            label="Last Name"
            variant="outlined"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
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
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            fullWidth
            label="Bio"
            variant="outlined"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            sx={{
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
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            fullWidth
            label="Phone Number"
            variant="outlined"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            sx={{
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
        <Box
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragLeave={handleDragLeave}
          sx={{
            padding: 2,
            backgroundColor: dragging ? "rgba(255, 255, 255, 0.1)" : "black",
            border: "2px dashed white",
            borderRadius: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            cursor: "pointer",
            marginBottom: 2,
          }}
          onClick={chooseFile}
        >
          <UploadIcon sx={{ color: "white", fontSize: 40 }} />
          <Typography sx={{ color: "white", marginTop: 1 }}>
            Drag and drop an image here
          </Typography>
          <Typography sx={{ color: "white", marginTop: 1 }}>
            Or click to select an image
          </Typography>
          <input
            ref={fileInputRef}
            type="file"
            style={{ display: "none" }}
            onChange={(e) => handleFileUpload(e.target.files[0])}
          />
        </Box>
        {showUploadBar && (
          <Box
            sx={{
              marginBottom: 2,
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <LinearProgress
              variant="determinate"
              value={uploadProgress}
              sx={{ flex: 1 }}
            />
            <IconButton onClick={handleCloseUploadBar}>
              <CloseIcon sx={{ color: "white" }} />
            </IconButton>
          </Box>
        )}
        {uploading && (
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
            <CircularProgress sx={{ marginRight: 2 }} />
            <Typography sx={{ color: "white" }}>Uploading...</Typography>
          </Box>
        )}
        {uploadError && (
          <Box sx={{ marginBottom: 2 }}>
            <Typography sx={{ color: "red" }}>{uploadError}</Typography>
          </Box>
        )}
      </Box>

      <Box
        sx={{ marginLeft: 40, marginRight: 40, marginTop: 2, marginBottom: 10 }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            onClick={() => navigate("/profile")}
            sx={{
              color: "#fff",
              backgroundColor: "#444",
              borderColor: "#555",
              "&:hover": {
                backgroundColor: "#555",
              },
              marginRight: 5,
            }}
          >
            CANCEL
          </Button>
          <Button
            onClick={updateUser}
            sx={{
              color: "#fff",
              backgroundColor: "#AB003B",
              borderColor: "#AB003B",
              "&:hover": {
                backgroundColor: "#AB003B",
              },
            }}
          >
            CONFIRM
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileEdit;
