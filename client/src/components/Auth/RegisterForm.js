import { CircularProgress, makeStyles } from "@material-ui/core";
import React, { useState } from "react";

import AccountCircle from "@material-ui/icons/AccountCircle";
import AuthFormLink from "./AuthFormLink";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import ErrorAlert from "./ErrorAlert.js";
import Form from "./AuthForm.js";
import InputAdornment from "@material-ui/core/InputAdornment";
import SuccessAlert from "./SuccessAlert.js";
import TextField from "@material-ui/core/TextField";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import axios from "axios";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  loadingIcon: {
    display: "none",
  },
  textField: {
    width: 280,
  },
  visibilityIcon: {
    cursor: "pointer",
  },
});

const RegisterForm = () => {
  const history = useHistory();
  const classes = useStyles();
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    setSuccess("");
    setError("");
    setIsLoading(true);
    e.preventDefault();
    const user = { username, password };
    axios
      .post("/api/users/register", user)
      .then((res) => {
        setTimeout(() => {
          console.log(`Response => ${res.status}`);
          setIsLoading(false);
          setSuccess(res.data.message);
          setTimeout(() => {
            history.push("/login");
          }, 1000);
        }, 1000);
      })
      .catch((err) => {
        setTimeout(() => {
          console.log(`Error => ${err.response.status}`);
          setIsLoading(false);

          err.response.status === 500
            ? setError("500")
            : setError(err.response.data.message);
        }, 1000);
      });
  };
  const handlePasswordVisible = () => {
    setPasswordIsVisible(!passwordIsVisible);
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <Box mb={2}>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            helperText="4-20 characters"
            inputProps={{ maxLength: 20, minLength: 4 }}
            className={classes.textField}
            error={error === "Username is already taken." || username === ""}
            color="primary"
            label={error === "Username is already taken." ? error : "Username"}
            required
            onChange={handleUsernameChange}
            disabled={isLoading}
            autoFocus={true}
          />
        </Box>
        <Box mb={2}>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <VpnKeyIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  {passwordIsVisible ? (
                    <VisibilityIcon
                      className={classes.visibilityIcon}
                      onClick={handlePasswordVisible}
                    />
                  ) : (
                    <VisibilityOffIcon
                      className={classes.visibilityIcon}
                      onClick={handlePasswordVisible}
                    />
                  )}
                </InputAdornment>
              ),
            }}
            inputProps={{ maxLength: 20, minLength: 8 }}
            helperText="8-20 characters"
            className={classes.textField}
            type={passwordIsVisible ? "text" : "password"}
            error={password === ""}
            label="Password"
            color="primary"
            required
            disabled={isLoading}
            onChange={handlePasswordChange}
          />
        </Box>
        <Box mb={2}>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <VpnKeyIcon />
                </InputAdornment>
              ),
            }}
            className={classes.textField}
            error={password !== confirmPassword}
            type={passwordIsVisible ? "text" : "password"}
            label={
              password !== confirmPassword
                ? "Passwords don't match"
                : "Repeat Password"
            }
            color="primary"
            required
            disabled={isLoading}
            onChange={handleConfirmPasswordChange}
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={password !== confirmPassword || isLoading}
        >
          Register
        </Button>

        <AuthFormLink
          text="Already have an account?"
          url="/login"
          action="Login"
        />
        <CircularProgress className={isLoading ? "" : classes.loadingIcon} />
      </Form>
      {success ? <SuccessAlert alertMessage={success} /> : ""}
      {error === "500" ? (
        <ErrorAlert alertMessage="Server Error. Please try again later." />
      ) : (
        ""
      )}
      )
    </>
  );
};

export default RegisterForm;
