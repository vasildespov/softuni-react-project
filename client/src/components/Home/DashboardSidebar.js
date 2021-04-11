import { Drawer, makeStyles } from "@material-ui/core";

import CreateForm from "../Tasks/FormTask";
import DashboardMenu from "./DashboardMenu.js";
import React from "react";

const useStyles = makeStyles((theme) => ({
  paper: {
    top: "unset",
    position: "relative",
    width: 220,
    [theme.breakpoints.down("sm")]: {
      width: 100,
    },
    zIndex: 0,
  },
}));
export default function DashboardSidebar(props) {
  const styles = useStyles();
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      classes={{
        paperAnchorDockedLeft: styles.paper,
      }}
    >
      <CreateForm
        error={props.error}
        date={props.date}
        onSubmit={props.onSubmit}
        handleTaskChange={props.handleTaskChange}
        handleDescChange={props.handleDescChange}
        handleDateChange={props.handleDateChange}
        handleCategoryChange={props.handleCategoryChange}
      />
      <DashboardMenu urlCategory={props.urlCategory} />
    </Drawer>
  );
}
