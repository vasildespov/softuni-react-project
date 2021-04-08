import React, { useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import { Link } from "react-router-dom";
import NavMenu from "./NavMenu.js";
import NavTabs from "./NavTabs.js";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import UserContext from "../../context/UserContext.js";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles({
  root: {
    flexDirection: "unset",
    alignItems: "center",
  },
  regular: {
    width: "100%",
    justifyContent: "space-between",
  },
  name: {
    textDecoration: "none",
    color: "#fff",
    fontFamily: "Impact",
  },
});
const Header = () => {
  const context = useContext(UserContext);
  const styles = useStyles();
  const theme = useTheme();
  const mobileBreakpoint = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <AppBar position="relative" className={styles.root} color="primary">
      <Toolbar variant="regular" className={styles.regular}>
        <Typography
          className={styles.name}
          variant="h4"
          component={Link}
          to="/"
        >
          STRACK
        </Typography>
        {mobileBreakpoint && !context.loggedIn ? <NavMenu /> : <NavTabs />}
      </Toolbar>
    </AppBar>
  );
};
export default Header;
