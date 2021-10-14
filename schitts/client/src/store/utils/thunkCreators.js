import axios from 'axios';
import {
  gotWaiters,
  gotItems,
  gotFeedback,
  addItem,
  addFeedback,
  gotOrders,
  gotCustomers,
} from '../index';

export const fetchWaiters = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/waiters');
    dispatch(gotWaiters(data));
  } catch (error) {
    console.error(error);
  }
};

export const fetchItems = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/items');

    const food = data.filter((a) => a.type === 'Food');
    const drinks = data.filter((a) => a.type === 'Drink');
    const mocktails = data.filter((a) => a.type === 'Mocktail');

    dispatch(gotItems(data, drinks, food, mocktails));
  } catch (error) {
    console.error(error);
  }
};

export const fetchFeedback = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/feedback');
    dispatch(gotFeedback(data));
  } catch (error) {
    console.error(error);
  }
};

export const fetchOrder = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/order');
    dispatch(gotOrders(data));
  } catch (error) {
    console.error(error);
  }
};

export const fetchCustomers = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/customers');
    dispatch(gotCustomers(data));
  } catch (error) {
    console.error(error);
  }
};

export const postItem = (body) => async (dispatch) => {
  try {
    const { data } = await axios.post('/api/items', body);
    if (data.Added) dispatch(addItem(data.Added));
  } catch (error) {
    console.error(error);
  }
};

export const postOrder = async (body) => {
  try {
    await axios.post('/api/order', body);
  } catch (error) {
    console.error(error);
  }
};

export const postCustomer = async (body) => {
  try {
    await axios.post('/api/customer', body);
  } catch (error) {
    console.error(error);
  }
};

export const postFeedback = (body) => async (dispatch) => {
  try {
    const { data } = await axios.post('/api/feedback', body);
    if (data.Added) dispatch(addFeedback(data.Added));
  } catch (error) {
    console.error(error);
  }
};
