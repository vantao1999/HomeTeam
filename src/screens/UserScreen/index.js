import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { NavigationUtils } from '../../navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../redux/AuthRedux';
import { get } from 'lodash';
const Setting = () => {
  const [userData, setData] = React.useState({
    username: '',
    address: '',
    phone: '',
  });
  const dispatch = useDispatch();
  const user = useSelector((state) => get(state, 'auth.user', null));
  // console.log('UserData', user);

  useEffect(() => {
    if (user) {
      setData(user);
    }
  }, [user]);

  const LogOut = async () => {
    await dispatch(actions.logout());
    NavigationUtils.startLoginContent();
  };

  // const navigateScreen = (screen) => {
  //   NavigationUtils.push({
  //     screen,
  //     isTopBarEnable: screen !== 'userEditProfile',
  //     passProps: { userData },
  //   });
  // };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logOut}>
          <TouchableOpacity onPress={LogOut}>
            <Text style={styles.textLogout}>LogOut</Text>
          </TouchableOpacity>
        </View>
        <Image source={require('../../assets/Images/user.jpeg')} style={styles.imageUser} />
        <TouchableOpacity onPress={() => navigateScreen('userEditProfile')} style={styles.btnEdit}>
          <Icon name="md-create" size={20} />
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.action}>
            <Text style={styles.textTitle}>Name</Text>
            <Text style={styles.textContent}>{userData.username}</Text>
          </View>
          <View style={styles.action}>
            <Text style={styles.textTitle}>Address</Text>
            <Text style={styles.textContent}>{userData.address}</Text>
          </View>
          <View style={styles.action}>
            <Text style={styles.textTitle}>Phone Number</Text>
            <Text style={styles.textContent}>{userData.phone}</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Setting;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1.5,
    backgroundColor: '#56aaff',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageUser: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  footer: {
    flex: 2,
  },
  btnEdit: {
    marginTop: 10,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  textLogout: {
    fontFamily: 'Roboto-bold',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  action: {
    backgroundColor: '#fff',
    marginHorizontal: 10,
    paddingVertical: 10,
    borderBottomColor: '#f2f2f2',
    borderBottomWidth: 1.5,
  },
  textTitle: {
    fontSize: 18,
    fontFamily: 'Roboto',
  },
  textContent: {
    fontSize: 20,
    marginTop: 5,
    fontWeight: '600',
    fontFamily: 'Roboto',
  },
  logOut: {
    position: 'absolute',
    right: 30,
    top: 30,
    flexDirection: 'row',
  },
});
