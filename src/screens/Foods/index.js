import React from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { NavigationUtils } from '../../navigation';
import { useSelector, useDispatch } from 'react-redux';
import { get } from 'lodash';
import { getOne } from '../../redux/AuthRedux/operations';
import { unwrapResult } from '@reduxjs/toolkit';

const Index = () => {
  const dispatch = useDispatch();
  const Foods = useSelector((state) => get(state, 'auth.listFood', null));
  console.log('UserInfo', Foods);

  const getUserData = async (userId) => {
    const result = await dispatch(getOne(userId));
    console.log('USER GET ID', result);
    if (getOne.fulfilled.match(result)) {
      const userData = unwrapResult(result);
      console.log('UNWRAP RESULT ', userData);

      if (userData) {
        NavigationUtils.push({
          screen: 'userProfile',
          title: 'User Profile Details',
          passProps: { userData },
        });
      }
    } else {
      if (result.payload) {
        Alert.alert('Error', result.payload.message || 'error');
      } else {
        Alert.alert('Error', result.error || 'error');
      }
    }
  };
  const Item = ({ item }) => (
    <View style={styles.viewFood}>
      <Image source={require('../../assets/Images/user.jpeg')} style={styles.imageUser} />
      <View style={styles.viewIn}>
        <Text style={styles.foodTitle}>{item.name}</Text>
        <Text style={styles.userBalance}>{item.description}</Text>
      </View>
      <TouchableOpacity
        style={styles.btnViewFood}
        onPress={() => {
          getUserData(item.id);
        }}
      >
        <Text style={styles.textOrder}>Đặt Ngay</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.imageHeader}
          source={require('../../assets/Images/logo.png')}
          resizeMode={'stretch'}
        />
        <Text>Hi Phuc!</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.textTitle}>Hôm nay bạn muốn ăn gì?</Text>
        <View style={styles.viewSearch}>
          <TextInput style={styles.searchBar} placeholder="Tìm kiếm" />
        </View>
        <View style={styles.action}>
          <Text style={styles.underline}>
            -----------------------------------------------------
          </Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.textTitleContent}>ĐẶT NGAY!</Text>
        </View>
        <FlatList
          showsVerticalScrollIndicator={true}
          data={Foods}
          renderItem={Item}
          keyExtractor={(item) => item.email}
        />
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
    marginTop: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  imageHeader: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginRight: 5,
  },
  footer: {
    flex: 2,
  },
  textTitle: {
    marginTop: 20,
    alignSelf: 'center',
    fontSize: 20,
    color: '#fff',
  },
  viewSearch: {
    marginHorizontal: 20,
    marginVertical: 15,
    flexDirection: 'row',
  },
  searchBar: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#fff',
    flex: 1,
    marginRight: 10,
  },
  action: {
    marginHorizontal: 20,
    alignItems: 'center',
  },
  underline: {
    color: '#fff',
  },
  content: {
    marginHorizontal: 20,
  },
  textTitleContent: {
    color: '#fff',
  },
  viewFood: {
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: '#f2f2f2',
    borderRadius: 15,
    alignItems: 'center',
    flexDirection: 'row',
  },
  imageUser: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  viewIn: {
    flex: 1,
    marginLeft: 20,
  },
  foodTitle: {
    fontFamily: 'Roboto-bold',
    fontSize: 20,
  },
  btnViewFood: {
    position: 'absolute',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: '#56aaff',
    bottom: -10,
    right: 0,
  },
  textOrder: {
    color: '#fff',
  },
});
