import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import CustomStatusBar from '../Components/CustomStatusBar';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import {Center, Divider, Icon} from 'native-base';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import navigationService from '../navigationService';
import {useNavigation} from '@react-navigation/native';
import Header from '../Components/Header';
import CustomImage from '../Components/CustomImage';
import ShowMoreAndShowLessText from '../Components/ShowMoreAndShowLessText';
import {useSelector} from 'react-redux';
import moment from 'moment';
import CustomButton from '../Components/CustomButton';
import {Delete, Post} from '../Axios/AxiosInterceptorFunction';
import { baseUrl } from '../Config';
const EventDetails = props => {
  const item = props?.route?.params?.item;
  const navigation  = props?.navigation;
  console.log('🚀 ~ file: EventDetails.js:22 ~ EventDetails ~ item:', item);
  const themeColor = useSelector(state => state.authReducer.ThemeColor);
  const privacy = useSelector(state => state.authReducer.privacy);
  const token = useSelector(state => state.authReducer.token);
  console.log("🚀 ~ EventDetails ~ token:", token)

  const [loading, setLoading] = useState(false);

const deleteEvent = async () =>{
  const url =`auth/event/${item?.id}`;
  setLoading(true);
// return console.log('🚀 ~ file: EventDetails.js:22 ~ EventDetails ~ item:', item);

  const response = await Delete(url, apiHeader(token));
  setLoading(false);
    console.log("🚀 ~ deleteEvent ~ response:", response)
  if (response != undefined) {
    navigation.goBack();
  }
  
}

  const attendingEvent = async () => {
    const url = '';
    setLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setLoading(false);
    console.log(
      '🚀 ~ file: EventDetails.js:45 ~ attendimgEvent ~ response:',
      response,
    );
    if (response != undefined) {
    }
  };

  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />
      <Header Title={'Event details'} showBack />
      <ImageBackground
        source={
          privacy == 'private'
            ? require('../Assets/Images/theme2.jpg')
            : require('../Assets/Images/Main.png')
        }
        resizeMode={'cover'}
        style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{width: windowWidth, height: windowHeight * 0.3}}>
            <CustomImage
              source={
                item?.images?.length > 0
                  ? {uri:`${baseUrl}/${item?.images[0]?.name}`}
                  : require('../Assets/Images/event.jpg')
              }
              style={{
                height: '100%',
                width: '100%',
              }}
              resizeMode={'cover'}
            />
            <View style={styles.date}>
              <CustomText
                style={{color: Color.white, fontSize: moderateScale(15, 0.6)}}>
                {moment(item?.date).format('ddd')}
              </CustomText>
              <CustomText style={{color: Color.white}}>
                {moment(item?.date).format('D MMM')}
              </CustomText>
            </View>

            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity activeOpacity={0.8} style={styles.pinView}>
                <Icon
                  name={'pin'}
                  as={SimpleLineIcons}
                  color={themeColor[1]}
                  size={21}
                />
              </TouchableOpacity>
              {/* <TouchableOpacity
            activeOpacity={0.8}
            style={{
              width: windowWidth * 0.1,
              height: windowWidth * 0.1,
              borderRadius: (windowWidth * 0.1) / 2,
              backgroundColor: Color.themeColor,
              position: 'absolute',
              bottom: -20,
              right: 10,
              elevation: 5,
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
            }}>
            <Icon
              name={'location-arrow'}
              as={FontAwesome}
              color={'white'}
              size={21}
            />
          </TouchableOpacity> */}
            </View>
          </View>

          {/* <View
        style={{
          flexDirection: 'row',
          width: windowWidth * 0.25,
          paddingVertical: moderateScale(10, 0.6),
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
        <TouchableOpacity activeOpacity={0.8}>
          <Icon
            name={'share'}
            as={MaterialCommunityIcons}
            color={'red.400'}
            size={25}
          />
        </TouchableOpacity>
        <CustomText style={{color: Color.black}}>share</CustomText>
      </View> */}

          <CustomText isBold numberOfLines={1} style={styles.title}>
            {item?.title}
          </CustomText>

          <View style={styles.row}>
            <TouchableOpacity activeOpacity={0.8}>
              <Icon
                name={'location-outline'}
                as={Ionicons}
                color={Color.white}
                size={22}
              />
            </TouchableOpacity>

            <CustomText numberOfLines={2} style={styles.time}>
              Outdoor Concert Arena Ustrzyki Gorne
            </CustomText>
          </View>

          <Divider my="3" _light={styles.divider} />

          <View style={styles.row}>
            <Icon name={'calendar'} as={AntDesign} color={'white'} size={22} />

            <CustomText numberOfLines={1} style={styles.time}>
              {item?.date}
            </CustomText>
          </View>

          <Divider my="3" _light={styles.divider} />

          <View style={styles.row}>
            <Icon name={'clock'} as={Feather} color={'white'} size={22} />

            <CustomText numberOfLines={1} style={styles.time}>
              {item?.time} PM
            </CustomText>
          </View>

          <Divider my="3" _light={styles.divider} />

          <CustomText isBold numberOfLines={1} style={styles.eventText}>
            About The event
          </CustomText>

          <View
            style={{
              width: windowWidth * 0.9,
              marginTop: moderateScale(10, 0.3),
              alignSelf: 'center',
            }}>
            <ShowMoreAndShowLessText minTextLength={12} style={styles.moreLess}>
              {item?.description}
            </ShowMoreAndShowLessText>
          </View>
          <View style={{flexDirection:'row', justifyContent:'center', gap:moderateScale(10,0.2)}}>

          <CustomButton
            text={
              loading ? (
                <ActivityIndicator color={Color.white} size={'small'} />
                ) : (
                  'Interested'
              )
            }
            onPress={() => {}}
            textColor={themeColor[1]}
            width={windowWidth * 0.35}
            height={windowHeight * 0.06}
            marginTop={moderateScale(20, 0.3)}
            bgColor={['#fff', '#fff']}
            borderRadius={moderateScale(25, 0.3)}
            elevation
            isGradient
            fontSize={moderateScale(14, 0.6)}
            />
          <CustomButton
            text={
              loading ? (
                <ActivityIndicator color={Color.white} size={'small'} />
                ) : (
                  'Delete'
                  )
                }
            onPress={() => {
              deleteEvent();
            }}
            textColor={themeColor[1]}
            width={windowWidth * 0.35}
            height={windowHeight * 0.06}
            marginTop={moderateScale(20, 0.3)}
            bgColor={['#fff', '#fff']}
            borderRadius={moderateScale(25, 0.3)}
            elevation
            isGradient
            fontSize={moderateScale(14, 0.6)}
            />
            </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default EventDetails;

const styles = StyleSheet.create({
  date: {
    width: windowWidth * 0.16,
    height: windowHeight * 0.09,
    // backgroundColor:'white',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.themeColor,
    position: 'absolute',
    top: 0,
    right: 0,
    borderRadius: moderateScale(2, 0.3),
  },
  pinView: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    borderRadius: (windowWidth * 0.1) / 2,
    backgroundColor: Color.white,
    position: 'absolute',
    bottom: -20,
    zIndex: 1,
    right: 20,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    // overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor:'red',
    width: windowWidth,
    paddingHorizontal: moderateScale(20, 0.6),
    paddingVertical: moderateScale(5, 0.6),
    alignSelf: 'center',
  },
  container: {
    width: windowWidth,
    height: windowHeight * 0.9,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  eventText: {
    color: Color.black,
    width: windowWidth * 0.5,
    textAlign: 'left',
    fontSize: moderateScale(14, 0.6),
    paddingLeft: moderateScale(20, 0.6),
  },
  moreLess: {
    textAlign: 'left',
    fontSize: moderateScale(13, 0.6),
    width: windowWidth * 0.85,
  },
  divider: {
    color: Color.veryLightGray,
    width: windowWidth * 0.9,
    alignSelf: 'center',
  },
  time: {
    color: Color.black,
    fontSize: moderateScale(13, 0.6),
    // backgroundColor:'red',
    width: windowWidth * 0.8,
    paddingLeft: moderateScale(10, 0.6),
  },
  title: {
    color: 'black[',
    // backgroundColor:'red',
    width: windowWidth * 0.65,
    textAlign: 'left',
    fontSize: moderateScale(20, 0.6),
    paddingHorizontal: moderateScale(15, 0.6),
    // backgroundColor:'white',
    paddingVertical: moderateScale(10, 0.6),
  },
});
