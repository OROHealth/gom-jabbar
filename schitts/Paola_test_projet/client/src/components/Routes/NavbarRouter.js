import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Home from '../../pages/Home';
import Customers from '../../pages/Customers';
import Statistic from '../../pages/Statistic';
import Navbar from '../Navbar';

const index = () => {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/customer" exact component={Customers}/>
                <Route path="/statistic" exact component={Statistic} />
                <Redirect to ="/"/>
            </Switch>
        </Router>
    );
};

export default index;