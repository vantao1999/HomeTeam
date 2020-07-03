import * as RNLocalize from 'react-native-localize';
import { getData } from './utils/PersistUtil';
import { actions } from './redux/AppRedux';
import { registerScreens, NavigationUtils } from './navigation';
import { iconsLoaded } from './utils/AppIcons';
import { store } from './redux/store';

export const startApp = async () => {
  registerScreens();
  try {
    const resIcons = await iconsLoaded;
    console.log(resIcons);
    const isSkip = store.getState().app.isSkip;
    console.log('isSkip', isSkip);

    if (!isSkip) {
      NavigationUtils.startIntoContent();
      return;
    }
    const user = store.getState().auth.user;
    console.log('LOG USEr', user);

    if (user) {
      if (user.users.role === 'user') {
        NavigationUtils.startMainContent();
      } else {
        if (user.users.role === 'housewife') {
          NavigationUtils.startMainAdminContent();
        }
      }
    } else {
      NavigationUtils.startLoginContent();
    }
  } catch (err) {
    console.log(err);
  }
};
