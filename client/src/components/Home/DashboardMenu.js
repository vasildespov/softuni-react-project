import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import React, { useContext } from "react";

import AssignmentIcon from "@material-ui/icons/Assignment";
import CategoryIcon from "@material-ui/icons/Category";
import Collapse from "@material-ui/core/Collapse";
import Divider from "@material-ui/core/Divider";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import HouseIcon from "@material-ui/icons/House";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import PersonIcon from "@material-ui/icons/Person";
import UserContext from "../../context/UserContext.js";
import WorkIcon from "@material-ui/icons/Work";
import axios from "axios";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  listItem: {
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
      justifyContent:"center"
    },
  },
  categoryItem: {
    paddingLeft: 32,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 16,
      textAlign: "center",
    },
  },
  icon: {
    [theme.breakpoints.down("sm")]: {
      display: "unset",
    },
  },
}));
export default function DashboardNavigation(props) {
  const theme = useTheme();
  const breakpoint = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();
  const context = useContext(UserContext);
  const history = useHistory();
  const urlCategory = props.urlCategory;
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  const handleLogout = async () => {
    axios.post("/api/users/logout").catch();
    context.logOut();
    history.push("/");
  };
  const handleCategoryChange = (e, event) => {
    history.push(`/dashboard${e}`);
  };
  return (
    <List disablePadding={true}>
      <ListItem
        button
        onClick={() => handleCategoryChange("")}
        selected={!urlCategory}
        className={classes.listItem}
      >
        <ListItemIcon className={classes.icon}>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText hidden={breakpoint} primary="All Tasks" />
      </ListItem>

      <ListItem button onClick={handleClick} className={classes.listItem}>
        <ListItemIcon className={classes.icon}>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText hidden={breakpoint} primary="Categories" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open}>
        <List disablePadding={true}>
          <ListItem
            button
            onClick={() => handleCategoryChange("/Personal")}
            selected={urlCategory === "Personal"}
            className={classes.categoryItem}
          >
            <ListItemIcon className={classes.icon}>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText hidden={breakpoint} primary="Personal" />
          </ListItem>
          <ListItem
            button
            onClick={() => handleCategoryChange("/Study")}
            selected={urlCategory === "Study"}
            className={classes.categoryItem}
          >
            <ListItemIcon className={classes.icon}>
              <MenuBookIcon />
            </ListItemIcon>
            <ListItemText hidden={breakpoint} primary="Study" />
          </ListItem>
          <ListItem
            button
            onClick={() => handleCategoryChange("/Work")}
            selected={urlCategory === "Work"}
            className={classes.categoryItem}
          >
            <ListItemIcon className={classes.icon}>
              <WorkIcon />
            </ListItemIcon>
            <ListItemText hidden={breakpoint} primary="Work" />
          </ListItem>
          <ListItem
            button
            onClick={() => handleCategoryChange("/Chores")}
            selected={urlCategory === "Chores"}
            className={classes.categoryItem}
          >
            <ListItemIcon className={classes.icon}>
              <HouseIcon />
            </ListItemIcon>
            <ListItemText hidden={breakpoint} primary="House Chores" />
          </ListItem>
        </List>
      </Collapse>
      <Divider />
      <ListItem onClick={handleLogout} button className={classes.listItem}>
        <ListItemIcon className={classes.icon}>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText hidden={breakpoint} primary="Logout" />
      </ListItem>
    </List>
  );
}
