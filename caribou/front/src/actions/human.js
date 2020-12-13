import axios from "axios";
import config from "../config";

const registerHuman = ({position, excitementLevel, trashingLevel}) => () => {
  const {lat, lng} = position;
  return axios.post(`${config.API_HOST}/api/humans`, {lat, lng, excitementLevel, trashingLevel}, {withCredentials: true});
};

export {
  registerHuman,
};
