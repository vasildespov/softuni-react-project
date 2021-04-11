import React, { useContext, useEffect, useState } from "react";

import DashboardSidebar from "./DashboardSidebar";
import Main from "./Main";
import Success from "./Success";
import UserContext from "../../context/UserContext";
import axios from "axios";
import { format } from "date-fns";
import { getCookie } from "../../utils/Cookies";
import styled from "styled-components";
import { useHistory } from "react-router";

const DashboardPage = styled.div`
  display: flex;
  position: absolute;
  height: 100%;
  width: 100%;
`;
const Dashboard = () => {
  const history = useHistory();
  const context = useContext(UserContext)
  const urlCategory = history.location.pathname.split("/")[2];
  const formattedDate = format(new Date(), "LLL d kk:mm");
  const [success, setSuccess] = useState("");
  const [notify, setNotify] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(formattedDate);
  const [category, setCategory] = useState("");
  const filled = Boolean(task && category);
  const noTasks = !tasks || (tasks && tasks.length === 0);
  const token = getCookie();

  const clearData = () => {
    setTask("");
    setDescription("");
    setDate(formattedDate);
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
    setDate(format(e, "LLL d kk:mm"));
    console.log(date);
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
        console.log(`delete err`)
        getAllTasks();
      });
  };
  const handleUpdate = (task, data) => {
    
    axios
      .put(`/api/tasks/${task}`, data, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        clearData()
        setSuccess(res.data);
        setNotify(true);
        getAllTasks();
      })
      .catch((err) => {
        console.log(`update err`)
        getAllTasks();
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const author = context.user._id
    const object = { task, description, category, author };

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
      .post(
        "/api/tasks/getTasks",
        { urlCategory },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setTasks(res.data);
        console.log("fetched")
      })
      .catch((err) => {
        console.log(err.response.data);
        window.location.reload();
      });
  };
  useEffect(() => {
    getAllTasks();
    // eslint-disable-next-line
  }, [urlCategory]);

  return (
    <DashboardPage>
      <DashboardSidebar
        urlCategory={urlCategory}
        error={filled}
        date={date}
        onSubmit={handleSubmit}
        handleCategoryChange={handleCategoryChange}
        handleTaskChange={handleTaskChange}
        handleDescChange={handleDescChange}
      />
      <Main
        tasks={tasks}
        noTasks={noTasks}
        urlCategory={urlCategory}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />
      <Success
        message={success}
        notify={notify}
        handleClose={() => setNotify(false)}
      />
    </DashboardPage>
  );
};

export default Dashboard;
