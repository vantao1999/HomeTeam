import React from 'react';
import { Text, View, StyleSheet, ScrollView, Image, SafeAreaView } from 'react-native';
import * as Animatable from 'react-native-animatable';
const Item = () => {

  return (
    <View style={styles.container}>
      <View style ={styles.viewLocation}>
        <View style = {styles.viewTrung}>
          <Text>Image here</Text>
          <Text>Bac</Text>
        </View>
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
export default Item;

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
