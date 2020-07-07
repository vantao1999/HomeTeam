/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Keyboard,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { NavigationUtils } from '../../navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';
import { updateProfile } from '../../redux/AuthRedux/operations';
import { unwrapResult } from '@reduxjs/toolkit';

const userEditProfile = (props) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => get(state, 'auth.loading', null));

  const formik = useFormik({
    initialValues: {
      username: props.userData.username,
      address: props.userData.address,
      phone: props.userData.phone,
    },
    onSubmit: (values) => {
      userUpdateProfile(values);
    },
  });
  const userUpdateProfile = async ({ username, address, phone }) => {
    Keyboard.dismiss();
    const result = await dispatch(updateProfile({ username, address, phone }))
      .then(unwrapResult)
      .then((result) => {
        Alert.alert('Updated successfully');
        NavigationUtils.pop();
      })
      .catch((err) => {
        if (result.payload) {
          Alert.alert('Error', err.payload.message || 'error');
        } else {
          Alert.alert('Error', err.error || 'error');
        }
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      {loading ? <ActivityIndicator /> : null}
      <View style={styles.header}>
        <View style={styles.exit}>
          <TouchableOpacity
            onPress={() => {
              NavigationUtils.pop();
            }}
          >
            <Icon name="md-exit" size={20} />
          </TouchableOpacity>
        </View>
        <View style={styles.edit}>
          <TouchableOpacity onPress={formik.handleSubmit}>
            <Text style={styles.textSave}>Save</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            NavigationUtils.push({
              screen: 'UploadImage',
            });
          }}
        >
          <Image source={require('../../assets/Images/user.jpeg')} style={styles.imageUser} />
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <KeyboardAwareScrollView>
          <View style={styles.action}>
            <Text style={styles.textTitle}>Name</Text>
            <TextInput
              style={styles.textContent}
              defaultValue={formik.values.username}
              placeholder="Enter name"
              onChangeText={formik.handleChange('username')}
              autoFocus={true}
              returnKeyType="next"
            />
          </View>
          <View style={styles.action}>
            <Text style={styles.textTitle}>Address</Text>
            <TextInput
              style={styles.textContent}
              defaultValue={formik.values.address}
              placeholder="Enter address"
              onChangeText={formik.handleChange('address')}
              returnKeyType="next"
            />
          </View>
          <View style={styles.action}>
            <Text style={styles.textTitle}>Phone Number</Text>
            <TextInput
              style={styles.textContent}
              defaultValue={formik.values.phone}
              placeholder="Enter phone number"
              onChangeText={formik.handleChange('phone')}
              keyboardType="phone-pad"
              returnKeyType="go"
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
};

export default userEditProfile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    backgroundColor: '#56aaff',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  imageUser: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  footer: {
    flex: 2,
  },
  action: {
    backgroundColor: '#fff',
    marginHorizontal: 10,
    paddingVertical: 5,
    borderBottomColor: '#f2f2f2',
    borderBottomWidth: 1.5,
  },
  textTitle: {
    fontSize: 16,
    fontFamily: 'Roboto',
  },
  textContent: {
    paddingVertical: 5,
    fontSize: 22,
    fontFamily: 'Roboto',
    fontWeight: '600',
  },
  edit: {
    position: 'absolute',
    right: 50,
    top: 50,
  },
  exit: {
    position: 'absolute',
    left: 50,
    top: 50,
  },
  textSave: {
    fontFamily: 'Roboto-Regular',
    fontSize: 17,
  },
});
