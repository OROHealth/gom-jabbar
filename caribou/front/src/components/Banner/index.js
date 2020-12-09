import {useDispatch} from "react-redux";

import Button from "../ui/Button";

import './styles.css';
import logo from '../../assets/images/caribou.svg';
import LogoutIcon from "../../assets/images/exit.svg";

const Banner = ({isConnected}) => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch({type: "REMOVE_TOKEN"});
  };

  return (
    <div className="banner">
      <img src={logo} className="logo" alt="logo" />
      <h1>CaribouCo</h1>
      {isConnected &&
      <img className={"logout"} alt="logout" src={LogoutIcon} onClick={logout}/>
      }
    </div>
  );
};

export default Banner;
