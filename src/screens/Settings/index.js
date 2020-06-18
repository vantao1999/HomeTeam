import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationUtils } from '../../navigation';
import Feather from 'react-native-vector-icons/Feather';

const Setting = () => {
  const navigateScreen = () => {
    NavigationUtils.startLoginContent();
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.edit}>
          <TouchableOpacity>
            <Feather name="edit" size={20} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => {
            NavigationUtils.push({
              screen: 'UploadImage',
            });
          }}
        >
          <Image source={require('../../assets/Images/user.jpeg')} style={styles.imageUser} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnLogout} onPress={navigateScreen}>
          <Text style={styles.textLogout}>LogOut</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.containerAction}>
          <View style={styles.action}>
            <Text style={styles.textDid}>Name</Text>
            <Text style={styles.textPrice}>Dwayne D Johnson</Text>
          </View>
          <View style={styles.action}>
            <Text style={styles.textDid}>Email</Text>
            <Text style={styles.textPrice}>John.@gmail.com</Text>
          </View>
          <View style={styles.action}>
            <Text style={styles.textDid}>Phone Number</Text>
            <Text style={styles.textPrice}>078 223 6998</Text>
          </View>
          <View style={styles.action}>
            <Text style={styles.textDid}>Gender</Text>
            <Text style={styles.textPrice}>Male</Text>
          </View>
          <View style={styles.action}>
            <Text style={styles.textDid}>DOB</Text>
            <Text style={styles.textPrice}>07/08/1970</Text>
          </View>
          <View style={styles.action}>
            <Text style={styles.textDid}>Job</Text>
            <Text style={styles.textPrice}>PT at Gym Club</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Setting;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1.5,
    backgroundColor: '#ffcc00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageUser: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  footer: {
    flex: 2,
  },
  btnLogout: {
    marginTop: 10,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  textLogout: {
    fontFamily: 'Roboto-bold',
    fontSize: 18,
  },
  action: {
    backgroundColor: '#fff',
    marginHorizontal: 10,
    paddingVertical: 10,
    borderBottomColor: '#f2f2f2',
    borderBottomWidth: 1.5,
  },
  textDid: {
    fontSize: 20,
    fontFamily: 'Roboto',
  },
  textPrice: {
    fontSize: 22,
    marginTop: 5,
    fontWeight: '700',
    fontFamily: 'Roboto',
  },
  edit: {
    position: 'absolute',
    right: 50,
    top: 50,
    flexDirection: 'row',
  },
  textEdit: {
    fontFamily: 'Roboto-Regular',
    textDecorationLine: 'underline',
    fontSize: 18,
  },
});
