import { Drawer, makeStyles, useMediaQuery, useTheme } from "@material-ui/core";

import Button from "@material-ui/core/Button";
import CreateForm from "../Tasks/FormTask";
import DashboardNavigation from "./DashboardMenu.js";
import React from "react";

const useStyles = makeStyles((theme) => ({
  paper: {
    top: "unset",
    position: "relative",
    width: 240,
    [theme.breakpoints.down("sm")]: {
      width: 100,
    },
    zIndex: 0,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
}));
export default function DashboardSidebar(props) {
  const classes = useStyles();
  const theme = useTheme();
  const breakpoint = useMediaQuery(theme.breakpoints.down("sm"));
  const [state, setState] = React.useState(false);
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
  };

  return (
    <>
      {breakpoint && (
        <Button
          style={{ alignSelf: "center", margin: "10px 0" }}
          variant="outlined"
          color="primary"
          size="small"
          onClick={toggleDrawer("left", true)}
        >
          Menu
        </Button>
      )}
      <Drawer
        variant={breakpoint ? "temporary" : "permanent"}
        anchor="left"
        open={state}
        onClose={toggleDrawer("left", false)}
        classes={{
          paperAnchorDockedLeft: classes.paper,
        }}
      >
        <CreateForm
          categories={props.categories}
          category={props.category}
          error={props.error}
          date={props.date}
          onSubmit={props.onSubmit}
          handleTaskChange={props.handleTaskChange}
          handleDescChange={props.handleDescChange}
          handleDateChange={props.handleDateChange}
          handleCategoryChange={props.handleCategoryChange}
        />
        <DashboardNavigation urlCategory={props.urlCategory} />
      </Drawer>
    </>
  );
}
