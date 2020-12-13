import axios from "axios";
import config from "../config";

const registerCaribou = ({position}) => () => {
  const {lat, lng} = position;
  return axios.post(`${config.API_HOST}/api/caribous`, {lat, lng}, {withCredentials: true});
};

export {
  registerCaribou,
};
