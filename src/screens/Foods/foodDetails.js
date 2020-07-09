import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
// import { NavigationUtils } from '../../navigation';
// import { useDispatch } from 'react-redux';

const FoodDetails = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.footer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.action}>
            <Text style={styles.textTitle}>Name</Text>
            <Text style={styles.textContent}>{props.item.name}</Text>
          </View>
          <View style={styles.action}>
            <Text style={styles.textTitle}>Mô tả</Text>
            <Text style={styles.textContent}>{props.item.description}</Text>
          </View>
          <View style={styles.action}>
            <Text style={styles.textTitle}>Giá</Text>
            <Text style={styles.textContent}>{props.item.price}</Text>
          </View>
          <View style={styles.action}>
            <Text style={styles.textTitle}>Người nấu:</Text>
            <Text style={styles.textContent}>{props.item.housewife_name}</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default FoodDetails;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flex: 3,
  },
  action: {
    backgroundColor: '#fff',
    marginHorizontal: 10,
    paddingVertical: 10,
    borderBottomColor: '#f2f2f2',
    borderBottomWidth: 1.5,
  },
  textTitle: {
    fontSize: 18,
    fontFamily: 'Roboto',
  },
  textContent: {
    fontSize: 20,
    marginTop: 5,
    fontWeight: '500',
    fontFamily: 'Roboto',
  },
});
