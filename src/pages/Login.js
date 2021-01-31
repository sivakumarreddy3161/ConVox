import { Box, Button, TextField, Typography } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import React, { useState } from "react";
import "../styles/login.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  function togglePassword() {
    setShowPassword(!showPassword);
  }

  return (
    <div className="login_wrapper">
      <div className="login_container">
        <Typography
          variant="h5"
          color="primary"
          style={{ textAlign: "center" }}
        >
          ConVoxCCS
        </Typography>
        <Box mt={3}>
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            fullWidth
            required
          />
        </Box>
        <Box mt={3}>
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            fullWidth
            required
            InputProps={{
              endAdornment: showPassword ? (
                <VisibilityOff
                  style={{ cursor: "pointer" }}
                  onClick={togglePassword}
                />
              ) : (
                <Visibility
                  style={{ cursor: "pointer" }}
                  onClick={togglePassword}
                />
              ),
            }}
          />
        </Box>
        <Box mt={3} textAlign="center">
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </Box>
      </div>
    </div>
  );
}

export default Login;
