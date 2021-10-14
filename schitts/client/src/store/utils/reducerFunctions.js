export const setWaiterState = (state, waiters) => {
  return { ...state, waiters: waiters };
};

export const setItemState = (state, payload) => {
  const { items, drinks, food, mocktails } = payload;
  return {
    ...state,
    items: items,
    drinks: drinks,
    food: food,
    mocktails: mocktails,
  };
};

export const setOrderState = (state, orders) => {
  return { ...state, orders: orders };
};

export const addItemToStore = (state, item) => {
  const newItem = [...state.items, item];
  return { ...state, items: newItem };
};

export const setFeedbackState = (state, feedback) => {
  return { ...state, feedback: feedback };
};

export const addFeedbackToStore = (state, feedback) => {
  const newFeedback = [...state.feedback, feedback];
  return { ...state, feedback: newFeedback };
};

export const setCustomerState = (state, customers) => {
  return { ...state, customers: customers };
};
