import React, { useContext, useEffect, useState } from "react";
import { Tab, Tabs } from "@material-ui/core";

import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { useLocation } from "react-router-dom";

const NavTabs = () => {
  const location = useLocation();
  const context = useContext(UserContext);
  const [value, setValue] = useState(0);

  const handleTabs = (_, newValue) => {
    setValue(newValue);
    return;
  };
  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath === "/login" && value !== 1) setValue(1);
    else if (currentPath === "/register" && value !== 2) setValue(2);
    else if (currentPath === "/") setValue(0);
    // eslint-disable-next-line
  }, [location]);
  return (
    <nav>
      {!context.loggedIn ? (
        <Tabs value={value} onChange={handleTabs}>
          <Tab value={0} label="Home" component={Link} to="/" />
          <Tab value={1} label="Login" component={Link} to="/login" />
          <Tab value={2} label="Register" component={Link} to="/register" />
        </Tabs>
      ) : (
        <Tabs value={0}>
          <Tab
            value={0}
            label={`Welcome, ${context.user.username}`}
            disableRipple
          />
        </Tabs>
      )}
    </nav>
  );
};

export default NavTabs;
