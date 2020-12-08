import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <Wrapper>
      <p>Brought to you by the IHCH™</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 200px;
  p {
    width: 250px;
    font-size: large;
    margin: 60px 8px 20px auto;
  }
`;

export default Footer;
