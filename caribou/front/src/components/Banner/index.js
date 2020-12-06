import './styles.css';

import logo from '../../assets/images/caribou.svg';

const Banner = () => {
  return (
    <div className="banner">
      <img src={logo} className="logo" alt="logo" />
      <h1>CaribouCo</h1>
    </div>
  );
};

export default Banner;
