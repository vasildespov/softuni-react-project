import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
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

export default function DashboardNavigation(props) {
  const context = useContext(UserContext);
  const history = useHistory();
  const urlCategory = props.urlCategory;
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  const handleLogout = async () => {
    axios.post("/api/users/logout").catch()
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
      >
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="All Tasks" />
      </ListItem>

      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText primary="Categories" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open}>
        <List disablePadding={true} style={{ paddingLeft: "20px" }}>
          <ListItem
            button
            onClick={() => handleCategoryChange("/Personal")}
            selected={urlCategory === "Personal"}
          >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Personal" />
          </ListItem>
          <ListItem
            button
            onClick={() => handleCategoryChange("/Study")}
            selected={urlCategory === "Study"}
          >
            <ListItemIcon>
              <MenuBookIcon />
            </ListItemIcon>
            <ListItemText primary="Study" />
          </ListItem>
          <ListItem
            button
            onClick={() => handleCategoryChange("/Work")}
            selected={urlCategory === "Work"}
          >
            <ListItemIcon>
              <WorkIcon />
            </ListItemIcon>
            <ListItemText primary="Work" />
          </ListItem>
          <ListItem
            button
            onClick={() => handleCategoryChange("/Chores")}
            selected={urlCategory === "Chores"}
          >
            <ListItemIcon>
              <HouseIcon />
            </ListItemIcon>
            <ListItemText primary="House Chores" />
          </ListItem>
        </List>
      </Collapse>
      <Divider />
      <ListItem onClick={handleLogout} button>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
    </List>
  );
}
