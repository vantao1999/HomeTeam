import React, { useEffect } from 'react';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { View, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { SCREEN_WIDTH } from '../../themes/Constants';
import FastImage from 'react-native-fast-image';
import { Text } from '../../components';
import { Colors } from '../../themes';
import { useSelector, useDispatch } from 'react-redux';
import { get } from 'lodash';
import { getOrder } from '../../redux/AuthRedux/operations';
import NumberFormat from 'react-number-format';
import { Navigation } from 'react-native-navigation';
import { NavigationUtils } from '../../navigation';

const Index = () => {
  const dispatch = useDispatch();
  const initData = async () => {
    await dispatch(getOrder());
  };
  useEffect(() => {
    initData();
  }, []);
  const orderData = useSelector((state) => get(state, 'auth.listOrders', null));
  const loading = useSelector((state) => state.auth.loading);

  const NavigateOrderDetail = async (item) => {

    Navigation.push(NavigationUtils.currentScreenId, {
      component: {
        name: 'orderDetail',
        passProps: {
          item,
        },
        options: {
          topBar: {
            title: {
              text: 'Chi Tiết Đặt Hàng',
            },
          },
        },
      },
    });
  };

  const renderOrdered = ({ item }) => (
    <View>
      {item.foods && item.status === 'ordered' ? (
        <TouchableOpacity style={styles.viewOrder} 
        onPress={() => {
          console.log('LOG ID', item._id);
          NavigateOrderDetail(item);
        }}>
          <View style={styles.imgOrder}>
            <FastImage style={styles.imageOrder} source={{ uri: item.foods.image }}></FastImage>
          </View>
          <View style={styles.InforOrder}>
            <View style={styles.InforOrder1}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                type="regular12"
                style={{ width: (SCREEN_WIDTH - 120) / 2 }}
              >
                {item.foods.name}
              </Text>
              <Text type="regular12">
                <NumberFormat
                  value={item.total}
                  displayType={'text'}
                  thousandSeparator={true}
                  renderText={(value) => <Text>{value}</Text>}
                />{' '}
                vnd
              </Text>
            </View>
            <Text type="regular12" marginTop={5}>Số lượng: {item.number}</Text>
            <Text type="regular12" marginTop={5} color={Colors.blue}>
              Đang chờ xử lí...
            </Text>
          </View>
        </TouchableOpacity>
      ) : null}
    </View>
  );
  const inProgress = () => (
    <View style={styles.scene}>
      <FlatList
        data={orderData}
        renderItem={renderOrdered}
        keyExtractor={(item, index) => `${index}`}
      />
       {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#56aaff" />
        </View>
      ) : null}
    </View>
  );

  const Delivery = () => (
    <View style={styles.scene}>
      <Text>screen 2</Text>
    </View>
  );

  const Delivered = () => (
    <View style={styles.scene}>
      <Text>screen 3</Text>
    </View>
  );

  const Canceled = () => (
    <View style={styles.scene}>
      <Text>screen 4</Text>
    </View>
  );

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Đang Chờ Xử Lí' },
    { key: 'second', title: 'Đang Vận Chuyển' },
    { key: 'third', title: 'Đã Nhận' },
    { key: 'fourth', title: 'Đã Huỷ' },
  ]);

  const renderScene = SceneMap({
    first: inProgress,
    second: Delivery,
    third: Delivered,
    fourth: Canceled,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={styles.tabBar}
      style={styles.tabView}
      renderLabel={({ route, focused }) => <Text type="bold14" style={styles.tabTitle}>{route.title}</Text>}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textHeader}>Huong Vi Que Nha!</Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity style={styles.viewTitle}>
          <Text style={styles.textTitle}>LỊCH SỬ</Text>
        </TouchableOpacity>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={renderTabBar}
        />
      </View>
    </View>
  );
};
export default Index;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#19b7b7',
  },
  header: {
    backgroundColor: '#19b7b7',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  textHeader: {
    fontFamily: 'Roboto-bold',
    fontSize: 25,
    color: '#05375a',
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  scene: {
    flex: 1,
  },
  viewOrder: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    marginBottom: 5,
    justifyContent: 'space-between',
    backgroundColor: Colors.backgroundOrder,
  },
  imageOrder: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  InforOrder: {
    paddingLeft: 20,
    flex: 1,
  },
  InforOrder1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewTitle: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textTitle: {
    marginRight: 5,
    fontFamily: 'Roboto-bold',
    fontWeight: 'bold',
    fontSize: 17,
  },
  tabView: {
    marginTop: 10,
    backgroundColor: '#19b7b7',
  },
  tabBar: {
    backgroundColor: '#000',
  },
  tabTitle: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
    color: 'white',
  },
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
});
