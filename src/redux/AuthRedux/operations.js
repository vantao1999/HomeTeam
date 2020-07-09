import { createAsyncThunk } from '@reduxjs/toolkit';
import * as AuthApis from '../../api/auth';

export const login = createAsyncThunk('auth/login', async (data, { rejectWithValue }) => {
  try {
    const response = await AuthApis.login(data);
    return response?.data;
  } catch (err) {
    if (!err.data) {
      throw err;
    }
    return rejectWithValue(err.data);
  }
});

export const register = createAsyncThunk('auth/signup', async (data, { rejectWithValue }) => {
  try {
    const response = await AuthApis.register(data);
    return response?.data;
  } catch (err) {
    if (!err.data) {
      throw err;
    }

    return rejectWithValue(err.data);
  }
});

//HouseWife
export const houseRegister = createAsyncThunk(
  'housewifes/signup',
  async (data, { rejectWithValue }) => {
    try {
      const response = await AuthApis.houseRegisterApi(data);
      return response?.data;
    } catch (err) {
      if (!err.data) {
        throw err;
      }

      return rejectWithValue(err.data);
    }
  },
);

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (data, { rejectWithValue }) => {
    try {
      const response = await AuthApis.forgotPasswordApi(data);
      return response?.data;
    } catch (err) {
      if (!err.data) {
        throw err;
      }

      return rejectWithValue(err.data);
    }
  },
);

export const resetPassword = createAsyncThunk(
  'auth/confirmCode',
  async (data, { rejectWithValue }) => {
    try {
      const response = await AuthApis.resetPasswordApi(data);
      return response?.data;
    } catch (err) {
      if (!err.data) {
        throw err;
      }

      return rejectWithValue(err.data);
    }
  },
);

export const uploadImage = createAsyncThunk(
  'user/uploadFile',
  async (data, { rejectWithValue }) => {
    try {
      const response = await AuthApis.uploadFile(data);
      return response?.data;
    } catch (err) {
      if (!err.data) {
        throw err;
      }

      return rejectWithValue(err.data);
    }
  },
);

export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (data, { rejectWithValue, getState }) => {
    try {
      const accessToken = getState().auth.token;
      await AuthApis.setToken(accessToken);
      const response = await AuthApis.updateProfile(data);
      return response?.data;
    } catch (err) {
      if (!err.data) {
        throw err;
      }
      return rejectWithValue(err.data);
    }
  },
);

//Admin Doing
export const getFoods = createAsyncThunk('/foods', async (data, { rejectWithValue, getState }) => {
  try {
    const accessToken = getState().auth.token;
    await AuthApis.setToken(accessToken);

    const response = await AuthApis.getFoods(data);
    return response?.data;
  } catch (err) {
    if (!err) {
      throw err;
    }
    return rejectWithValue(err);
  }
});

export const getFood = createAsyncThunk('/foods', async (_id, { rejectWithValue, getState }) => {
  try {
    const accessToken = getState().auth.token;
    await AuthApis.setToken(accessToken);
    const response = await AuthApis.getFoodDetail(_id);
    return response?.data;
  } catch (err) {
    if (!err.data) {
      throw err;
    }
    return rejectWithValue(err.data);
  }
});

export const createOne = createAsyncThunk(
  'admin/createOne',
  async (data, { rejectWithValue, getState }) => {
    try {
      const accessToken = getState().auth.token;
      await AuthApis.setToken(accessToken);
      const response = await AuthApis.createOne(data);
      return response?.data;
    } catch (err) {
      if (!err.data) {
        throw err;
      }
      return rejectWithValue(err.data);
    }
  },
);

export const updateOne = createAsyncThunk(
  'admin/updateOne/',
  async (data, { rejectWithValue, getState }) => {
    try {
      const accessToken = getState().auth.token;
      await AuthApis.setToken(accessToken);
      const userData = {
        address: data && data.address ? data.address : data.user.address,
        phone: data && data.phone ? data.phone : data.user.phone,
        username: data && data.name ? data.name : data.user.username,
      };
      const response = await AuthApis.updateOne(data.userId, userData);
      return response?.data;
    } catch (err) {
      if (!err.data) {
        throw err;
      }
      return rejectWithValue(err.data);
    }
  },
);

export const disable = createAsyncThunk(
  'admin/disable/',
  async (data, { rejectWithValue, getState }) => {
    try {
      const accessToken = getState().auth.token;
      await AuthApis.setToken(accessToken);
      const response = await AuthApis.disable(data);
      return response?.data;
    } catch (err) {
      if (!err.data) {
        throw err;
      }
      return rejectWithValue(err.data);
    }
  },
);
