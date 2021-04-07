import { Drawer, makeStyles } from "@material-ui/core";

import DashboardMenu from "./DashboardMenu.js";
import React from "react";

const useStyles = makeStyles({
  paper: {
    top: "unset",
    position: "relative",
    width: "250px",
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
      <DashboardMenu urlCategory={props.urlCategory} />
    </Drawer>
  );
}
