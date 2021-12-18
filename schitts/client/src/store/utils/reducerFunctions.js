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

export const addItemToStore = (state, item) => {
  const newItems = state.allItems;
  const newFoods = state.food;
  const newDrinks = state.drinks;

  const found = newItems.findIndex((a) => a.name === item.oldName);
  const foundFood = newFoods.findIndex((a) => a.name === item.oldName);
  const foundDrink = newDrinks.findIndex((a) => a.name === item.oldName);
  if (found !== -1) {
    newItems[found] = item;
    newFoods[foundFood] = item;
    newDrinks[foundDrink] = item;
  } else {
    newItems.push(item);
    newItems.sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });

    if (item.type === 'food') {
      newFoods.push(item);
      newFoods.sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    }

    if (item.type === 'drink') {
      newDrinks.push(item);
      newDrinks.sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    }
  }

  return { ...state, allItems: newItems, food: newFoods, drinks: newDrinks };
};

export const removeItemFromStore = (state, item) => {
  const newItems = state.allItems;
  const newFoods = state.food;
  const newDrinks = state.drinks;

  const allFilter = newItems.filter((a) => a.name !== item.name);
  const foodFilter = newFoods.filter((a) => a.name !== item.name);
  const drinksFilter = newDrinks.filter((a) => a.name !== item.name);

  return {
    ...state,
    allItems: allFilter,
    food: foodFilter,
    drinks: drinksFilter,
  };
};

export const clearFocus = (state) => {
  const allItems = state.allItems;
  allItems.forEach((a) => (a.focus = false));
  return { ...state, allItems };
};
