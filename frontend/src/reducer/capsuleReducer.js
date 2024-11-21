import { createSlice } from "@reduxjs/toolkit";

export const capsuleReducer = createSlice({
    name: "capsule",
    initialState: {
        capsule: {},
        loading: false,
        recieved: null,
        error: null,
    },
    reducers: {
        BREW_CAPSULE_REQUEST: (state) => {
            state.loading = true;
            state.error = null;
        },
        BREW_CAPSULE_SUCCESS: (state, action) => {
            state.loading = false;
            state.recieved = true,
                state.capsule = action.payload;
            state.error = null;
        },
        BREW_CAPSULE_FAIL: (state, action) => {
            state.loading = false;
            state.recieved = false,
                state.capsule = null;
            state.error = action.payload;
        },
        GET_USER_CAPSULE_REQUEST: (state) => {
            state.loading = true;
            state.error = null;
        },
        GET_USER_CAPSULE_SUCCESS: (state, action) => {
            state.loading = false;
            state.recieved = true,
                state.capsule = action.payload;
            state.error = null;
        },
        GET_USER_CAPSULE_FAIL: (state, action) => {
            state.loading = false;
            state.recieved = false,
                state.capsule = null;
            state.error = action.payload;
        },
        GET_PRIVATE_CAPSULE_REQUEST: (state) => {
            state.loading = true;
            state.error = null;
        },
        GET_PRIVATE_CAPSULE_SUCCESS: (state, action) => {
            state.loading = false;
            state.recieved = true,
                state.capsule = action.payload;
            state.error = null;
        },
        GET_PRIVATE_CAPSULE_FAIL: (state, action) => {
            state.loading = false;
            state.recieved = false,
                state.capsule = null;
            state.error = action.payload;
        },
        GET_PUBLIC_CAPSULE_REQUEST: (state) => {
            state.loading = true;
            state.error = null;
        },
        GET_PUBLIC_CAPSULE_SUCCESS: (state, action) => {
            state.loading = false;
            state.recieved = true,
                state.capsule = action.payload;
            state.error = null;
        },
        GET_PUBLIC_CAPSULE_FAIL: (state, action) => {
            state.loading = false;
            state.recieved = false,
                state.capsule = null;
            state.error = action.payload;
        },
        UPDATE_USER_CAPSULE_STATUS_REQUEST: (state) => {
            state.loading = true;
            state.error = null;
        },
        UPDATE_USER_CAPSULE_STATUS_SUCCESS: (state, action) => {
            state.loading = false;
            state.error = null;
        },
        UPDATE_USER_CAPSULE_STATUS_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        EDIT_USER_CAPSULE_REQUEST: (state) => {
            state.loading = true;
            state.error = null;
        },
        EDIT_USER_CAPSULE_SUCCESS: (state, action) => {
            state.loading = false;
            state.error = null;
        },
        EDIT_USER_CAPSULE_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        DELETE_USER_CAPSULE_REQUEST: (state) => {
            state.loading = true;
            state.error = null;
        },
        DELETE_USER_CAPSULE_SUCCESS: (state, action) => {
            state.loading = false;
            state.capsule = state.capsule.filter(capsule => capsule._id !== action.payload.capsuleId);
            state.error = null;
        },
        DELETE_USER_CAPSULE_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        CLEAR_ERRORS: (state) => {
            state.error = null;
            state.recieved = null;
        },
    }
});

export const {
    BREW_CAPSULE_REQUEST,
    BREW_CAPSULE_SUCCESS,
    BREW_CAPSULE_FAIL,
    GET_USER_CAPSULE_REQUEST,
    GET_USER_CAPSULE_SUCCESS,
    GET_USER_CAPSULE_FAIL,
    GET_PRIVATE_CAPSULE_REQUEST,
    GET_PRIVATE_CAPSULE_SUCCESS,
    GET_PRIVATE_CAPSULE_FAIL,
    GET_PUBLIC_CAPSULE_REQUEST,
    GET_PUBLIC_CAPSULE_SUCCESS,
    GET_PUBLIC_CAPSULE_FAIL,
    UPDATE_USER_CAPSULE_STATUS_REQUEST,
    UPDATE_USER_CAPSULE_STATUS_SUCCESS,
    UPDATE_USER_CAPSULE_STATUS_FAIL,
    EDIT_USER_CAPSULE_REQUEST,
    EDIT_USER_CAPSULE_SUCCESS,
    EDIT_USER_CAPSULE_FAIL,
    DELETE_USER_CAPSULE_REQUEST,
    DELETE_USER_CAPSULE_SUCCESS,
    DELETE_USER_CAPSULE_FAIL,
    CLEAR_ERRORS,
} = capsuleReducer.actions;