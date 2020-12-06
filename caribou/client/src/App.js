import Header from "./Header";
import styled from "styled-components";

function App() {
  return (
    <Wrapper>
      <Header />
      <div>Caribou</div>{" "}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: #f9f4ef;
  height: 100%;
`;

export default App;
