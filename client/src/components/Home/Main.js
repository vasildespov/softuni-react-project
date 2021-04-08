import { React } from "react";
import styled from "styled-components";

import Task from "../Tasks/Task";

const Content = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Main = (props) => {
  return (
    <Content>
      {!props.noTasks &&
        props.tasks.map((x) => (
          <Task key={x._id} task={x.task} info={x.info} date={x.date} category={x.category} />
        ))}
    </Content>
  );
};
export default Main;
