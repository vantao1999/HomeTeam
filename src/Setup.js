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
    console.log('Loggogogogo',user);

    if (user) {
      if (user.role === 'user') {
        NavigationUtils.startMainContent();
      } else {
        NavigationUtils.startMainHouseContent();
      }
    } else {
      NavigationUtils.startLoginContent();
    }
  } catch (err) {
    console.log(err);
  }
};
