import React, { useEffect } from 'react';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { View, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { SCREEN_WIDTH } from '../../themes/Constants';
import FastImage from 'react-native-fast-image';
import { Text } from '../../components';
import { Colors } from '../../themes';
import { useSelector, useDispatch } from 'react-redux';
import { get } from 'lodash';
import { getOrder } from '../../redux/AuthRedux/operations';
import NumberFormat from 'react-number-format';

const Index = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textHeader}>Huong Vi Que Nha!</Text>
    </View>
    </View>
  );
};
export default Index;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#19b7b7',
  },
  header: {
    backgroundColor: '#19b7b7',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  textHeader: {
    fontFamily: 'Roboto-bold',
    fontSize: 25,
    color: '#05375a',
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  scene: {
    flex: 1,
  },
  viewOrder: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    marginBottom: 5,
    justifyContent: 'space-between',
    backgroundColor: Colors.backgroundOrder,
  },
  imageOrder: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  InforOrder: {
    paddingLeft: 20,
    flex: 1,
  },
  InforOrder1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewTitle: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textTitle: {
    marginRight: 5,
    fontFamily: 'Roboto-bold',
    fontWeight: 'bold',
    fontSize: 17,
  },
  tabView: {
    marginTop: 10,
    backgroundColor: '#19b7b7',
  },
  tabBar: {
    backgroundColor: '#000',
  },
  tabTitle: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
    color: 'white',
  },
  loading: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
