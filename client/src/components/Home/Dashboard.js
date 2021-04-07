import DashboardSidebar from "./DashboardSidebar";
import Main from "./Main";
import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router";

const DashboardPage = styled.div`
  height: 90vh;
  display: flex;
`;
const Dashboard = () => {
  const history = useHistory();
  const urlCategory = history.location.pathname.split("/")[2];

  return (
    <DashboardPage>
      <DashboardSidebar urlCategory={urlCategory} />
      <Main urlCategory={urlCategory} />
    </DashboardPage>
  );
};

export default Dashboard;
