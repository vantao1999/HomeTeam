import * as RNLocalize from 'react-native-localize';
import { getData } from './utils/PersistUtil';
import { actions } from './redux/AppRedux';
import { registerScreens, NavigationUtils } from './navigation';
import { iconsLoaded } from './utils/AppIcons';
import { store } from './redux/store';

// Here some global listeners could be placed
// ...

export const startApp = async () => {
  registerScreens();
  try {
    const resIcons = await iconsLoaded;
    // Config i18n, if project don't use it. Just remove this line below
    // configI18n();
    console.log(resIcons);
    const isSkip = store.getState().app.isSkip;
    console.log('isSkip', isSkip);

    if (!isSkip) {
      NavigationUtils.startIntoContent();
      return;
    }
    const user = store.getState().auth.user;

    if (user) {
      NavigationUtils.startMainContent();
    } else {
      NavigationUtils.startLoginContent();
    }
  } catch (err) {
    console.log(err);
  }
};
