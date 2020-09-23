/* eslint-disable react-native/no-inline-styles */
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Alert,
  Keyboard,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Text, Button } from '../../components';
import { NavigationUtils } from '../../navigation';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFormik } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DropDownPicker from 'react-native-dropdown-picker';
import ImagePicker from 'react-native-image-picker';
import { Fonts, Colors } from '../../themes';
import FastImage from 'react-native-fast-image';
import { addFood } from '../../redux/AuthRedux/operations';
import { get } from 'lodash';
import axios from 'axios';
import NumberFormat from 'react-number-format';
import { getFoodOfHouseWife } from '../../redux/AuthRedux/operations';

const TEXT_INPUT_NAME = 'TEXT_INPUT_NAME';
const TEXT_INPUT_HOUSEWIFE_NAME = 'TEXT_INPUT_HOUSEWIFE_NAME';
const TEXT_INPUT_PRICE = 'TEXT_INPUT_PRICE';
const TEXT_INPUT_FOOD = 'TEXT_INPUT_FOOD';
const TEXT_INPUT_DESCRIPTION = 'TEXT_INPUT_DESCRIPTION';

const Index = () => {
  const [image, setProductImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingImg, setLoadingImg] = useState(false);

  const [dropdownHeight, setDropdownHeight] = useState(null);
  const dispatch = useDispatch();
  const [imgBase64, setImgBase64] = useState(null);
  const token = useSelector((state) => get(state, 'auth.token', null));

  let nameRef = useRef(null);
  let housewife_nameRef = useRef(null);
  let priceRef = useRef(null);
  let foodRef = useRef(null);
  let descriptionRef = useRef(null);
  const [location, setLocation] = useState('Miền Trung');
  const data = [
    { label: 'Miền Bắc', value: 'Miền Bắc' },
    { label: 'Miền Trung', value: 'Miền Trung' },
    { label: 'Miền Nam', value: 'Miền Nam' },
  ];

  const formik = useFormik({
    initialValues: {
      name: '',
      location: '',
      foods: '',
      price: '',
      housewife_name: '',
      description: '',
      image,
    },
    onSubmit: (values) => {
      let foodData = {
        name: values.name,
        location: location,
        foods: values.foods,
        price: parseInt(values.price.replace(',', ''), 10),
        housewife_name: values.housewife_name,
        description: values.description,
        image,
      };
      handleAddFood(foodData);
    },
  });

  const handleAddFood = async (values) => {
    await onUpload(imgBase64);
    Keyboard.dismiss();
    // const data = { foods, location, image, housewife_name, price, name, description };
    try {
      setLoading(true);
      const result = await dispatch(addFood(values));
      if (addFood.fulfilled.match(result)) {
        await dispatch(getFoodOfHouseWife());
        setLoading(false);
        Alert.alert('Thông báo!', 'Thêm sản phẩm thành công', [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
        NavigationUtils.pop();
      } else {
        setLoading(false);
        if (result.payload) {
          Alert.alert('Lỗi', result.payload.message || 'lỗi');
        } else {
          setLoading(false);
          Alert.alert('Lỗi', result.error || 'lỗi');
        }
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      Alert.alert('Error', error.data?.message || 'An error has occurred', [
        { text: 'OK', onPress: () => console.log('Ok Pressed') },
      ]);
    }
  };
  const onSubmitEditing = (field) => {
    if (field === TEXT_INPUT_NAME) {
      housewife_nameRef.current?.focus();
    }
    if (field === TEXT_INPUT_HOUSEWIFE_NAME) {
      priceRef.current?.focus();
    }
    if (field === TEXT_INPUT_PRICE) {
      foodRef.current?.focus();
    }
    if (field === TEXT_INPUT_FOOD) {
      foodRef.current?.focus();
    }
    if (field === TEXT_INPUT_DESCRIPTION) {
      descriptionRef.current?.blur();
    }
  };

  const launchImageLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      const url = response.data;
      if (url) {
        setLoadingImg(true);
        console.log('loading1', loading);
        setImgBase64(url);
        setLoadingImg(false);
        console.log('loading2', loading);
      }
    });
    console.log('loading3', loading);
    setLoadingImg(false);
  };
  const onUpload = async (fileData) => {
    const formData = new FormData();
    const dataUri = `data:image/png;base64,${fileData}`;
    formData.append('image_base64', dataUri);

    await axios({
      url: 'https://hometown-flavor.herokuapp.com/api/foods/postImage',
      method: 'POST',
      data: formData,
      headers: {
        Accept: '*',
        Authorization: 'Bearer ' + token,
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(function (response) {
        console.log('response image:', response);
        let imgUrl = response.data.image;
        setProductImg(imgUrl);
      })
      .catch(function (error) {
        console.log('error from image :', error);
      });
  };
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
            value={formik.values.name}
            placeholder="Nhập Tên Món"
            onChangeText={formik.handleChange('name')}
            onSubmitEditing={() => onSubmitEditing(TEXT_INPUT_NAME)}
            returnKeyType="next"
          />
          <Text type="regular14">Chọn miền</Text>
          <View style={{ height: dropdownHeight, marginBottom: 12 }}>
            <View style={{ marginTop: 5 }}>
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
            value={formik.values.housewife_name}
            placeholder="Nhập Tên Người Nấu"
            onChangeText={formik.handleChange('housewife_name')}
            onSubmitEditing={() => onSubmitEditing(TEXT_INPUT_HOUSEWIFE_NAME)}
            returnKeyType="next"
          />
          <Text type="regular14">Giá</Text>
          <NumberFormat
            value={formik.values.price}
            displayType={'text'}
            thousandSeparator={true}
            renderText={(value) => (
              <TextInput
                style={styles.textInput}
                onChangeText={formik.handleChange('price')}
                onBlur={formik.handleBlur('price')}
                value={value}
                maxLength={7}
                placeholder="Nhập Giá Tiền"
                keyboardType="number-pad"
              />
            )}
          />
          <Text type="regular14">Nguyên liệu</Text>
          <TextInput
            style={styles.textInput}
            type="foods"
            ref={foodRef}
            value={formik.values.foods}
            placeholder="Nguyên Liệu"
            onChangeText={formik.handleChange('foods')}
            onSubmitEditing={() => onSubmitEditing(TEXT_INPUT_FOOD)}
            returnKeyType="next"
          />
          <Text type="regular14">Miêu tả</Text>
          <TextInput
            style={styles.textInput}
            type="description"
            ref={descriptionRef}
            value={formik.values.description}
            placeholder="Miêu Tả"
            onChangeText={formik.handleChange('description')}
            onSubmitEditing={() => onSubmitEditing(TEXT_INPUT_DESCRIPTION)}
            returnKeyType="next"
          />

          <View style={styles.ImageSections}>
            <TouchableOpacity
              onPress={() => {
                launchImageLibrary();
              }}
              style={styles.btnUpload}
            >
              <Text type="regular14">Chọn hình</Text>
            </TouchableOpacity>
            <View>
              {imgBase64 && (
                <View>
                  <FastImage
                    source={{ uri: 'data:image/jpeg;base64,' + imgBase64 }}
                    resizeMode={FastImage.resizeMode.cover}
                    style={styles.images}
                  />
                </View>
              )}
            </View>
            {loadingImg ? (
              <View style={styles.loading}>
                <ActivityIndicator size="large" color="#56aaff" />
              </View>
            ) : null}
          </View>
          <Button label="Thêm" style={{ marginVertical: 20 }} onPress={formik.handleSubmit} />
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
export default Index;

const styles = StyleSheet.create({
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
    borderColor: Colors.neturalGrey,
    backgroundColor: Colors.defaultBackground,
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
  containerDropdown: {
    height: 50,
  },
  ImageSections: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  images: {
    width: 150,
    height: 150,
  },
  btnUpload: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.neturalGrey,
  },
});
