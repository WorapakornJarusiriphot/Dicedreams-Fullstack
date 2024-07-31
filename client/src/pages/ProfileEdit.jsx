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
      if (!token) {
        throw new Error("No token found");
      }

      const user_id = user.users_id;
      const fullName = `${user.first_name} ${user.last_name}`;
      const phoneNumber = user.phone_number;
      const bio = user.user_bio;
      const userImage = user.user_image; // Use the new image URL if available
      let birthDay = transformDateFormat(user.birthday);

      const updatedUserData = {
        users_id: user_id || "no_data_now",
        first_name: user.first_name || "no_data_now",
        last_name: user.last_name || "no_data_now",
        username: user.username || "no_data_now",
        email: user.email || "no_data_now",
        birthday: birthDay || "no_data_now",
        phone_number: phoneNumber || "no_data_now",
        gender: user.gender || "no_data_now",
        user_image: userImage || "no_data_now",
      };

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
      navigate("/profile");
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
      alert("ขนาดไฟล์เกิน 3 MB")  
      return
    }
    if (!['image/jpeg', 'image/svg+xml', 'image/png', 'image/jpg', 'image/gif'].includes(file.type)) {
      alert("กรุณาเลือกไฟล์ตามนามสกุลที่ระบุ");
      return;
    }
    

    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        throw new Error("No token found");
      }

      let birthDay = transformDateFormat(user.birthday);
      
      const formData =  {
        users_id: user.users_id || "no_data_now",
        first_name: user.first_name || "no_data_now",
        last_name: user.last_name || "no_data_now",
        username: user.username || "no_data_now",
        email: user.email || "no_data_now",
        birthday: birthDay || "no_data_now",
        phone_number: user.phone_number || "no_data_now",
        gender: user.gender || "no_data_now",
        user_image: file || "no_data_now",
      };

      console.log("formData-->", formData);

      const response = await axios.put(
        `http://localhost:8080/api/users/${user.users_id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
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
      handleFileUpload(file);
    }
  };

  const chooseFile = () => {
    fileInputRef.current.click();
  };

  const getUser = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        throw new Error("No token found");
      }
      const user_id = "065a9e78-50bc-4d43-acda-3080af58d155"; // test
      const url = `http://localhost:8080/api/users/${user_id}`;
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
            label="Full Name"
            variant="outlined"
            defaultValue={user.first_name + " " + user.last_name}
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
            defaultValue={user.password ? user.password : "ไม่พบข้อมูล"}
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
          defaultValue={user.user_bio ? user.user_bio : "ไม่พบข้อมูล"}
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
          defaultValue={user.phone_number ? user.phone_number : null}
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
                style={{ display: "none" }}
                onChange={(e) => {
                  const file = e.target.files[0];
                  handleFileUpload(file);
                }}
              />
            </IconButton>
            <Typography color="white">
              Click to upload or drag and drop
            </Typography>
            <Typography color="white">
              SVG, PNG, JPG or GIF (max. 3MB)
            </Typography>
          </Box>
        </Box>

        <Box>
          {showUploadBar && (
            <Box sx={{ position: "relative", marginTop: 4 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#f0f0f0",
                  borderRadius: 1,
                  padding: 1,
                  marginBottom: 2,
                }}
              >
                <Typography variant="body2" sx={{ flexGrow: 1 }}>
                  {uploading ? "Uploading..." : "Upload Complete"}
                </Typography>
                <Box sx={{ width: "100%", marginRight: 1 }}>
                  <Box
                    sx={{
                      width: `${uploadProgress}%`,
                      backgroundColor: uploading ? "primary.main" : "green",
                      height: 4,
                    }}
                  />
                </Box>
                <IconButton onClick={handleCloseUploadBar}>
                  <CloseIcon />
                </IconButton>
              </Box>
              {uploadError && (
                <Typography color="error" variant="body2">
                  {uploadError}
                </Typography>
              )}
            </Box>
          )}

          {uploadedImageUrl && (
            <Box sx={{ marginTop: 4, background: "red" }}>
              <Typography variant="h6" sx={{ color: "white" }}>
                Uploaded Image:
              </Typography>
              <Avatar
                src={uploadedImageUrl}
                sx={{ width: 60, height: 60, marginTop: 1 }}
                alt="Uploaded Avatar"
              />
            </Box>
          )}
        </Box>
      </Box>

      <Box sx={{ marginLeft: 40, marginRight: 40, marginTop: 2 }}>
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
