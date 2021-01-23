import React from 'react';
import {NavLink} from 'react-router-dom';
import cus from '../styles/assets/customer.png';
import hom from '../styles/assets/home.png';
import stat from '../styles/assets/statistic.png';

import {StyleNavbar, StyleLogo} from '../styles/styled-components/StyleNavbar';

const Navbar = () => {
    return (
        <StyleNavbar>
            <nav>
                <div className="nav-wrapper">
                    <div>
                        <StyleLogo href="#!" className="brand-logo"> 
                            <span>Schitt's Creek Cafe Tropical</span>
                        </StyleLogo>
                    </div>
                    <div className="navIcon">
                        <NavLink to ="/">
                            <img id="img1" src={hom} alt="home"/>
                        </NavLink>
                        <NavLink to ="/customer">
                            <img id="img2" src={cus} alt="customer"/>
                        </NavLink>
                        <NavLink to ="/statistic">
                            <img id="img3" src={stat} alt="statistic"/>
                        </NavLink>
                    </div>
                </div>
            </nav>
        </StyleNavbar>
    );
};

export default Navbar;