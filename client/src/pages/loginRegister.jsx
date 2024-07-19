import { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  ButtonGroup,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    phone_number: "",
    email: "",
    password: "",
    birthday: "",
    gender: "",
    identifier: "",
    loginPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get("register") === "true") {
      setIsRegister(true);
    }
  }, [location]);

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth",
        {
          identifier: formData.identifier,
          password: formData.loginPassword,
        }
      );
      localStorage.setItem("access_token", response.data.access_token);
      console.log("Login successful", response.data);
      navigate("/");
    } catch (error) {
      let message = "Error logging in";
      if (error.response) {
        message = error.response.data.message || "Error logging in";
      } else if (error.request) {
        message = "No response from server. Please try again later.";
      } else {
        message = "Error: " + error.message;
      }
      setErrorMessage(message);
      console.error("Error logging in", error.response?.data || error.message);
    }
  };

  const handleRegister = async () => {
    try {
      const formattedBirthday = formData.birthday.split("-").reverse().join("-"); // Ensure correct date format
      const response = await axios.post(
        "http://localhost:8080/api/users",
        {
          first_name: formData.first_name,
          last_name: formData.last_name,
          username: formData.username,
          email: formData.email,
          password: formData.password,
          phone_number: formData.phone_number,
          birthday: formattedBirthday,
          gender: formData.gender,
        }
      );
      console.log("User registered successfully", response.data);
      navigate("/login");
    } catch (error) {
      let message = "Error registering user";
      if (error.response) {
        message = error.response.data.message || "Error registering user";
      } else if (error.request) {
        message = "No response from server. Please try again later.";
      } else {
        message = "Error: " + error.message;
      }
      setErrorMessage(message);
      console.error(
        "Error registering user",
        error.response?.data || error.message
      );
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSwitchToRegister = () => {
    setIsRegister(true);
  };

  const handleSwitchToLogin = () => {
    setIsRegister(false);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100%"
      p={10}
      style={{
        backgroundImage: "url(/path/to/your/background/image.png)",
        backgroundSize: "cover",
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        bgcolor="rgba(0, 0, 0, 0.8)"
        p={5}
        borderRadius={2}
        width="600px"
        maxWidth="100%"
      >
        <Box display="flex" justifyContent="space-between" width="100%" mb={2}>
          <ButtonGroup variant="text" aria-label="Basic button group">
            <Button color="inherit" onClick={handleSwitchToLogin}>
              <Typography color="white">Log In</Typography>
            </Button>
            <Button color="inherit" onClick={handleSwitchToRegister}>
              <Typography color="white">Register</Typography>
            </Button>
          </ButtonGroup>
        </Box>
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
            />
            <TextField
              label="Password"
              type="password"
              variant="filled"
              fullWidth
              margin="normal"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              InputProps={{ style: { color: "white" } }}
              InputLabelProps={{ style: { color: "white" } }}
            />
            <TextField
              label="Birthday"
              type="date"
              variant="filled"
              fullWidth
              margin="normal"
              name="birthday"
              value={formData.birthday}
              onChange={handleInputChange}
              InputProps={{ style: { color: "white" } }}
              InputLabelProps={{ style: { color: "white" }, shrink: true }}
            />
            <FormLabel
              component="legend"
              style={{ color: "white", marginTop: "1rem" }}
            >
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
                label={
                  <Typography style={{ color: "white" }}>Female</Typography>
                }
              />
              <FormControlLabel
                value="male"
                control={<Radio style={{ color: "white" }} />}
                label={<Typography style={{ color: "white" }}>Male</Typography>}
              />
              <FormControlLabel
                value="not-specified"
                control={<Radio style={{ color: "white" }} />}
                label={
                  <Typography style={{ color: "white" }}>
                    Not Specified
                  </Typography>
                }
              />
            </RadioGroup>
            <Box
              display="flex"
              justifyContent="space-between"
              width="100%"
              mt={2}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleRegister}
              >
                Register
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
            />
            <TextField
              label="Password"
              type="password"
              variant="filled"
              fullWidth
              margin="normal"
              name="loginPassword"
              value={formData.loginPassword}
              onChange={handleInputChange}
              InputProps={{ style: { color: "white" } }}
              InputLabelProps={{ style: { color: "white" } }}
            />
            {errorMessage && (
              <Typography color="error" style={{ marginTop: "1rem" }}>
                {errorMessage}
              </Typography>
            )}
            <Link
              href="#"
              color="inherit"
              underline="hover"
              alignSelf="flex-start"
              mb={2}
            >
              <Typography color="white">Forgot your password?</Typography>
            </Link>
            <Box display="flex" justifyContent="space-between" width="100%">
              <Button
                variant="contained"
                color="primary"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleLogin}
              >
                Log In
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default LoginPage;

