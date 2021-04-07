import { React, useEffect, useState } from "react";

import CreateForm from "../Tasks/FormTask";
import axios from "axios";
import cookie from "js-cookie";

const Main = (props) => {
  const urlCategory = props.urlCategory;
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [info, setInfo] = useState("");
  const [date, setDate] = useState(new Date());
  const [category, setCategory] = useState("");
  const filled = Boolean(task  && date && category)
  console.log(filled)
  const noTasks = !tasks || (tasks && tasks.length === 0);

  const token = cookie.get("token");
  const clearData = () => {
    setTask("")
    setInfo("")
    setDate(new Date().toLocaleString())
    setCategory("")
  }
  const handleTaskChange = (e) => {
    setTask(e.target.value);
    console.log(task);
  };
  const handleInfoChange = (e) => {
    setInfo(e.target.value);
    console.log(info);
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    console.log(category);
  };
  const handleDateChange = (e) => {
    setDate(e);
    console.log(date);
  };

  const handleSubmit = (e) => {
    
    e.preventDefault()
    const object = { task, info, date, category };

    axios
      .post("/api/tasks/create", object, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        clearData()
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
        
        console.log(err.response);
      });
  };
  useEffect(() => {
    getAllTasks();
    // eslint-disable-next-line
  }, [urlCategory]);
  return (
    <>
      <CreateForm
        error={filled}
        date={date}
        onSubmit={handleSubmit}
        handleTaskChange={handleTaskChange}
        handleInfoChange={handleInfoChange}
        handleDateChange={handleDateChange}
        handleCategoryChange={handleCategoryChange}
      />
      <div>
        {!noTasks &&
          tasks.map((x) => (
            <h1 key={x._id}>
                Task: {x.task} Category:{x.category} Date:{x.date}
            </h1>
          ))} 
      </div>
    </>
  );
};
export default Main;
