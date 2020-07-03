import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationUtils } from '../../navigation';
import { useFormik } from 'formik';
import { forgotPassword } from '../../redux/AuthRedux/operations';
import { useDispatch } from 'react-redux';

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      phone: '',
    },

    onSubmit: (values) => {
      handleForgotPassword(values);
    },
  });
  const handleForgotPassword = async ({ phone }) => {
    Keyboard.dismiss();
    const result = await dispatch(forgotPassword({ phone }));
    if (forgotPassword.fulfilled.match(result)) {
      NavigationUtils.push({ screen: 'VerifyCode' });
    } else {
      if (result.payload) {
        Alert.alert('Error', result.payload.message || 'error');
      } else {
        Alert.alert('Error', result.error || 'error');
      }
    }
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <Text style={styles.textForgot}> Quên mật khẩu ?</Text>
        <View style={styles.action}>
          <Icon name="ios-phone-portrait" color="#05375a" size={20} />
          <TextInput
            style={styles.textInput}
            type="phone"
            placeholder="Nhập số điện thoại"
            Value={formik.values.phone}
            onChangeText={formik.handleChange('phone')}
            errorMessage={formik.errors.phone}
            returnKeyType="go"
          />
        </View>
      </View>
      <TouchableOpacity style={styles.btnSend} onPress={formik.handleSubmit}>
        <Text style={styles.textSend}>Gửi</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};
export default ForgetPassword;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#56aaff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 10,
  },
  textForgot: {
    fontSize: 20,
  },
  action: {
    marginTop: 20,
    alignItems: 'center',
    flexDirection: 'row',
  },
  textInput: {
    width: '80%',
    paddingLeft: 10,
  },
  btnSend: {
    backgroundColor: 'white',
    marginTop: 30,
    paddingHorizontal: 50,
    paddingVertical: 5,
    borderRadius: 15,
  },
  textSend: {
    fontSize: 20,
  },
});
