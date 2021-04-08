import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    margin: "10px 0 10px 0",
  },
});

export default function Task(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title}>
          Task:{props.task} Category:{props.category} Date:{props.date}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" variant="outlined">
          Complete
        </Button>
        <Button size="small" color="secondary" variant="outlined">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
