import { Navigation } from 'react-native-navigation';

export default function navigationTo(props, compId, namePage, topBar){
    Navigation.push(compId, {
        component: {
          name: namePage, 
          passProps:{
            props
          },
          options: { 
            topBar: {
              title: {
                text: topBar
              }
            }
          }
        }
      });
}