/* eslint-disable react-native/no-inline-styles */
import React, { useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationUtils } from '../../navigation';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { houseRegister } from '../../redux/AuthRedux/operations';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const TEXT_INPUT_PHONE = 'TEXT_INPUT_PHONE';
const TEXT_INPUT_PASSWORD = 'TEXT_INPUT_PASSWORD';

const HouseRegister = () => {
  const [DATA, setData] = React.useState({
    phone: '',
    phoneErr: '',
    secureTextEntry: true,
  });
  const showSecureTextEntry = () => {
    setData({
      ...DATA,
      secureTextEntry: !DATA.secureTextEntry,
    });
  };

  const dispatch = useDispatch();
  let phoneRef = useRef(null);
  let passRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      phone: '',
      password: '',
    },
    onSubmit: (values) => {
      handleRegister(values);
    },
  });

  const handleRegister = async ({ phone, password }) => {
    Keyboard.dismiss();
    const data = { phone, password };
    const result = await dispatch(houseRegister(data));
    if (houseRegister.fulfilled.match(result)) {
      NavigationUtils.startLoginContent();
    } else {
      if (result.payload) {
        Alert.alert('Lỗi', result.payload.message || 'Đã xảy lỗi, vui lòng thử lại');
      } else {
        Alert.alert('Lỗi', result.error || 'Đã xảy lỗi, vui lòng thử lại');
      }
    }
  };

  const onSubmitEditing = (field) => {
    if (field === TEXT_INPUT_PHONE) {
      passRef.current?.focus();
    }
    if (field === TEXT_INPUT_PASSWORD) {
      passRef.current?.blur();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Chào Mừng Đến Với HuongViQueNha!</Text>
      </View>

      <Animatable.View style={styles.footer} animation="fadeInUp" duration={500}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.text_footer}>Số Điện Thoại</Text>
          <View style={styles.action}>
            <Icon name="ios-phone-portrait" color="#05375a" size={20} />
            <TextInput
              style={styles.textInput}
              type="phone"
              ref={phoneRef}
              value={formik.values.phone}
              placeholder="Nhập SDT"
              onChangeText={formik.handleChange('phone')}
              onSubmitEditing={() => onSubmitEditing(TEXT_INPUT_PHONE)}
              keyboardType="phone-pad"
              errorMessage={formik.errors.phone}
              returnKeyType="next"
            />
          </View>
          <Text style={[styles.text_footer, { marginTop: 20 }]}>Mật Khẩu</Text>
          <View style={styles.action}>
            <Icon name="md-lock" color="#05375a" size={20} />
            <TextInput
              style={styles.textInput}
              ref={passRef}
              value={formik.values.password}
              placeholder="Nhập mật khẩu"
              secureTextEntry={DATA.secureTextEntry ? true : false}
              errorMessage={formik.errors.password}
              returnKeyType="next"
              onSubmitEditing={() => onSubmitEditing(TEXT_INPUT_PASSWORD)}
              onChangeText={formik.handleChange('password')}
            />
            <TouchableOpacity onPress={showSecureTextEntry}>
              {DATA.secureTextEntry ? (
                <Icon name="md-eye-off" color="#05375a" size={20} />
              ) : (
                <Icon name="md-eye" color="#05375a" size={20} />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <TouchableOpacity onPress={formik.handleSubmit}>
              <LinearGradient colors={['#56aaff', '#56a']} style={styles.signUp}>
                <Text style={styles.textSign}>Đăng Ký</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => NavigationUtils.pop()} style={styles.signIn}>
              <Text style={[styles.textSign, { color: '#56aaff' }]}>Đăng Nhập</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </Animatable.View>
    </SafeAreaView>
  );
};
export default HouseRegister;
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
    paddingVertical: 10,
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
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: '#05375a',
  },
  button: {
    marginTop: 30,
  },
  signIn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderColor: '#56aaff',
    borderWidth: 2,
    marginTop: 15,
    paddingVertical: 10,
  },
  signUp: {
    width: '100%',
    fontFamily: 'Roboto',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 20,
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
  },
});
