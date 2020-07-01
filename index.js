// import App from './src/Setup';

// App();

// import { Navigation } from 'react-native-navigation';
// import App from './App';
// Navigation.registerComponent('com.myApp.WelcomeScreen', () => App);
// Navigation.events().registerAppLaunchedListener(() => {
//   Navigation.setRoot({
//     root: {
//       stack: {
//         children: [
//           {
//             component: {
//               name: 'com.myApp.WelcomeScreen',
//             },
//           },
//         ],
//       },
//     },
//   });
// });

import { Navigation } from 'react-native-navigation';
import { startApp } from './src/Setup';
import Home from './src/screens/Home';
import ListProduct from './src/components/Home/ListProduct';

Navigation.events().registerAppLaunchedListener(() => {
  startApp();
});
Navigation.registerComponent('Home', ()=> Home)
Navigation.registerComponent('ListProduct', ()=> ListProduct)

