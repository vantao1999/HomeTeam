/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { NavigationUtils } from '../../navigation';
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/Ionicons';

import { useDispatch } from 'react-redux';
import { actions } from '../../redux/AppRedux';

const IntroScreen = () => {
  const dispatch = useDispatch();

  const slides = [
    {
      key: 1,
      text: 'Thân Thiện - Tiện Lợi',
      image: require('../../assets/Images/slide1.png'),
      backgroundColor: '#59b2ab',
    },
    {
      key: 2,
      text: '100% Bảo Mật',
      image: require('../../assets/Images/slide2.png'),
      backgroundColor: '#febe29',
    },
    {
      key: 3,
      text: 'Tiết Kiệm Thời Gian',
      image: require('../../assets/Images/slide3.png'),
      backgroundColor: '#22bcb5',
    },
  ];

  const renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>{item.title}</Text>
        <Image style={styles.image} source={item.image} resizeMode={'contain'} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  const renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon name="ios-arrow-forward" color="rgba(255, 255, 255, .9)" size={24} />
      </View>
    );
  };
  const renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon name="ios-checkmark-circle-outline" color="rgba(255, 255, 255, .9)" size={40} />
      </View>
    );
  };
  const markSkipIntro = (_isSkip) => dispatch(actions.markSkipIntro(_isSkip));
  const onSkip = () => {
    markSkipIntro(true);
    NavigationUtils.startLoginContent();
  };
  return (
    <AppIntroSlider
      renderItem={renderItem}
      data={slides}
      onDone={onSkip}
      renderDoneButton={renderDoneButton}
      renderNextButton={renderNextButton}
      keyExtractor={(item, index) => `${index}`}
      activeDotStyle={{ backgroundColor: '#3c64aa' }}
    />
  );
};
const styles = StyleSheet.create({
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: '#489bff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    color: '#3c64aa',
    fontFamily: 'Roboto-bold',
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: 400,
    marginTop: 20,
  },
});

export default IntroScreen;
