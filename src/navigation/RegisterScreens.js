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
import User from '../screens/UserScreen';
import ListProductBac from '../screens/Home/ListProductBac';
import userEditProfile from '../screens/UserScreen/userEditProfile';

//HouseWife
import houseRegister from '../screens/Login/housewifeRegister';

//Admin Screens
import Food from '../screens/Foods';
import foodDetails from '../screens/Foods/foodDetails';
import editProfile from '../screens/Foods/editProfile';
import addUser from '../screens/Foods/addUser';

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

  //Admin
  Food,
  foodDetails,
  editProfile,
  userEditProfile,
  addUser,
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
