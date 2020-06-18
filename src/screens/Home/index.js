import React from 'react';
import { Text, View, StyleSheet, ScrollView, Image, SafeAreaView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationUtils } from '../../navigation';
import { useSelector } from 'react-redux';
const Home = () => {
  const data = useSelector((state) => state);
  console.log('token', data.auth.token);

  return (
    <SafeAreaView style={styles.container}>
      <Animatable.View style={styles.header} animation="bounceInLeft">
        <Text style={styles.title}>Balance</Text>
        <Image source={require('../../assets/Images/user.jpeg')} style={styles.logo} />
      </Animatable.View>

      <Animatable.View style={styles.balance} animation="bounceInRight">
        <Text style={styles.textBalance}>756,000 VND</Text>
      </Animatable.View>

      <Animatable.View style={styles.footer} animation="fadeInUp" duration={700}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.textDate}>Jun 11th</Text>
          <View style={styles.action}>
            <Text style={styles.textDid}>1 orange juice</Text>
            <Text style={styles.textPrice}>35,000 VND</Text>
          </View>

          <View style={styles.action}>
            <Text style={styles.textDid}>1 Salt juice</Text>
            <Text style={styles.textPrice}>35,000 VND</Text>
          </View>

          <Text style={styles.textDate}>Jun 15th</Text>
          <View style={styles.action}>
            <Text style={styles.textDid}>1 milk coffee</Text>
            <Text style={styles.textPrice}>35,000 VND</Text>
          </View>

          <View style={styles.action}>
            <Text style={styles.textDid}>1 Coco`a Pad, 2 Lemon juices`</Text>
            <Text style={styles.textPrice}>80,000 VND</Text>
          </View>
        </ScrollView>
      </Animatable.View>
    </SafeAreaView>
  );
};
export default Home;

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
    width: 100,
    height: 100,
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
    borderRadius: 20,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginTop: 10,
  },
  textDate: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  action: {
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 10,
    marginTop: 20,
    flexDirection: 'row',
  },
  textDid: {
    flex: 1,
    fontSize: 16,
  },
  textPrice: {
    fontSize: 20,
    fontWeight: '600',
    color: 'red',
    width: 100,
    paddingLeft: 10,
  },
});
