import { MenuItem, Select } from "@material-ui/core";

import Button from "@material-ui/core/Button";
import Calendar from "./Calendar";
import Dialog from "@material-ui/core/Dialog";
import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  form: {
    display: "flex",
    flexDirection: "column",
    padding: "25px 50px",
  },
  textField:{
    marginBottom:22
  },
  selectField:{
    marginTop:22,
  },
  formButton:{
    marginTop:22
  }
  
});

export default function CreateForm({
  date,
  error,
  onSubmit,
  handleTaskChange,
  handleInfoChange,
  handleDateChange,
  handleCategoryChange,
}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add A Task
      </Button>
      <Dialog open={open} onClose={handleClose}>
        {/* `<Typography variant="h4">Add A Task</Typography>` */}
        <form onSubmit={onSubmit} className={classes.form}>
          <TextField
            autoFocus
            id="name"
            placeholder="Task"
            type="text"
            className={classes.textField}
            onChange={handleTaskChange}
          />
          <TextField
            id="name"
            placeholder="Additional Info"
            type="text"
            className={classes.textField}
            onChange={handleInfoChange}
          />
          <Calendar onChange={handleDateChange} value={date} />
          <Select
            className={classes.selectField}
            onChange={handleCategoryChange}
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
          <Button className={classes.formButton} variant="outlined" color="primary" type="submit" onClick={handleClose} disabled={!error}>Create</Button>
          <Button className={classes.formButton} variant="outlined" color="primary" onClick={handleClose} >Cancel</Button>
          
        </form>
      </Dialog>
    </div>
  );
}
