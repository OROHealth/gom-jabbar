import React, { Component } from "react";
import AuthApiService from "./services/auth-api-service";
import TokenService from "./services/token-service";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      params: {
        registerUsername: "",
        registerPassword: "",
      },
    };
  }

  handleLoginSuccess = user => {
    window.location = '/homePage'
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { registerUsername, registerPassword } = event.target;
    this.setState({ error: null })
    AuthApiService.postUser({
      email: registerUsername.value,
      password: registerPassword.value,
    })

      .then(response => {
        registerUsername.value = ''
        registerPassword.value = ''
        TokenService.saveAuthToken(response.authToken)
        TokenService.saveUserId(response.id)
        window.location = '/homePage'
      })

      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  validateUsername(inputEmail) {
    let outputEmail = inputEmail;
    let mailformat = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\w{2,3})+$/;
    if (!inputEmail.match(mailformat)) {
      outputEmail = "";
    }
    return outputEmail;
  }

  validatePassword(inputPassword) {
    let outputPassword = inputPassword;
    // at least one number, one lowercase and one uppercase letter
    // at least eight characters that are letters, numbers or the underscore
    let passwordformat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{8,}$/;
    if (!inputPassword.match(passwordformat)) {
      outputPassword = "";
    }
    return outputPassword;
  }


  render() {
    const errorMessage = this.state.error ? (
      <p className="error-message">{this.state.error}</p>
    ) : (
        false
      );

    return (
      <section className="register-component">
        <div className="register-div">
          <h1 className="title">Caribou vs Humans</h1>
          <h2 className="subtitle">Create your account!</h2>
          <div className="form-div">
            <form className="register-form" onSubmit={this.handleSubmit}>
              {errorMessage}
              <label htmlFor="enter-username">Enter Username:</label>
              <input
                className="register-input"
                type="text"
                name="registerUsername"
                placeholder="ex:bruno-carib@orohealth.me"
                required
              />
              <label htmlFor="enter-password">Enter Password:</label>
              <input
                className="register-input"
                type="password"
                name="registerPassword"
                placeholder="password"
                required
              />
              <button type="submit" className="login-button">
                Register
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

export default Register;
