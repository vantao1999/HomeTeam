import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useSelector } from 'react-redux';
import navigationTo from '../../utils/navigationTo'
export default class Home extends Component {
    constructor(props){
        super(props);
    }
    onPressNavigation= ()=>{
      navigationTo(null,this.props.componentId,'ListProduct','List Product')
      }
    
    render() {
        console.log('ComponentId', this.props.componentId)
        return (
            <SafeAreaView style={styles.container}>
            <Animatable.View style={styles.topScreen}>
              <View style={styles.viewtopscreen}>
                <Text style ={{color:"white"}}>HƯƠNG VỊ QUÊ NHÀ</Text>
              </View> 
            </Animatable.View>
            <Animatable.View style ={styles.foodArea}>
              <View style={styles.rowFood}>
                <TouchableOpacity style={styles.rowFoodImage1} onPress={this.onPressNavigation}>
                  <Image source={require('../../assets/Images/Home/north-icon.jpg')} style={styles.logo} />
                  <Text>MIỀN BẮC</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.rowFoodImage2} onPress={this.onPressNavigation}>
                <Image source={require('../../assets/Images/Home/south-icon.jpg')} style={styles.logo} />
                  <Text>MIỀN NAM</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.rowFood}>
              <TouchableOpacity style={styles.rowFoodImage1} onPress={this.onPressNavigation}>
                  <Image source={require('../../assets/Images/Home/central-icon.jpg')} style={styles.logo} />
                  <Text>MIỀN TRUNG</Text>
              </TouchableOpacity>
                <TouchableOpacity style={styles.rowFoodImage2} onPress={this.onPressNavigation}>
                  <Image source={require('../../assets/Images/Home/other-icon.jpg')} style={styles.logo} />
                  <Text>OTHER</Text>
                </TouchableOpacity>
              </View>
            </Animatable.View>
            <Animatable.View style={styles.foodBar}>
              <View style={styles.bar} />
            </Animatable.View>
            <Animatable.View style={styles.rowbutton}>
              <TouchableOpacity style={styles.button}>
                <Text>ĐẶT NGAY</Text>
              </TouchableOpacity>
            </Animatable.View>
          </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    topScreen: { 
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
       backgroundColor: "skyblue"
      },
      viewtopscreen: {
        width: Dimensions.get('window').width,
       height:50,
        flexDirection: "row",
         alignItems: "center",
          justifyContent: "center"
        },
        foodArea: {
          marginTop: 45 
        },
    button: {
      alignItems: "center",
      padding: 10,
      width: Dimensions.get('window').width/2,
      borderRadius: 20,
      borderColor: "skyblue",
      borderWidth: 1
    },
    rowFood: { 
      flexDirection: 'row',
     justifyContent: "center"
  },
  rowFoodImage1: {
    width: (Dimensions.get('window').width/2)-30, 
    margin: 10, 
    marginTop: 20, 
    marginLeft: 70, 
    height: 140, 
    backgroundColor: 'powderblue', 
    alignItems: 'center', 
    justifyContent:'center'
  },
  rowFoodImage2: {
    width: (Dimensions.get('window').width/2)-30, 
    margin: 10,
    marginTop: 20,
    marginRight: 70,
    height: 140, 
    backgroundColor: 'powderblue', 
    alignItems: 'center', 
    justifyContent:'center'
  },
  foodBar: { 
    flexDirection: "row", 
    alignItems: "center", 
    marginTop: 10, 
    justifyContent: "center"
  },
  bar: {
    width: Dimensions.get('window').width/2, 
    margin: 10, 
    height: 5, 
    backgroundColor: 'black'
  },
  rowbutton: { 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "center", 
    marginTop: 40
  },
    logo: {
      width:70,
      height: 70
    }
  });