import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TextInput, Alert, Keyboard, ActivityIndicator } from 'react-native';
import { Text, Button, Touchable } from '../../components';
import { NavigationUtils } from '../../navigation';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFormik } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DropDownPicker from 'react-native-dropdown-picker';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../themes/Constants';
import { Fonts, Colors, Images } from '../../themes';
import FastImage from 'react-native-fast-image';
import { addFood } from '../../redux/AuthRedux/operations';

const TEXT_INPUT_NAME = 'TEXT_INPUT_NAME';
const TEXT_INPUT_HOUSEWIFE_NAME = 'TEXT_INPUT_HOUSEWIFE_NAME';
const TEXT_INPUT_PRICE = 'TEXT_INPUT_PRICE';
const TEXT_INPUT_FOOD = 'TEXT_INPUT_FOOD';
const TEXT_INPUT_DESCRIPTION = 'TEXT_INPUT_DESCRIPTION';

const Index = (props) => {
  const [image, setProductImg] = React.useState(null);
  const [loading, setLoading] = useState(false);
  const [dropdownHeight, setDropdownHeight] = useState(null);
  const dispatch = useDispatch();
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
  const getProductImg = async () => {
    if (props.image) {
      setProductImg(props.image);
    }
  };
  useEffect(() => {
    getProductImg();
  }, [image]);
  const formik = useFormik({
    initialValues: {
      name: '',
      location,
      foods: '',
      price: '',
      housewife_name: '',
      description: '',
      image: props.image || null,
    },

    onSubmit: (values) => {
      console.log('lovalue', values);
      handleAddFood(values);
    },
  });

  const handleAddFood = async ({
    foods,
    location,
    image,
    housewife_name,
    price,
    name,
    description,
  }) => {
    Keyboard.dismiss();
    const data = { foods, location, image, housewife_name, price, name, description };
    try {
      setLoading(true);
      const result = await dispatch(addFood(data));
      if(addFood.fulfilled.match(result)){
        setLoading(false);
        Alert.alert('Thông báo!', 'Đăng sản phẩm thành công', [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
      }
     else{
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
  const onUploadImage = () => {
    NavigationUtils.push({
      screen: 'UploadImage',
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
          <TextInput
            style={styles.textInput}
            type="price"
            ref={priceRef}
            value={formik.values.price}
            placeholder="Nhập Giá Tiền"
            onChangeText={formik.handleChange('price')}
            onSubmitEditing={() => onSubmitEditing(TEXT_INPUT_PRICE)}
            returnKeyType="next"
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
          <Touchable style={styles.btnImage} onPress={onUploadImage}>
            <Text type="regular14">Chọn hình</Text>
          </Touchable>
          <View style={{ alignItems: 'center', marginTop: 15 }}>
            {image ? (
              <FastImage
                source={{ uri: image }}
                resizeMode={FastImage.resizeMode.cover}
                style={styles.productImg}
              />
            ) : null}
          </View>
          <Button
            label="Thêm"
            style={{ marginVertical: 20 }}
            onPress={formik.handleSubmit}
          ></Button>
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
  btnImage: {
    width: 100,
    borderColor: Colors.neturalGrey,
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    padding: 5,
  },
  productImg: {
    width: 200,
    height: 200,
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
});
