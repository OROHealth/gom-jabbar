import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {register} from '../../actions/auth';

import Button from "../ui/Button";
import Input from "../ui/Input";
import Link from "../ui/Link";

function SignUp() {

  const PASSWORD_MIN_LENGTH = 8;

  const dispatch = useDispatch();
  const createdUser = useSelector(s => s.user.lastCreatedUser);

  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputPasswordConfirmation, setInputPasswordConfirmation] = useState('');

  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [passwordTooShort, setPasswordTooShort] = useState(false);

  useEffect(() => {
    setPasswordMismatch(inputPassword !== inputPasswordConfirmation && inputPasswordConfirmation.length > 0);
    setPasswordTooShort(inputPassword.length < PASSWORD_MIN_LENGTH && inputPasswordConfirmation.length > 0);
  }, [inputPassword, inputPasswordConfirmation, passwordMismatch]);

  return (
    <div className="SignUp">
      <h2>Inscription</h2>
      <div className="row">
        <div className="col-12 offset-md-2 col-md-8 offset-lg-3 col-lg-6">
          <div className={"formBlock"}>
            {(!createdUser || createdUser.username !== inputEmail) &&
            <div>
              <Input type="text" id="name" placeholder="Identifiant" value={inputEmail} onChange={text => setInputEmail(text)} />
              <Input type="password" id="name" placeholder="Mot de passe" value={inputPassword} onChange={text => setInputPassword(text)} />
              <Input type="password" id="name" placeholder="Confirmation du mot de passe" value={inputPasswordConfirmation} onChange={text => setInputPasswordConfirmation(text)} />
              <br/>
              {(passwordMismatch || passwordTooShort) &&
              <div className={"alertBlock"}>
                {passwordMismatch &&
                <p>Les mots de passe saisis ne correspondent pas.</p>
                }
                {passwordTooShort &&
                <p>Le mot de passe est trop court (minimum 8 caractères)</p>
                }
              </div>
              }
              <div className={"buttonsBlock"}>
                <Button onClick={() => {
                  if (!passwordMismatch) {
                    dispatch(register(inputEmail, inputPassword))
                  }
                }}>
                  S'inscrire
                </Button>
                <Link to="/">Retour</Link>
              </div>
            </div>
            }
            {createdUser && createdUser.username === inputEmail &&
            <div className={"buttonsBlock"}>
              <p>Bienvenue {createdUser.username} !</p>
              <Link to="/">Connectez-vous !</Link>
            </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
