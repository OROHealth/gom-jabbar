import React, { useState } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { Button, Input, Title } from "../StyledComponents";

const LogIn = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleLogin = () => {
    history.push("/map");
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
        <Button onClick={handleLogin}>Log In</Button>
      </Box>
      <Footer>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </Footer>
    </Wrapper>
  );
};

const Footer = styled.div`
  margin-top: auto;
  margin-bottom: 15px;
  a {
    text-decoration: none;
    color: #020826;
  }
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
