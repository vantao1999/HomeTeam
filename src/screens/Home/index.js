import React from 'react';
import { Text, View, StyleSheet, ScrollView, Image, SafeAreaView,TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { NavigationUtils } from '../../navigation';
const Home = () => {
  const Navigate = () =>{
    NavigationUtils.push({
      screen:'Item',
      options: { 
        topBar: {
          title: {
            text: 'list product'
          }
        }
      },
      isTopBarEnable:true,
      title:'text'
    })
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
    </View>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
});
