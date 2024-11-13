import axios from "axios";
import {BREW_CAPSULE_REQUEST,
    BREW_CAPSULE_SUCCESS,
    BREW_CAPSULE_FAIL,
    GET_USER_CAPSULE_REQUEST,
    GET_USER_CAPSULE_SUCCESS,
    GET_USER_CAPSULE_FAIL,
    UPDATE_USER_CAPSULE_STATUS_REQUEST,
    UPDATE_USER_CAPSULE_STATUS_SUCCESS,
    UPDATE_USER_CAPSULE_STATUS_FAIL,
    CLEAR_ERRORS
  } from "../reducer/capsuleReducer.js";

export const brewCapsule = (capsuleData) => async (dispatch) => {
  try {
    dispatch(BREW_CAPSULE_REQUEST());

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    };

    const { data } = await axios.post(
      `https://digital-capsule.onrender.com/capsule/create`,
      capsuleData,
      config
    );

    dispatch(BREW_CAPSULE_SUCCESS(data));
  } catch (error) {
    dispatch(BREW_CAPSULE_FAIL({ msg: error.response?.data.message || error.message }));
  }
};

export const getUserCapsules = () => async (dispatch) => {
  try {
    dispatch(GET_USER_CAPSULE_REQUEST());

    const config = {
      withCredentials: true,
    };

    const { data } = await axios.get(`https://digital-capsule.onrender.com/capsule/me`, config);

    dispatch(GET_USER_CAPSULE_SUCCESS(data));
  } catch (error) {
    dispatch(GET_USER_CAPSULE_FAIL({ msg: error.response?.data.message || error.message }));
  }
};

export const updateCapsuleStatus = (userId) => async (dispatch) => {
  try {
    dispatch(UPDATE_USER_CAPSULE_STATUS_REQUEST());

    const config = {
      withCredentials: true,
    };
    
    const formData = new FormData();
    formData.append("userId", userId);
    await axios.put(`https://digital-capsule.onrender.com/capsule/me`,userId,config);

    dispatch(UPDATE_USER_CAPSULE_STATUS_SUCCESS());
  } catch (error) {
    dispatch(UPDATE_USER_CAPSULE_STATUS_FAIL({ msg: error.response?.data.message || error.message }));
  }
};

export const clearErrors = () => (dispatch) => {
  dispatch(CLEAR_ERRORS());
};