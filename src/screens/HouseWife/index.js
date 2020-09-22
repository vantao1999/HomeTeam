import React, { useState, useRef  } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
} from 'react-native';
import { Text, Button, Touchable } from '../../components';
import { NavigationUtils } from '../../navigation';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFormik } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DropDownPicker from 'react-native-dropdown-picker';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../themes/Constants';
import { Fonts, Colors, Images } from '../../themes';


const TEXT_INPUT_NAME = 'TEXT_INPUT_NAME';
const TEXT_INPUT_HOUSEWIFE_NAME = 'TEXT_INPUT_HOUSEWIFE_NAME';
const TEXT_INPUT_PRICE = 'TEXT_INPUT_PRICE';
const TEXT_INPUT_DESCRIPTION = 'TEXT_INPUT_DESCRIPTION';

const Index = () => {
  let nameRef = useRef(null);
  let housewife_nameRef = useRef(null);
  let priceRef = useRef(null);
  let descriptionRef = useRef(null);

  const [location, setLocation] = useState('Miền Trung');
  const data = [
    {label: 'Miền Bắc', value: 'Miền Bắc'},
    {label: 'Miền Trung', value: 'Miền Trung'},
    {label: 'Miền Nam', value: 'Miền Nam'},
  ];
  const [dropdownHeight, setDropdownHeight] = useState(null);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name:'',
      location,
      foods:'',
      price:'',
      housewife_name:'',
      description:'',
    },

    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  const onSubmitEditing = (field) => {
    if (field === TEXT_INPUT_NAME) {
      housewife_nameRef.current?.focus();
    }
    if (field === TEXT_INPUT_HOUSEWIFE_NAME) {
      priceRef.current?.focus();
    }
    if (field === TEXT_INPUT_PRICE) {
      descriptionRef.current?.focus();
    }
    if (field === TEXT_INPUT_DESCRIPTION) {
      descriptionRef.current?.blur();
    }
  };
  const onUploadImage = () =>{
    NavigationUtils.push({
      screen: 'UploadImage',
    });
  }
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
            type="name"
            ref={nameRef}
            defaultValue={formik.values.name}
            placeholder="Nhập Tên Món"
            onChangeText={formik.handleChange('name')}
            onSubmitEditing={() => onSubmitEditing(TEXT_INPUT_NAME)}
            returnKeyType="next"
          />
          <Text type="regular14">Chọn miền</Text>
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
            type="housewife_name"
            ref={housewife_nameRef}
            defaultValue={formik.values.housewife_name}
            placeholder="Nhập Tên Người Nấu"
            onChangeText={formik.handleChange('housewife_name')}
            onSubmitEditing={() => onSubmitEditing(TEXT_INPUT_HOUSEWIFE_NAME)}
            returnKeyType="next"
          />
          <Text type="regular14">Giá</Text>
          <TextInput
            style={styles.textInput}
            type="price"
            ref={priceRef}
            defaultValue={formik.values.price}
            placeholder="Nhập Giá Tiền"
            onChangeText={formik.handleChange('price')}
            onSubmitEditing={() => onSubmitEditing(TEXT_INPUT_PRICE)}
            returnKeyType="next"
          />
          <Text type="regular14">Miêu tả</Text>
          <TextInput
            style={styles.textInput}
            type="description"
            ref={descriptionRef}
            defaultValue={formik.values.description}
            placeholder="Miêu Tả"
            onChangeText={formik.handleChange('description')}
            onSubmitEditing={() => onSubmitEditing(TEXT_INPUT_DESCRIPTION)}
            returnKeyType="next"
          />
          <Touchable onPress={onUploadImage}>
            <Text>Chọn hình</Text>
          </Touchable>
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
