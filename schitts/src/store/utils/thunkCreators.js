import axios from 'axios';
import { gotUser, setFetchingStatus } from '../user';
import { gotOrders } from '../orders';

// SERVER THUNK CREATORS

export const fetchUsers = () => async (dispatch) => {
  dispatch(setFetchingStatus(true));
  try {
    const { data } = await axios.get('/auth/users');
    dispatch(gotUser(data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setFetchingStatus(false));
  }
};

export const register = (credentials) => async (dispatch) => {
  try {
    const { data } = await axios.post('/auth/register', credentials);
    dispatch(gotUser(data));
  } catch (error) {
    console.error(error);
    dispatch(gotUser({ error: error.response.data.error || 'Server Error' }));
  }
};

export const login = (credentials) => async (dispatch) => {
  try {
    const { data } = await axios.post('/auth/login', credentials);
    dispatch(gotUser(data));
  } catch (error) {
    console.error(error);
    dispatch(gotUser({ error: error.response.data.error || 'Server Error' }));
  }
};

export const logout = (id) => async (dispatch) => {
  try {
    await axios.delete('/auth/logout');
    dispatch(gotUser({}));
  } catch (error) {
    console.error(error);
  }
};

// FETCH ORDERS AND DATA

export const fetchOrders = (credentials) => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/orders', credentials);
    dispatch(gotOrders(data));
  } catch (error) {
    console.error(error);
    dispatch(gotOrders({ error: error.response.data.error || 'Server Error' }));
  }
};
