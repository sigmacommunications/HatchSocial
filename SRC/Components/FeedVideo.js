import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
// import { TouchableOpacity, View, StyleSheet, FlatList} from 'react-native';
import {ImageBackground, ScrollView} from 'react-native';
import ImageSlider from 'react-native-image-slider';
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
import { useNavigation } from '@react-navigation/native';
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
  const navigation = useNavigation();
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
      // scrollEventThrottle={16}
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
        console.log(item?.caption);
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
          style={{
            position:'absolute',
            zIndex:1,
            top:15,
            left:15
          
          }}
          activeOpacity={1}
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon
            as={AntDesign}
            name="arrowleft"
            size={38}
            color={Color.white}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </TouchableOpacity>
            
              <TouchableOpacity
                onPress={() => {
                  setClicked(!clicked);
                  setPaused(prev => !prev);
                  console.log("Logging video")
                }}
                activeOpacity={1}
                style={[
                  styles.card,
                  {height: windowHeight, 
              
                    paddingBottom: moderateScale(0, 0.3)},
                ]}>
               <Video
                  ref={ref => setvideoRef(ref)}
                  resizeMode={'contain'}
                  // repeat={true}
                  paused={paused}
                
                  // source={require('../Assets/Images/video1.mp4')}
                  source={{
                    uri: `${baseUrl}/${item?.videos?.name}`,
                  }}
                  style={styles.backgroundVideo}
                  onProgress={data => {}}
                  onLoadStart={data => {
                    console.log('video is loading ', data);
                    setIsLoading(true);
                  }}
                  onLoad={x => {
                    setIsLoading(false);
                    setPaused(false);
                  }}
                  onBuffer={x => console.log('buffering video', x)}
                  onError={error =>
                    console.log('error ================> ', error)
                  }
                /> 
                {clicked && (
                  <View style={styles.button}>
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
                              tintColor: 'white',
                            }}
                            source={
                            paused ? (
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
                  

                        <SkeletonPlaceholder backgroundColor='#c5c9c9'
                        highlightColor="#E0E0E0"
                        >
                          <SkeletonPlaceholder.Item
                          marginTop={moderateScale(10,0.2)}
                          // backgroundColor=
                            width={100}
                            // shimmerWidth={'100%'}
                            height={25}
                          />
                        </SkeletonPlaceholder>
                      ) : (
                        <View
                          style={{
                            justifyContent: 'space-between',
                          }}>
                          <CustomText
                            numberOfLines={1}
                            style={styles.cT}
                            isBold>
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
                        0 likes
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
                          {item?.caption}
                        </ShowMoreAndShowLessText>
                      </ScrollView>
                    </View>
                  </View>
                  <View style={styles.opcity}>
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
              </TouchableOpacity>
            
            {/* //  )}  */}
          </>
        );
      }}
    />
  );
};

export default FeedVideo;

// <LinearGradient
// start={{x: 0, y: 0}}
// end={{x: 0, y: 0.9}}
// colors={['#ffffff00', '#000000']}
// style={styles.linearstyle}>
// <View style={styles.container}>
//   <View style={styles.contView}>
//     <View style={styles.photoView}>
//       {isLoading ? (
//         <SkeletonPlaceholder
//           backgroundColor="lightgrey"
//           highlightColor="#E0E0E0"
//           speed={1}>
//           <SkeletonPlaceholder.Item
//             width={'100%'}
//             shimmerWidth={'100%'}
//             height={'100%'}
//           />
//         </SkeletonPlaceholder>
//       ) : (
//         <CustomImage
//           source={
//             item?.profile_info?.photo
//               ? {
//                   uri: `${baseUrl}/${item?.profile_info?.photo}`,
//                 }
//               : require('../Assets/Images/avatar3.png')
//           }
//           style={{
//             height: '100%',
//             width: '100%',
//           }}
//         />
//       )}
//     </View>
//     {isLoading ? (
//       <SkeletonPlaceholder
//         backgroundColor="lightgrey"
//         highlightColor="#E0E0E0"
//         speed={1}>
//         <SkeletonPlaceholder.Item
//           width={'100%'}
//           shimmerWidth={'100%'}
//           height={'100%'}
//         />
//       </SkeletonPlaceholder>
//     ) : (
//       <View
//         style={{
//           justifyContent: 'space-between',
//         }}>
//         <CustomText numberOfLines={1} style={styles.cT} isBold>
//           {item?.profile_info?.name}
//         </CustomText>

//         <CustomText numberOfLines={1} style={styles.customT2}>
//           new york
//         </CustomText>
//       </View>
//     )}
//   </View>
//   <View style={styles.Views}>
//     <CustomText
//       style={{
//         fontSize: moderateScale(14, 0.6),
//         color: Color.white,
//       }}>
//      0 likes
//     </CustomText>
//     <View style={styles.cmtView}></View>
//     <CustomText
//       style={{
//         fontSize: moderateScale(14, 0.6),
//         color: Color.white,
//       }}>
//       {data?.comment?.length}0 comments
//     </CustomText>
//   </View>
//   <View style={styles.caption}>
//     <ScrollView
//       showsVerticalScrollIndicator={false}
//       contentContainerStyle={{
//         //   backgroundColor: 'green',
//         paddingBottom: moderateScale(20, 0.3),
//       }}>
//       <ShowMoreAndShowLessText
//         minTextLength={10}
//         style={styles.moreLess}>
//         {
//           item?.caption

//         }
//       </ShowMoreAndShowLessText>
//     </ScrollView>
//   </View>
// </View>
// <View style={styles.opcity}>

//   <View style={styles.btnView}>
//     <TouchableOpacity
//       onPress={() => {
//         refRBSheet.current.open();
//       }}
//       style={styles.btn2}>
//       <Icon
//         name={'comments'}
//         as={FontAwesome5}
//         color={'white'}
//         size={5}
//       />
//     </TouchableOpacity>
//     <CustomText numberOfLines={1} style={styles.customT}>
//       {data?.comments?.length}
//     </CustomText>
//   </View>
// </View>
// <View
//   style={{
//     position: 'absolute',
//     backgroundColor: Color.themeColor,
//     height: windowWidth * 0.01,
//     width: currentTime
//       ? duration
//         ? `${(currentTime / duration) * 100}%`
//         : '0%'
//       : '0%',
//   }}></View>
// </LinearGradient>

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
    // justifyContent:'center',
    // alignItems:'center',
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
  customSlide: {
    width:windowWidth ,
    height:windowHeight * 0.34,
    // backgroundColor: 'green',
    // overflow:'hidden',
    alignItems: 'center',
    justifyContent: 'center',
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

{
  /* <View style={styles.btnView}>
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
  </View> */
}
