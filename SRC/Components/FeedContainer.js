import React, { useState, useRef } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import {
  ImageBackground,
  ScrollView,
} from 'react-native';

import Color from '../Assets/Utilities/Color';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import CustomImage from '../Components/CustomImage';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Video from 'react-native-video';
import numeral from 'numeral';
import CustomText from '../Components/CustomText';
import { Icon } from 'native-base';
import { useSelector } from 'react-redux';
import { baseUrl } from '../Config';
import ComentsSection from './ComentsSection';
import { Get, Post } from '../Axios/AxiosInterceptorFunction';
import ShowMoreAndShowLessText from '../Components/ShowMoreAndShowLessText';

const FeedContainer = ({ item, source }) => {
  // return console.log("🚀 ~ file: FeedContainer.js:28 ~ FeedContainer ~ item:", item)
  const profileData = useSelector(state => state.commonReducer.selectedProfile);
  const token = useSelector(state => state.authReducer.token);
  // return  console.log("🚀 ~ file: FeedContainer.js:29 ~ FeedContainer ~ token:", token)
  const themeColor = useSelector(state => state.authReducer.ThemeColor);
  const [like, setLike] = useState(item?.my_like ? true : false);
  const refRBSheet = useRef();
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [loading, setloading] = useState(false);
  const [commentsCount, setCommentsCount] = useState(0)
  const [views ,setViews] = useState(0)

  const Views = async () => {
  //  const url = 'auth/post_video_detail/{id}'
    const url = `auth/post_video_detail/${item?.id}`
  setloading(true)
  const response = await Get(url ,token)
 console.log("🚀 ~ file: FeedContainer.js:43 ~ Views ~ response:", response?.data)
  setloading(false)
  if(response != undefined){
    setViews(response?.data?.post_info?.views)  
  } 
  }


  const likePost = async () => {
    const url = `auth/post_like`;
    const body = {
      post_id: item?.id,
      profile_id: profileData?.id,
    };
    setloading(true);
    const response = await Post(url, body, apiHeader(token));
    // return console.log("🚀 ~ file: FeedContainer.js:59 ~ likePost ~ response:", response)
    setloading(false);
    if (response != undefined) {
      setLike(!like);
    }
  };




  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[
        styles.card,
        { height: windowHeight, paddingBottom: moderateScale(0, 0.3) },
      ]}>
      <Video
        resizeMode={'stretch'}
        repeat={true}
        pause={false}
        controls={true}
        // source={require('../Assets/Images/video1.mp4')}
        source={{ uri: source }}
        style={styles.backgroundVideo}
        onProgress={data => {
          // console.log('hereeeeeeeeeee================>>>>>', data);
          setDuration(data?.playableDuration);
          setCurrentTime(data?.currentTime);
        }}
        onLoadStart={data => {
          console.log('hellloooo=============>>>>>', data);
          Views()
          // setDuration(data?.playableDuration);
          // setCurrentTime(data?.currentTime);
        }}
      />
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.9 }}
        colors={['#ffffff00', '#000000']}
        style={styles.linearstyle}>
        <View
          style={styles.container}>
          <View
            style={styles.contView}>
            <View
              style={styles.photoView}>
              <CustomImage
                source={
                  item?.profile_info?.photo
                    ? { uri: `${baseUrl}/${item?.profile_info?.photo}` }
                    : require('../Assets/Images/avatar3.png')
                }
                style={{
                  height: '100%',
                  width: '100%',
                }}
              />
            </View>
            <View style={{
              justifyContent: 'space-between'
            }}>
              <CustomText
                numberOfLines={1}
                style={styles.cT}
                isBold>
                {item?.profile_info?.name}
              </CustomText>

              <CustomText
                numberOfLines={1}
                style={styles.customT2}>
                new york
              </CustomText>
            </View>
          </View>
          <View
            style={styles.Views}>
            <CustomText
              style={{
                fontSize: moderateScale(14, 0.6),
                color: Color.white
              }}>
                {views}
               {/* Vie50ws */}
            </CustomText>
            <View
              style={styles.cmtView}></View>
            <CustomText
              style={{
                fontSize: moderateScale(14, 0.6),
                color: Color.white
              }}>
              {item?.comments?.length} comments
            </CustomText>
          </View>
          <View
            style={styles.caption}>
            <ScrollView
              contentContainerStyle={{
                paddingBottom: moderateScale(20, 0.3)
              }}
            >
              <ShowMoreAndShowLessText minTextLength={12} style={styles.moreLess}>
                {`${item?.caption}${'gffffffffahkjfhkjah dfjkhkjadhfkj hadkjfh kjh adkfj hkajdfh kjahsd fkjhakdjfhk jdfsk fkljhsdk fjhkjsdfh kjh klfjshd fkjhskldjfh ksjdhfkjsdh fkjh sdkjfh ksjd hfkjhs dkjfh skdjfh ksjhdfkjshd fkj hskdjfh ksjhd fkjh dksfjh ksh dfjk hskdh fkh sdkjfhskjdhfkjshdfkj skdjfh ksjdh fkj hdkjh fjkh hfkjhkjh jkhjhsdfkg kjhg kjhsjkghjksdfhkjs dfjk hsdjfkh ksjdhfjkshd fjkhs djkfhjksdhfjkhffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffjk'}`}
              </ShowMoreAndShowLessText>
            </ScrollView>
          </View>
        </View>
        <View
          style={styles.opcity}>
          <View
            style={styles.btnView}>
            <TouchableOpacity
              onPress={() => {
                likePost();
              }}
              style={styles.btn}>
              <Icon
                name={like == true ? 'like1' : 'like2'}
                as={AntDesign}
                color={like == true ? 'white' : 'white'}
                size={like == true ? 8 : 5}
              />
            </TouchableOpacity>
            <CustomText
              numberOfLines={1}
              style={styles.customT}>
              {(item?.my_like && like) || (!item?.my_like && !like)
                ? numeral(item?.total_likes_count).format('0a')
                : item?.my_like && !like
                  ? numeral(item?.total_likes_count - 1).format('0a')
                  : numeral(item?.total_likes_count + 1).format('0a')}
            </CustomText>
          </View>

          <View
            style={styles.btnView}>
            <TouchableOpacity
              onPress={() => {
                refRBSheet.current.open();
              }}
              style={styles.btn2}>
              <Icon
                name={'comments'}
                as={FontAwesome5}
                color={'white'}
                size={5}
              />
            </TouchableOpacity>
            <CustomText
              numberOfLines={1}
              style={styles.customT}>
              {item?.comments?.length}
            </CustomText>
          </View>
          <ComentsSection refRBSheet={refRBSheet} data={item} setCommentsCount={setCommentsCount} />
        </View>
        <View
          style={{
            position: 'absolute',
            backgroundColor: Color.themeColor,
            height: windowWidth * 0.03,
            width: currentTime
              ? duration
                ? `${(currentTime / duration) * 100}%`
                : '0%'
              : '0%',
          }}></View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  linearstyle:{
    position: 'absolute',
    bottom: 0,
    justifyContent: 'flex-end',
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 1,
    shadowRadius: 4,
    width: '100%',
    paddingBottom: moderateScale(30, 0.3),
  },
  profileSection1: {
    height: windowHeight * 0.05,
    width: windowHeight * 0.05,
    backgroundColor: '#fff',
    borderRadius: (windowHeight * 0.05) / 2,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#33dd50',
    justifyContent: 'center',
  },
  container: {
    height: windowHeight * 0.4,
    width: windowWidth * 0.7,
  },
  contView: {
    flexDirection: 'row',
    paddingTop: moderateScale(40, 0.6),
    paddingLeft: moderateScale(5, 0.6),
  },
  btnView: {
    marginTop: moderateScale(20, 0.3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn2: {
    height: moderateScale(30, 0.6),
    width: moderateScale(30, 0.6),
    borderRadius: moderateScale(30, 0.6) / 2,
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoView: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    backgroundColor: 'white',
    overflow: 'hidden',
    borderColor: '#33dd50',
    borderWidth: 2,
    borderRadius: (windowWidth * 0.1) / 2,
    marginTop: moderateScale(12, 0.3),
    marginLeft: moderateScale(5, 0.3),
    marginRight: moderateScale(8, 0.3),
  },
  opcity:{
    position: 'absolute',
    right: 20,
    top: 35,
  },
  card: {
    shadowColor: Color.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.3,
    elevation: 2,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  cT: {
    fontSize: moderateScale(12, 0.6),
    color: Color.white,
    marginTop: moderateScale(12, 0.3),
    textAlign: 'left',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  image: {
    height: '100%',
    width: '100%',
  },

  text: {
    fontSize: moderateScale(18, 0.6),
    color: Color.white,
    textShadowColor: Color.black,
  },
  text1: {
    fontSize: moderateScale(15, 0.6),
    color: Color.veryLightGray,
    textShadowColor: Color.black,
  },
  view: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20, 0.6),
    alignItems: 'center',
  },
  customT2:{
    fontSize: moderateScale(10, 0.6),
    color: Color.white,
    textAlign: 'left',
  },
  israelite: {
    width: windowWidth * 0.22,
    height: windowWidth * 0.1,
    borderRadius: moderateScale(8, 0.6),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
  },
  customT: { fontSize: moderateScale(12, 0.6), color: Color.white },
  btn: {
    height: moderateScale(30, 0.6),
    width: moderateScale(30, 0.6),
    borderRadius: moderateScale(30, 0.6) / 2,
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  caption: {
    width: windowWidth * 0.8,
    marginTop: moderateScale(10, 0.3),
    // alignSelf: 'center',
    paddingHorizontal: moderateScale(10, .3),

    // color:'white',
    // backgroundColor: 'pink'
  },
  Views: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: windowWidth * 0.5,
    alignItems: 'center',
    marginTop: moderateScale(30, 0.3),
    paddingLeft: moderateScale(5, 0.6),
  },
  moreLess: {
    textAlign: 'left',
    fontSize: moderateScale(13, 0.6),
    width: windowWidth * 0.85,
    // color:'white'
  },
  cmtView: {
    width: 1,
    height: windowHeight * 0.02,
    backgroundColor: '#fff',
  },
});

export default FeedContainer;
