import { avatarColors } from '@services/utils/static.data';

import { floor, random } from 'lodash';

export class UtilsService {
  static APP_ENVIRONMENT = 'develop';

  // generate avatar colors
  static avatarColor() {
    return avatarColors[floor(random(0.9) * avatarColors.length)];
  }

  // generate avatar Image - first letter of username/email
  // text - This is the first letter of the username
  // backgroundColor - background color of the canvas
  // foregroundColor - The text color
  static profileImage(text, backgroundColor, foregroundColor = 'white') {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // The backgroundColor setup
    canvas.width = 200;
    canvas.height = 200;

    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Drawing text on top of the canvas bgColor
    context.font = 'normal 80px sans-serif';
    context.fillStyle = foregroundColor;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(text, canvas.width / 2, canvas.height / 2);

    // convert the canvas now to Base64 String
    // this is all I need to generate a canvas
    return canvas.toDataURL('image/png');
  }

  // static dispatch(result, pageReload, dispatch, setUser) {
  //   dispatch(changeLoginOrRegister({ loginTab: false }));
  // }
}
