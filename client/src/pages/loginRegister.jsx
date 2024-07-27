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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import axios from "axios";
import { AuthContext } from "../Auth/AuthContext";
import { useSnackbar } from 'notistack';

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
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get("register") === "true") {
      setIsRegister(true);
    }
  }, [location]);

  const handleLogin = async () => {
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
      enqueueSnackbar('Login successful!', { variant: 'success' });
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
        (error.request
          ? "No response from server. Please try again later."
          : "Error: " + error.message)
      );
      enqueueSnackbar('Login failed!', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      const formattedBirthday = formData.birthday.format('DD-MM-YYYY');
      const formDataObj = new FormData();
      formDataObj.append('first_name', formData.first_name);
      formDataObj.append('last_name', formData.last_name);
      formDataObj.append('username', formData.username);
      formDataObj.append('email', formData.email);
      formDataObj.append('password', formData.password);
      formDataObj.append('phone_number', formData.phone_number);
      formDataObj.append('birthday', formattedBirthday);
      formDataObj.append('gender', formData.gender);
      if (formData.user_image) {
        formDataObj.append('user_image', formData.user_image);
      }

      await axios.post("http://localhost:8080/api/users", formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate("/login");
      enqueueSnackbar('Registration successful!', { variant: 'success' });
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
        (error.request
          ? "No response from server. Please try again later."
          : "Error: " + error.message)
      );
      enqueueSnackbar('Registration failed!', { variant: 'error' });
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

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="122vh"
      style={{
        backgroundImage: "url(./public/warhamerAoSloginpage.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
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
            <Typography color="white">Log In</Typography>
          </Button>
          <Button onClick={() => setIsRegister(true)}>
            <Typography color="white">Register</Typography>
          </Button>
        </ButtonGroup>
        {isRegister ? (
          <Box width="100%">
            <TextField
              label="First Name"
              variant="filled"
              fullWidth
              margin="normal"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              InputProps={{ style: { color: "white" } }}
              InputLabelProps={{ style: { color: "white" } }}
              required
            />
            <TextField
              label="Last Name"
              variant="filled"
              fullWidth
              margin="normal"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              InputProps={{ style: { color: "white" } }}
              InputLabelProps={{ style: { color: "white" } }}
              required
            />
            <TextField
              label="Username"
              variant="filled"
              fullWidth
              margin="normal"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              InputProps={{ style: { color: "white" } }}
              InputLabelProps={{ style: { color: "white" } }}
              required
            />
            <TextField
              label="Phone Number"
              variant="filled"
              fullWidth
              margin="normal"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleInputChange}
              InputProps={{ style: { color: "white" } }}
              InputLabelProps={{ style: { color: "white" } }}
              required
            />
            <TextField
              label="E-mail"
              variant="filled"
              fullWidth
              margin="normal"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              InputProps={{ style: { color: "white" } }}
              InputLabelProps={{ style: { color: "white" } }}
              required
            />
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="filled"
              fullWidth
              margin="normal"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              InputProps={{
                style: { color: "white" },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePasswordVisibility} style={{ color: "white" }}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{ style: { color: "white" } }}
              required
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Birthday"
                value={formData.birthday}
                onChange={(newValue) => setFormData((prev) => ({ ...prev, birthday: newValue }))}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="filled"
                    fullWidth
                    margin="normal"
                    InputProps={{ style: { color: "white" } }}
                    InputLabelProps={{ style: { color: "white" }, shrink: true }}
                    InputAdornmentProps={{ style: { color: "white" } }}
                    InputAdornmentLabelProps={{ style: { color: "white" } }}
                    required
                  />
                )}
              />
            </LocalizationProvider>
            <FormLabel component="legend" style={{ color: "white", marginTop: "1rem" }}>
              Gender
            </FormLabel>
            <RadioGroup
              row
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
            >
              <FormControlLabel
                value="female"
                control={<Radio style={{ color: "white" }} />}
                label={<Typography style={{ color: "white" }}>Female</Typography>}
              />
              <FormControlLabel
                value="male"
                control={<Radio style={{ color: "white" }} />}
                label={<Typography style={{ color: "white" }}>Male</Typography>}
              />
              <FormControlLabel
                value="not-specified"
                control={<Radio style={{ color: "white" }} />}
                label={<Typography style={{ color: "white" }}>Not Specified</Typography>}
              />
            </RadioGroup>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="raised-button-file"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="raised-button-file">
              <Button variant="contained" color="primary" component="span" fullWidth style={{ marginTop: '1rem' }}>
                Upload Image
              </Button>
            </label>
            {errorMessage && (
              <Typography color="error" style={{ marginTop: "1rem" }}>
                {errorMessage}
              </Typography>
            )}
            <Box display="flex" justifyContent="space-between" width="100%" mt={2}>
              <Button variant="contained" color="primary" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="contained" color="secondary" onClick={handleRegister} disabled={loading}>
                {loading ? <CircularProgress size={24} color="inherit" /> : "Register"}
              </Button>
            </Box>
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
              InputProps={{ style: { color: "white" } }}
              InputLabelProps={{ style: { color: "white" } }}
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
                style: { color: "white" },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePasswordVisibility} style={{ color: "white" }}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{ style: { color: "white" } }}
              required
            />
            {errorMessage && (
              <Typography color="error" style={{ marginTop: "1rem" }}>
                {errorMessage}
              </Typography>
            )}
            <Box display="flex" justifyContent="space-between" width="100%" mt={2}>
              <Button variant="contained" color="primary" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="contained" color="secondary" onClick={handleLogin} disabled={loading}>
                {loading ? <CircularProgress size={24} color="inherit" /> : "Log In"}
              </Button>
            </Box>
            <Link
              href="#"
              variant="body2"
              onClick={() => setIsRegister(true)}
              style={{ color: "white", marginTop: "1rem", display: "block", textAlign: "center" }}
            >
              Don't have an account? Register here
            </Link>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default LoginPage;
