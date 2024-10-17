import { createSlice } from "@reduxjs/toolkit";

export const userReducer = createSlice({
  name: "user",
  initialState: {
    user: {},
    loading: false,
    isAuthenticated: false,
    error: null,
  },
  reducers: {
    LOGIN_REQUEST: (state) => {
      state.loading = true;
      state.isAuthenticated = false;
      state.error = null; // Clear previous errors when starting new login request
    },
    LOGIN_SUCCESS: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null; // Clear any errors on success
    },
    LOGIN_FAIL: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload; 
    },
    REGISTER_USER_REQUEST: (state) => {
      state.loading = true;
      state.isAuthenticated = false;
      state.error = null; 
    },
    REGISTER_USER_SUCCESS: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null; 
    },
    REGISTER_USER_FAIL: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload; 
    },
    LOAD_USER_REQUEST: (state) => {
      state.loading = true;
      state.isAuthenticated = false;
      state.error = null; 
    },
    LOAD_USER_SUCCESS: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null; 
    },
    LOAD_USER_FAIL: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload; 
    },
    CLEAR_ERRORS: (state) => {
      state.error = null; 
    },
  },
});

export const {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  CLEAR_ERRORS, // Export CLEAR_ERRORS for dispatching
} = userReducer.actions;