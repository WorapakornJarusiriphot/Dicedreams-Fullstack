import React, { useState, useEffect, useContext, useRef } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  ButtonGroup,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  CircularProgress,
  useMediaQuery,
  IconButton,
  InputAdornment,
  Snackbar,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import axios from "axios";
import { AuthContext } from "../Auth/AuthContext";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    phone_number: "",
    email: "",
    password: "",
    birthday: dayjs(),
    gender: "",
    identifier: "",
    loginPassword: "",
    user_image: null,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { setCredential } = useContext(AuthContext);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const fileInputRef = useRef(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get("register") === "true") {
      setIsRegister(true);
    }
  }, [location]);

  const handleLogin = async () => {
    if (!formData.identifier || !formData.loginPassword) {
      setSnackbar({ open: true, message: "Please enter your credentials", severity: "error" });
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/api/auth", {
        identifier: formData.identifier,
        password: formData.loginPassword,
      });
      const { access_token, user_id } = response.data;
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("user_id", user_id);
      setCredential(access_token, user_id);
      navigate("/");
      setSnackbar({ open: true, message: "Login successful!", severity: "success" });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        (error.request ? "No response from server. Please try again later." : "Error: " + error.message);
      setSnackbar({ open: true, message: errorMessage, severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    const requiredFields = [
      { name: "first_name", label: "First Name" },
      { name: "last_name", label: "Last Name" },
      { name: "username", label: "Username" },
      { name: "phone_number", label: "Phone Number" },
      { name: "email", label: "E-mail" },
      { name: "password", label: "Password" },
      { name: "birthday", label: "Birthday" },
      { name: "gender", label: "Gender" },
    ];

    for (const field of requiredFields) {
      if (!formData[field.name]) {
        setSnackbar({ open: true, message: `Please fill in ${field.label}`, severity: "error" });
        return;
      }
    }

    if (formData.password.length <= 8) {
      setSnackbar({ open: true, message: "Password must be more than 8 characters", severity: "error" });
      return;
    }

    const age = dayjs().diff(formData.birthday, "year");
    if (age < 12) {
      setSnackbar({ open: true, message: "You must be at least 12 years old to register", severity: "error" });
      return;
    }

    setLoading(true);
    try {
      const formattedBirthday = formData.birthday.format("YYYY-MM-DD");
      const formDataObj = new FormData();
      formDataObj.append("first_name", formData.first_name);
      formDataObj.append("last_name", formData.last_name);
      formDataObj.append("username", formData.username);
      formDataObj.append("email", formData.email);
      formDataObj.append("password", formData.password);
      formDataObj.append("phone_number", formData.phone_number);
      formDataObj.append("birthday", formattedBirthday);
      formDataObj.append("gender", formData.gender);
      if (formData.user_image) {
        formDataObj.append("user_image", formData.user_image);
      }
      for (const pair of formDataObj.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }

      const response = await axios.post("http://localhost:8080/api/Users", formDataObj, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSnackbar({ open: true, message: "Registration successful!", severity: "success" });
      setIsRegister(false);  // Switch to login screen
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        (error.request ? "No response from server. Please try again later." : "Error: " + error.message);
      setSnackbar({ open: true, message: errorMessage, severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event) => {
    setFormData((prev) => ({ ...prev, user_image: event.target.files[0] }));
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "", severity: "success" });
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      style={{
        backgroundImage: "url(./public/warhamerAoSloginpage.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "125vh",
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        bgcolor="rgba(1, 1, 1, 0.8)"
        p={5}
        borderRadius={2}
        width={isMobile ? "90%" : isRegister ? "700px" : "500px"}
        maxWidth="90%"
        sx={{ backdropFilter: "blur(10px)" }}
      >
        <ButtonGroup variant="text" fullWidth>
          <Button onClick={() => setIsRegister(false)}>
            <Typography style={{ color: "#FFFFFF" }}>Log In</Typography>
          </Button>
          <Button onClick={() => setIsRegister(true)}>
            <Typography style={{ color: "#FFFFFF" }}>Register</Typography>
          </Button>
        </ButtonGroup>
        {isRegister ? (
          <Box width="100%">
            <TextField
              id="first_name"
              label="First Name"
              variant="filled"
              fullWidth
              margin="normal"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              InputProps={{ style: { color: "#FFFFFF" } }}
              InputLabelProps={{ style: { color: "#FFFFFF" } }}
              required
            />
            <TextField
              id="last_name"
              label="Last Name"
              variant="filled"
              fullWidth
              margin="normal"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              InputProps={{ style: { color: "#FFFFFF" } }}
              InputLabelProps={{ style: { color: "#FFFFFF" } }}
              required
            />
            <TextField
              id="username"
              label="Username"
              variant="filled"
              fullWidth
              margin="normal"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              InputProps={{ style: { color: "#FFFFFF" } }}
              InputLabelProps={{ style: { color: "#FFFFFF" } }}
              required
            />
            <TextField
              id="phone_number"
              label="Phone Number"
              variant="filled"
              fullWidth
              margin="normal"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleInputChange}
              InputProps={{ style: { color: "#FFFFFF" } }}
              InputLabelProps={{ style: { color: "#FFFFFF" } }}
              required
            />
            <TextField
              id="email"
              label="E-mail"
              variant="filled"
              fullWidth
              margin="normal"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              InputProps={{ style: { color: "#FFFFFF" } }}
              InputLabelProps={{ style: { color: "#FFFFFF" } }}
              required
            />
            <TextField
              id="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="filled"
              fullWidth
              margin="normal"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              InputProps={{
                style: { color: "#FFFFFF" },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{ style: { color: "#FFFFFF" } }}
              required
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Birthday"
                value={formData.birthday}
                onChange={(newValue) => setFormData({ ...formData, birthday: newValue })}
                format="YYYY-MM-DD"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="filled"
                    fullWidth
                    margin="normal"
                    InputProps={{ style: { color: "#FFFFFF" } }}
                    InputLabelProps={{ style: { color: "#FFFFFF" } }}
                    required
                  />
                )}
              />
            </LocalizationProvider>
            <FormLabel component="legend" style={{ color: "#FFFFFF" }}>
              Gender
            </FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              row
              sx={{ justifyContent: "center", mb: 2 }}
            >
              <FormControlLabel
                value="male"
                control={<Radio sx={{ color: "#FFFFFF" }} />}
                label={<Typography style={{ color: "#FFFFFF" }}>Male</Typography>}
              />
              <FormControlLabel
                value="female"
                control={<Radio sx={{ color: "#FFFFFF" }} />}
                label={<Typography style={{ color: "#FFFFFF" }}>Female</Typography>}
              />
              <FormControlLabel
                value="other"
                control={<Radio sx={{ color: "#FFFFFF" }} />}
                label={<Typography style={{ color: "#FFFFFF" }}>Other</Typography>}
              />
            </RadioGroup>
            <Button
              variant="contained"
              color="primary"
              component="label"
              startIcon={<CloudUploadIcon />}
              fullWidth
              sx={{ marginBottom: "10px" }}
            >
              Upload Profile Image
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                hidden
              />
            </Button>
            {formData.user_image && (
              <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
                <img
                  src={URL.createObjectURL(formData.user_image)}
                  alt="Profile Preview"
                  style={{ maxWidth: "200px", maxHeight: "200px", marginBottom: "10px" }}
                />
              </Box>
            )}
            <Box display="flex" justifyContent="space-between">
              <Button
                variant="contained"
                fullWidth
                onClick={handleRegister}
                disabled={loading}
                sx={{
                  marginRight: "10px",
                  backgroundColor: "crimson",
                  color: "#FFFFFF",
                  '&:hover': {
                    backgroundColor: "darkred",
                  },
                }}
              >
                {loading ? <CircularProgress size={24} /> : "Register"}
              </Button>
              <Button
                variant="outlined"
                fullWidth
                onClick={handleCancel}
                sx={{
                  marginLeft: "10px",
                  color: "#FFFFFF",
                  borderColor: "#FFFFFF",
                  '&:hover': {
                    borderColor: "#FFFFFF",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        ) : (
          <Box width="100%">
            <TextField
              id="identifier"
              label="Username or Email"
              variant="filled"
              fullWidth
              margin="normal"
              name="identifier"
              value={formData.identifier}
              onChange={handleInputChange}
              InputProps={{ style: { color: "#FFFFFF" } }}
              InputLabelProps={{ style: { color: "#FFFFFF" } }}
              required
            />
            <TextField
              id="loginPassword"
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="filled"
              fullWidth
              margin="normal"
              name="loginPassword"
              value={formData.loginPassword}
              onChange={handleInputChange}
              InputProps={{
                style: { color: "#FFFFFF" },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{ style: { color: "#FFFFFF" } }}
              required
            />
              <Box display="flex" justifyContent="space-between">
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleLogin}
                  disabled={loading}
                  sx={{
                    marginRight: "10px",
                    backgroundColor: "crimson",
                    color: "#FFFFFF",
                    
                    '&:hover': {
                      backgroundColor: "darkred",
                    },
                  }}
                >
                  {loading ? <CircularProgress size={24} /> : "Log In"}
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={handleCancel}
                  sx={{
                    marginLeft: "10px",
                    color: "#FFFFFF",
                    borderColor: "#FFFFFF",
                    '&:hover': {
                      borderColor: "#FFFFFF",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  Cancel
                </Button>
              </Box>
          </Box>
        )}
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default LoginPage;
