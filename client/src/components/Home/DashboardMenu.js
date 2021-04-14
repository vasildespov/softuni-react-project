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
import ListIcon from "@material-ui/icons/List";
import UserContext from "../../context/UserContext.js";
import axios from "axios";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({}));
export default function DashboardNavigation(props) {
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
    const category = e.replaceAll(/\s/g, "");
    history.push(`/dashboard${category}`);
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
          <ListIcon />
        </ListItemIcon>
        <ListItemText primary="Categories" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open}>
        <List disablePadding={true}>
          {context.categories &&
            context.categories.map((x) => (
              <ListItem
                button
                onClick={() => handleCategoryChange(`/${x}`)}
                selected={urlCategory === x.replaceAll(/\s/g, "")}
              >
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary={x} />
              </ListItem>
            ))}
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
