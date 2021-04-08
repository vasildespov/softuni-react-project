import "./App.css";

import React, { Suspense, useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { getCookie, removeCookie } from "./utils/Cookies";

import Calendar from "./components/Tasks/Calendar";
import Dashboard from "./components/Home/Dashboard";
import DateFnsUtils from "@date-io/date-fns";
import Header from "./components/Header/Header.js";
import Home from "./components/Home/Home.js";
import LoginForm from "./components/Auth/LoginForm.js";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import NotFound from "./components/NotFound";
import RegisterForm from "./components/Auth/RegisterForm.js";
import UserContext from "./context/UserContext.js";
import axios from "axios";

const App = (props) => {
  const [loggedIn, setLoggedIn] = useState(null);
  const [user, setUser] = useState(null);

  const logIn = (user) => {
    setUser(user);
    setLoggedIn(true);
  };

  const logOut = () => {
    removeCookie();
    setUser(null);
    setLoggedIn(false);
  };

  useEffect(() => {
    const token = getCookie();
    if (!token) {
      return logOut();
    }
    axios
      .post("/api/users/verify", { token })
      .then((res) => {
        logIn(res.data.user);
      })
      .catch((err) => {
        console.log(`App Verify Error : ${err.response.data}`);
        logOut();
      });
  }, []);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <UserContext.Provider value={{ loggedIn, user, logIn, logOut }}>
        <Header />
        {props.children}

        <Switch>
          <Route
            exact
            path="/"
            render={() => (loggedIn ? <Redirect to="/dashboard" /> : <Home />)}
          />
          <Route
            path="/dashboard"
            render={() => (loggedIn ? <Dashboard /> : <Redirect to="/login" />)}
          />
          <Route
            exact
            path="/login"
            render={() =>
              loggedIn ? <Redirect to="/dashboard" /> : <LoginForm />
            }
          />
          <Route
            exact
            path="/register"
            render={() =>
              loggedIn ? <Redirect to="/dashboard" /> : <RegisterForm />
            }
          />
          <Route exact path="/time" component={Calendar} />
          <Route path="*" component={NotFound} />
        </Switch>
      </UserContext.Provider>
    </MuiPickersUtilsProvider>
  );
};

export default App;
