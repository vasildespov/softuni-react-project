import React, { useContext, useEffect, useState } from "react";

import DashboardSidebar from "./DashboardSidebar";
import Main from "./Main";
import Success from "./Success";
import UserContext from "../../context/UserContext";
import axios from "axios";
import { getCookie } from "../../utils/Cookies";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  [theme.breakpoints.down("sm")]: {
    wrapper: {
      flexDirection: "column",
    },
  },
}));
const Dashboard = () => {
  const classes = useStyles();
  const history = useHistory();
  const context = useContext(UserContext);
  const urlCategory = history.location.pathname.split("/")[2];
  const [success, setSuccess] = useState("");
  const [notify, setNotify] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(null);
  const [category, setCategory] = useState("");
  const filled = Boolean(task && category);
  const [empty, setEmpty] = useState(false);
  const token = getCookie();
  const clearData = () => {
    setTask("");
    setDescription("");
    setCategory("");
  };
  const handleTaskChange = (e) => {
    setTask(e.target.value);
  };
  const handleDescChange = (e) => {
    setDescription(e.target.value);
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  const handleDateChange = (e) => {
    setDate(e);
  };
  const handleDelete = (task) => {
    axios
      .delete(`/api/tasks/${task}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setSuccess(res.data);
        setNotify(true);
        getAllTasks();
      })
      .catch((err) => {
        console.log(`delete err`);
        getAllTasks();
      });
  };
  const handleUpdate = (task, data) => {
    axios
      .put(`/api/tasks/${task}`, data, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        clearData();
        setSuccess(res.data);
        setNotify(true);
        getAllTasks();
      })
      .catch((err) => {
        console.log(`update err`);
        getAllTasks();
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const author = context.user._id;
    const object = {
      task,
      description,
      category,
      author,
      due_date: date,
    };

    axios
      .post("/api/tasks/create", object, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setSuccess(res.data.message);
        setNotify(true);
        clearData();
        getAllTasks();
      })
      .catch((err) => {
        console.log(`Creation Form Submit Error : ${err.response.data}`);
      });
  };

  const getAllTasks = async () => {
    await axios
      .get("/api/tasks/getTasks", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const tasks = res.data;
        context.categories = [];
        tasks.forEach((x) => {
          if (!context.categories.includes(x.category)) {
            context.categories.push(x.category);
          }
        });

        if (urlCategory) {
          setTasks(
            tasks.filter(
              (x) => x.category.replaceAll(/\s/g, "") === urlCategory
            )
          );
        } else {
          setEmpty(true);
          setTasks(tasks);
        }
      })
      .catch((err) => {
        console.log(err);
        window.location.reload();
      });
  };
  useEffect(() => {
    getAllTasks();
  }, [urlCategory]);

  return (
    <div className={classes.wrapper}>
      <DashboardSidebar
        urlCategory={urlCategory}
        error={filled}
        date={date}
        onSubmit={handleSubmit}
        handleCategoryChange={handleCategoryChange}
        handleTaskChange={handleTaskChange}
        handleDescChange={handleDescChange}
        handleDateChange={handleDateChange}
      />
      <Main
        empty={empty}
        tasks={tasks}
        urlCategory={urlCategory}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />
      <Success
        message={success}
        notify={notify}
        handleClose={() => setNotify(false)}
      />
    </div>
  );
};

export default Dashboard;
