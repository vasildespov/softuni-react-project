import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { DateTimePicker } from '@material-ui/pickers';
import MaterialTable from 'material-table';
import React from 'react';
import { format } from 'date-fns';
import { tableIcons } from '../../utils/Icons';

const Main = (props) => {
  return (
    <MaterialTable
      title=""
      options={{
        pageSize: 5,
        search: true,
        paginationType: 'stepped',
        pageSizeOptions: [5, 10],
        loadingType: 'linear',
        rowStyle: { fontSize: '14px' },
        headerStyle: { fontSize: '10px', textTransform: 'uppercase' },
        thirdSortClick: false,
        searchFieldStyle:{width:"180px"}
      }}
      localization={{
        header: {
          actions: '',
        },

        body: {
          editRow: {
            deleteText: 'Are you sure you want to delete this task?',
            saveTooltip: 'Confirm',
          },
          emptyDataSourceMessage: 'No tasks have been added yet.',
        },
      }}
      style={{ width: '100%', overflowX: 'auto' }}
      icons={tableIcons}
      columns={[
        {
          title: 'TASK',
          field: 'task',
          validate: (rowData) => rowData.task !== '',
        },
        {
          title: 'DUE DATE',
          field: 'due_date',
          type: 'datetime',
          filtering: false,

          render: (rowData) => {
            if (rowData.due_date !== null) {
              return format(new Date(rowData.due_date), 'LLL d kk:mm');
            } else {
              return <CalendarTodayIcon />;
            }
          },
          editComponent: (props) => (
            <DateTimePicker
              ampm={false}
              disablePast
              format="LLL d kk:mm"
              onChange={(e) => props.onChange(e)}
              value={props.rowData.due_date}
              clearable
            />
          ),
        },
        {
          title: 'CATEGORY',
          field: 'category',
          validate: (rowData) => rowData.category !== '',
        },
        {
          title: 'DATE CREATED',
          field: 'date_created',
          editable: 'never',
        },
        {
          title: 'DESCRIPTION',
          field: 'description',
          emptyValue: 'Description',
          render: (rowData) => {
            if (rowData.description === '') {
              return 'Add Description';
            }
            return `${rowData.description.substring(0, 10)}...`;
          },
        },
      ]}
      data={props.tasks}
      cellEditable={{
        onCellEditApproved: async (newValue, oldValue, rowData, columnDef) => {
          if (
            (newValue !== oldValue && newValue !== '') ||
            (columnDef.field === 'description' &&
              newValue !== oldValue &&
              rowData.description !== 'Add A Description')
          ) {
            rowData[columnDef.field] = newValue;
            props.onUpdate(rowData._id, rowData);
          }
        },
      }}
      editable={{
        onRowDelete: async (task) => {
          props.onDelete(task._id);
        },
        // onRowUpdate: async (newData, oldData) => {

        //   if (newData) {
        //     props.onUpdate(oldData._id, newData);
        //     console.log(newData);
        //   }
        // },
      }}
      detailPanel={[
        {
          tooltip: 'Description',
          render: (rowData) => {
            if (rowData.description) {
              return (
                <p style={{ textAlign: 'center', padding: '10px' }}>
                  {rowData.description}
                </p>
              );
            } else {
              return (
                <p style={{ textAlign: 'center', padding: '10px' }}>
                  No description has been added for this task.
                </p>
              );
            }
          },
        },
      ]}
    />
  );
};

export default Main;
