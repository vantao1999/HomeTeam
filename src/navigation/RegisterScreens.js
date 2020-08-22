import { Navigation } from 'react-native-navigation';
import { withReduxProvider } from '../redux/store';

import Login from '../screens/Login';
import Register from '../screens/Login/Register';
import ForgetPassword from '../screens/Login/ForgetPassword';
import VerifyCode from '../screens/Login/VerifyCode';

import Loading from '../screens/Utils/Loading';
import InAppNotification from '../screens/Utils/InAppNotification';
import IntroScreen from '../screens/Intro';
import Home from '../screens/Home';
import UploadImage from '../screens/Profile/UploadImage';
import ListProductBac from '../screens/Home/ListProductBac';

//HouseWife
import HouseWifeProduct from '../screens/HouseWife';
import houseRegister from '../screens/Login/housewifeRegister';
import HouseWifeHistory from '../screens/HouseWife/houseWifeHistory';

//Normal User
import History from '../screens/History';
import foodDetails from '../screens/Home/foodDetails';
import User from '../screens/UserScreen';

const SCREENS_WITH_REDUX = {
  Login,
  Register,
  ForgetPassword,
  VerifyCode,

  IntroScreen,
  Home,
  UploadImage,
  User,
  ListProductBac,

  //HouseWife
  houseRegister,
  HouseWifeProduct,
  HouseWifeHistory,

  //Admin
  History,
  foodDetails,
};
const SCREENS = {
  Loading,
  InAppNotification,
};

function registerScreens() {
  Object.keys(SCREENS_WITH_REDUX).map((screenName) => {
    Navigation.registerComponent(
      screenName,
      () => withReduxProvider(SCREENS_WITH_REDUX[screenName]),
      () => SCREENS_WITH_REDUX[screenName],
    );
  });
  Object.keys(SCREENS).map((screenName) => {
    Navigation.registerComponent(
      screenName,
      () => SCREENS_WITH_REDUX[screenName],
      () => SCREENS_WITH_REDUX[screenName],
    );
  });
}

export default registerScreens;
