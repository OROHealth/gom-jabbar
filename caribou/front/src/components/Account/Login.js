import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {login} from '../../actions/auth';

import Input from "../ui/Input";
import Button from "../ui/Button";
import Link from "../ui/Link";

function Login() {

  const dispatch = useDispatch();

  const error = useSelector(s => s.error);
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  const submitLogin = () => {
    dispatch(login(inputEmail, inputPassword));
  };

  return (
    <div className="Login">
      <div className="row">
        <div className="col-12 offset-md-2 col-md-8 offset-lg-3 col-lg-6">
          <div className={"formBlock"}>
            <Input type="text" placeholder="Identifiant" value={inputEmail} onChange={text => setInputEmail(text)} />
            <Input type="password" placeholder="Mot de passe" value={inputPassword} onChange={text => setInputPassword(text)} />
            <br/>
            {error.errorType &&
            <div className={"alertBlock"}>
              <p>Une erreur est survenue, merci de vérifier votre saisie</p>
            </div>
            }
            <div className={"buttonsBlock"}>
              <Button onClick={submitLogin}>Se connecter</Button>
              <Link to="/signup">S'inscrire</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
