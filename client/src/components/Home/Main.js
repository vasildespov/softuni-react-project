import { React } from "react";
import Task from "../Tasks/Task";
import styled from "styled-components";

const Content = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Main = (props) => {
  return (
    <Content>
      {!props.noTasks &&
        props.tasks.map((x) => (
          <Task
            key={x._id}
            task={x.task}
            info={x.info}
            date={x.date}
            category={x.category}
            id={x._id}
            onDelete={props.onDelete}
          />
        ))}
    </Content>
  );
};
export default Main;
