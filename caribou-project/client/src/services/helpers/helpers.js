import { removeUser } from '@redux/reducers/user/user.reducer';
import { colors } from '@services/utils/static.data';
import { floor, random } from 'lodash';

export const avatarColor = () => {
  return colors[floor(random(0.9) * colors.length)];
};

export const generateAvatar = (text, backgroundColor, foregroundColor = 'white') => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  canvas.width = 200;
  canvas.height = 200;

  context.fillStyle = backgroundColor;
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Draw text
  context.font = 'normal 80px sans-serif';
  context.fillStyle = foregroundColor;
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(text, canvas.width / 2, canvas.height / 2);

  return canvas.toDataURL('image/png');
};

export const clearStore = ({ dispatch, deleteStorageUser, setLoggedIn }) => {
  dispatch(removeUser());
  deleteStorageUser();
  setLoggedIn(false);
};
