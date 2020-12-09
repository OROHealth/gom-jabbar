import React, {useState} from 'react';
import {useDispatch} from "react-redux";

import {login} from '../../actions/auth';

import Input from "../ui/Input";
import Button from "../ui/Button";
import Link from "../ui/Link";

function Login() {

  const dispatch = useDispatch();

  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  return (
    <div className="Login">
      <div className="row">
        <div className="col-12 offset-md-2 col-md-8 offset-lg-3 col-lg-6">
          <div className={"formBlock"}>
            <Input type="text" placeholder="Identifiant" value={inputEmail} onChange={text => setInputEmail(text)} />
            <Input type="password" placeholder="Mot de passe" value={inputPassword} onChange={text => setInputPassword(text)} />
            <br/>
            <div className={"buttonsBlock"}>
              <Button onClick={() => dispatch(login(inputEmail, inputPassword))}>Se connecter</Button>
              <Link to="/signup">S'inscrire</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
