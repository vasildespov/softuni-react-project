import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({});

export default function ErrorAlert(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  return (
    <div className={classes.root}>
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
              style={{width:"100%"}}
            >
              <CloseIcon />
            </IconButton>
          }
          severity="error"
        >
          {props.alertMessage}
        </Alert>
      </Collapse>
    </div>
  );
}
