import React from 'react';
import { Text, View, StyleSheet, ScrollView, Image, SafeAreaView,TouchableOpacity } from 'react-native';
import { NavigationUtils } from '../../navigation';
import {getFoods} from '../../redux/AuthRedux/operations';
import {useDispatch} from 'react-redux';

const Home = () => {
  const dispatch = useDispatch();
  const Navigate = async() =>{
    NavigationUtils.push({
      screen:'ListProduct',
      isTopBarEnable:true,
      title:'Danh sách món ăn của miền Trung'
    })
    await dispatch(getFoods(''));
  }

  return (
    <View style={styles.container}>
      <View style ={styles.viewLocation}>
        <TouchableOpacity onPress = {Navigate} style = {styles.viewTrung}>
          <Text>Image here</Text>
          <Text>Bac</Text>
        </TouchableOpacity>
        <View style = {styles.viewTrung}> 
        <Text>Image here</Text>
          <Text>Bac</Text>
        </View>
      </View>
      <View style ={styles.viewLocation}>
        <View style = {styles.viewTrung}>
          <Text>Image here</Text>
          <Text>tay</Text>
        </View>
        <View style = {styles.viewTrung}> 
        <Text>Image here</Text>
          <Text>nam</Text>
        </View>
      </View>
      <TouchableOpacity style = {styles.btnBook}>
        <Text style ={styles.textBook}>Dat Ngay</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewLocation:{
    marginTop:10,
    flexDirection: 'row',
  },
  viewTrung:{
    paddingVertical:60,
    flex:1,
    marginHorizontal:10,
    paddingHorizontal:30,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#56aaff',
  },
  btnBook:{
    backgroundColor:'#56aaff',
    marginVertical:20,
    marginHorizontal:110,
    paddingVertical:5,
    alignItems:'center',
    borderRadius:15,
  },
  textBook:{
    color:'#fff',
    fontSize:16,
  }
});
