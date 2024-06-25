import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
// import { TouchableOpacity, View, StyleSheet, FlatList} from 'react-native';
import {ImageBackground, ScrollView} from 'react-native';

import Color from '../Assets/Utilities/Color';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import CustomImage from '../Components/CustomImage';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Video from 'react-native-video';
import numeral from 'numeral';
import CustomText from '../Components/CustomText';
import {Icon} from 'native-base';
import {useSelector} from 'react-redux';
import {baseUrl} from '../Config';
// import ComentsSection from './ComentsSection';
import {Get, Post} from '../Axios/AxiosInterceptorFunction';
import ShowMoreAndShowLessText from '../Components/ShowMoreAndShowLessText';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
const VideoComponent = ({
  item,
  currentTime,
  duration,
  setDuration,
  setCurrentTime,
  currentIndex,
  item1,
}) => {
  console.log('🚀 ~ item==============>:', `${baseUrl}/${item?.file}`);
  // const videoRef = useRef();
  const [videoRef, setvideoRef] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paused, setPaused] = useState(true);
  const [clicked, setClicked] = useState(false);
  
  const togglePlayPause = () => {
    setPaused(!paused);
  };

  return (
          <>
            {/* {isLoading ? (
                <SkeletonPlaceholder
                  backgroundColor="lightgrey"
                  highlightColor="#E0E0E0"
                  speed={1}>
                  <SkeletonPlaceholder.Item
                    width={windowWidth}
                    shimmerWidth={windowWidth}
                    height={windowHeight}
                    // borderRadius={4}
                  />
                </SkeletonPlaceholder>
              ) : ( */}
            <TouchableOpacity
              onPress={() => {
                setClicked(!clicked);
              }}
              activeOpacity={1}
              style={[
                styles.card,
                {
                  height: windowHeight * 0.4,
                },
              ]}>
              <Video
                ref={ref => setvideoRef(ref)}
                resizeMode={'contain'}
                paused={paused}
                // source={{
                //   uri: 'https://8a36-103-125-71-60.ngrok-free.app/uploads/post/d5ace3963d92ca80c0340e2ba3a7e219Hatch-social.mp4',
                // }}
                source={{uri :`${baseUrl}/${item?.file}`}}
                style={styles.backgroundVideo}
                onProgress={data => {
                  console.log('first', data);
                }}
                onLoadStart={data => {
                  console.log('video is loading ', data);
                  setIsLoading(true);
                  // Views();
                }}
                onLoad={x => {
                  console.log('video successfully loaded ', x);
                  setIsLoading(false);
                  setPaused(false);
                }}
                onBuffer={x => console.log('buffering video', x)}
              />
              {clicked && (
                <View
                  style={styles.button}>
                  <View style={styles.rowView}>
                    <TouchableOpacity
                      onPress={() => {
                        togglePlayPause();
                      }}
                      style={{
                        marginHorizontal: moderateScale(25, 0.6),
                      }}>
                      <View style={styles.button2}>
                        <CustomImage
                          onPress={() => {
                            togglePlayPause();
                          }}
                          style={{
                            width: '100%',
                            height: '100%',
                          }}
                          source={
                            isLoading ? (
                              <ActivityIndicator
                                size={'small'}
                                color={Color.white}
                              />
                            ) : paused ? (
                              require('../Assets/Images/play.png')
                            ) : (
                              require('../Assets/Images/paused.png')
                            )
                          }
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
               {isLoading && (
                    <View
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
  
                        height: windowHeight,
                        width: windowWidth,}}>
                      <ActivityIndicator size={'large'} color={'black'} />
                    </View>
                  )}
            </TouchableOpacity> 
          </>
   );
};

export default VideoComponent;

const styles = StyleSheet.create({
  linearstyle: {
    position: 'absolute',
    bottom: 0,
    justifyContent: 'flex-end',
    shadowOffset: {height: 1, width: 0},
    shadowOpacity: 1,
    shadowRadius: 4,
    width: '100%',
    // paddingBottom: moderateScale(30, 0.3),
    // backgroundColor :'red'
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
  opcity: {
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
    // marginVerical :moderateScale(10,.3)
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
  customT2: {
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
  customT: {fontSize: moderateScale(12, 0.6), color: Color.white},
  btn: {
    height: moderateScale(30, 0.6),
    width: moderateScale(30, 0.6),
    borderRadius: moderateScale(30, 0.6) / 2,
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  caption: {
    width: windowWidth * 0.86,
    marginTop: moderateScale(10, 0.3),
    // alignSelf: 'center',
    paddingHorizontal: moderateScale(10, 0.3),

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
  button: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // position: 'absolute',
    // bottom: 0,
    // pointerEvents: 'none',
    zIndex: 1,
  },
  rowView: {
    // backgroundColor :'green',
    flexDirection: 'row',
    width: '100%',
    // paddingTop :moderateScale(30,.6),
    justifyContent: 'space-between',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button2: {
    height: windowHeight * 0.1,
    width: windowWidth * 0.25,
    zIndex: 1,
    // backgroundColor: 'green',
  },
});
