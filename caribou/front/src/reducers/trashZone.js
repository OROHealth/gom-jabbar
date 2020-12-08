import * as R from "ramda";

const initialState = {
  radius: 500,
  lat: 48.5908666,
  lng: 7.7045304,
  notifications: [],
};

const TrashZoneReducer = function(previousState = initialState, action) {
  const newState = R.clone(previousState);
  switch (action.type) {
    case "NOTIFY_HUMAN_MOVE":
      const newNotificationsArray = R.clone(newState.notifications);
      newNotificationsArray.push({id: action.humanId, move: action.move});
      return R.assoc("notifications", newNotificationsArray, newState);
    case "CLEAR_HUMAN_MOVE_NOTIFICATION":
      const clearedNotificationsArray = newState.notifications.filter((notification) => {
        return notification.id !== action.humandId && notification.move !== action.move;
      });
      return R.assoc("notifications", clearedNotificationsArray, newState);
    default:
      return previousState;
  }
};

export default TrashZoneReducer;
