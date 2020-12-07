import Header from "./Header";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Map from "./pages/Map";
import Chat from "./pages/Chat";

function App() {
  return (
    <Wrapper>
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={LogIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/map" component={Map} />
          <Route path="/chat" component={Chat} />
        </Switch>
      </Router>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: #f9f4ef;
  height: 100%;
`;

export default App;
