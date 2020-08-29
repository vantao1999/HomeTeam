import { createSlice } from '@reduxjs/toolkit';
import * as operations from './operations';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    logInErr: null,
    loading: false,
    location: null,
    fcmToken: null,
    token: null,
    listFood: [],
    listOrders: [],
  },
  reducers: {
    login: (state, action) => {},
    register: (state, action) => {},
    getMe: (state, action) => {
      state.user = action.data;
    },
    logout: (state) => {
      state.user = null;
      state.token = null; // Using user to check at Setup file
    },
    updateProfile: (state) => {},
  },
  extraReducers: {

    [operations.logOut.fulfilled]: (state) => {
      state.user = null;
      state.token = null;
    },

    [operations.login.pending]: (state) => {
      state.loading = true;
    },
    [operations.login.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.user = payload.users;
      state.token = payload.token;
    },
    [operations.login.rejected]: (state) => {
      state.loading = false;
    },
    //User Register
    [operations.register.pending]: (state) => {
      state.loading = true;
    },
    [operations.register.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.user = payload;
    },
    [operations.register.rejected]: (state) => {
      state.loading = false;
    },

    //houseWife Register
    [operations.houseRegister.pending]: (state) => {
      state.loading = true;
    },
    [operations.houseRegister.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.user = payload;
    },
    [operations.houseRegister.rejected]: (state) => {
      state.loading = false;
    },

    [operations.updateProfile.pending]: (state) => {
      state.loading = true;
    },
    [operations.updateProfile.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.user = payload[0];
    },
    [operations.updateProfile.rejected]: (state, {payload}) =>{
      state.loading = false;
      state.logInErr = payload.message;
    },

    [operations.getFoods.pending]: (state) => {
      state.loading = true;
    },
    [operations.getFoods.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.listFood = payload;
    },
    [operations.getFoods.rejected]:(state)=>{
      state.loading = false;
    },

    [operations.getFoodNorth.pending]: (state) => {
      state.loading = true;
    },
    [operations.getFoodNorth.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.listFood = payload;
    },
    [operations.getFoodNorth.rejected]:(state)=>{
      state.loading = false;
    },

    [operations.getOrder.pending]: (state) => {
      state.loading = true;
    },
    [operations.getOrder.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.listOrders = payload;
    },
    [operations.getOrder.rejected]:(state)=>{
      state.loading = false;
    }
  },
});

export const { actions, reducer } = authSlice;
export default reducer;
