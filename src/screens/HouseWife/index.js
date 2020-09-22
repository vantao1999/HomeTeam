import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Text, Button } from '../../components';
// import { NavigationUtils } from '../../navigation';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFormik } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DropDownPicker from 'react-native-dropdown-picker';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../themes/Constants';
import { Fonts, Colors, Images } from '../../themes';



const Index = () => {
  const [location, setLocation] = useState('Miền Bắc');
  const data = [
    {label: 'Miền Bắc', value: 'Miền Bắc'},
    {label: 'Miền Trung', value: 'Miền Trung'},
    {label: 'Miền Nam', value: 'Miền Nam'},
  ];
  const [dropdownHeight, setDropdownHeight] = useState(null);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name:'Mon Bien',

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
          <View style={{ height: dropdownHeight, marginBottom: 12 }}>
            <View style = {{marginTop:5}}>
              <View style={{ height: dropdownHeight || 50, width: 320 }}>
                <View
                  style={[
                    {
                      height: dropdownHeight || 50,
                    },
                    styles.dropDownContainer,
                    {
                      ...(Platform.OS !== 'android' && {
                        zIndex: 10,
                      }),
                    },
                    {
                      borderColor: dropdownHeight ? Colors.primary : Colors.white,
                    },
                  ]}
                >
                  <DropDownPicker
                    items={data}
                    defaultValue={location}
                    selectedLabelStyle={styles.selectedLabel}
                    containerStyle={styles.containerDropdown}
                    labelStyle={styles.labelType}
                    itemStyle={styles.item}
                    style={styles.dropDownPicker}
                    dropDownStyle={styles.dropDown}
                    activeItemStyle={{
                      backgroundColor: Colors.primary,
                    }}
                    activeLabelStyle={{
                      color: Colors.white,
                    }}
                    onChangeItem={(item) => {
                      setLocation(item.value);
                    }}
                    onOpen={() => {
                      setDropdownHeight(35 * data.length + 65);
                    }}
                    onClose={() => {
                      setDropdownHeight(null);
                    }}
                    customArrowUp={() => {
                      return <Icon name="md-arrow-dropup" size={16} />;
                    }}
                    customArrowDown={() => {
                      return <Icon name="md-arrow-dropdown" size={16} />;
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
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
  item: {
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
  },
  dropDownPicker: {
    height: 50,
    borderColor: Colors.grey,
    backgroundColor:Colors.defaultBackground,
    borderWidth: 1,
    borderRadius: 25,
  },
  dropDown: {
    borderTopColor: Colors.primary,
    borderColor: Colors.white,
    paddingHorizontal: 0,
    paddingBottom: 0,
  },
  labelType: {
    color: Colors.blackText,
    fontSize: 14,
    fontFamily: Fonts.type.regular,
  },
  dropDownContainer: {
    borderWidth: 1,
    borderRadius: 5,

  },
containerDropdown:{
  height:50,
},
});
