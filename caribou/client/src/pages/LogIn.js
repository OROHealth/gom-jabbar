import React, { useState } from "react";
import styled from "styled-components";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  return (
    <Wrapper>
      <Title>Log In</Title>
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
        <Button>Log In</Button>
      </Box>
    </Wrapper>
  );
};

const Title = styled.div`
  font-size: xx-large;
  font-weight: bold;
  margin: 30px 0 40px 20px;
`;
const Button = styled.button``;
const Input = styled.input`
  border: none;
  border-bottom: 3px solid #020826;
  width: auto;
  font-size: large;
  padding: 8px;
  outline: none;
`;
const Wrapper = styled.div`
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Box = styled.div`
  width: 300px;
  height: 250px;
  border-radius: 12px;
  background-color: #fffffe;
  border: 4px solid #020826;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export default LogIn;
