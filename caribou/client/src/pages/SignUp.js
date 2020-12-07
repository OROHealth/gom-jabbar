import React, { useState } from "react";
import styled from "styled-components";
import { Button, Input, Title } from "../StyledComponents";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleConfirm = (event) => {
    setConfirm(event.target.value);
  };
  const handleSignUp = () => {};
  return (
    <Wrapper>
      <Title>Sign Up</Title>
      <Box>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmail}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePassword}
        />
        <Input
          type="password"
          placeholder="Confirm password"
          value={confirm}
          onChange={handleConfirm}
        />
        <Button>Sign up</Button>
      </Box>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Box = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 12px;
  background-color: #fffffe;
  border: 4px solid #020826;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export default SignUp;
