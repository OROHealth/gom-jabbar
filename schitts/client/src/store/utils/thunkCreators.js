import axios from 'axios';
import {
  addUser,
  gotAllUsers,
  setFetchingStatus,
  setPostingUserStatus,
} from '../user';
import { gotOrders, setPostingOrderStatus } from '../orders';
import { gotAllItems, clearItemFocus } from '../items';
import { setPostingCustomerStatus } from '../customer';

// SERVER THUNK CREATORS

export const register = (credentials) => async (dispatch) => {
  dispatch(setPostingUserStatus(true));
  try {
    const { data } = await axios.post('/auth/register', credentials);
    dispatch(setPostingUserStatus('success'));
    dispatch(addUser(data));
  } catch (error) {
    console.error(error);
    dispatch(setPostingUserStatus('Something went wrong'));
  }
};

// FETCH ORDERS AND DATA

export const fetchUsers = () => async (dispatch) => {
  dispatch(setFetchingStatus(true));
  try {
    const { data } = await axios.get('/api/users');
    dispatch(gotAllUsers(data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setFetchingStatus(false));
  }
};

export const fetchItems = () => async (dispatch) => {
  dispatch(setFetchingStatus(true));
  try {
    const { data } = await axios.get('/api/items');
    dispatch(gotAllItems(data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setFetchingStatus(false));
  }
};

export const fetchOrders = (credentials) => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/orders', credentials);
    dispatch(gotOrders(data));
  } catch (error) {
    console.error(error);
    dispatch(gotOrders({ error: error.response.data.error || 'Server Error' }));
  }
};

export const postOrder = (credentials) => async (dispatch) => {
  dispatch(setPostingOrderStatus(true));
  try {
    await axios.post('/api/orders/newOrder', credentials);
    dispatch(setPostingOrderStatus('success'));
    dispatch(clearItemFocus());
  } catch (error) {
    console.error(error);
    dispatch(setPostingOrderStatus('Something went wrong'));
  }
};

export const postCustomer = (credentials) => async (dispatch) => {
  dispatch(setPostingCustomerStatus(true));
  try {
    await axios.post('/api/customer/newCustomer', credentials);
    dispatch(setPostingCustomerStatus('success'));
  } catch (error) {
    console.error(error);
    dispatch(setPostingCustomerStatus('Something went wrong'));
  }
};
