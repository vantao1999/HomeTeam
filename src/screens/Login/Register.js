// import React, { useRef } from 'react';
// import { View, StyleSheet, Alert, Keyboard } from 'react-native';
// import { Container, FlatInput, Button, Text } from '../../components';
// import { useFormik } from 'formik';
// import { Colors } from '../../themes';
// import { translate } from '../../i18n';
// import { NavigationUtils } from '../../navigation';
// import { useDispatch, useSelector } from 'react-redux';
// import { register } from '../../redux/AuthRedux/operations';
// import * as Yup from 'yup';

// const TEXT_INPUT_EMAIL = 'TEXT_INPUT_EMAIL';
// const TEXT_INPUT_PASSWORD = 'TEXT_INPUT_PASSWORD';

// const Register = () => {
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
//     const data = { email, password, userType: 'child' };
//     const result = await dispatch(register(data));
//     if (register.fulfilled.match(result)) {
//       NavigationUtils.startMainContent();
//     } else {
//       if (result.payload) {
//         Alert.alert('Error', result.payload.message || 'error');
//       } else {
//         Alert.alert('Error', result.error || 'error');
//       }
//     }
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
//         <Button label={translate('register')} onPress={formik.handleSubmit} style={styles.btn} />
//       </View>
//       <View style={styles.center}>
//         <Text type={'regular14'} color={Colors.blue} onPress={() => NavigationUtils.pop()}>
//           {translate('haveAccountAlready')}
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

// export default Register;

/* eslint-disable react-native/no-inline-styles */
import React, { useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Keyboard,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import { NavigationUtils } from '../../navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useFormik } from 'formik';
import { Colors } from '../../themes';
import { translate } from '../../i18n';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/AuthRedux/operations';
import * as Yup from 'yup';

const TEXT_INPUT_EMAIL = 'TEXT_INPUT_EMAIL';
const TEXT_INPUT_PASSWORD = 'TEXT_INPUT_PASSWORD';
const SignUpScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  let emailRef = useRef(null);
  let passRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      username: 'Monkey D Luffy',
      email: 'test_2@gmail.com',
      password: '123456',
      address: '930 Foosha Oda Japan',
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

  const handleLogin = async ({ email, password, username, address }) => {
    Keyboard.dismiss();
    const data = { email, password, userType: 'child' };
    const result = await dispatch(register(data));
    if (register.fulfilled.match(result)) {
      NavigationUtils.startMainContent();
    } else {
      if (result.payload) {
        Alert.alert('Error', result.payload.message || 'error');
      } else {
        Alert.alert('Error', result.error || 'error');
      }
    }
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
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.text_header}>Register Now!</Text>
      </View>

      <Animatable.View style={styles.footer} animation="fadeInUp">
        <Text style={styles.text_footer}>User Name</Text>
        <View style={styles.action}>
          <Feather name="user" color="#05375a" size={20} />
          <TextInput
            style={styles.textInput}
            placeholder={translate('usernamePlaceholder')}
            autoCapitalize="none"
            defaultValue={formik.values.username}
          />
        </View>

        {/* <Text style={{color: 'red'}}>{data.nameErr}</Text> */}

        <Text style={([styles.text_footer], { marginTop: 20 })}>Email</Text>
        <View style={styles.action}>
          <Feather name="mail" color="#05375a" size={20} />
          <TextInput
            style={styles.textInput}
            type="email"
            ref={emailRef}
            label={translate('email')}
            defaultValue={formik.values.email}
            placeholder={translate('emailPlaceholder')}
            onChangeText={formik.handleChange('email')}
            onSubmitEditing={() => onSubmitEditing(TEXT_INPUT_EMAIL)}
            errorMessage={formik.errors.email}
            returnKeyType="next"
          />
        </View>
        {/* <Text style={{color: 'red'}}>{data.emailErr}</Text> */}
        <Text style={([styles.text_footer], { marginTop: 20 })}>Address</Text>
        <View style={styles.action}>
          <Feather name="map-pin" color="#05375a" size={20} />
          <TextInput
            style={styles.textInput}
            placeholder={translate('addressPlaceholder')}
            defaultValue={formik.values.address}
            autoCapitalize="none"
          />
        </View>

        <Text style={[styles.text_footer, { marginTop: 20 }]}>Password</Text>
        <View style={styles.action}>
          <Feather name="lock" color="#05375a" size={20} />
          <TextInput
            style={styles.textInput}
            ref={passRef}
            label={translate('password')}
            defaultValue={formik.values.password}
            placeholder={translate('passwordPlaceholder')}
            onChangeText={formik.handleChange('password')}
            onSubmitEditing={() => onSubmitEditing(TEXT_INPUT_PASSWORD)}
            secureTextEntry={true}
            errorMessage={formik.errors.password}
          />
        </View>

        <Text style={[styles.text_footer, { marginTop: 20 }]}>Confirm Password</Text>
        <View style={styles.action}>
          <Feather name="lock" color="#05375a" size={20} />
          <TextInput
            style={styles.textInput}
            ref={passRef}
            label={translate('password')}
            defaultValue={formik.values.password}
            placeholder={translate('passwordPlaceholder')}
            onChangeText={formik.handleChange('password')}
            onSubmitEditing={() => onSubmitEditing(TEXT_INPUT_PASSWORD)}
            secureTextEntry={true}
            errorMessage={formik.errors.password}
          />
        </View>

        <View style={styles.button}>
          <TouchableOpacity onPress={formik.handleSubmit}>
            <LinearGradient colors={['#fcdb55', '#f7e188']} style={styles.signIn}>
              <Text style={[styles.textSign, { color: 'black' }]}>Sign Up</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => NavigationUtils.pop()} style={styles.signUp}>
            <Text style={[styles.textSign, { color: '#ffcc00' }]}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </KeyboardAvoidingView>
  );
};
export default SignUpScreen;
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
    marginTop: 30,
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
  textSign: {
    color: 'white',
    fontWeight: 'bold',
  },
});
