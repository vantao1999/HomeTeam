import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Keyboard,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NavigationUtils } from '../../navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, logOut } from '../../redux/AuthRedux/operations';
import { get } from 'lodash';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { unwrapResult } from '@reduxjs/toolkit';
import FastImage from 'react-native-fast-image';
import { Images } from '../../themes';

const Setting = () => {
  const [userData, setData] = React.useState({
    isEdit: false,
  });
  const dispatch = useDispatch();
  const user = useSelector((state) => get(state, 'auth.user', null));
  const errMes = useSelector((state) => get(state, 'auth.logInErr', null));
  const loading = useSelector((state) => get(state, 'auth.loading', null));

  useEffect(() => {
    if (user) {
      setData((data) => ({ ...data, ...user }));
    }
  }, [user]);

  const LogOut = async () => {
    await dispatch(logOut());
    NavigationUtils.startLoginContent();
  };

  const formik = useFormik({
    initialValues: {
      name: userData.name,
      address: userData.address,
      email: userData.email,
    },
    validationSchema: Yup.object({
      name: Yup.string().min(2, 'Quá ngắn').max(50, 'Quá dài'),
      email: Yup.string().email('Email không đúng'),
      address: Yup.string().min(3, 'Quá ngắn'),
    }),
    onSubmit: (values) => {
      userUpdateProfile(values);
    },
  });
  const userUpdateProfile = async ({ name, address, email }) => {
    Keyboard.dismiss();
    const result = await dispatch(updateProfile({ name, address, email }))
      .then(unwrapResult)
      .then((success) => {
        Alert.alert('Updated successfully');
      })
      .catch((err) => {
        if (result.payload) {
          Alert.alert('Error', err.errMes || 'error');
        } else {
          Alert.alert('Error', err.errMes || 'error');
        }
      });
  };
  const navigate = () => {
    NavigationUtils.push({
      screen: 'UploadImage',
      isTopBarEnable: false,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.deleted}>
          {userData.isEdit ? (
            <TouchableOpacity onPress={() => setData({ ...userData, isEdit: !userData.isEdit })}>
              <Icon name="md-exit" size={20} />
            </TouchableOpacity>
          ) : null}
        </View>

        <View style={styles.edit}>
          {userData.isEdit ? (
            <TouchableOpacity
              onPress={() => {
                formik.handleSubmit();
              }}
            >
              <Text style={styles.textSave}>Lưu</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={LogOut}>
              <Text style={styles.textLogout}>LogOut</Text>
            </TouchableOpacity>
          )}
        </View>
        {userData.isEdit ? (
          <TouchableOpacity onPress={navigate}>
            <FastImage
              source={Images.gallery}
              resizeMode={FastImage.resizeMode.cover}
              style={styles.imageUser}
            />
          </TouchableOpacity>
        ) : (
          <View onPress={navigate}>
            <FastImage
              source={Images.gallery}
              resizeMode={FastImage.resizeMode.cover}
              style={styles.imageUser}
            />
          </View>
        )}
        {!userData.isEdit ? (
          <TouchableOpacity
            style={styles.btnLogout}
            onPress={() => setData({ ...userData, isEdit: !userData.isEdit })}
          >
            <Icon name="md-create" size={24} style={styles.textLogout} />
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={styles.footer}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.footer}>
            <View style={styles.action}>
              <Text style={styles.textTitle}>Tên</Text>
              <TextInput
                style={userData.isEdit ? styles.textEditContent : styles.textContent}
                defaultValue={userData.name}
                editable={userData.isEdit}
                placeholder="Enter name"
                onBlur={formik.handleBlur('name')}
                onChangeText={formik.handleChange('name')}
                returnKeyType="next"
              />
            </View>
            <Text style={styles.mesValidate}>{formik.touched.name && formik.errors.name}</Text>

            <View style={styles.action}>
              <Text style={styles.textTitle}>Email</Text>
              <TextInput
                style={userData.isEdit ? styles.textEditContent : styles.textContent}
                defaultValue={userData.email}
                editable={userData.isEdit}
                placeholder="Nhập email"
                onChangeText={formik.handleChange('email')}
                onBlur={formik.handleBlur('email')}
                returnKeyType="next"
              />
            </View>
            <Text style={styles.mesValidate}>{formik.touched.email && formik.errors.email}</Text>

            <View style={styles.action}>
              <Text style={styles.textTitle}>Địa chỉ</Text>
              <TextInput
                style={userData.isEdit ? styles.textEditContent : styles.textContent}
                defaultValue={userData.address}
                editable={userData.isEdit}
                placeholder="Nhập địa chỉ"
                onChangeText={formik.handleChange('address')}
                onBlur={formik.handleBlur('address')}
                returnKeyType="next"
              />
            </View>
            <Text style={styles.mesValidate}>
              {formik.touched.address && formik.errors.address}
            </Text>

            <View style={styles.action}>
              <Text style={styles.textTitle}>Số điện thoại</Text>
              <Text style={styles.textContent}>{userData.phone}</Text>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#56aaff" />
        </View>
      ) : null}
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
  btnLogout: {
    marginTop: 10,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  textLogout: {
    fontFamily: 'Roboto-bold',
    fontSize: 18,
  },
  action: {
    backgroundColor: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderBottomColor: '#f2f2f2',
    borderBottomWidth: 1.5,
  },
  textTitle: {
    fontSize: 18,
    fontFamily: 'Roboto',
  },
  textContent: {
    fontSize: 20,
    paddingVertical: 5,
    fontFamily: 'Roboto',
    fontWeight: Platform.OS === 'android' ? 'bold' : '600',
    color: Platform.OS === 'android' ? '#000' : null,
  },
  edit: {
    position: 'absolute',
    right: 20,
    top: 45,
    flexDirection: 'row',
  },
  textEditContent: {
    fontSize: 22,
    fontFamily: 'Roboto',
    paddingVertical: 5,
  },
  textSave: {
    fontFamily: 'Roboto-Regular',
    color: '#000',
    fontSize: 20,
  },
  deleted: {
    position: 'absolute',
    left: 50,
    top: 50,
  },
  mesValidate: {
    color: 'red',
    marginHorizontal: 20,
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
