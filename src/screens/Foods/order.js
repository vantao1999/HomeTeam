import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Dimensions, Alert } from 'react-native';
// import { NavigationUtils } from '../../navigation';
// import { useDispatch } from 'react-redux';
import { Text, Button } from '../../components';
import { Colors, Images } from '../../themes';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';
import NumberFormat from 'react-number-format';
import { useDispatch } from 'react-redux';
import { createOrder, getOrder } from '../../redux/AuthRedux/operations';
import { useFormik } from 'formik';
import { NavigationUtils } from '../../navigation';
import { Navigation } from 'react-native-navigation';

const Order = (props) => {
  const dispatch = useDispatch();
  const id = props.data._id;
  const [count, setCount] = React.useState(1);
  const onPlus = () => {
    setCount(count + 1);
  };
  const onMinus = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };
  const formik = useFormik({
    initialValues: {
      food_id: id,
      number: null,
    },
    onSubmit: (values) => {
      onCreateOrder(values);
    },
  });
  const onCreateOrder = async ({ food_id, number }) => {
    await dispatch(createOrder({ food_id, number }));
    Alert.alert('Thông báo', 'Đặt hàng thành công', [
      {
        text: 'Ok',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
    ]);
    Navigation.mergeOptions(props.componentId, {
      bottomTabs: {
        currentTabIndex: 1,
      },
    });
    await dispatch(getOrder());
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text type="regular20" color={Colors.white} marginLeft={20} marginVertical={40}>
          Đặt Hàng
        </Text>
      </View>
      <View style={styles.content}>
        <View style={styles.viewProduct}>
          <View style={styles.viewName}>
            <Text type="regular20">{props.data.name}</Text>
          </View>
          {props.data.image ? (
            <FastImage
              source={{ uri: props.data.image }}
              resizeMode={FastImage.resizeMode.cover}
              style={styles.productImg}
            />
          ) : (
            <FastImage
              source={Images.dummy}
              resizeMode={FastImage.resizeMode.cover}
              style={styles.productImg}
            ></FastImage>
          )}
        </View>
        <View style={styles.viewAction}>
          <View style={styles.viewQuantity}>
            <TouchableOpacity onPress={onMinus}>
              <Icon name="md-remove" size={30} color={Colors.grey} />
            </TouchableOpacity>
            <Text type="regular20" marginHorizontal={20}>
              {(formik.values.number = count)}
            </Text>
            <TouchableOpacity onPress={onPlus}>
              <Icon name="md-add" size={30} color={Colors.grey} />
            </TouchableOpacity>
          </View>
          <Text type="regular16">
            <NumberFormat
              value={props.data.price}
              displayType={'text'}
              thousandSeparator={true}
              renderText={(value) => <Text>{value}</Text>}
            />{' '}
            vnd
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 20,
          }}
        >
          <Text type="bold16">Tổng tiền:</Text>
          <Text type="bold14">
            <NumberFormat
              value={count * props.data.price}
              displayType={'text'}
              thousandSeparator={true}
              renderText={(value) => <Text>{value}</Text>}
            />{' '}
            vnd
          </Text>
        </View>
        <Text type="regular12" color={Colors.blur}>
          Hình thức thanh toán (Thanh toán khi nhận hàng)
        </Text>
        <Button
          label="ĐẶT HÀNG"
          color={Colors.primary}
          style={styles.Btn}
          onPress={formik.handleSubmit}
        ></Button>
      </View>
    </View>
  );
};

export default Order;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  header: {
    // alignItems:'center',
  },
  content: {
    flex: 1,
    backgroundColor: Colors.white,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingHorizontal: 20,
  },
  viewProduct: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  viewName: {
    width: Dimensions.get('window').width / 2,
  },
  productImg: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  viewAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  Btn: {
    marginVertical: 25,
  },
  viewQuantity: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.blur,
    borderRadius: 20,
    paddingHorizontal: 15,
  },
});
