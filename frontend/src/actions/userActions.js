import axios from "axios";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL,
  CLEAR_ERRORS, 
} from "../reducer/userReducer.js";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(LOGIN_REQUEST());

    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    const { data } = await axios.post(
      `https://digital-capsule-backend.vercel.app/user/login`,
      { email, password },
      config
    );

    dispatch(LOGIN_SUCCESS(data));
  } catch (error) {
    dispatch(LOGIN_FAIL({ msg: error.response?.data.message || error.message }));
  }
};

// Register Action
export const register = (userData) => async (dispatch) => {
  try {
    dispatch(REGISTER_USER_REQUEST());

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    };

    const { data } = await axios.post(
      `https://digital-capsule-backend.vercel.app/user/register`,
      userData,
      config
    );

    dispatch(REGISTER_USER_SUCCESS(data));
  } catch (error) {
    dispatch(REGISTER_USER_FAIL({ msg: error.response?.data.message || error.message }));
  }
};

// Load User Action
export const loadUser = () => async (dispatch) => {
  try {
    dispatch(LOAD_USER_REQUEST());

    const config = {
      withCredentials: true,
    };

    const { data } = await axios.get(`https://digital-capsule-backend.vercel.app/user/me`, config);

    dispatch(LOAD_USER_SUCCESS(data));
  } catch (error) {
    dispatch(LOAD_USER_FAIL({ msg: error.response?.data.message || error.message }));
  }
};

//logout
export const logoutUser = () => async (dispatch) => {
  try {
    dispatch(LOGOUT_USER_REQUEST());

     const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      }
    };
    
    await axios.post(`https://digital-capsule-backend.vercel.app/user/logout`, {}, config);
    
    dispatch(LOGOUT_USER_SUCCESS());
    
  } catch (error) {
    dispatch(LOGOUT_USER_FAIL({ msg: error.response?.data.message || error.message }));
  }
};

// Clear Errors Action
export const clearErrors = () => (dispatch) => {
  dispatch(CLEAR_ERRORS());
};
