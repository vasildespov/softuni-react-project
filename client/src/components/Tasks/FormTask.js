import Button from '@material-ui/core/Button';
import { DateTimePicker } from '@material-ui/pickers';
import Dialog from '@material-ui/core/Dialog';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles({
  wrapper: {
    margin: '10px auto',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: '25px 50px',
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
            required
            type="text"
            className={classes.textField}
            onChange={props.handleTaskChange}
          />
          <TextField
            autoComplete="off"
            placeholder="Description (Optional)"
            type="text"
            className={classes.textField}
            onChange={props.handleDescChange}
          />
          {/* <TextField
            autoComplete=""
            placeholder="Category"
            name="category"
            required
            type="text"
            className={classes.textField}
            onChange={props.handleCategoryChange}
          /> */}
          <Autocomplete
            options={props.categories}
            freeSolo
            clearOnBlur
            clearOnEscape
            value={props.category}
            onChange={props.handleCategoryChange}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Category"
                type="text"
                className={classes.textField}
                value={props.category}
                onChange={props.handleCategoryChange}
              />
            )}
          />
          <DateTimePicker
            label="Due Date (Optional)"
            ampm={false}
            disablePast
            format="LLL d kk:mm"
            onChange={props.handleDateChange}
            value={props.date}
            clearable
          />

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
