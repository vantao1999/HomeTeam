import { createAsyncThunk } from '@reduxjs/toolkit';
import * as AuthApis from '../../api/auth';

//LogOut
export const logOut = createAsyncThunk('user/logout', async () => {
  return true;
});

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

// export const uploadImage = createAsyncThunk(
//   'user/uploadFile',
//   async (data, { rejectWithValue }) => {
//     try {
//       const response = await AuthApis.uploadFile(data);
//       return response?.data;
//     } catch (err) {
//       if (!err.data) {
//         throw err;
//       }

//       return rejectWithValue(err.data);
//     }
//   },
// );

export const updateProfile = createAsyncThunk(
  'auth/updateProfile/phone',
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

export const getFoodNorth = createAsyncThunk(
  '/foods/north',
  async (data, { rejectWithValue, getState }) => {
    try {
      const accessToken = getState().auth.token;
      await AuthApis.setToken(accessToken);
      const response = await AuthApis.getFoodNorth();
      return response?.data;
    } catch (err) {
      if (!err) {
        throw err;
      }
      return rejectWithValue(err);
    }
  },
);

export const getFoodSouth = createAsyncThunk(
  '/foods/south',
  async (data, { rejectWithValue, getState }) => {
    try {
      const accessToken = getState().auth.token;
      await AuthApis.setToken(accessToken);
      const response = await AuthApis.getFoodSouth();
      return response?.data;
    } catch (err) {
      if (!err) {
        throw err;
      }
      return rejectWithValue(err);
    }
  },
);

export const getFoodCentral = createAsyncThunk(
  '/foods/central',
  async (data, { rejectWithValue, getState }) => {
    try {
      const accessToken = getState().auth.token;
      await AuthApis.setToken(accessToken);
      const response = await AuthApis.getFoodCentral();
      return response?.data;
    } catch (err) {
      if (!err) {
        throw err;
      }
      return rejectWithValue(err);
    }
  },
);

export const getProfile = createAsyncThunk(
  '/auth/me',
  async (data, { rejectWithValue, getState }) => {
    try {
      const accessToken = getState().auth.token;
      await AuthApis.setToken(accessToken);
      const response = await AuthApis.getMe('');
      return response?.data;
    } catch (err) {
      if (!err.data) {
        throw err;
      }
      return rejectWithValue(err.data);
    }
  },
);
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

//Oder
export const createOrder = createAsyncThunk('/oders/create', async (data, { rejectWithValue, getState }) => {
  try {
    const accessToken = getState().auth.token;
    await AuthApis.setToken(accessToken);
    const response = await AuthApis.createOrderApi(data);
    return response?.data;
  } catch (err) {
    if (!err.data) {
      throw err;
    }
    return rejectWithValue(err.data);
  }
});