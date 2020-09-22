import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { NavigationUtils } from '../../navigation';
import { Navigation } from 'react-native-navigation';
import {
  getFoods,
  getFoodNorth,
  getFoodSouth,
  getFoodCentral,
} from '../../redux/AuthRedux/operations';
import { useDispatch } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { Colors, Images } from '../../themes';
const Home = () => {
  const dispatch = useDispatch();

  const NavigateBac = async () => {
    const result = await dispatch(getFoodNorth(''));

    Navigation.push(NavigationUtils.currentScreenId, {
      component: {
        name: 'ListProductBac',
        passProps: {
          result,
        },
        options: {
          topBar: {
            title: {
              text: 'Danh sách món ăn của miền Bắc',
            },
          },
        },
      },
    });
  };
  const NavigateTrung = async () => {
    const result = await dispatch(getFoodCentral(''));

    Navigation.push(NavigationUtils.currentScreenId, {
      component: {
        name: 'ListProductBac',
        passProps: {
          result,
        },
        options: {
          topBar: {
            title: {
              text: 'Danh sách món ăn của miền Trung',
            },
          },
        },
      },
    });
  };
  const NavigateNam = async () => {
    const result = await dispatch(getFoodSouth(''));
    Navigation.push(NavigationUtils.currentScreenId, {
      component: {
        name: 'ListProductBac',
        passProps: { result },
        options: {
          topBar: {
            title: {
              text: 'Danh sách món ăn của miền Nam',
            },
          },
        },
      },
    });
  };

  const NavigateAllFoods = async () => {
    const result = await dispatch(getFoods(''));
    Navigation.push(NavigationUtils.currentScreenId, {
      component: {
        name: 'ListProductBac',
        passProps: { result },
        options: {
          topBar: {
            title: {
              text: 'Tất Cả Món Ăn',
            },
          },
        },
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.contentHeader}>
          <FastImage
            source={Images.mainLogo}
            resizeMode={FastImage.resizeMode.cover}
            style={styles.imgProduct}
          />
          <View style={styles.viewGradient}>
            <Text style={styles.textLogo}>Hương Vị Quê Nhà</Text>
          </View>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.viewLocation}>
          <TouchableOpacity onPress={NavigateBac} style={styles.viewRegions}>
            <View>
              <Image
                source={require('../../assets/Images/north.jpg')}
                resizeMode={FastImage.resizeMode.cover}
                style={styles.imgLocation}
              />
            </View>
            <Text style={styles.textLocation}>Miền Bắc</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={NavigateTrung} style={styles.viewRegions}>
            <View>
              <Image
                source={require('../../assets/Images/central.jpg')}
                resizeMode={FastImage.resizeMode.cover}
                style={styles.imgLocation}
              />
            </View>
            <Text style={styles.textLocation}>Miền Trung</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.viewLocation}>
          <TouchableOpacity onPress={NavigateNam} style={styles.viewRegions}>
            <View>
              <Image
                source={require('../../assets/Images/south.jpg')}
                resizeMode={FastImage.resizeMode.cover}
                style={styles.imgLocation}
              />
            </View>
            <Text style={styles.textLocation}>Miền Nam</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={NavigateAllFoods} style={styles.viewRegions}>
            <View>
              <Image
                source={require('../../assets/Images/all.jpg')}
                resizeMode={FastImage.resizeMode.cover}
                style={styles.imgLocation}
              />
            </View>
            <Text style={styles.textLocation}>Tất Cả</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.btnBook}>
          <Text style={styles.textBook}>ĐẶT NGAY</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  contentHeader: {
    alignItems:'center',
    justifyContent:'center',
    flexDirection: 'row',
    paddingHorizontal:20,
    borderBottomWidth: 2,
    borderBottomColor: '#f2f2f2',
  },
  viewGradient: {
    flex: 1,
    justifyContent: 'center',
  },
  textLogo: {
    fontSize: 27,
    color: '#19b7b7',
    alignSelf: 'center',
  },
  imgProduct: {
    height: 90,
    borderRadius: 100,
    width: Dimensions.get('window').width / 4,
  },
  content: {
    flex: 4,
    backgroundColor: '#19b7b7',
    alignItems:'center',
    justifyContent:'center',
  },
  viewLocation: {
    marginTop: 10,
    flexDirection: 'row',
  },
  viewRegions: {
    flex: 1,
    marginHorizontal: 10,
    alignItems: 'center',
    backgroundColor: '#fefefe',
    borderRadius: 25,
    width: (Dimensions.get('window'). width - 30) /2,
    height: Dimensions.get('window'). height / 5,

  },
  textLocation: {
    position:'absolute',
    alignSelf:'center',
    marginVertical:55,
    fontSize: 18,
    color: Colors.white,
    fontWeight:'bold',
  },
  btnBook: {
    backgroundColor: '#fff',
    marginVertical: 20,
    paddingVertical: 10,
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 15,
    width: Dimensions.get('window').width / 2,
  },
  textBook: {
    fontSize: 18,
    color: 'red',
    fontWeight: 'bold',
  },
  imgLocation:{
    width: (Dimensions.get('window'). width - 30) /2,
    height: Dimensions.get('window'). height / 5,
    borderRadius:25,
    opacity:0.7,
  },
});
