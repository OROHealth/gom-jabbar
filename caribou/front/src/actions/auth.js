import axios from "axios";
import config from "../config";

const register = (inputEmail, inputPassword, callback) => (dispatch) => {
  axios.post(`${config.HOST}/api/accessProfile`, {username: inputEmail, password: inputPassword})
    .then((result) => {
      dispatch({type: "RESET_ERROR"});
      callback(result.data);
    })
    .catch((error) => {
      dispatch({type: "RESET_ERROR"});
      dispatch({type: "SET_ERROR", errorType: "REGISTRATION_ERROR", error: error.response});
    });
};

const login = (inputEmail, inputPassword) => (dispatch) => {
  return axios.post(`${config.HOST}/api/oauth/login`, {username: inputEmail, password: inputPassword, grant_type: 'password'}, {withCredentials: true})
    .then((response) => {
      dispatch({type: "RESET_ERROR"});
      dispatch({type: "REGISTER_USER", user: {email: inputEmail}});
      dispatch({type: "REGISTER_TOKEN", token: response.data.access_token});
    })
    .catch((error) => {
      dispatch({type: "SET_ERROR", errorType: "LOGIN_ERROR", error: error.response});
    });
};

export {
  login,
  register,
};
