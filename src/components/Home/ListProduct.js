import React, { Component } from 'react'
import {  View, FlatList, StyleSheet, Image, ScrollView} from 'react-native'
import Item from './Item'

const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Há Cảo',
      img: require('../../assets/Images/Home/bac/img1.jpg')
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Vịt kho ',
      img: require('../../assets/Images/Home/bac/img2.jpg')
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Cơm chiên dương châu',
      img: require('../../assets/Images/Home/bac/img3.jpg')
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'rau muống xào',
      img: require('../../assets/Images/Home/bac/img4.jpg')
    },
  ];
  
export default class ListProduct extends Component {
    render() {
        return (
            <ScrollView>
                <FlatList
                    data={DATA}
                    renderItem={({ item }) => (
                    <Item
                        id={item.id}
                        title={item.title}
                        img={item.img}
                    />
                    )}
                    keyExtractor={item => item.id}
                    // extraData={item.title}
                />
            </ScrollView>
        )
    }
}
