import React from 'react';
import {Link} from "react-router-dom";

import "./button.css";
import "./link.css";

function NavLink(props) {
  return (
    <Link className="button" to={props.to}>{props.children}</Link>
  );
}

export default NavLink;
