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
const FeedVideo = ({
  data,
  currentTime,
  duration,
  setDuration,
  setCurrentTime,
  currentIndex,
  item1,
}) => {
  console.log("🚀 ~ data:", data)
  // console.log("🚀 ~ item==============>:", JSON.stringify(data,null,2))
  // const videoRef = useRef();
  const [videoRef, setvideoRef] = useState(null);
  // console.log('🚀 ~ videoRef:', videoRef);
  const [isLoading, setIsLoading] = useState(false);
  const [paused, setPaused] = useState(false);
  const [clicked, setClicked] = useState(false);
  // console.log('🚀 ~ clicked================>:', clicked);

  const togglePlayPause = () => {
    setPaused(!paused);
  };

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={data}
      pagingEnabled={true}
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={16}
      style={{
        height: windowHeight,
        width: windowWidth,
      }}
      ListEmptyComponent={() => {
        return (
          <View
            style={{
              justifyContent: 'center',
              height: windowHeight * 0.4,
              alignItems: 'center',
            }}>
            <CustomText style={{color: Color.black}} isBold>
              No data Found!
            </CustomText>
          </View>
        );
      }}
      renderItem={({item, index}) => {
        // console.log("🚀 ~ item ========================== >>>>>>>>>> 2:", `${baseUrl}/${item?.file}`)
        console.log(item?.caption)
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
                {height: windowHeight, paddingBottom: moderateScale(0, 0.3)},
              ]}>
              <Video
                ref={ref => setvideoRef(ref)}
                resizeMode={'contain'}
                // repeat={true}
                paused={paused}
                // paused={paused}
                // controls={false}
                // source={require('../Assets/Images/video1.mp4')}
                source={{
                  uri: `${baseUrl}/${item?.file}`,
                }}
                // source={item2?.item?.uri}
                style={styles.backgroundVideo}
                onProgress={data => {
                  // console.log('first', data);
                  // setDuration(data?.playableDuration);
                  // setCurrentTime(data?.currentTime);
                }}
                onLoadStart={data => {
                  console.log('video is loading ', data);
                  setIsLoading(true);
                  // Views();
                }}
                onLoad={x => {
                  // console.log('video successfully loaded ', x);
                  setIsLoading(false);
                  setPaused(false);
                  // setvideoRef(videoRef.props.paused)
                }}
                onBuffer={x => console.log('buffering video', x)}
                onError={error =>
                  console.log('error ================> ', error)
                }
              />
              {clicked && (
                <View
                  // onPress={() => {
                  //   setClicked(!clicked);
                  // }}
                  style={styles.button}>
                  <View style={styles.rowView}>
                    <TouchableOpacity
                      onPress={() => {
                        togglePlayPause();
                        // setPaused(!paused);
                        // console.log(
                        //   'here=======> click on red color ',
                        //   videoRef.props.paused ==  true ? false :'text',
                        // );
                        // console.log( 'here==============================>',videoRef?.props?.paused)
                        // setvideoRef(
                        //   (videoRef.props.paused ==  true ? false :'text'),
                        // );

                        // setvideoRef(prev => prev.props.paused = !prev.props.paused)
                        // setPaused(!paused);
                      }}
                      style={{
                        marginHorizontal: moderateScale(25, 0.6),
                      }}>
                      <View style={styles.button2}>
                        <CustomImage
                          onPress={() => {
                            togglePlayPause();
                            // setPaused(!paused);
                            // console.log( 'here1',videoRef.props.paused ==false ?true : false)
                            // setvideoRef(videoRef.props.paused == true ? false :'text');

                            // setvideoRef(prev =>  prev.props.paused = false)
                            // setPaused(!paused);
                          }}
                          style={{
                            width: '100%',
                            height: '100%',
                            tintColor: 'white',
                          }}
                          source={
                            isLoading ? (
                              <ActivityIndicator
                                size={'small'}
                                color={Color.white}
                              />
                            ) : paused ? (
                              require('../Assets/Images/paused.png')
                            ) : (
                              require('../Assets/Images/play.png')
                            )
                          }
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              {/* {isLoading && (
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

                      // position: 'absolute',
                      height: windowHeight,
                      width: windowWidth,
                      // justifyContent: 'center',
                      // alignItems: 'center',
                      // backgroundColor: 'black',
                    }}>
                    <ActivityIndicator size={'large'} color={'black'} />
                  </View>
                )} */}
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 0, y: 0.9}}
                colors={['#ffffff00', '#000000']}
                style={styles.linearstyle}>
                <View style={styles.container}>
                  <View style={styles.contView}>
                    <View style={styles.photoView}>
                      {isLoading ? (
                        <SkeletonPlaceholder
                          backgroundColor="lightgrey"
                          highlightColor="#E0E0E0"
                          speed={1}>
                          <SkeletonPlaceholder.Item
                            width={'100%'}
                            shimmerWidth={'100%'}
                            height={'100%'}
                            // borderRadius={4}
                          />
                        </SkeletonPlaceholder>
                      ) : (
                        <CustomImage
                          source={
                            item?.profile_info?.photo
                              ? {
                                  uri: `${baseUrl}/${item?.profile_info?.photo}`,
                                }
                              : require('../Assets/Images/avatar3.png')
                          }
                          style={{
                            height: '100%',
                            width: '100%',
                          }}
                        />
                      )}
                    </View>
                    {isLoading ? (
                      <SkeletonPlaceholder
                        backgroundColor="lightgrey"
                        highlightColor="#E0E0E0"
                        speed={1}>
                        <SkeletonPlaceholder.Item
                          width={'100%'}
                          shimmerWidth={'100%'}
                          height={'100%'}
                          // borderRadius={4}
                        />
                      </SkeletonPlaceholder>
                    ) : (
                      <View
                        style={{
                          justifyContent: 'space-between',
                        }}>
                        <CustomText numberOfLines={1} style={styles.cT} isBold>
                          {item?.profile_info?.name}
                        </CustomText>

                        <CustomText numberOfLines={1} style={styles.customT2}>
                          new york
                        </CustomText>
                      </View>
                    )}
                  </View>
                  <View style={styles.Views}>
                    <CustomText
                      style={{
                        fontSize: moderateScale(14, 0.6),
                        color: Color.white,
                      }}>
                      {/* {views} */}0 likes
                    </CustomText>
                    <View style={styles.cmtView}></View>
                    <CustomText
                      style={{
                        fontSize: moderateScale(14, 0.6),
                        color: Color.white,
                      }}>
                      {data?.comment?.length}0 comments
                    </CustomText>
                  </View>
                  <View style={styles.caption}>
                    <ScrollView
                      showsVerticalScrollIndicator={false}
                      contentContainerStyle={{
                        //   backgroundColor: 'green',
                        paddingBottom: moderateScale(20, 0.3),
                      }}>
                      <ShowMoreAndShowLessText
                        minTextLength={10}
                        style={styles.moreLess}>
                        {
                          item?.caption
                        
                        }
                      </ShowMoreAndShowLessText>
                    </ScrollView>
                  </View>
                </View>
                <View style={styles.opcity}>
                  {/* <View style={styles.btnView}>
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
                    <CustomText numberOfLines={1} style={styles.customT}>
                      {(item?.my_like && like) || (!item?.my_like && !like)
                        ? numeral(item?.total_likes_count).format('0a')
                        : item?.my_like && !like
                        ? numeral(item?.total_likes_count - 1).format('0a')
                        : numeral(item?.total_likes_count + 1).format('0a')}
                    </CustomText>
                  </View> */}

                  <View style={styles.btnView}>
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
                    <CustomText numberOfLines={1} style={styles.customT}>
                      {data?.comments?.length}
                    </CustomText>
                  </View>
                  {/* <ComentsSection refRBSheet={refRBSheet} data={item} setCommentsCount={setCommentsCount} />  */}
                </View>
                <View
                  style={{
                    position: 'absolute',
                    backgroundColor: Color.themeColor,
                    height: windowWidth * 0.01,
                    width: currentTime
                      ? duration
                        ? `${(currentTime / duration) * 100}%`
                        : '0%'
                      : '0%',
                  }}></View>
              </LinearGradient>
            </TouchableOpacity>
            {/* //  )}  */}
          </>
        );
      }}
    />
  );
};

export default FeedVideo;

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
