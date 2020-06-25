import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationUtils } from '../../navigation';
import Feather from 'react-native-vector-icons/Feather';

const UserProfile = (props) => {
  const check = props.userData;
  console.log('Log props from Index', check);

  const navigateScreen = (screen, userData) => {
    NavigationUtils.push({
      screen,
      isTopBarEnable: screen !== 'editProfile',
      passProps: { userData },
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.deleted}>
          <TouchableOpacity>
            <Feather name="trash-2" size={20} />
          </TouchableOpacity>
        </View>
        <View style={styles.edit}>
          <TouchableOpacity onPress={() => navigateScreen('editProfile', props.userData)}>
            <Feather name="edit" size={20} />
          </TouchableOpacity>
        </View>
        <Image source={require('../../assets/Images/user.jpeg')} style={styles.imageUser} />
        <Text style={styles.textBalance}>Balance: 750.000 VND</Text>
      </View>
      <View style={styles.footer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.action}>
            <Text style={styles.textTitle}>Name</Text>
            <Text style={styles.textContent}>{props.userData.username}</Text>
          </View>
          <View style={styles.action}>
            <Text style={styles.textTitle}>Email</Text>
            <Text style={styles.textContent}>{props.userData.email}</Text>
          </View>
          <View style={styles.action}>
            <Text style={styles.textTitle}>Phone Number</Text>
            <Text style={styles.textContent}>{props.userData.phone}</Text>
          </View>
          <View style={styles.action}>
            <Text style={styles.textTitle}>Address</Text>
            <Text style={styles.textContent}>{props.userData.address}</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default UserProfile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    backgroundColor: '#ffcc00',
    borderBottomLeftRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageUser: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  footer: {
    flex: 3,
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
    fontWeight: '500',
    fontFamily: 'Roboto',
  },
  edit: {
    position: 'absolute',
    right: 50,
    top: 10,
  },
  deleted: {
    position: 'absolute',
    left: 50,
    top: 10,
  },
  textBalance: {
    marginTop: 15,
    fontFamily: 'Roboto-bold',
    fontSize: 25,
    color: '#4ba0f4',
  },
});
