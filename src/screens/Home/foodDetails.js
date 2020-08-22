import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
// import { NavigationUtils } from '../../navigation';
// import { useDispatch } from 'react-redux';
import UserReview from './components/comment';
const FoodDetails = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/Images/home.jpg')}
          resizeMode="stretch"
          style={styles.image}
        />
      </View>
      <View style={styles.footer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.action}>
            <Text style={styles.textTitle}>{props.item.name}</Text>
            <Text style={styles.textContent}>{props.item.description}</Text>
            <View style={styles.viewHouseWife}>
              <Image
                source={require('../../assets/Images/home.jpg')}
                resizeMode="contain"
                style={styles.imgProduct}
              />
              <Text style={styles.textHouse}>{props.item.housewife_name}</Text>
            </View>
            <View style={styles.action}>
              <Text style={styles.textName}>Nguyên liệu:</Text>
              <Text style={styles.textGradients}>{props.item.foods[0]}</Text>
            </View>
          </View>
          <View style={styles.commentTouch}>
            <Text style={styles.textComment}>Bình Luận</Text>
          </View>
          <UserReview />
          <TouchableOpacity style={styles.btnBook}>
            <Text style={styles.textBook}>THÊM VÀO GIỎ HÀNG</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

export default FoodDetails;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    backgroundColor: '#56aaff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },

  footer: {
    flex: 2,
    paddingHorizontal: 10,
  },
  action: {
    marginHorizontal: 10,
    paddingVertical: 10,
  },
  viewHouseWife: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textHouse: {
    fontSize: 16,
    marginLeft: 20,
  },
  imgProduct: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  textTitle: {
    fontSize: 20,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
  textContent: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Roboto',
  },
  textName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textGradients: {
    fontSize: 16,
  },

  commentTouch: {
    marginHorizontal: 10,
    borderRadius: 5,
  },
  textComment: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  btnBook: {
    backgroundColor: '#34d134',
    paddingVertical: 5,
    marginHorizontal: 10,
    alignItems: 'center',
    marginVertical: 15,
    borderRadius: 5,
  },
  textBook: {
    color: '#fff',
    fontSize: 18,
  },
});
