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
    user_image_preview: null,
  });
  const location = useLocation();
  const navigate = useNavigate();
  const { setCredential } = useContext(AuthContext);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [alert, setAlert] = useState({ open: false, message: "", severity: "success" });
  const fileInputRef = useRef(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get("register") === "true") {
      setIsRegister(true);
    }
  }, [location]);

  const handleLogin = async () => {
    if (!formData.identifier) {
      setAlert({ open: true, message: "กรอก E-mail หรือ Username ไม่ถูกต้อง", severity: "error" });
      return;
    }
    if (!formData.loginPassword) {
      setAlert({ open: true, message: "กรอก Password ไม่ถูกต้อง", severity: "error" });
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
      setAlert({ open: true, message: "เข้าสู่ระบบสำเร็จ!", severity: "success" });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        (error.request ? "ไม่มีการตอบสนองจากเซิร์ฟเวอร์ กรุณาลองใหม่อีกครั้งในภายหลัง" : "ข้อผิดพลาด: " + error.message);
      setAlert({ open: true, message: errorMessage, severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    const requiredFields = [
      { name: "first_name", label: "First Name" },
      { name: "last_name", label: "Last Name" },
      { name: "username", label: "Username" },
      { name: "phone_number", label: "Telephone Number" },
      { name: "email", label: "E-mail" },
      { name: "password", label: "Password" },
      { name: "birthday", label: "Day/month/year of birth" },
      { name: "gender", label: "Gender" },
    ];

    for (const field of requiredFields) {
      if (!formData[field.name]) {
        setAlert({ open: true, message: `ไม่กรอก ${field.label}`, severity: "error" });
        return;
      }
    }

    if (formData.password.length <= 8) {
      setAlert({ open: true, message: "รหัสผ่านต้องมีความยาวมากกว่า 8 ตัวอักษร", severity: "error" });
      return;
    }

    const age = dayjs().diff(formData.birthday, "year");
    if (age < 12) {
      setAlert({ open: true, message: "คุณต้องมีอายุอย่างน้อย 12 ปีเพื่อสมัครสมาชิก", severity: "error" });
      return;
    }

    setLoading(true);
    try {
      const formattedBirthday = dayjs(formData.birthday).format("MM/DD/YYYY");

      // Convert image to Base64
      const convertImageToBase64 = (imageFile) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(imageFile);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });
      };

      const base64Image = formData.user_image
        ? await convertImageToBase64(formData.user_image)
        : null;

      // Log the Base64 string
      console.log(base64Image);

      const dataToSend = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        phone_number: formData.phone_number,
        birthday: formattedBirthday,
        gender: formData.gender,
        user_image: base64Image,
      };

      const response = await axios.post("http://localhost:8080/api/users", dataToSend, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setAlert({ open: true, message: "ลงทะเบียนสำเร็จ!", severity: "success" });

      // Clear the form data and reset alert message after successful registration
      setFormData({
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
        user_image_preview: null,
      });
      setTimeout(() => setAlert({ open: false, message: "", severity: "success" }), 6000);

      setIsRegister(false);  // Switch to login screen
    } catch (error) {
      console.log(error.response.data); // Logs the full server response
      const errorMessage =
        error.response?.data?.message ||
        (error.request ? "ไม่มีการตอบสนองจากเซิร์ฟเวอร์ กรุณาลองใหม่อีกครั้งในภายหลัง" : "ข้อผิดพลาด: " + error.message);
      setAlert({ open: true, message: errorMessage, severity: "error" });
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
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, user_image: file, user_image_preview: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleCloseAlert = () => {
    setAlert({ open: false, message: "", severity: "success" });
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
          <Button onClick={() => setIsRegister(false)} id="login-button">
            <Typography style={{ color: "#FFFFFF" }}>Log In</Typography>
          </Button>
          <Button onClick={() => setIsRegister(true)} id="register-button">
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
              label="Telephone Number"
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
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleInputChange}
              InputProps={{
                style: { color: "#FFFFFF" },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                      style={{ color: "#FFFFFF" }}
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
                label="Day/month/year of birth"
                value={formData.birthday}
                onChange={(newValue) => setFormData((prev) => ({ ...prev, birthday: newValue }))}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="filled"
                    fullWidth
                    margin="normal"
                    InputProps={{ style: { color: "#FFFFFF" } }}
                    InputLabelProps={{ style: { color: "#FFFFFF" } }}
                    id="birthday"
                  />
                )}
              />
            </LocalizationProvider>
            <FormLabel component="legend" style={{ color: "#FFFFFF" }} id="gender-label">
              Gender
            </FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              row
              style={{ color: "#FFFFFF" }}
              id="gender-group"
            >
              <FormControlLabel
                value="ชาย"
                control={<Radio style={{ color: "#FFFFFF" }} />}
                label="ชาย"
                id="gender-male"
              />
              <FormControlLabel
                value="หญิง"
                control={<Radio style={{ color: "#FFFFFF" }} />}
                label="หญิง"
                id="gender-female"
              />
              <FormControlLabel
                value="ไม่ระบุ"
                control={<Radio style={{ color: "#FFFFFF" }} />}
                label="ไม่ระบุ"
                id="gender-not-specified"
              />
            </RadioGroup>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="user_image"
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <label htmlFor="user_image">
              <Button
                variant="contained"
                color="primary"
                startIcon={<CloudUploadIcon />}
                component="span"
                fullWidth
                style={{ marginTop: 16 }}
                id="upload-image-button"
              >
                Upload Image
              </Button>
            </label>
            {formData.user_image_preview && ( // Added to display the image preview
              <Box mt={2} display="flex" justifyContent="center">
                <img
                  src={formData.user_image_preview}
                  alt="Preview"
                  style={{ maxWidth: "100%", maxHeight: 200 }}
                  id="image-preview"
                />
              </Box>
            )}

            <Box display="flex" justifyContent="space-between" sx={{ mt: 2 }}>
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
                id="register-submit"
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
                id="cancel-register"
              >
                Cancel
              </Button>
            </Box>
          </Box>
        ) : (
          <Box width="100%">
            <TextField
              id="identifier"
              label="E-mail or Username"
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
              name="loginPassword"
              type={showPassword ? "text" : "password"}
              value={formData.loginPassword}
              onChange={handleInputChange}
              InputProps={{
                style: { color: "#FFFFFF" },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                      style={{ color: "#FFFFFF" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{ style: { color: "#FFFFFF" } }}
              required
            />
            <Box display="flex" justifyContent="space-between" sx={{ mt: 2 }}>
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
                id="login-submit"
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
                id="cancel-login"
              >
                Cancel
              </Button>
            </Box>
          </Box>
        )}
      </Box>
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: "100%" }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default LoginPage;
