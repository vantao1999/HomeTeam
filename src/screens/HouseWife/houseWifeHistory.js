import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { NavigationUtils } from '../../navigation';
import { Navigation } from 'react-native-navigation';
import {
  getFoods,
  getFoodNorth,
  getFoodSouth,
  getFoodCentral,
} from '../../redux/AuthRedux/operations';
import { get, includes, toLower } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';

const HouseWifeHistory = () => {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <Text style={styles.textBook}>History</Text>
    </View>
  );
};
export default HouseWifeHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBook: {
    fontSize: 18,
    color: 'red',
    fontWeight: 'bold',
  },
});
