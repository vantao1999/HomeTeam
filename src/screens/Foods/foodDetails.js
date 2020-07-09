import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
// import { NavigationUtils } from '../../navigation';
// import { useDispatch } from 'react-redux';

const FoodDetails = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/Images/home.jpg')}
          resizeMode="contain"
          style={styles.image}
        />
        <Text style={styles.textHouse}>{props.item.housewife_name}</Text>
      </View>
      <View style={styles.footer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.action}>
            <Text style={styles.textTitle}>Mô tả:</Text>
            <Text style={styles.textContent}>{props.item.description}</Text>
          </View>

          <View style={styles.content}>
            <Image
              source={require('../../assets/Images/home.jpg')}
              resizeMode="contain"
              style={styles.imgProduct}
            />
            <View style={styles.viewGradient}>
              <Text style = {styles.textName}>{props.item.name}</Text>
              <Text style={styles.textHouse}>Nguyên liệu:</Text>
              <Text style={styles.textGradients}>- {props.item.foods[0]}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.btnBook}>
            <Text style={styles.textBook}>Đặt Ngay</Text>
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
    width: 200,
    height: 100,
    borderRadius: 100,
  },
  
  footer: {
    flex: 2,
  },
  action: {
    backgroundColor: '#fff',
    marginHorizontal: 10,
    paddingVertical: 10,
    borderBottomColor: '#f2f2f2',
    borderBottomWidth: 2,
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
  content: {
    paddingVertical: 10,
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#f2f2f2',
  },
  textName:{
    fontSize:18,
    fontWeight:'bold',
  },
  viewGradient: {
    flex: 1,
    paddingRight:5,
  },
  imgProduct: {
    width: 200,
    height: 100,
  },
  textHouse: {
    fontSize: 16,
  },
  textGradients: {
    fontSize: 16,
  },
  btnBook: {
    backgroundColor: '#56aaff',
    paddingVertical: 5,
    alignItems: 'center',
    alignSelf:'center',
    borderRadius: 15,
    marginVertical: 15,
    width: Dimensions.get('window').width/2,
  },
  textBook: {
    color: '#fff',
    fontSize: 18,
  },
});
