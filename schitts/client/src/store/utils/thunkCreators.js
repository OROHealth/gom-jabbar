import axios from 'axios';
import { gotUser, gotAllUsers, setFetchingStatus } from '../user';
import { gotOrders } from '../orders';

// SERVER THUNK CREATORS

export const register = (credentials) => async (dispatch) => {
  try {
    const { data } = await axios.post('/auth/register', credentials);
    dispatch(gotUser(data));
  } catch (error) {
    console.error(error);
    dispatch(gotUser({ error: error.response.data.error || 'Server Error' }));
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
  try {
    const { data } = await axios.post('/api/orders/newOrder', credentials);
    console.log(data);
  } catch (error) {
    console.error(error);
    dispatch(gotOrders({ error: error.response.data.error || 'Server Error' }));
  }
};
