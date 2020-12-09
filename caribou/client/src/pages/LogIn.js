import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { Button, Input, Title } from "../components/index";
import { CurrentUserContext } from "../CurrentUserContext";

const LogIn = () => {
  const { setCurrentUser } = useContext(CurrentUserContext);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleLogin = () => {
    fetch("/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setCurrentUser(data.data);
          history.push("/map");
        } else {
          setErrorMessage("Invalid username/password");
        }
      });
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
      {errorMessage !== null && <Error>{errorMessage}</Error>}
      <Footer>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </Footer>
    </Wrapper>
  );
};

const Error = styled.div`
  margin-top: 15px;
  padding: 10px;
  background-color: white;
  border-radius: 20px;
  border: 3px solid red;
`;
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
