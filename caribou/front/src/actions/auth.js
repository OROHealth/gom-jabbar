import axios from "axios";
import config from "../config";

const register = (inputEmail, inputPassword) => (dispatch) => {
  axios.post(`${config.HOST}/api/accessProfile`, {username: inputEmail, password: inputPassword})
    .then((response) => {
      dispatch({type: "REGISTER_USER", user: response.data});
    });
};

const login = (inputEmail, inputPassword) => (dispatch) => {
  return axios.post(`${config.HOST}/api/oauth/login`, {username: inputEmail, password: inputPassword, grant_type: 'password'}, {withCredentials: true})
    .then((response) => {
      dispatch({type: "REGISTER_TOKEN", token: response.data.access_token});
    });
};

export {
  login,
  register,
};
