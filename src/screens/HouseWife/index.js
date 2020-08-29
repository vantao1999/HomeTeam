import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import { Text, Button } from '../../components';
// import { NavigationUtils } from '../../navigation';
import { useSelector, useDispatch } from 'react-redux';
import { Colors, Images } from '../../themes';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFormik } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Index = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      phone: '0347248089',
      password: '123456',
    },

    onSubmit: (values) => {
      handleLogin(values);
    },
  });
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text type="bold20" center marginVertical={25} color={Colors.textDefault}>
          Thêm Món Mới
        </Text>
      </View>
      <View style={styles.content}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <Text type="regular14">Tên món</Text>
          <TextInput
            style={styles.textInput}
            type="phone"
            defaultValue={formik.values.phone}
            keyboardType="phone-pad"
            placeholder="Nhập số điện thoại"
            onChangeText={formik.handleChange('phone')}
            onSubmitEditing={() => onSubmitEditing(TEXT_INPUT_PHONE)}
            returnKeyType="next"
          />
          <Text type="regular14">Vùng miền</Text>
          <TextInput
            style={styles.textInput}
            type="phone"
            defaultValue={formik.values.phone}
            keyboardType="phone-pad"
            placeholder="Nhập số điện thoại"
            onChangeText={formik.handleChange('phone')}
            onSubmitEditing={() => onSubmitEditing(TEXT_INPUT_PHONE)}
            returnKeyType="next"
          />
          <Text type="regular14">Tên người nấu</Text>
          <TextInput
            style={styles.textInput}
            type="phone"
            defaultValue={formik.values.phone}
            keyboardType="phone-pad"
            placeholder="Nhập số điện thoại"
            onChangeText={formik.handleChange('phone')}
            onSubmitEditing={() => onSubmitEditing(TEXT_INPUT_PHONE)}
            returnKeyType="next"
          />
          <Text type="regular14">Giá</Text>
          <TextInput
            style={styles.textInput}
            type="phone"
            defaultValue={formik.values.phone}
            keyboardType="phone-pad"
            placeholder="Nhập số điện thoại"
            onChangeText={formik.handleChange('phone')}
            onSubmitEditing={() => onSubmitEditing(TEXT_INPUT_PHONE)}
            returnKeyType="next"
          />
          <Text type="regular14">Miêu tả</Text>
          <TextInput
            style={styles.textInput}
            type="phone"
            defaultValue={formik.values.phone}
            keyboardType="phone-pad"
            placeholder="Nhập số điện thoại"
            onChangeText={formik.handleChange('phone')}
            onSubmitEditing={() => onSubmitEditing(TEXT_INPUT_PHONE)}
            returnKeyType="next"
          />
          <Button label="Thêm"></Button>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};
export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  content: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: Colors.defaultBackground,
    paddingHorizontal: 20,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  action: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    marginTop: 5,
    marginBottom: 15,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: Colors.blur,
    borderRadius: 10,
  },
});
