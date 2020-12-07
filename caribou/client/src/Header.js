import React from "react";
import styled from "styled-components";
import reindeer from "./assets/reindeer.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Wrapper>
      <Link to="/">
        <Logo src={reindeer} alt="Caribou Logo" />
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 110px;
  display: flex;
  align-items: center;
  margin-left: 20px;
`;
const Logo = styled.img`
  height: 80px;
  width: 80px;
  filter: invert(7%) sepia(13%) saturate(6652%) hue-rotate(207deg)
    brightness(92%) contrast(108%);
  cursor: pointer;
`;

export default Header;
