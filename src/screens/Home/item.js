import React from 'react';
import { TouchableOpacity,Dimensions, Text, StyleSheet, Image, View } from 'react-native'
import * as Animatable from 'react-native-animatable';
const Item = () => {

  return (
    <TouchableOpacity style={[styles.item]}>
                {/* <View style={[styles.itemCategory]}> */}
                    <Image source={this.props.img} style={[styles.imgItem]}/>
                    <Text >{this.props.title}</Text>
                {/* </View> */}
           </TouchableOpacity>
  );
};
export default Item;

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
    alignItems: "center",
    padding: 10,
    justifyContent: "center",
    flexDirection: "column",
  },
  imgItem: {
      flexDirection: "column",
      width: Dimensions.get('window').width/4,
      height: Dimensions.get('window').width/4,
  }
});
