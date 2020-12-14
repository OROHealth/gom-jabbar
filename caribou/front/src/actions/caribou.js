import axios from "axios";
import config from "../config";

const registerCaribou = ({position}) => (dispatch) => {
  const {lat, lng} = position;
  return axios.post(`${config.API_HOST}/api/caribous`, {lat, lng}, {withCredentials: true})
    .then(() => dispatch(retrieveCaribous()));
};

const retrieveCaribous = () => (dispatch) => {
  return axios.get(`${config.API_HOST}/api/caribous`, {withCredentials: true})
    .then((response) => {
      dispatch({type: "CARIBOUS_RETRIEVED", data: response.data});
    });
};

export {
  registerCaribou,
  retrieveCaribous,
};
