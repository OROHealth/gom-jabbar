import React from "react";
import styled from "styled-components";
import reindeer from "./assets/reindeer.png";

const Header = () => {
  return (
    <Wrapper>
      <Logo src={reindeer} alt="Caribou Logo" />
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
`;

export default Header;
