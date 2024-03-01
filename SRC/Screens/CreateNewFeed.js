import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
  ToastAndroid,
  Alert,
} from 'react-native';
import Color from '../Assets/Utilities/Color';
import CustomStatusBar from '../Components/CustomStatusBar';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import CustomImage from '../Components/CustomImage';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import CustomText from '../Components/CustomText';
import Header from '../Components/Header';
import DropDownSingleSelect from '../Components/DropDownSingleSelect';
import {useSelector} from 'react-redux';
import CustomButton from '../Components/CustomButton';
import navigationService from '../navigationService';
import ImagePickerModal from '../Components/ImagePickerModal';
import {Icon} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import {Post} from '../Axios/AxiosInterceptorFunction';

const CreateNewFeed = () => {
  const themeColor = useSelector(state => state.authReducer.ThemeColor);
  const privacy = useSelector(state => state.authReducer.privacy);
  const [feedTitle, setFeedTitle] = useState('');
  // console.log("🚀 ~ CreateNewFeed ~ feedTitle:", feedTitle)
  const profileData = useSelector(state => state.commonReducer.selectedProfile);
  // console.log("🚀 ~ CreateNewFeed ~ profileData:", profileData)
  const token = useSelector(state => state.authReducer.token);
  // console.log("🚀 ~ CreateNewFeed ~ token:", token)
  // console.log("🚀 ~ CreateNewFeed ~ feedTitle:", feedTitle)
  const [description, setDescription] = useState('');
  const [Details, setDetails] = useState('');
  const [radio, setRadio] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const [image, setImage] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [hashtags, setHashTags] = useState([]);
  const [feedsTitle, setFeedsTitle] = useState([]);
  // console.log("🚀 ~ CreateNewFeed ~ hashtags:", hashtags)
  // console.log("🚀 ~ CreateNewFeed ~ feedsTitle:", feedsTitle)

  const architecture = ['#architecture', 'ABC', 'BCD', 'CDE'];
  const [dropDownValue, setDropDownValue] = useState('#Architecture');

  const addFeeds = async () => {
    const url = 'auth/feed';
    const formData = new FormData();

    // const hashTagArray= hashtags.split('');
    // console.log("🚀 ~ addFeeds ~ formData:", formData)
    const body = {
      profile_id: profileData?.id,
      name: feedsTitle,
      // hashtags: hashtags,
      description: Details,
      image: image,
    };
    hashtags.forEach((tag, index) => {
      formData.append(`hashtags[${index}]`, tag);
    });
    for (let key in body) {
      formData.append(key, body[key]);
    }
  console.log("🚀 ~ addFeeds ~ body:", formData)
    setisLoading(true);
    const response = await Post(url, formData, apiHeader(token));
    setisLoading(false);
    if (response != undefined) {
      // return console.log("🚀 ~ addFeeds ~ response:",  response?.data);
      Platform.OS == 'android'
        ? ToastAndroid.show('feed created successfully',ToastAndroid.SHORT)
        : Alert.alert('feed created successfully');
      navigationService.navigate('HomeScreen');
    }
  };

  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />
      <Header right Title={'New Feed'} showBack />
      <ScrollView>
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
          <View style={styles.topContainer}>
            <View
              style={
                {
                  // borderWidth : 1,
                  // paddingRight : moderateScale(7,0.6),
                  // paddingBottom : moderateScale(7,0.6),
                  // paddingVertical:moderateScale(10,.6),
                  // backgroundColor:'green '
                }
              }>
              <View
                style={[
                  {
                    height: windowHeight * 0.27,
                    width: windowWidth * 0.95,
                    backgroundColor: 'white',
                    borderRadius: moderateScale(20, 0.6),
                    marginLeft: moderateScale(5, 0.3),
                    justifyContent: 'center',
                    overflow: 'hidden',
                  },
                  Object.keys(image).length == 0 && {
                    alignItems: 'center',
                  },
                ]}>
                {Object.keys(image).length > 0 ? (
                  <CustomImage
                    source={{uri: image?.uri}}
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                    onPress={() => {
                      setShowModal(true);
                    }}
                  />
                ) : (
                  // <TouchableOpacity activeOpacity={0.7} style={styles.image}>

                  <Icon
                    name={'camera'}
                    as={Entypo}
                    size={moderateScale(45, 0.6)}
                    onPress={() => {
                      setShowModal(true);
                    }}
                  />

                  // </TouchableOpacity>
                )}
              </View>
              <CustomText
                style={{
                  textAlign: 'left',
                  // width: windowWidth * 0.5,
                  marginTop: moderateScale(10, 0.3),
                  fontSize: moderateScale(15, 0.6),
                  marginLeft: moderateScale(30, 0.3),
                }}
                isBold>
                feed title
              </CustomText>
              <View style={styles.hashtagview}>
                <TextInputWithTitle
                  titleText={'Feed Title'}
                  placeholder={'Feed Title'}
                  setText={setFeedsTitle}
                  value={feedsTitle}
                  viewHeight={0.05}
                  viewWidth={0.6}
                  inputWidth={0.6}
                  color={Color.black}
                  placeholderColor={Color.themeLightGray}
                  style={{fontWeight: 'bold'}}
                />
              </View>
              <CustomText
                style={{
                  textAlign: 'left',
                  // width: windowWidth * 0.5,
                  marginTop: moderateScale(20, 0.3),
                  fontSize: moderateScale(15, 0.6),
                  marginLeft: moderateScale(30, 0.3),
                }}
                isBold>
                asign hashtags
              </CustomText>
              <View style={styles.hashtagview}>
                <TextInputWithTitle
                  titleText={'Feed Hashtag'}
                  placeholder={'Feed Hashtag'}
                  setText={setFeedTitle}
                  value={feedTitle}
                  viewHeight={0.05}
                  viewWidth={0.6}
                  inputWidth={0.6}
                  color={Color.black}
                  placeholderColor={Color.themeLightGray}
                  style={{fontWeight: 'bold'}}
                />
                {feedTitle != '' && (
                  <CustomButton
                    text={
                      isLoading ? (
                        <ActivityIndicator color={'#01E8E3'} size={'small'} />
                      ) : (
                        'Add'
                      )
                    }
                    textColor={themeColor[1]}
                    fontSize={11}
                    paddingHorizontal={10}
                    bgColor={'#FFFFFF'}
                    borderRadius={moderateScale(30, 0.3)}
                    // marginTop={moderateScale(30, 0.3)}
                    // marginBottom={moderateScale(50)}
                    onPress={() => {
                      setHashTags(prev => [...prev, `#${feedTitle}`]);
                      setFeedTitle('');
                    }}
                  />
                )}
              </View>
            </View>
          </View>
          <View style={styles.mapview1}>
            {hashtags?.map((item, index) => {
              return (
                <View style={styles.mapview2}>
                  <CustomText
                    isBold
                    style={{
                      fontSize: moderateScale(11, 0.6),
                      color: Color.white,
                    }}>
                    {item}
                  </CustomText>
                </View>
              );
            })}
          </View>
          <View style={styles.descriptionview}>
            <CustomText style={styles.descriptiontext} isBold>
              Add The description
            </CustomText>
            <TextInputWithTitle
              maxLength={2000}
              secureText={false}
              placeholder={`Enter description`}
              setText={setDetails}
              value={Details}
              viewHeight={0.13}
              viewWidth={0.85}
              inputWidth={0.8}
              color={Color.red}
              placeholderColor={Color.themeLightGray}
              borderBottomWidth={1}
              borderColor={Color.lightGrey}
              // backgroundColor={Color.black}
              multiline
            />
          </View>

          {/* <View
            style={styles.privacyview}>
            <CustomText
              style={{
                color: '#000',
                fontSize: moderateScale(12, 0.6),
                marginLeft: moderateScale(10, 0.3),
              }}>
              Privacy Setting
            </CustomText> */}

          {/* <View style={[styles.radioButtonContainer]}> */}
          {/* <TouchableOpacity
                onPress={() => {
                  setRadio('private');
                }}
                style={[
                  styles.radioButton,
                  {
                    backgroundColor:
                      radio == 'private' ? themeColor[1] : Color.veryLightGray,
                  },
                ]}> */}
          {/* <View style={styles.radioButtonIcon} /> */}
          {/* </TouchableOpacity>
              <CustomText
                onPress={() => {
                  setRadio('private');
                }}
                style={styles.radioButtonText}>
                Private
              </CustomText>

              <TouchableOpacity
                onPress={() => {
                  setRadio('public');
                }}
                style={[
                  styles.radioButton,
                  {
                    backgroundColor:
                      radio == 'public' ? themeColor[1] : Color.veryLightGray,
                  },
                ]}></TouchableOpacity>
              <CustomText
                onPress={() => {
                  setRadio('public');
                }}
                style={styles.radioButtonText}>
                Public
              </CustomText> */}
          {/* </View>
          </View> */}
          <CustomButton
            text={
              isLoading ? (
                <ActivityIndicator color={'#01E8E3'} size={'small'} />
              ) : (
                'Submit'
              )
            }
            textColor={themeColor[1]}
            width={windowWidth * 0.4}
            height={windowHeight * 0.06}
            // marginTop={moderateScale(10, 0.3)}
            bgColor={['#FFFFFF', '#FFFFFF']}
            borderRadius={moderateScale(30, 0.3)}
            isGradient
            isBold={true}
            marginTop={moderateScale(30, 0.3)}
            // marginBottom={moderateScale(50)}
            onPress={() => {
              addFeeds();
              // navigationService.navigate('HomeScreen');
            }}
          />
        </ImageBackground>
      </ScrollView>
      <ImagePickerModal
        show={showModal}
        setShow={setShowModal}
        setFileObject={setImage}
      />
    </>
  );
};

const styles = ScaledSheet.create({
  line: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.0004,
    // paddingVertical: moderateScale(15, 0.6),
    backgroundColor: 'white',
    alignSelf: 'center',
    // borderRadius: moderateScale(15, 0.6),
    // alignItems: 'center',
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
  bottomImage: {
    width: windowWidth * 0.4,
    backgroundColor: 'green',
  },

  textContainer: {
    marginTop: moderateScale(20, 0.3),
  },

  Heading: {
    fontSize: moderateScale(20, 0.3),
    // fontWeight: 'bold',
    color: '#ffffff',

    alignSelf: 'flex-start',
  },

  txt3: {
    fontSize: moderateScale(10, 0.6),
    alignSelf: 'center',
    fontWeight: '600',
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth * 0.9,
    // marginTop: moderateScale(10,0.3),
  },
  txt4: {
    color: Color.purple,
    fontSize: moderateScale(15, 0.6),
    marginTop: moderateScale(8, 0.3),
    fontWeight: 'bold',
  },
  image: {
    height: windowHeight * 0.04,
    width: windowWidth * 0.3,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt5: {
    color: Color.white,
    marginTop: moderateScale(10, 0.3),
    fontSize: moderateScale(12, 0.6),
  },
  dropDown: {
    backgroundColor: Color.red,
  },
  privacyContainer: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.05,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: moderateScale(10, 0.3),
  },
  topContainer: {
    width: windowWidth,
    // height: windowHeight * 0.28,
    // flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(10, 0.6),
    // marginTop: moderateScale(20, 0.3),
    // marginLeft: moderateScale(-20, 0.3),
    // backgroundColor: 'black',
    paddingVertical: moderateScale(10, 0.6),
  },
  radioButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: windowWidth * 0.5,
    paddingLeft: moderateScale(20, 0.3),
  },
  radioButton: {
    height: moderateScale(11, 0.6),
    width: moderateScale(11, 0.6),
    backgroundColor: '#e8e8e8',
    borderRadius: moderateScale(11, 0.6),
    borderWidth: 2,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonIcon: {
    height: 8,
    width: 8,
    borderRadius: moderateScale(7, 0.6),
    backgroundColor: '#98CFB6',
  },
  radioButtonText: {
    fontSize: moderateScale(12, 0.6),
    fontWeight: '600',
    color: '#000',
  },
  hashtagview: {
    width: windowWidth * 0.8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    //  backgroundColor : 'red',
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderColor: Color.lightGrey,
  },
  mapview1: {
    width: windowWidth * 0.8,
    flexWrap: 'wrap',
    flexDirection: 'row',
    // backgroundColor:'red'
  },
  mapview2: {
    paddingHorizontal: moderateScale(10, 0.6),
    paddingVertical: moderateScale(5, 0.6),
    borderWidth: 1,
    borderRadius: moderateScale(10, 0.6),
    borderColor: Color.white,
    marginHorizontal: moderateScale(5, 0.3),
    marginTop: moderateScale(8, 0.3),
  },
  descriptionview: {
    // width: windowWidth * 0.9,
    height: windowHeight * 0.14,
    marginTop: moderateScale(10, 0.3),
    // backgroundColor:'red',
    // marginLeft: moderateScale(-20, 0.3),
  },
  descriptiontext: {
    textAlign: 'left',
    // width: windowWidth * 0.5,
    fontSize: moderateScale(15, 0.6),
    // marginLeft: moderateScale(30, 0.3),
  },
  privacyview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: windowWidth * 0.9,
    alignSelf: 'center',
    // backgroundColor:'red',
    marginTop: moderateScale(30, 0.3),
  },
});

export default CreateNewFeed;
