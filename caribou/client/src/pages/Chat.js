import React from "react";
import styled from "styled-components";

const Chat = () => {
  return (
    <Wrapper>
      <Box>
        <p>Hey Bruno!</p>
        <p>
          Sorry about the missing chat page 😅. I know some of my code for this
          project may not be optimal, all of this is new to me. If you're a bit
          on the fence right now about hiring me, I truly believe you would not
          regret it if you do. Not gonna lie, the first couple weeks to months
          might be a bit rocky, but what I lack in experience I make up for in
          passion and quick learning. I really think that long term I will be an
          incredible asset for your team, I somehow feel I was born to code...
        </p>
        <p>
          Regardless of what you choose, I thank you for this opportunity and
          wish you the best of luck in the future! OROHealth is bound to
          succeed, I truly believe that!
        </p>
        <p>-Matthew</p>
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
  height: 380px;
  border-radius: 12px;
  background-color: #fffffe;
  border: 4px solid #020826;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export default Chat;
