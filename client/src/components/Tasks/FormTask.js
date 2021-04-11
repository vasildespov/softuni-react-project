import { MenuItem, Select } from "@material-ui/core";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  wrapper: {
    margin: "10px auto",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    padding: "25px 50px",
  },
  textField: {
    marginBottom: 22,
  },
  selectField: {
    marginTop: 22,
  },
  formButton: {
    marginTop: 22,
  },
});

export default function CreateForm(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.wrapper}>
      <Button
        className={classes.toggle}
        color="primary"
        onClick={handleClickOpen}
      >
        Add A Task
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={props.onSubmit} className={classes.form}>
          <TextField
            autoComplete="off"
            autoFocus
            placeholder="Task"
            type="text"
            className={classes.textField}
            onChange={props.handleTaskChange}
          />
          <TextField
            autoComplete="off"
            placeholder="Description"
            type="text"
            className={classes.textField}
            onChange={props.handleDescChange}
          />
          
          <Select
            className={classes.selectField}
            onChange={props.handleCategoryChange}
            defaultValue="none"
          >
            <MenuItem value="none" disabled>
              Category
            </MenuItem>
            <MenuItem value="Personal">Personal</MenuItem>
            <MenuItem value="Work">Work</MenuItem>
            <MenuItem value="Study">Study</MenuItem>
            <MenuItem value="Chores">Chores</MenuItem>
          </Select>
          <Button
            className={classes.formButton}
            variant="outlined"
            color="primary"
            type="submit"
            onClick={handleClose}
            disabled={!props.error}
          >
            Create
          </Button>
          <Button
            className={classes.formButton}
            variant="outlined"
            color="primary"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </form>
      </Dialog>
    </div>
  );
}
