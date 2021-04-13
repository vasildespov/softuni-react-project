import { CircularProgress, makeStyles } from "@material-ui/core";
import { React, useContext, useState } from "react";

import AccountCircle from "@material-ui/icons/AccountCircle";
import AuthFormLink from "./AuthFormLink";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import ErrorAlert from "./ErrorAlert.js";
import Form from "./AuthForm.js";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import UserContext from "../../context/UserContext.js";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { login } from "../../services/auth";
import { setCookie } from "../../utils/Cookies";

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
const LoginForm = () => {
  const context = useContext(UserContext);
  const classes = useStyles();
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  const handlePasswordVisible = () => {
    setPasswordIsVisible(!passwordIsVisible);
  };
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    const user = { username, password };
    const response = await login(user);
    if (response.status === 201) {
      const token = response.headers.authorization.split(" ")[1];
      setTimeout(() => {
        setCookie(token);
        context.logIn(response.data.user);
      }, 1000);
    } else {
      setTimeout(() => {
        setIsLoading(false);
        if (response.status === 400) {
          setError(response.data.message);
        } else {
          setError("Server Error");
        }
      }, 1000);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <Box mb={2}>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            className={classes.textField}
            type="text"
            color="primary"
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
            className={classes.textField}
            type={passwordIsVisible ? "text" : "password"}
            color="primary"
            required
            disabled={isLoading}
            onChange={handlePasswordChange}
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading}
        >
          Login
        </Button>

        <AuthFormLink
          text="Don't have an account yet?"
          url="/register"
          action="Register"
        />
        {error && <ErrorAlert alertMessage={error} />}
        <CircularProgress className={isLoading ? "" : classes.loadingIcon} />
      </Form>
    </>
  );
};

export default LoginForm;
