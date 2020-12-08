import React, { useContext } from "react";
import styled from "styled-components";
import reindeer from "./assets/reindeer.png";
import { Link, useHistory } from "react-router-dom";
import { CurrentUserContext } from "./CurrentUserContext";

const Header = () => {
  const history = useHistory();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const handleLogout = () => {
    setCurrentUser(null);
    history.push("/");
  };
  return (
    <Wrapper>
      <Link to={currentUser === null ? "/" : "/map"}>
        <Logo src={reindeer} alt="Caribou Logo" />
      </Link>
      {currentUser !== null && (
        <>
          {" "}
          <Link to="/map">Map</Link>
          <Link to="/chat">Chat</Link>
          <p onClick={handleLogout}>Logout</p>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 110px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  justify-content: space-between;
  a {
    font-size: x-large;
    font-weight: bold;
    color: #020826;
    text-decoration: none;
  }
  p {
    font-size: large;
    font-weight: bold;
    color: #020826;
    cursor: pointer;
  }
`;
const Logo = styled.img`
  height: 80px;
  width: 80px;
  filter: invert(7%) sepia(13%) saturate(6652%) hue-rotate(207deg)
    brightness(92%) contrast(108%);
  cursor: pointer;
`;

export default Header;
