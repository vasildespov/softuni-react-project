import Calendar from "./Calendar";
import React from "react";

const TaskForm = ({
  value,
  onSubmit,
  handleTaskChange,
  handleInfoChange,
  handleDateChange,
  handleCategoryChange,
}) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="task" onChange={handleTaskChange} />
        <input type="text" placeholder="info" onChange={handleInfoChange} />
        <Calendar onChange={handleDateChange} value={value} />
        <input
          type="text"
          placeholder="category"
          onChange={handleCategoryChange}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default TaskForm;
