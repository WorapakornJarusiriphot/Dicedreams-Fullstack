import React, { useEffect, useState, useRef } from "react";
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
import axios from "axios";

const ProfileEdit = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userImage, setUserImage] = useState(null);
  const [dragging, setDragging] = useState(false);

  const fileInputRef = useRef(null);

  const updateUser = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        throw new Error("No token found");
      }

      const names = fullName.split(" ");
      const firstName = names[0];
      const lastName = names.slice(1).join(" ");

      const transformedBirthday = transformDateFormat(user.birthday);

      const updatedUserData = {
        users_id: user.users_id || "no_data_now",
        first_name: firstName || "no_data_now",
        last_name: lastName || "no_data_now",
        username: user.username || "no_data_now",
        email: user.email || "no_data_now",
        birthday: transformedBirthday || "no_data_now",
        phone_number: phoneNumber || "no_data_now",
        gender: user.gender || "no_data_now",
        user_image: userImage || "no_data_now",
      };
      console.log(updatedUserData);
      

      const response = await axios.put(
        `http://localhost:8080/api/users/${user.users_id}`,
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

  function transformDateFormat(dateString) {
    // Assuming the input date format is YYYY-DD-MM
    const [year, day, month] = dateString.split("-");

    // Return the date in MM-DD-YYYY format
    return `${month}-${day}-${year}`;
  }

  function transformDateFormat(dateString) {
    const [year, day, month] = dateString.split("-");
    return `${month}-${day}-${year}`;
  }

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
      const fileUrl = await handleFileUpload(file);
      if (fileUrl) {
        setUserImage(fileUrl);
      }
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
      const user_id = "065a9e78-50bc-4d43-acda-3080af58d155";
      const url = `http://localhost:8080/api/users/${user_id}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = response.data;
      setUser(userData);
      setFullName(`${userData.first_name} ${userData.last_name}`);
      setPassword(userData.password || "ไม่พบข้อมูล");
      setBio(userData.user_bio || "ไม่พบข้อมูล");
      setPhoneNumber(userData.phone_number || "");
      setUserImage(userData.user_image || "");
      console.log("User data fetched successfully", response.data);
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  const handleFileUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      // const response = await axios.post(
      //   "http://localhost:8080/api/upload",
      //   formData,
      //   {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   }
      // );

      // return response.data.fileUrl;

      console.log(file);
      return file.name;
    } catch (error) {
      console.error("Error uploading file", error);
      return null;
    }
  };

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
            src={user.avatar}
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
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          value={bio}
          onChange={(e) => setBio(e.target.value)}
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
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
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
            // backgroundColor: "rgba(255,255,255,0.1)",
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
                  handleFileUpload(file).then((fileUrl) => {
                    setUserImage(fileUrl);
                  });
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
