import React from "react";
import styled from "styled-components";

const StyledForm = styled.form`
  & {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 320px;
    margin:100px auto;
    padding: 20px 0;
    border: 2px solid #3f51b5;

    h2 {
      padding-bottom: 20px;
    }
  }

  input {
    padding: 10px;
    font-size: 17px;
  }

  button {
    width: 120px;
    font-size: 16px;
    color: white;
    align-self: center;
  }
`;
const Form = (props) => {
  return <StyledForm onSubmit={props.onSubmit}>{props.children}</StyledForm>;
};

export default Form;
