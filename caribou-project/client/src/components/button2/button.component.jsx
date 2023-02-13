import React from 'react';

// stylesheet
// import './button.styles.scss'
import { BaseButton, GoogleSignInButton, InvertedButton } from './button.styles.jsx';

export const BUTTON_TYPE_CLASSES = {
  base: 'base',
  google: 'google-sign-in',
  inverted: 'inverted',
};

// the buttons default style is from base
const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) =>
  ({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
  }[buttonType]);

// To show styling for different button, we are modifying the button style
// To do that we can create a variable storing an object with the keys being the type of buttons,
// If we get passed a string value of 'google' through the buttonType option in the parameters, We will target the BUTTON_TYPE_CLASSES key, which will be the google key, which will then return the value of that key which is the string associated with that specific key. which is 'google. and that will be added to the button class.

const Button = ({ children, buttonType, ...rest }) => {
  const CustomButton = getButton(buttonType);

  return <CustomButton {...rest}>{children}</CustomButton>;
};

export default Button;
