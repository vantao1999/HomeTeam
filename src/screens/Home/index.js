import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, Image, SafeAreaView } from 'react-native';
import * as Animatable from 'react-native-animatable';

export default class Home extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Animatable.View style={styles.header} animation="bounceInLeft">
          <Text style={styles.title}>Balance</Text>
          <Image source={require('../../assets/Images/logo.png')} style={styles.logo} />
        </Animatable.View>

        <Animatable.View style={styles.balance} animation="bounceInRight">
          <Text style={styles.textBalance}>756,000 VND</Text>
        </Animatable.View>

        <Animatable.View style={styles.footer} animation="fadeInUp" duration={500}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.textDate}>Jun 11th</Text>
            <View style={styles.action}>
              <Text style={styles.textDid}>You have done something here</Text>
              <Text style={styles.textprice}>35,000 VND</Text>
            </View>

            <View style={styles.action}>
              <Text style={styles.textDid}>You have done something here</Text>
              <Text style={styles.textprice}>35,000 VND</Text>
            </View>

            <Text style={styles.textDate}>Jun 15th</Text>
            <View style={styles.action}>
              <Text style={styles.textDid}>You have done something here</Text>
              <Text style={styles.textprice}>35,000 VND</Text>
            </View>

            <View style={styles.action}>
              <Text style={styles.textDid}>1 Cocoa Pad, 2 Lemon juices</Text>
              <Text style={styles.textprice}>350,000,000 VND</Text>
            </View>
          </ScrollView>
        </Animatable.View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffcc00',
  },
  header: {
    opacity: 0.7,
    flex: 1,
    backgroundColor: '#f4f4f4',
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    flex: 1,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  balance: {
    opacity: 0.7,
    flex: 1,
    backgroundColor: '#f4f4f4',
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBalance: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'green',
  },
  footer: {
    flex: 4,
    backgroundColor: '#f7f7f7',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginTop: 10,
  },
  textDate: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  action: {
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginVertical: 20,
    paddingVertical: 20,
    borderRadius: 10,
    marginTop: 15,
    flexDirection: 'row',
  },
  textDid: {
    flex: 1,
    fontSize: 16,
  },
  textprice: {
    fontSize: 20,
    fontWeight: '600',
    color: 'red',
    width: 80,
    paddingLeft: 10,
  },
});
