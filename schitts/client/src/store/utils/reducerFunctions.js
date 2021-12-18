export const addOrdersToStore = (state, orders) => {
  return [...state, orders];
};

export const clearFocus = (state) => {
  const allItems = state.allItems;
  allItems.forEach((a) => (a.focus = false));
  return { ...state, allItems };
};
