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
  const [fileName, setFileName] = useState(""); // State to hold the file name
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

      await axios.post("http://localhost:8080/api-docs/#/Users/post_users", formDataObj, {
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
      if (errorMessage.includes("already added as a member")) {
        setSnackbar({ open: true, message: "Already added as a member", severity: "error" });
      } else if (errorMessage.includes("have membership")) {
        setSnackbar({ open: true, message: "Have membership", severity: "error" });
      } else {
        setSnackbar({ open: true, message: "Registration failed!", severity: "error" });
      }
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
    const file = event.target.files[0];
    setFormData((prev) => ({ ...prev, user_image: file }));
    setFileName(file ? file.name : ""); // Update the file name state
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
              variant="filled"
              fullWidth
              margin="normal"
              type={showPassword ? "text" : "password"}
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
                      {showPassword ? <VisibilityOff style={{ color: "#FFFFFF" }} /> : <Visibility style={{ color: "#FFFFFF" }} />}
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
                variant="filled"
                fullWidth
                margin="normal"
                value={formData.birthday}
                onChange={(newValue) => setFormData((prev) => ({ ...prev, birthday: newValue }))}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="filled"
                    InputProps={{ style: { color: "#FFFFFF" } }}
                    InputLabelProps={{ style: { color: "#FFFFFF" } }}
                    required
                  />
                )}
              />
            </LocalizationProvider>
            <FormLabel component="legend" style={{ marginTop: 16, color: "#FFFFFF" }}>
              Gender
            </FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              row
              style={{ color: "#FFFFFF" }}
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>
            <Button variant="contained" component="label" style={{ marginTop: 16, backgroundColor: "#FFFFFF", color: "#000000" }}>
              Upload Profile Image
              <input type="file" hidden onChange={handleFileChange} />
            </Button>
            {fileName && ( // Conditionally render the file name
              <Typography variant="body2" style={{ marginTop: 8, color: "#FFFFFF" }}>
                Selected file: {fileName}
              </Typography>
            )}
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button
                variant="contained"
                onClick={handleRegister}
                style={{ backgroundColor: "crimson", color: "white" }}
              >
                {loading ? <CircularProgress size={24} /> : "Register"}
              </Button>
              <Button
                variant="outlined"
                onClick={handleCancel}
                style={{ borderColor: "#FFFFFF", color: "#FFFFFF" }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        ) : (
          <Box width="100%">
            <TextField
              id="identifier"
              label="User name or Email"
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
              variant="filled"
              fullWidth
              margin="normal"
              type={showPassword ? "text" : "password"}
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
                      {showPassword ? <VisibilityOff style={{ color: "#FFFFFF" }} /> : <Visibility style={{ color: "#FFFFFF" }} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{ style: { color: "#FFFFFF" } }}
              required
            />
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button
                variant="contained"
                onClick={handleLogin}
                style={{ backgroundColor: "crimson", color: "white" }}
              >
                {loading ? <CircularProgress size={24} /> : "Log In"}
              </Button>
              <Button
                variant="outlined"
                onClick={handleCancel}
                style={{ borderColor: "#FFFFFF", color: "#FFFFFF" }}
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
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default LoginPage;
