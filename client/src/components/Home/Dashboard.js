import React, { useEffect, useState } from "react";

import DashboardSidebar from "./DashboardSidebar";
import Main from "./Main";
import Success from "./Success";
import axios from "axios";
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
  const urlCategory = history.location.pathname.split("/")[2];

  const [success, setSuccess] = useState("");
  const [notify, setNotify] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [info, setInfo] = useState("");
  const [date, setDate] = useState(new Date());
  const [category, setCategory] = useState("");
  const filled = Boolean(task && date && category);
  const noTasks = !tasks || (tasks && tasks.length === 0);
  const token = getCookie();

  const clearData = () => {
    setTask("");
    setInfo("");
    setDate(new Date().toLocaleString());
    setCategory("");
  };
  const handleTaskChange = (e) => {
    setTask(e.target.value);
    
  };
  const handleInfoChange = (e) => {
    setInfo(e.target.value);
    
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
        console.log(res.data);
        getAllTasks();
      })
      .catch((err) => console.log(err.response.data));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const object = { task, info, date, category };

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
        handleTaskChange={handleTaskChange}
        handleInfoChange={handleInfoChange}
        handleDateChange={handleDateChange}
        handleCategoryChange={handleCategoryChange}
      />
      <Main
        tasks={tasks}
        noTasks={noTasks}
        urlCategory={urlCategory}
        onDelete={handleDelete}
        
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
