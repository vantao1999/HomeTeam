// import React, { useRef } from 'react';
// import { View, StyleSheet, Alert, Keyboard } from 'react-native';
// import { Container, FlatInput, Button, Text } from '../../components';
// import { useFormik } from 'formik';
// import { Colors } from '../../themes';
// import { translate } from '../../i18n';
// import { NavigationUtils } from '../../navigation';
// import { useDispatch, useSelector } from 'react-redux';
// import { login } from '../../redux/AuthRedux/operations';
// import * as Yup from 'yup';
// import Feather from 'react-native-vector-icons/Feather';

// const TEXT_INPUT_EMAIL = 'TEXT_INPUT_EMAIL';
// const TEXT_INPUT_PASSWORD = 'TEXT_INPUT_PASSWORD';

// const Login = () => {
//   // map redux
//   const dispatch = useDispatch();
//   const loading = useSelector((state) => state.auth.loading);

//   let emailRef = useRef(null);
//   let passRef = useRef(null);

//   const formik = useFormik({
//     initialValues: {
//       email: 'test_2@gmail.com',
//       password: '123456',
//     },
//     validationSchema: Yup.object({
//       email: Yup.string().email(translate('emailInvalid')).required(translate('emailRequired')),
//       password: Yup.string()
//         .min(6, translate('passwordMin'))
//         .max(20, translate('passwordMax'))
//         .required(translate('passwordRequired')),
//     }),
//     onSubmit: (values) => {
//       handleLogin(values);
//     },
//   });

//   const handleLogin = async ({ email, password }) => {
//     Keyboard.dismiss();
//     const result = await dispatch(login({ email, password }));
//     if (login.fulfilled.match(result)) {
//       NavigationUtils.startMainContent();
//     } else {
//       if (result.payload) {
//         Alert.alert('Error', result.payload.message || 'error');
//       } else {
//         Alert.alert('Error', result.error || 'error');
//       }
//     }
//   };

//   const navigateScreen = (screen) => {
//     NavigationUtils.push({
//       screen,
//       isTopBarEnable: screen !== 'Register',
//       passProps: {},
//     });
//   };

//   const onSubmitEditing = (field) => {
//     if (field === TEXT_INPUT_EMAIL) {
//       passRef.current?.focus();
//     }
//     if (field === TEXT_INPUT_PASSWORD) {
//       passRef.current?.blur();
//       formik.handleSubmit();
//     }
//   };

//   return (
//     <Container haveTextInput contentStyle={styles.container} loading={loading}>
//       <View style={styles.body}>
//         <FlatInput
//           type="email"
//           ref={emailRef}
//           label={translate('email')}
//           icon={'md-mail'}
//           defaultValue={formik.values.email}
//           placeholder={translate('emailPlaceholder')}
//           style={styles.textInputContainer}
//           onChangeText={formik.handleChange('email')}
//           onSubmitEditing={() => onSubmitEditing(TEXT_INPUT_EMAIL)}
//           errorMessage={formik.errors.email}
//           returnKeyType="next"
//         />
//         <FlatInput
//           ref={passRef}
//           label={translate('password')}
//           icon={'md-lock'}
//           defaultValue={formik.values.password}
//           placeholder={translate('passwordPlaceholder')}
//           onChangeText={formik.handleChange('password')}
//           onSubmitEditing={() => onSubmitEditing(TEXT_INPUT_PASSWORD)}
//           secureTextEntry={true}
//           style={styles.textInputContainer}
//           errorMessage={formik.errors.password}
//         />
//         <Button label={translate('login')} onPress={formik.handleSubmit} style={styles.btn} />
//         <View style={styles.center}>
//           <Text
//             type={'regular14'}
//             color={Colors.blue}
//             onPress={() => navigateScreen('ForgetPassword')}
//           >
//             {translate('forgetPassword')}
//           </Text>
//         </View>
//       </View>

//       <View style={styles.center}>
//         <Text type={'regular14'} color={Colors.blue} onPress={() => navigateScreen('Register')}>
//           {translate('createNewAccount')}
//         </Text>
//       </View>
//     </Container>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   body: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   textInputContainer: {
//     marginVertical: 12,
//   },
//   btn: {
//     marginVertical: 16,
//   },
//   center: {
//     alignItems: 'center',
//   },
// });

// export default Login;

/* eslint-disable react-native/no-inline-styles */
import React, { useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { Container, FlatInput, Button } from '../../components';
import { useFormik } from 'formik';
import { translate } from '../../i18n';
import { NavigationUtils } from '../../navigation';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/AuthRedux/operations';
import * as Yup from 'yup';
import Feather from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native-gesture-handler';

const TEXT_INPUT_EMAIL = 'TEXT_INPUT_EMAIL';
const TEXT_INPUT_PASSWORD = 'TEXT_INPUT_PASSWORD';

const Login = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  let emailRef = useRef(null);
  let passRef = useRef(null);

  const navigateScreen = (screen) => {
    NavigationUtils.push({
      screen,
      isTopBarEnable: screen !== 'Register',
      passProps: {},
    });
  };
  const onSubmitEditing = (field) => {
    if (field === TEXT_INPUT_EMAIL) {
      passRef.current?.focus();
    }
    if (field === TEXT_INPUT_PASSWORD) {
      passRef.current?.blur();
      formik.handleSubmit();
    }
  };
  const formik = useFormik({
    initialValues: {
      email: 'test_2@gmail.com',
      password: '123456',
    },
    validationSchema: Yup.object({
      email: Yup.string().email(translate('emailInvalid')).required(translate('emailRequired')),
      password: Yup.string()
        .min(6, translate('passwordMin'))
        .max(20, translate('passwordMax'))
        .required(translate('passwordRequired')),
    }),
    onSubmit: (values) => {
      handleLogin(values);
    },
  });
  const handleLogin = async ({ email, password }) => {
    Keyboard.dismiss();
    const result = await dispatch(login({ email, password }));
    if (login.fulfilled.match(result)) {
      NavigationUtils.startMainContent();
    } else {
      if (result.payload) {
        Alert.alert('Error', result.payload.message || 'error');
      } else {
        Alert.alert('Error', result.error || 'error');
      }
    }
  };
  console.log('error', formik.errors);
  console.log('Redf', emailRef);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.text_header}>Life Begins After Coffee</Text>
      </View>

      <Animatable.View style={styles.footer} animation="fadeInUp">
        <Text style={styles.text_footer}>Email</Text>
        <View style={styles.action}>
          <Feather name="mail" color="#05375a" size={20} />
          <TextInput
            style={styles.textInput}
            type="email"
            ref={emailRef}
            defaultValue={formik.values.email}
            placeholder={translate('emailPlaceholder')}
            onChangeText={formik.handleChange('email')}
            onSubmitEditing={() => onSubmitEditing(TEXT_INPUT_EMAIL)}
            errorMessage={formik.errors.email}
            returnKeyType="next"
          />
        </View>

        <Text style={[styles.text_footer, { marginTop: 35 }]}>Password</Text>
        <View style={styles.action}>
          <Feather name="lock" color="#05375a" size={20} />
          <TextInput
            style={styles.textInput}
            ref={passRef}
            defaultValue={formik.values.password}
            placeholder={translate('passwordPlaceholder')}
            onChangeText={formik.handleChange('password')}
            onSubmitEditing={() => onSubmitEditing(TEXT_INPUT_PASSWORD)}
            secureTextEntry={true}
            errorMessage={formik.errors.password}
          />
        </View>
        <TouchableOpacity>
          <Text style={styles.textForgot}>Forgot password?</Text>
        </TouchableOpacity>

        <View style={styles.button}>
          <TouchableOpacity onPress={formik.handleSubmit}>
            <LinearGradient colors={['#f7e120', '#fcdb55']} style={styles.signIn}>
              <Text style={[styles.textSign, { color: 'black' }]}>Sign In</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigateScreen('Register')} style={styles.signUp}>
            <Text style={[styles.textSign, { color: '#ffcc00' }]}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </KeyboardAvoidingView>
  );
};
export default Login;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffcc00',
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
    marginTop: 10,
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
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  signUp: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#000',
    borderWidth: 1,
    marginTop: 15,
  },
  textForgot: {
    fontSize: 16,
    textDecorationLine: 'underline',
    marginVertical: 10,
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
  },
});
