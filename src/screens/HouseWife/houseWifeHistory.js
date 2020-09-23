/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { NavigationUtils } from '../../navigation';
import { SCREEN_HEIGHT } from '../../themes/Constants';
import { Colors, Images } from '../../themes';
import { Text, Touchable } from '../../components';
import Icon from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import { getFoodOfHouseWife } from '../../redux/AuthRedux/operations';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import NumberFormat from 'react-number-format';

const HouseWifeHistory = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [refreshing, setRefreshing] = React.useState(false);

  const initData = async () => {
    try {
      setLoading(true);
      const response = await dispatch(getFoodOfHouseWife());
      console.log('reposne', response);
      setData(response.payload);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      Alert.alert('Error', error.data?.message || 'An error has occurred', [
        { text: 'OK', onPress: () => console.log('Ok pressed') },
      ]);
    }
  };
  useEffect(() => {
    initData();
  }, []);
  const onAddFood = () => {
    NavigationUtils.push({
      screen: 'HouseWifeProduct',
      isTopBarEnable: false,
    });
  };
  const onReload = async () => {
    try {
      setRefreshing(true);
      await dispatch(getFoodOfHouseWife());
      initData();
      setRefreshing(false);
    } catch (error) {}
    setRefreshing(false);
  };

  const Item = ({ item }) => (
    <View>
      {data && (
        <View style={styles.content}>
          {item.image ? (
            <FastImage
              source={{ uri: item.image }}
              resizeMode={FastImage.resizeMode.cover}
              style={styles.img}
            />
          ) : (
            <FastImage
              source={Images.intro_1}
              resizeMode={FastImage.resizeMode.cover}
              style={styles.img}
            />
          )}

          <View>
            <Text type="bold12" numberOfLines={1} ellipsizeMode="tail">
              {item.name}
            </Text>
            <View style={styles.viewText}>
              <Text type="regular12">Ngày thêm: </Text>
              <Text type="regular12">{moment(item.date).format('L')}</Text>
            </View>
          </View>
          <View style={{ justifyContent: 'space-between' }}>
            <Text type="regular12" color={Colors.primary}>
              <NumberFormat
                value={item.price}
                displayType={'text'}
                thousandSeparator={true}
                renderText={(value) => <Text>{value}</Text>}
              />{' '}
              vnd
            </Text>
            <View style={styles.btnAction}>
              <Touchable>
                <Icon name="md-trash" size={20} color={Colors.secondary} />
              </Touchable>
              <Touchable>
                <Icon
                  name="md-create"
                  size={20}
                  color={Colors.primary}
                  style={{ marginLeft: 20 }}
                />
              </Touchable>
            </View>
          </View>
        </View>
      )}
    </View>
  );
  const renderEmpty = () => {
    return (
      <View style={styles.emptyView}>
        <FastImage
          source={Images.gallery}
          resizeMode={FastImage.resizeMode.cover}
          style={styles.nullImage}
        />
        <Text type="regular14" color={Colors.grey}>
          Bạn chưa thêm món ăn
        </Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text type="regular20" color={Colors.white}>
          MÓN ĂN CỦA BẠN
        </Text>
      </View>
      <Touchable onPress={onAddFood} style={styles.btnAdd}>
        <Icon name="md-add" size={30} color={Colors.white} />
      </Touchable>
      <View style={styles.contentContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={Item}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onReload} />}
          ListEmptyComponent={renderEmpty}
          keyExtractor={(item, index) => `${index}`}
        />
      </View>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#56aaff" />
        </View>
      ) : null}
    </View>
  );
};
export default HouseWifeHistory;

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
  },
  headerContainer: {
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 30,
    height: SCREEN_HEIGHT / 10,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnAdd: {
    backgroundColor: Colors.primary,
    height: 50,
    width: 50,
    borderRadius: 30,
    marginHorizontal: 20,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    paddingHorizontal: 20,
    flex: 1,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingVertical: 20,
    borderBottomColor: Colors.mainBorder,
  },
  img: {
    width: 80,
    height: 60,
    borderRadius: 10,
  },
  viewText: {
    marginTop: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  btnAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  emptyView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  nullImage: {
    width: 200,
    height: 200,
  },
});
