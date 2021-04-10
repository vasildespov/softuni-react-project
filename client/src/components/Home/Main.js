import MaterialTable from "material-table";
import React from "react";
import { tableIcons } from "../../utils/Icons";
const Main = (props) => {
  return (
    <MaterialTable
    title="Tasks"
    options={{
        pageSize:5,
        paginationType:"stepped",
        pageSizeOptions:[5,10],
        
    }}
    style={{width:"90%", overflowX:"auto"}}
      icons={tableIcons}
      columns={[
        { title: "TASK", field: "task" },
        { title: "CATEGORY", field: "category" },
        { title: "DATE", field: "date", type: "datetime" },
        { title: "INFO", field: "info" },
      ]}
      data={props.tasks}
    />
  );
};

export default Main;
