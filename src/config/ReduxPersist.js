import AsyncStorage from '@react-native-community/async-storage';

const transformerConfig = {
  whitelistPerReducer: {
    app: ['isSkip', 'language'],
  },
};

const reduxPersist = {
  key: 'root',
  storage: AsyncStorage,
  version: 1,
  whitelist: ['app', 'auth'],
  blacklist: [],
};

export default reduxPersist;
