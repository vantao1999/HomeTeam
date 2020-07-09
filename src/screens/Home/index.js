import React from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
const Home = () => {
  const data = useSelector((state) => state);
  console.log('token', data.auth.token);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.action}>
        <Text style={styles.textDid}>1 Coco`a Pad, 2 Lemon juices`</Text>
      </View>
    </SafeAreaView>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#56aaff',
  },
});
