import { MenuItem, Select } from "@material-ui/core";
import React, { useState } from "react";

import { DateTimePicker } from "@material-ui/pickers";
import MaterialTable from "material-table";
import { format } from "date-fns";
import { tableIcons } from "../../utils/Icons";

const Main = (props) => {
  return (
    <MaterialTable
      title={props.urlCategory ? props.urlCategory : "All Tasks"}
      options={{
        pageSize: 5,
        search: true,
        filtering: true,
        paginationType: "stepped",
        pageSizeOptions: [5, 10],
        loadingType: "linear",
        rowStyle: { fontSize: "14px" },
        headerStyle: { fontSize: "10px", textTransform: "uppercase" },
        thirdSortClick: false,
        // toolbar: false,
      }}
      localization={{
        header: {
          actions: "",
        },

        body: {
          editRow: {
            deleteText: "Are you sure you want to delete this task?",
            saveTooltip: "Confirm",
          },
          emptyDataSourceMessage: "No tasks have been added yet.",
        },
      }}
      style={{ width: "100%", overflowX: "auto" }}
      icons={tableIcons}
      columns={[
        { title: "TASK", field: "task" },
        {
          title: "DUE DATE",
          field: "due_date",
          type: "datetime",
          filtering: false,
          render: (rowData) => {
            return format(new Date(rowData.due_date), "LLL d kk:mm");
          },
          editComponent: (props) => (
            <DateTimePicker
              ampm={false}
              disablePast
              format="LLL d kk:mm"
              onChange={(e) => props.onChange(e)}
              value={props.rowData.due_date}
            />
          ),
        },
        {
          title: "CATEGORY",
          field: "category",

          editComponent: (props) => (
            <Select
              defaultValue="none"
              onChange={(e) => props.onChange(e.target.value)}
            >
              <MenuItem value="none" disabled>
                Category
              </MenuItem>
              <MenuItem value="Personal">Personal</MenuItem>
              <MenuItem value="Work">Work</MenuItem>
              <MenuItem value="Study">Study</MenuItem>
              <MenuItem value="Chores">Chores</MenuItem>
            </Select>
          ),
        },
        {
          title: "DATE CREATED",
          field: "date_created",
          editable: "never",
        },
        {
          title: "DESCRIPTION",
          field: "description",
        },
      ]}
      data={props.tasks}
      editable={{
        onRowDelete: async (task) => {
          props.onDelete(task._id);
        },
        onRowUpdate: async (newData, oldData) => {
          props.onUpdate(oldData._id, newData);
          console.log(newData);
        },
      }}
    />
  );
};

export default Main;
