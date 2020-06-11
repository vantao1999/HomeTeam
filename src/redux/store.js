import React from 'react';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider as PaperProvider } from 'react-native-paper';
// import AppTheme from '../themes/appTheme';
// import Icon from 'react-native-vector-icons/FontAwesome5Pro';

// We'll use redux-logger just as an example of adding another middleware
import logger from 'redux-logger';

import reducer from './reducers';
import reduxPersist from '../config/ReduxPersist';

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(logger);
}

const persistedReducer = persistReducer(reduxPersist, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
});

const persistor = persistStore(store);

export const withReduxProvider = (C) => (props) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <C {...props} />
    </PersistGate>
  </Provider>
);
