export const addOrdersToStore = (state, orders) => {
  return [...state, orders];
};

export const addUserToStore = (state, user) => {
  const newUsers = state.allUsers;
  newUsers.push(user);
  newUsers.sort(function (a, b) {
    if (a.username < b.username) {
      return -1;
    }
    if (a.username > b.username) {
      return 1;
    }
    return 0;
  });
  return { ...state, allUsers: newUsers };
};

export const clearFocus = (state) => {
  const allItems = state.allItems;
  allItems.forEach((a) => (a.focus = false));
  return { ...state, allItems };
};
