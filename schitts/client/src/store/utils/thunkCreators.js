import axios from 'axios';
import {
  addUser,
  gotAllUsers,
  setFetchingStatusUser,
  setPostingUserStatus,
} from '../user';
import { gotOrders, setPostingOrderStatus } from '../orders';
import {
  gotItem,
  gotAllItems,
  clearItemFocus,
  setPostingItemStatus,
  removeItem,
  setFetchingStatusItem,
} from '../items';
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

// API CALLS

export const fetchUsers = () => async (dispatch) => {
  dispatch(setFetchingStatusUser(true));
  try {
    const { data } = await axios.get('/api/users');
    dispatch(gotAllUsers(data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setFetchingStatusUser(false));
  }
};

export const fetchItems = () => async (dispatch) => {
  dispatch(setFetchingStatusItem(true));
  try {
    const { data } = await axios.get('/api/items');
    dispatch(gotAllItems(data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setFetchingStatusItem(false));
  }
};

export const addItem = (credentials) => async (dispatch) => {
  dispatch(setPostingItemStatus(true));
  try {
    const { data } = await axios.post('/api/items/addItem', credentials);
    dispatch(setPostingItemStatus('added'));
    dispatch(gotItem(data));
  } catch (error) {
    console.error(error);
    dispatch(setPostingItemStatus('Something went wrong'));
  }
};

export const editItem = (credentials) => async (dispatch) => {
  dispatch(setPostingItemStatus(true));
  try {
    await axios.patch(
      `/api/items/editItem/${credentials.oldName}`,
      credentials
    );
    dispatch(setPostingItemStatus('edited'));
    dispatch(gotItem(credentials));
  } catch (error) {
    console.error(error);
    dispatch(setPostingItemStatus('Something went wrong'));
  }
};

export const deleteItem = (credentials) => async (dispatch) => {
  dispatch(setPostingItemStatus(true));
  try {
    await axios.delete(
      `/api/items/deleteItem/${credentials.name}`,
      credentials
    );
    dispatch(setPostingItemStatus('deleted'));
    dispatch(removeItem(credentials));
  } catch (error) {
    console.error(error);
    dispatch(setPostingItemStatus('Something went wrong'));
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
