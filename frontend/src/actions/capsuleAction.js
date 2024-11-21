import axios from "axios";
import {
  BREW_CAPSULE_REQUEST,
  BREW_CAPSULE_SUCCESS,
  BREW_CAPSULE_FAIL,
  GET_USER_CAPSULE_REQUEST,
  GET_USER_CAPSULE_SUCCESS,
  GET_USER_CAPSULE_FAIL,
  UPDATE_USER_CAPSULE_STATUS_REQUEST,
  UPDATE_USER_CAPSULE_STATUS_SUCCESS,
  UPDATE_USER_CAPSULE_STATUS_FAIL,
  DELETE_USER_CAPSULE_REQUEST,
  DELETE_USER_CAPSULE_SUCCESS,
  DELETE_USER_CAPSULE_FAIL,
  GET_PRIVATE_CAPSULE_REQUEST,
  GET_PRIVATE_CAPSULE_SUCCESS,
  GET_PRIVATE_CAPSULE_FAIL,
  GET_PUBLIC_CAPSULE_REQUEST,
  GET_PUBLIC_CAPSULE_SUCCESS,
  GET_PUBLIC_CAPSULE_FAIL,
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
      `https://digital-capsule-backend.vercel.app/capsule/create`,
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

    const { data } = await axios.get(`https://digital-capsule-backend.vercel.app/capsule/me`, config);

    dispatch(GET_USER_CAPSULE_SUCCESS(data));
  } catch (error) {
    dispatch(GET_USER_CAPSULE_FAIL({ msg: error.response?.data.message || error.message }));
  }
};

export const getPrivateCapsules = () => async (dispatch) => {
  try {
    dispatch(GET_PRIVATE_CAPSULE_REQUEST());

    const config = {
      withCredentials: true,
    };

    const { data } = await axios.get(`https://digital-capsule-backend.vercel.app/capsule/me/private`, config);

    dispatch(GET_PRIVATE_CAPSULE_SUCCESS(data));
  } catch (error) {
    dispatch(GET_PRIVATE_CAPSULE_FAIL({ msg: error.response?.data.message || error.message }));
  }
};

export const getPublicCapsules = () => async (dispatch) => {
  try {
    dispatch(GET_PUBLIC_CAPSULE_REQUEST());

    const config = {
      withCredentials: true,
    };

    const { data } = await axios.get(`https://digital-capsule-backend.vercel.app/capsule/me/public`, config);

    dispatch(GET_PUBLIC_CAPSULE_SUCCESS(data));
  } catch (error) {
    dispatch(GET_PUBLIC_CAPSULE_FAIL({ msg: error.response?.data.message || error.message }));
  }
};

export const updateCapsuleStatus = (capsuleIds) => async (dispatch) => {
  try {
    dispatch(UPDATE_USER_CAPSULE_STATUS_REQUEST());

    const config = {
      withCredentials: true,
    };

    // Passing the correct data in the payload
    const data = {
      capsuleIds, // Send the list of capsule IDs that need their status updated
    };
    await axios.put(`https://digital-capsule-backend.vercel.app/capsule/status/update`, data, config);

    dispatch(UPDATE_USER_CAPSULE_STATUS_SUCCESS());
  } catch (error) {
    dispatch(UPDATE_USER_CAPSULE_STATUS_FAIL({ msg: error.response?.data.message || error.message }));
  }
};

export const deleteCapsule = (capsuleId) => async (dispatch) => {
  try {
    dispatch(DELETE_USER_CAPSULE_REQUEST());

    const config = {
      withCredentials: true,
    };

    await axios.delete(`https://digital-capsule-backend.vercel.app/capsule/delete/${capsuleId}`, config);

    dispatch(DELETE_USER_CAPSULE_SUCCESS(capsuleId));
  } catch (error) {
    dispatch(DELETE_USER_CAPSULE_FAIL({ msg: error.response?.data.message || error.message }));
  }
};


export const clearErrors = () => (dispatch) => {
  dispatch(CLEAR_ERRORS());
};