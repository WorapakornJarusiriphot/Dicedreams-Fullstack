import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  ButtonGroup,
  Link,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  CircularProgress,
  useMediaQuery,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import axios from "axios";
import { AuthContext } from "../Auth/AuthContext";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

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

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get("register") === "true") {
      setIsRegister(true);
    }
  }, [location]);

  const handleLogin = async () => {
    if (!formData.identifier) {
      setSnackbar({ open: true, message: "Please enter user name or email", severity: "error" });
      return;
    }
    if (!formData.loginPassword) {
      setSnackbar({ open: true, message: "Please enter password", severity: "error" });
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
      if (errorMessage.includes("Password is incorrect")) {
        setSnackbar({ open: true, message: "Password is incorrect", severity: "error" });
      } else if (errorMessage.includes("User name or email is incorrect")) {
        setSnackbar({ open: true, message: "User name or email is incorrect", severity: "error" });
      } else {
        setSnackbar({ open: true, message: errorMessage, severity: "error" });
      }
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

      await axios.post("http://localhost:8080/api-docs/#/Users", formDataObj, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSnackbar({ open: true, message: "I have registered as a user.", severity: "success" });
      navigate("/login");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
        (error.request ? "No response from server. Please try again later." : "Error: " + error.message)
      );
      setSnackbar({ open: true, message: "Registration failed!", severity: "error" });
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
                    <IconButton onClick={handleTogglePasswordVisibility} style={{ color: "#FFFFFF" }}>
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
                id="birthday"
                label="Birthday"
                value={formData.birthday}
                onChange={(newValue) => setFormData((prev) => ({ ...prev, birthday: newValue }))}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="filled"
                    fullWidth
                    margin="normal"
                    InputProps={{ ...params.InputProps, style: { color: "#FFFFFF" } }}
                    InputLabelProps={{ style: { color: "#FFFFFF" } }}
                  />
                )}
              />
            </LocalizationProvider>
            <FormLabel component="legend" style={{ color: "#FFFFFF", marginTop: "16px" }}>Gender</FormLabel>
            <RadioGroup
              row
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
            >
              <FormControlLabel value="male" control={<Radio style={{ color: "#FFFFFF" }} />} label="Male" />
              <FormControlLabel value="female" control={<Radio style={{ color: "#FFFFFF" }} />} label="Female" />
              <FormControlLabel value="other" control={<Radio style={{ color: "#FFFFFF" }} />} label="Other" />
            </RadioGroup>
            <input
              accept="image/*"
              type="file"
              id="user_image"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <label htmlFor="user_image">
              <Button variant="contained" color="primary" component="span" fullWidth style={{ marginTop: "16px" }}>
                Upload Profile Picture
              </Button>
            </label>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: "16px" }}
              onClick={handleRegister}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Register"}
            </Button>
          </Box>
        ) : (
          <Box width="100%">
            <TextField
              label="Username or E-mail"
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
                    <IconButton onClick={handleTogglePasswordVisibility} style={{ color: "#FFFFFF" }}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{ style: { color: "#FFFFFF" } }}
              required
            />
            <Link href="#" color="#FFFFFF" style={{ marginTop: "16px", display: "block", textAlign: "center" }}>
              Forgot password?
            </Link>
            <Typography color="error" style={{ marginTop: "16px" }}>
              {errorMessage}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: "16px" }}
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Log In"}
            </Button>
          </Box>
        )}
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          style={{ marginTop: "16px" }}
          onClick={handleCancel}
        >
          Cancel
        </Button>
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
