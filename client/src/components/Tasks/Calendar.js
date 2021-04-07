import { DateTimePicker } from "@material-ui/pickers";
import React from "react";

const Calendar = (props) => {
  return (
    <>
      <DateTimePicker emptyLabel="Date" required  variant="inline"  ampm={false} disablePast onChange={props.onChange} value={props.value}/>
    </>
  );
};

export default Calendar;
