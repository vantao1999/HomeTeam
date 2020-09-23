import React from 'react';
import ImagePicker from 'react-native-image-picker';
import FastImage from 'react-native-fast-image';
import { StyleSheet, Text, View, Image, Alert, TouchableOpacity, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { get } from 'lodash';
import axios from 'axios';
import { NavigationUtils } from '../../navigation';

const UploadImage = () => {
  const [fileData, setFileDta] = React.useState(null);
  const token = useSelector((state) => get(state, 'auth.token', null));

  const launchImageLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
        Alert(response.customButton);
      } else {
        setFileDta({
          ...fileData,
          fileData: response?.data,
        });
        console.log('vaochuaeem?', fileData);
      }
    });
  };

  const onUpload = async () => {
    const formData = new FormData();
    const dataUri = `data:image/png;base64,${fileData.fileData}`;
    formData.append('image_base64', dataUri);
    console.log('Me noi voi anh', fileData);

    axios({
      url: 'https://hometown-flavor.herokuapp.com/api/foods/postImage',
      method: 'POST',
      data: formData,
      headers: {
        Accept: '*',
        Authorization: 'Bearer ' + token,
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(function (response) {
        console.log('response image:', response);
        const avatar = response.data.image;
        NavigationUtils.push({
          isTopBarEnable: false,
          screen: 'HouseWifeProduct',
          passProps: { image: avatar },
        });
      })
      .catch(function (error) {
        console.log('error from image :', error);
      });
  };

  return (
    <View style={styles.body}>
      <View style={styles.ImageSections}>
        <View>
          {fileData ? (
            <View>
              <FastImage
                source={{ uri: 'data:image/jpeg;base64,' + fileData.fileData }}
                resizeMode={FastImage.resizeMode.cover}
                style={styles.images}
              />
            </View>
          ) : (
            <View>
              <Image source={require('../../assets/Images/gallery.png')} style={styles.images} />
            </View>
          )}
        </View>
        <TouchableOpacity
          onPress={() => {
            launchImageLibrary();
          }}
          style={styles.btnUpload}
        >
          <Text style={styles.textUpload}>Chọn hình</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnUpload}
          onPress={() => {
            onUpload();
          }}
        >
          <Text style={styles.textUpload}>Lưu</Text>
        </TouchableOpacity>
      </View>
      {/* {uploading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#05375a" />
        </View>
      ) : null} */}
    </View>
  );
};
export default UploadImage;

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  ImageSections: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  images: {
    width: 200,
    height: 200,
    marginHorizontal: 3,
  },
  btnUpload: {
    marginTop: 15,
    width: Dimensions.get('window').width / 2,
    paddingVertical: 2,
    alignItems: 'center',
    backgroundColor: '#ffcc00',
  },
  textUpload: {
    fontFamily: 'Roboto',
    fontSize: 18,
  },
});
