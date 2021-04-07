import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
const Wrapper = styled.div`
  & {
    display: flex;
    margin-top: 12px;
  }
  p,
  a {
    font-size: 14px;
    margin: 8px;
  }
  a {
    text-decoration: none;
    color: black;
  }
`;
const AuthFormLink = (props) => {
  return (
    <Wrapper>
      <p>{props.text}</p>
      <Link to={props.url}>{props.action}</Link>
    </Wrapper>
  );
};

export default AuthFormLink;
