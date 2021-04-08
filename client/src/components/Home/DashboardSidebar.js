import { Drawer, makeStyles } from "@material-ui/core";
import CreateForm from "../Tasks/FormTask"
import DashboardMenu from "./DashboardMenu.js";
import React from "react";


const useStyles = makeStyles({
  paper: {
    top: "unset",
    position: "relative",
    width: "240px",
  },
});
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
        handleInfoChange={props.handleInfoChange}
        handleDateChange={props.handleDateChange}
        handleCategoryChange={props.handleCategoryChange}
      />
      <DashboardMenu urlCategory={props.urlCategory} />
    </Drawer>
  );
}
