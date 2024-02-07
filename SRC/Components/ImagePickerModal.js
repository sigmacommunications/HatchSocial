import React, {useState, useEffect} from 'react';
import {
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  FlatList,
  I18nManager,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
  Alert,
  // Modal,
  Button,
} from 'react-native';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {Icon} from 'native-base';
import Modal from 'react-native-modal';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CustomText from '../Components/CustomText';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import { useSelector } from 'react-redux';

const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message:
          'App needs access to your camera ' +
          'so you can take awesome pictures.',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    } else {
    }
  } catch (err) {
    console.warn(err);
  }
};

const ImagePickerModal = props => {
  const themeColor = useSelector(state => state.authReducer.ThemeColor);
  let {show, setShow, setFileObject, setMultiImages, crop, type} = props;
  // console.log("🚀 ~ file: ImagePickerModal.js:49 ~ ImagePickerModal ~ type:", type)

  const openGallery = () => {
    let options = {
      mediaType: type ? type : 'photo',
      maxWidth: 500,
      maxHeight: 500,
      quailty: 0.9,
      saveToPhotos: true,
    };
  
    // {
    //   crop
    //     ? ImagePicker.openPicker({
    //         width: 300,
    //         height: 400,
    //         cropping: true,
    //       }).then(image => {
    //         console.log( 'dasdas ========>',image);
    //       })
    //     :
    launchImageLibrary(options, response => {
      console.log('Here is the response =====', response)
      if (Platform.OS === 'ios') {
        setShow(false);
      }
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
        alert(response.customButton);
      }
      else if( response ?.assets && response?.assets[0]?.duration > 5){
        alert('Video is too long');

      } 
      
      else {
        setFileObject &&
          setFileObject({
            uri: type == 'video' ?  `${response?.assets[0]?.uri}`: response?.assets[0]?.uri ,
            type: response?.assets[0]?.type,
            name: response?.assets[0]?.fileName,
          });

        setMultiImages &&
          setMultiImages(x => [
            ...x,
            {
              uri: response?.assets[0]?.uri,
              type: response?.assets[0]?.type,
              name: response?.assets[0]?.fileName,
            },
          ]);
      }
    });
    // // }
    // console.log("🚀 ~ file: ImagePickerModal.js:103 ~ openGallery ~ response:", response)
    // console.log("🚀 ~ file: ImagePickerModal.js:103 ~ openGallery ~ response:", response)
    // console.log("🚀 ~ file: ImagePickerModal.js:103 ~ openGallery ~ response:", response)
    // console.log("🚀 ~ file: ImagePickerModal.js:103 ~ openGallery ~ response:", response)
    // console.log("🚀 ~ file: ImagePickerModal.js:103 ~ openGallery ~ response:", response)
  };

  const openCamera = async () => {
    let options = {
      mediaType: type ? type : 'photo',
      maxWidth: 500,
      maxHeight: 500,
      quailty: 0.9,
      saveToPhotos: true,
    };
    if (Platform.OS === 'android') {
      if (PermissionsAndroid.PERMISSIONS.CAMERA) {
      } else {
        await requestCameraPermission();
      }
    }
    launchCamera(options, response => {
      console.log('Response from camera    =====', response)
      if (Platform.OS == 'ios') {
        setShow(false);
      }
      else if( response ?.assets && response?.assets[0]?.duration > 5){
        alert('Video is too long')
      }
      // if (response.didCancel) {
      // } else if (response.error) {
      // } else if (response.customButton) {
      //   Alert.alert(response.customButton);
      // }
      else {
        setFileObject &&
          setFileObject({
            uri: response?.assets[0]?.uri,
            type: response?.assets[0]?.type,
            name: response?.assets[0]?.fileName,
          });

        setMultiImages &&
          setMultiImages(x => [
            ...x,
            {
              uri: response?.assets[0]?.uri,
              type: response?.assets[0]?.type,
              name: response?.assets[0]?.fileName,
            },
          ]);
      }
    });
  };

  return (
    <Modal
      isVisible={show}
      swipeDirection="up"
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: Color.white,
      }}
      onBackdropPress={() => {
        setShow(false);
      }}>
      <View
        style={{
          backgroundColor: Color.white,
          height: Dimensions.get('window').height * 0.33,
          width: Dimensions.get('window').width * 0.8,
          paddingHorizontal: moderateScale(10, 0.3),
          paddingVertical: moderateScale(10, 0.3),
          borderRadius: Dimensions.get('window').width * 0.02,
        }}>
        <CustomText style={styles.modalHead}>Upload {type}</CustomText>
        <View
          style={[
            styles.modalContentContianer,
            {borderBottomColor: themeColor[1], borderTopColor: themeColor[1]},
          ]}>
          {type != 'video' && <TouchableOpacity
            onPress={() => {
              if (Platform.OS === 'android') {
                setShow(false);
              }
              openGallery();
            }}
            style={[styles.modalContentBtn, {backgroundColor: themeColor[1]}]}>
            <Icon
              name={'folder-images'}
              as={Entypo}
              size={moderateScale(25, 0.3)}
              style={{
                color: Color.white,
              }}
            />
            <CustomText style={styles.modalBtnText}>Gallery</CustomText>
          </TouchableOpacity>}
          <TouchableOpacity
            onPress={() => {
              if (Platform.OS === 'android') {
                setShow(false);
              }
              openCamera();
            }}
            style={[styles.modalContentBtn, {backgroundColor: themeColor[1]}]}>
            <Icon
              name={'camera'}
              as={FontAwesome5}
              size={moderateScale(25, 0.3)}
              style={{
                color: Color.white,
              }}
            />
            <CustomText style={styles.modalBtnText}>Camera</CustomText>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => setShow(false)}
          style={[styles.modalCancelBtn, {backgroundColor: themeColor[1]}]}>
          <CustomText style={styles.modalBtnText}>Cancel</CustomText>
        </TouchableOpacity>
      </View>
      {/* <View
        style={{
          // flex: 1,
          backgroundColor: Color.black,
          height: Dimensions.get("window").height * 0.33,
          width: Dimensions.get("window").width * 0.8,
          paddingHorizontal: moderateScale(10, 0.3),
          paddingVertical: moderateScale(10, 0.3),
          borderRadius: Dimensions.get("window").width * 0.02,
        }}
      >
        <CustomText style={styles.modalHead}>Upload picture</CustomText>
        <View style={styles.modalContentContianer}>
          <TouchableOpacity
            onPress={() => {
              if (Platform.OS === "android") {
                setShow(false);
              }
              openGallery();
            }}
            style={styles.modalContentBtn}
          >
            <Icon
              name={"folder-images"}
              as={Entypo}
              size={moderateScale(25, 0.3)}
              style={{
                color: Color.black,
              }}
            />
            <CustomText style={styles.modalBtnText}>Gallery</CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (Platform.OS === "android") {
                setShow(false);
              }
              openCamera();
            }}
            style={styles.modalContentBtn}
          >
            <Icon
              name={"camera"}
              as={FontAwesome5}
              size={moderateScale(25, 0.3)}
              style={{
                color: Color.black,
              }}
            />
            <CustomText style={styles.modalBtnText}>Camera</CustomText>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => setShow(false)}
          style={styles.modalCancelBtn}
        >
          <CustomText style={styles.modalBtnText}>Cancel</CustomText>
        </TouchableOpacity>
      </View> */}
    </Modal>
  );
};

const styles = ScaledSheet.create({
  modalHead: {
    fontSize: moderateScale(15, 0.3),
    fontWeight: 'bold',
    marginBottom: moderateScale(7.5, 0.3),
  },
  modalContentContianer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center',
    height: windowHeight * 0.21,
    borderBottomWidth: 2,

    borderTopWidth: 2,
  },
  modalContentBtn: {
    alignItems: 'center',
    paddingHorizontal: windowWidth * 0.08,
    paddingVertical: windowHeight * 0.02,
    borderRadius: 15,
  },
  modalBtnText: {
    fontWeight: 'bold',
    color: Color.white,
    fontSize: moderateScale(15, 0.3),
  },
  modalCancelBtn: {
    paddingVertical: windowHeight * 0.008,
    width: windowWidth * 0.25,
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: moderateScale(10, 0.3),
    borderRadius: moderateScale(5, 0.3),
  },
});

export default ImagePickerModal;