import React, {useCallback, useEffect, useState} from 'react';
import {ImageBackground, View, TouchableOpacity} from 'react-native';
import Color from '../Assets/Utilities/Color';
import CustomStatusBar from '../Components/CustomStatusBar';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {FlatList, Icon, Image, ScrollView} from 'native-base';

import CustomText from '../Components/CustomText';
import CustomButton from '../Components/CustomButton';
import Header from '../Components/Header';
import navigationService from '../navigationService';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomImage from '../Components/CustomImage';
import {mode} from 'native-base/lib/typescript/theme/tools';
import ImagePickerModal from '../Components/ImagePickerModal';
import { useSelector } from 'react-redux';

const MyGallery = () => {
  const privacy = useSelector(state=> state.authReducer.privacy)
  const themeColor = useSelector(state => state.authReducer.ThemeColor);
  const [selectedTab, setSelectedTab] = useState('All');
  console.log("🚀 ~ file: MyGallery.js:20 ~ MyGallery ~ selectedTab:", selectedTab)
  const [showModal, setShowModal] = useState(false);
  const [profilePicture, setProfilePicture] = useState({});
  const [selectedImages, setselectedImages] = useState([]);
  const [selected, setSelected] = useState(-1);
  console.log(
    '🚀 ~ file: MyGallery.js:23 ~ MyGallery ~ selectedImages:',
    selectedImages,
  );
  console.log(
    '🚀 ~ file: MyGallery.js:21 ~ MyGallery ~ profilePicture:',
    profilePicture,
  );

  const [images, setImages] = useState([
    {
      id: 1,
      uri: 'camera',
    },
    {
      id: 2,
      url: require('../Assets/Images/gallery1.png'),
    },
    {
      id: 3,
      url: require('../Assets/Images/gallery2.png'),
    },
    {
      id: 4,
      url: require('../Assets/Images/gallery3.png'),
    },
    {
      id: 5,
      url: require('../Assets/Images/gallery4.png'),
    },
    {
      id: 6,
      url: require('../Assets/Images/gallery5.png'),
    },

    {
      id: 7,
      url: require('../Assets/Images/gallery6.png'),
    },
    {
      id: 8,
      url: require('../Assets/Images/gallery7.png'),
    },
    {
      id: 9,
      url: require('../Assets/Images/gallery8.png'),
    },
  ]);
  console.log('🚀 ~ file: MyGallery.js:63 ~ MyGallery ~ images:', images);

  useEffect(() => {
    if (Object.keys(profilePicture).length > 0) {
      const newData = [...images];
      newData.splice(1, 0, profilePicture);
      // console.log("🚀 ~ file: MyGallery.js:77 ~ useEffect ~ newData:", newData)
      setImages(newData);
      setProfilePicture({});
    }
  }, [profilePicture]);

  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />
      <Header Title={'My Gallery'} search />
      <ImageBackground
        source={
          privacy == 'private'
            ? require('../Assets/Images/theme2.jpg')
            : require('../Assets/Images/Main.png')
        }
        resizeMode={'cover'}
        style={{
          width: windowWidth,
          height: windowHeight * 0.9,
          alignItems: 'center',
        }}>
        <View
          style={styles.View}>
          <CustomText
          style={[{ color: selectedTab === 'All' ? Color.white : '#353434' },styles.heading ]}
            isBold={true}
            children={'All'}
            onPress={() => {
              setSelectedTab('All');
            }}
          />
          <View style={styles.line}></View>
          <CustomText
         style={[{ color: selectedTab === 'Photos' ? Color.white : '#353434' }, styles.heading ]}
            isBold={true}
            onPress={() => {
              setSelectedTab('Photos');
            }}
            children={'Photos'}
          />

          <View
            style={styles.line}></View>
          <CustomText
             style={[{ color: selectedTab === 'Video' ? Color.white : '#353434' }, styles.heading ]}
            isBold={true}
            onPress={() => {
              setSelectedTab('Video');
            }}
            children={'Video'}
          />
        </View>
        <View style={{position: 'absolute', bottom: 35, zIndex: 1}}>
          <CustomButton
            text={'Next'}
            textColor={themeColor[1]}
            width={windowWidth * 0.4}
            height={windowHeight * 0.06}
            marginTop={moderateScale(10, 0.3)}
            onPress={() => {
              // disptach(setUserToken({token : 'fasdasd awdawdawdada'}))
              // navigationService.navigate('Signup');
            }}
            bgColor={['#FFFFFF', '#FFFFFF']}
            borderRadius={moderateScale(30, 0.3)}
            isGradient
            isBold={true}
          />
        </View>

        <View style={styles.photoConatiner}>
          <FlatList
            numColumns={3}
            data={images}
            contentContainerStyle={{
              marginBottom: moderateScale(30, 0.3),
            }}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              //   console.log('index:', item);
              return (
                <TouchableOpacity
                  onPress={() => {
                    if (index == 0) {
                      setShowModal(true);
                    }
                  }}
                  style={styles.photoCard}>
                  {index == 0 ? (
                    <Icon
                      name="camera"
                      as={Entypo}
                      size={41}
                      color={'black'}
                      style={{alignSelf: 'center', top: 50}}
                      onPress={() => {
                        // console.log('here')
                        setShowModal(true);
                      }}
                    />
                  ) : (
                    <CustomImage
                      source={item?.uri ? {uri: item?.uri} : item?.url}
                      onPress={() => {
                        const isSelected = selectedImages.findIndex(
                          data => data?.id == item?.id,
                        );
                        setSelected(isSelected);
                        console.log(
                          '🚀 ~ file: MyGallery.js:216 ~ MyGallery ~ index:',
                          isSelected,
                        );
                        if (isSelected > -1) {
                          const dataNew = selectedImages.filter(
                            data => data?.id != item?.id,
                          );
                          setselectedImages(dataNew);
                        } else {
                          setselectedImages(prev => [...prev, item]);
                        }
                      }}
                      style={{
                        width: '100%',
                        height: '100%',
                        zIndex: 0,
                      }}
                      key={item?.id}
                    />
                  )}
                  {selectedImages.findIndex(data => data?.id == item?.id) >
                    -1 && (
                    <TouchableOpacity
                      onPress={() => {
                        const isSelected = selectedImages.findIndex(
                          data => data?.id == item?.id,
                        );
                        setSelected(isSelected);
                        console.log(
                          '🚀 ~ file: MyGallery.js:216 ~ MyGallery ~ index:',
                          isSelected,
                        );
                        if (isSelected > -1) {
                          const dataNew = selectedImages.filter(
                            data => data?.id != item?.id,
                          );
                          setselectedImages(dataNew);
                        } else {
                          setselectedImages(prev => [...prev, item]);
                        }
                      }}
                      style={styles.checkIcon}>
                      <Icon
                        name="check"
                        as={Entypo}
                        color={themeColor[1]}
                        size={50}
                        zIndex={1}
                        style={{alignSelf: 'center', top: 50}}
                      />
                    </TouchableOpacity>
                  )}
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </ImageBackground>
      <ImagePickerModal
        show={showModal}
        setShow={setShowModal}
        setFileObject={setProfilePicture}
      />
    </>
  );
};

const styles = ScaledSheet.create({
  conatiner: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.0004,
    backgroundColor: Color.white,
    alignSelf: 'center',
    marginTop: moderateScale(20, 0.3),
  },
  textInput: {
    height: windowHeight * 0.05,
    width: windowWidth * 0.7,
    borderWidth: 1,
    borderColor: Color.darkGray,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  photoConatiner: {
    width: windowWidth * 0.9,
    justifyContent: 'space-between',
    marginTop: moderateScale(20, 0.3),
    flexDirection: 'row',
    flexWrap: 'nowrap',
    marginBottom:moderateScale(65,.3)
  },
  photoCard: {
    height: windowHeight * 0.2,
    width: windowWidth * 0.285,
    backgroundColor: Color.white,
    borderRadius: 20,
    overflow: 'hidden',
    marginVertical: moderateScale(5, 0.3),
    marginHorizontal: moderateScale(2, 0.3),
  },
  line: {
    width: windowWidth * 0.006,
    height: windowHeight * 0.02,
    backgroundColor: 'black',
    marginTop: moderateScale(10, 0.3),
  },
  checkIcon: {
    height: windowHeight * 0.2,
    width: windowWidth * 0.285,
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    zIndex: 1,
  },
  heading:{
    fontSize: moderateScale(12, 0.6),
    width: windowWidth * 0.2,
    textAlign: 'center',
    marginTop: moderateScale(10, 0.3),
  },
  View:{
    flexDirection: 'row',
    width: windowWidth * 0.9,
    justifyContent: 'space-between',
    marginTop: moderateScale(10, 0.3),
    alignItems: 'center',
  }
});

export default MyGallery;
