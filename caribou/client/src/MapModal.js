import React from "react";
import styled, { keyframes } from "styled-components";
import { Button } from "./components/index";

const MapModal = ({
  trashingLevel,
  setTrashingLevel,
  excitementLevel,
  setExcitementLevel,
  humanModal,
  setHumanModal,
  handleAddHuman,
}) => {
  const handleTrash = (event) => {
    //only allow numbers, no text
    setTrashingLevel(event.target.value.replace(/[^0-9]/g, ""));
  };
  const handleExcitement = (event) => {
    setExcitementLevel(event.target.value.replace(/[^0-9]/g, ""));
  };

  return (
    <ModalBox active={humanModal}>
      <Modal className={"shell"}>
        <h3 onClick={() => setHumanModal(false)}>X</h3>
        <h2>You saw a trashy human?!?</h2>
        <p>Tell us more...</p>
        <p>Trashing level: </p>
        <input
          type="text"
          maxLength="2"
          placeholder="(0-99)"
          value={trashingLevel}
          onChange={handleTrash}
        />
        <p>Excitement level: </p>
        <input
          type="text"
          maxLength="2"
          placeholder="(0-99)"
          value={excitementLevel}
          onChange={handleExcitement}
        />
        <Button onClick={handleAddHuman}>Submit</Button>
      </Modal>
    </ModalBox>
  );
};

const fadeIn = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;
const ModalBox = styled.div`
  position: absolute;
  top: 0;
  z-index: 2;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  ${({ active }) =>
    active === true
      ? `
    display: flex;
  `
      : `
    display: none;
  `}
  align-items: center;
  justify-content: center;
  .shell {
    animation: ${fadeIn} 500ms;
  }
`;
const Modal = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 10px;
  position: relative;
  padding: 18px;
  h2 {
    font-weight: bold;
    font-size: large;
    margin-bottom: 4px;
  }
  h3 {
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
    font-weight: bold;
  }
  p {
    margin-bottom: 4px;
  }
  input {
    width: 40px;
    margin: 10px 80px 10px 0;
  }
`;

export default MapModal;
