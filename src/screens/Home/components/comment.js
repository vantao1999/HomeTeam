/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Colors, Images } from '../../../themes';
import { Text } from '../../../components';
import FastImage from 'react-native-fast-image';
// import Icon from 'react-native-vector-icons/Ionicons';

const UserReview = ({ data }) => {
  const DATA = [
    {
      image: Images.dummy,
      userName: 'Dang Phuong Nam',
      date: '20/08/2020',
      comment:
        'Hương vị quê nhà là một ứng dụng giúp cho những ai người đi làm xa mong muốn được thưởng thức món ăn của quê nhà',
    },
    {
      image: Images.dummy,
      userName: 'Hoang Thi Thuong',
      date: '20/08/2020',
      comment:
        'Hương vị quê nhà là một ứng dụng giúp cho những người đi làm xa mong muốn được thưởng thức món ăn của quê nhà',
    },
    {
      image: Images.dummy,
      userName: 'Huynh Dang Thiet',
      date: '20/08/2020',
      comment:
        'Hương vị quê nhà là một ứng dụng giúp cho những người đi làm xa mong muốn được thưởng thức món ăn của quê nhà',
    },
  ];

  const renderItem = ({ item }) => {
    return (
      <View style={styles.viewComment}>
        <View style={styles.viewUserComment}>
          <FastImage
            source={item.image}
            resizeMode={FastImage.resizeMode.cover}
            style={{ width: 40, height: 40, borderRadius: 40 }}
          />
          <View style={{ marginHorizontal: 10 }}>
            <Text type="bold14">{item.userName}</Text>
            <Text type="regular14" color={Colors.primaryTextBlur}>
              {item.date}
            </Text>
          </View>
        </View>
        <Text type="regular14" color={Colors.grey} marginVertical={5} lineHeight={22}>
          {item.comment}
        </Text>
      </View>
    );
  };

  return (
    <FlatList
      data={data || DATA}
      renderItem={renderItem}
      keyExtractor={(item, index) => `${index}`}
      ListEmptyComponent={() => (
        <Text type="regular14" color={Colors.mainL2} marginLeft={20} marginBottom={5}>
          No review available
        </Text>
      )}
    />
  );
};

UserReview.propTypes = {};

const styles = StyleSheet.create({
  viewUserComment: {
    flexDirection: 'row',
    marginTop: 10,
  },
  viewComment: {
    marginHorizontal: 10,
    backgroundColor: '#fff',
  },
});

export default UserReview;
