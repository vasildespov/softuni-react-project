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
import axios from "axios";
import { setCookie } from "../../utils/Cookies";
import { useHistory } from "react-router";

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
  const history = useHistory();
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
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    const user = { username, password };
    axios
      .post("/api/users/login", user)
      .then((res) => {
        const token = res.headers.authorization.split(" ")[1];
        setTimeout(() => {
          setTimeout(() => {
            setCookie(token);
            context.logIn(res.data.user);
            history.push("/dashboard");
          }, 500);
        }, 500);
      })
      .catch((err) => {
        setTimeout(() => {
          setIsLoading(false);
          if (err.response) {
            setError(err.response.data.message);
          } else setError(err.message);
        }, 500);
      });
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
            error={error === "Invalid Username" || username === ""}
            label={error === "Invalid Username" ? error : "Username"}
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
            error={error === "Invalid Password" || password === ""}
            type={passwordIsVisible ? "text" : "password"}
            label={error === "Invalid Password" ? error : "Password"}
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
        <CircularProgress className={isLoading ? "" : classes.loadingIcon} />
      </Form>

      {error && <ErrorAlert alertMessage={error} />}
    </>
  );
};

export default LoginForm;
