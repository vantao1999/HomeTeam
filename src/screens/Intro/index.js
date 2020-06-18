import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Dimensions, Text } from 'react-native';
import { NavigationUtils } from '../../navigation';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../../redux/AppRedux';

const IntroScreen = () => {
  // const something = useSelector((state) => state.something);
  const dispatch = useDispatch();
  const markSkipIntro = (_isSkip) => dispatch(actions.markSkipIntro(_isSkip));
  const onSkip = () => {
    markSkipIntro(true);
    NavigationUtils.startLoginContent();
  };
  return (
    <View style={styles.container}>
      <Animatable.View style={styles.header} animation="bounceIn" duration={700}>
        <Image
          source={require('../../assets/Images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animatable.View>
      <Animatable.View style={styles.footer} animation="fadeInUp" duration={500}>
        <Text style={styles.title}>Together, we make a difference!</Text>
        <Text style={styles.text}>Sign in with account</Text>
        <View style={styles.button}>
          <TouchableOpacity onPress={onSkip}>
            <LinearGradient colors={['#f7e188', '#fcdb55']} style={styles.signIn}>
              <Text style={styles.textSign}>Get Started</Text>
              <Feather name="chevron-right" color="#05375a" size={20} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};
const { height } = Dimensions.get('screen');
const height_logo = height * 0.28;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffcc00',
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
    borderRadius: 500,
  },
  title: {
    color: '#05375a',
    fontSize: 30,
    fontWeight: 'bold',
  },
  text: {
    color: 'grey',
    marginTop: 5,
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  textSign: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default IntroScreen;
