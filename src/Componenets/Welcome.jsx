import React, { Fragment } from "react";
import styled from "styled-components";
export default function Welcome({ currentUser }) {
  if (currentUser === undefined) {
    return <Fragment />;
  }
  return (
    <StyledDiv>
      <h1>
        Welcome, <span>{currentUser.name}!</span>
      </h1>
      <h3>Please Select a Chat to Start Messaging</h3>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: white;
  margin-top: 2rem;

  span {
    color: #8147fc;
    font-size: 1.75rem;
  }
`;
