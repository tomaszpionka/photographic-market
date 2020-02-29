import axios from 'axios';
import { AUTH_USER, AUTH_ERROR, CREATE_ITEM } from './types';
import items from "../apis/items";

export const signup = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(
      'http://localhost:8080/auth/signup',
      formProps
    );

    dispatch({ type: AUTH_USER, payload: response.data.token });
    localStorage.setItem('token', response.data.token);
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'Email in use' });
  }
};

export const signin = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(
      'http://localhost:8080/auth/signin',
      formProps
    );

    dispatch({ type: AUTH_USER, payload: response.data.token });
    localStorage.setItem('token', response.data.token);
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' });
  }
};

export const signout = () => {
  localStorage.removeItem('token');

  return {
    type: AUTH_USER,
    payload: ''
  };
};

// export const createitem = (formProps, callback) => async dispatch => {
//   try {
//     const response = await axios.post(
//       'http://localhost:8080/auth/items',
//       formProps
//     );

//     dispatch({ type: AUTH_USER, payload: response.data.token });
//     localStorage.setItem('token', response.data.token);
//     callback();
//   } catch (e) {
//     dispatch({ type: AUTH_ERROR, payload: 'items error' });
//   }
// };

// export const createItem = (formValues) => {
//   return async (dispatch) => {
//     items.post("/items", formValues);
//   }
// };

export const createItem = formValues => async dispatch => {
  const response = await items.post("/items", formValues);

  dispatch({ type: CREATE_ITEM, payload: response.data});
};