/* eslint-disable react-native/no-inline-styles */
import React,{useState,useEffect} from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
  SafeAreaView,
} from 'react-native';
import { NavigationUtils } from '../../navigation';
import { Navigation } from 'react-native-navigation';
import { useSelector, useDispatch } from 'react-redux';
// import { get } from 'lodash';
import { get,includes,toLower } from 'lodash';
import { getOne } from '../../redux/AuthRedux/operations';
import { unwrapResult } from '@reduxjs/toolkit';
import LinearGradient from 'react-native-linear-gradient';

const ListProductBac = () => {
  const dispatch = useDispatch();
  const listFood = useSelector((state) => get(state, 'auth.listFood', null));
  console.log('USERDATA', listFood);
  // const mienbac = useSelector((state) => get(state, 'auth.listFood', null));


  const [searchTxt,setSearchTxt] = React.useState('');
const [userData, setUserData] = useState([]);
useEffect(() => {
  if (listFood) {
    setUserData(listFood);
  }
}, [listFood]);

  useEffect(() => {
    if (searchTxt) {
      const temp = listFood.filter((i) => includes(toLower(i.name), toLower(searchTxt)));
      setUserData(temp);
    } else {
      setUserData(listFood);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTxt]);

  const getUserData = async (userId) => {
    const result = await dispatch(getOne(userId));
    if (getOne.fulfilled.match(result)) {
      const userData = unwrapResult(result);

      if (userData) {
        Navigation.push(NavigationUtils.currentScreenId,{
          component: {
            name: 'userProfile', 
            passProps:{
              userData
            },
            options: { 
              topBar: {
                title: {
                  text: 'User Profile Details'
                }
              }
            }
          }
          
        });
      }
    } else {
      if (result.payload) {
        Alert.alert('Error', result.payload.message || 'error');
      } else {
        Alert.alert('Error', result.error || 'error');
      }
    }
  };
  const getFoodData = async (item) => {
    Navigation.push(NavigationUtils.currentScreenId,{
      component: {
        name: 'foodDetails', 
        passProps:{
          item
        },
        options: { 
          topBar: {
            title: {
              text: 'Food Details'
            }
          }
        }
      }
    });
    console.log(isTopBarEnable,"111")
  };
  const Item = ({ item }) => (
    <TouchableOpacity
      style={styles.viewFood}
      onPress={() => {
        console.log('LOG ID', item._id);
        getFoodData(item);
      }}
    >
      <Image source={require('../../assets/Images/user.jpeg')} style={styles.imageUser} />
      <View style={styles.viewIn}>
        <Text style={styles.foodTitle}>{item.name}</Text>
        <Text style={styles.textDes}>{item.description}</Text>
        <Text style={styles.textPrice}>{item.price} vnd</Text>
      </View>
      <TouchableOpacity
        style={styles.btnViewFood}
        onPress={() => {
          getUserData(item.id);
        }}
      >
        <Text style={styles.textOrder}>Đặt Ngay</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textTitle}>Hôm nay bạn muốn ăn gì?</Text>
      <View style={styles.viewSearch}>
        <TextInput style={styles.searchBar} placeholder="Tìm kiếm" value={searchTxt}
            autoCorrect={false}
            onChangeText={(text) => {
              setSearchTxt(text);
              console.log('log', text )

            }}/>
      </View>
      <View style={styles.action} />
      <View style={styles.content}>
        <Text style={styles.textTitleContent}>ĐẶT NGAY!</Text>
      </View>
      <View style={styles.footer}>
        <FlatList
          showsVerticalScrollIndicator={true}
          data={listFood.filter((item) => item.location === "Miền Bắc")}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={Item}
          keyExtractor={(item) => item.email}
        />
      </View>
    </SafeAreaView>
  );
};
export default ListProductBac;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#19b7b7',
  },
  header: {
    marginTop: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  imageHeader: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginRight: 5,
  },
  footer: {
    flex: 2,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  textTitle: {
    alignSelf: 'center',
    fontSize: 20,
    color: '#fff',
  },
  textPrice: {
    color: '#56aaff',
    fontSize: 16,
  },
  viewSearch: {
    marginHorizontal: 20,
    flexDirection: 'row',
  },
  searchBar: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#fff',
    flex: 1,
  },
  action: {
    marginHorizontal: 50,
    marginVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'dotted',
    borderRadius: 100,
    borderColor: '#ffffff',
  },

  content: {
    marginHorizontal: 20,
  },
  textTitleContent: {
    color: '#fff',
  },
  viewFood: {
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    alignItems: 'center',
    flexDirection: 'row',
  },
  imageUser: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  viewIn: {
    flex: 1,
    marginLeft: 20,
  },
  foodTitle: {
    fontFamily: 'Roboto-bold',
    fontSize: 20,
  },
  btnViewFood: {
    position: 'absolute',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: '#56aaff',
    bottom: -10,
    right: 0,
  },
  textOrder: {
    color: '#fff',
  },
});
