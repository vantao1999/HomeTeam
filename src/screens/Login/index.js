/* eslint-disable react-native/no-inline-styles */
import React, { useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Keyboard,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Animatable from 'react-native-animatable';
import { useFormik } from 'formik';
import { NavigationUtils } from '../../navigation';
import { useDispatch, useSelector } from 'react-redux';
import { login, getFoods } from '../../redux/AuthRedux/operations';
import Icon from 'react-native-vector-icons/Ionicons';
import { unwrapResult } from '@reduxjs/toolkit';
import * as Yup from 'yup';

const TEXT_INPUT_PHONE = 'TEXT_INPUT_EMAIL';
const TEXT_INPUT_PASSWORD = 'TEXT_INPUT_PASSWORD';

const Login = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  const [data, setData] = React.useState({
    secureTextEntry: true,
  });

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  let phoneRef = useRef(null);
  let passRef = useRef(null);

  const navigateScreen = (screen) => {
    NavigationUtils.push({
      screen,
      isTopBarEnable: screen !== 'Register',
      passProps: {},
    });
  };
  const onSubmitEditing = (field) => {
    if (field === TEXT_INPUT_PHONE) {
      passRef.current?.focus();
    }
    if (field === TEXT_INPUT_PASSWORD) {
      passRef.current?.blur();
    }
  };
  const formik = useFormik({
    initialValues: {
      phone: '0347248088',
      password: '123456',
    },
    validationSchema: Yup.object({
      phone: Yup.string().min(10, 'Ít nhất 10 kí tự').max(10, 'Số điện thoại không hợp lệ'),
      password: Yup.string().min(6, 'Ít nhất 6 kí tự').max(30, 'Không quá 30 kí tự'),
    }),
    onSubmit: (values) => {
      handleLogin(values);
    },
  });
  
  const handleLogin = async ({ phone, password }) => {
    Keyboard.dismiss();
    const result = await dispatch(login({ phone, password }));
    if (login.fulfilled.match(result)) {
      const user = unwrapResult(result);
      console.log('Log Success', user);
      if (user && user.users.role === 'user') {
        await dispatch(getFoods(''));
        NavigationUtils.startMainContent();
      } else {
        await dispatch(getFoods(''));
        NavigationUtils.startMainHouseContent();
      }
    } else {
      if (result.payload) {
        Alert.alert('Lỗi', result.payload.message || 'Đã xảy lỗi, vui lòng thử lại');
      } else {
        Alert.alert('Lỗi', result.error || 'Đã xảy lỗi, vui lòng thử lại');
      }
    }
    // await dispatch(getFoods(''));
  };

  return (
    <SafeAreaView behavior="padding" keyboardVerticalOffset={20} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Hương Vị Quê Nhà</Text>
      </View>

      <Animatable.View style={styles.footer} animation="fadeInUp" duration={500}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.text_footer}>Nhập SDT</Text>
          <View style={styles.action}>
            <Icon name="ios-phone-portrait" color="#05375a" size={20} />
            <TextInput
              style={styles.textInput}
              type="phone"
              ref={phoneRef}
              defaultValue={formik.values.phone}
              keyboardType="phone-pad"
              placeholder="Nhập số điện thoại"
              onBlur={formik.handleBlur('phone')}
              onChangeText={formik.handleChange('phone')}
              onSubmitEditing={() => onSubmitEditing(TEXT_INPUT_PHONE)}
              returnKeyType="next"
            />
          </View>
          <Text style={styles.mesValidate}>{formik.touched.phone && formik.errors.phone}</Text>
          <Text style={[styles.text_footer, { marginTop: 20 }]}>Nhập Mật Khẩu</Text>
          <View style={styles.action}>
            <Icon name="md-lock" color="#05375a" size={20} />
            <TextInput
              style={styles.textInput}
              ref={passRef}
              defaultValue={formik.values.password}
              placeholder="Nhập mật khẩu"
              onChangeText={formik.handleChange('password')}
              onSubmitEditing={() => onSubmitEditing(TEXT_INPUT_PASSWORD)}
              secureTextEntry={data.secureTextEntry ? true : false}
              onBlur={formik.handleBlur('password')}
              returnKeyType="go"
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Icon name="ios-eye-off" color="#05375a" size={20} />
              ) : (
                <Icon name="ios-eye" color="#05375a" size={20} />
              )}
            </TouchableOpacity>
          </View>
          <Text style={styles.mesValidate}>{formik.touched.password && formik.errors.password}</Text>
          <TouchableOpacity
            style={styles.btnForgot}
            onPress={() => {
              NavigationUtils.push({
                screen: 'ForgetPassword',
                isTopBarEnable: false,
              });
            }}
          >
            <Text style={styles.textForgot}>Quên mật khẩu?</Text>
          </TouchableOpacity>

          <View style={styles.button}>
            <TouchableOpacity onPress={formik.handleSubmit}>
              <LinearGradient colors={['#56aaff', '#56a']} style={styles.signIn}>
                <Text style={styles.textSign}>Đăng Nhập</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateScreen('Register')} style={styles.signUp}>
              <Text style={[styles.textSign, { color: '#56aaff' }]}>Đăng Ký</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </Animatable.View>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#56aaff" />
        </View>
      ) : null}
    </SafeAreaView>
  );
};
export default Login;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#56aaff',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  text_header: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    paddingVertical: 5,
    color: '#05375a',
  },
  button: {
    marginTop: 30,
  },
  signIn: {
    width: '100%',
    fontFamily: 'Roboto',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 20,
  },
  signUp: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#56aaff',
    borderWidth: 2,
    marginTop: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },
  textForgot: {
    fontSize: 14,
    textDecorationLine: 'underline',
    marginVertical: 10,
    color: '#56aaff',
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
  },
  mesValidate: {
    color: 'red',
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
