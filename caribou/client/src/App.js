import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./LandingPage";
import Login from './Login';
import Register from './Register';
import Navbar from "./Navbar";
import About from "./About";
import Tracker from "./Tracker";
import LiveChat from "./LiveChat";
// import Data from "./Data"
// import ReadChat from "./ReadChat";

class App extends Component {
  state = {
    chat: []
  };

  componentDidMount() {
    fetch("https://dummy-api.com/api/posts")
      // if the api returns data ...
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong, please try again later.");
        }
        // ... convert it to json
        return res.json();
      })
      // use the json api output
      .then((data) => {
        //check if there is meaningful data

        this.setState({
          post: data,
        });
      })
      .catch((err) => {
        console.error(err);
        this.setState({
          error: err.message
        })
      });
  }

  addPost = (post) => {
    this.setState({
      chat: [...this.state.posts, post],
    });
  }

  render() {
    return (
      <div className="App">
        <main>
          <div>
            <BrowserRouter>
              <Switch>
                <Route exact path="/landingPage" component={LandingPage} />
                {/* FOR FUTURE ROUTING */}
                {/*  <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route exact path="/" component={About} />*/}
              </Switch>
              <Login />
              <Register />
            </BrowserRouter>
            <Navbar />
            <About />
            <Tracker />
            <LiveChat
              addPost={this.addPost}
            />

          </div>
        </main>
      </div>
    );
  }
}
export default App;
