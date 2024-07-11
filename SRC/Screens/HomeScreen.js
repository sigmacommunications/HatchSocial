import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Image,
  Animated,
  Button,
  Alert,
  FlatList,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
const {height, width} = Dimensions.get('window');
import {
  ScaledSheet,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import CustomStatusBar from '../Components/CustomStatusBar';
import Header from '../Components/Header';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from '../Components/CustomText';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import DropDownSingleSelect from '../Components/DropDownSingleSelect';
import {Icon, ScrollView} from 'native-base';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import navigationService from '../navigationService';
import {useDispatch, useSelector} from 'react-redux';
import {BlurView} from '@react-native-community/blur';
import CustomButton from '../Components/CustomButton';
import {ActivityIndicator} from 'react-native';
import * as Animatable from 'react-native-animatable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import RequestModal from '../Components/RequestModal';
import Propmpt from '../Components/Propmpt';
import {setNewSignUp} from '../Store/slices/auth';
import {Get} from '../Axios/AxiosInterceptorFunction';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RoundMenu from '../react-native-rotating-menu/src';
import {baseUrl, centerImageUrl} from '../Config';
import NullDataComponent from '../Components/NullDataComponent';

const HomeScreen = props => {
  const privacy = useSelector(state => state.authReducer.privacy);
  const themeColor = useSelector(state => state.authReducer.ThemeColor);
  const profileData = useSelector(state => state.commonReducer.selectedProfile);
  const newSignUp = useSelector(state => state.authReducer.newSignUp);
  const token = useSelector(state => state.authReducer.token);
  console.log("🚀 ~ HomeScreen ~ token:", token)

  const backRef = useRef(null);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const [selectedBubbleId, setSelectedBubbleId] = useState(null);
  const [prompt, setPrompt] = useState(false);
  const [clicked, setclicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alignment, setAlignment] = useState('left');
  const [highlightedIcon, setHighlightedIcon] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [text, setText] = useState('');
  const [animationStopped, setAnimationStopped] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [bubbleData, setBubbleData] = useState({});
  const [content, setContent] = useState([]);
  const [profiles, setProfiles] = useState([
    {
      id: 1,
      image: require('../Assets/Images/dummyman4.png'),
    },
    {
      id: 2,
      image: require('../Assets/Images/dummyman1.png'),
    },
    {
      id: 3,
      image: require('../Assets/Images/dummyProfile.png'),
    },
    {
      id: 4,
      image: require('../Assets/Images/dummyUser1.png'),
    },
    {
      id: 5,
      image: require('../Assets/Images/dummyman4.png'),
    },
    {
      id: 6,
      image: require('../Assets/Images/dummyman1.png'),
    },
    {
      id: 7,
      image: require('../Assets/Images/dummyProfile.png'),
    },
    {
      id: 8,
      image: require('../Assets/Images/dummyUser1.png'),
    },
  ]);
  const [bubbles, setBubbles] = useState([]);
  const [horizontalBubble, setHorizontalBubble] = useState([]);
  const [myFeeds, setMyFeeds] = useState([]);

  const getHorizontalBubbles = async () => {
    const url = `auth/home_multiple_community/${profileData?.id}`;
    setIsLoading(true);
    const response = await Get(url, token);
    setIsLoading(false);
    if (response != undefined) {
      setHorizontalBubble(response?.data?.message);
    }
  };
  
  console.log("🚀 ~ getBubbles ~ profileData?.id:", profileData?.id)
  const getBubbles = async () => {
    const url = `auth/community/${profileData?.id}`;
    setIsLoading(true);
    const response = await Get(url, token);
    setIsLoading(false);
    if (response != undefined) {
      console.log("🚀 ~ getBubbles ~ response:", response?.data?.data)
      setContent([
        ...response?.data?.data?.interests?.map((item, index) => {
          return {
            id: item?.id,
            image: (
              <Image
                source={{uri: `${baseUrl}/${item?.interest_detail?.image}`}}
                resizeMode="cover"
                style={styles.icon}
              />
            ),
            bubble: item?.bubble == 1 ? true : false,
            item: item,
            source: {uri: `${baseUrl}/${item?.interest_detail?.image}`},
            private: false,
            interest: true,
            onPress: () => {
              navigationService.navigate('feedsnBubbles', {
                interest_id: item?.interest_detail?.id,
                interestImage: item?.interest_detail?.image,
                interestName: item?.interest_detail?.name,
              });
            },
          };
        }),
        ...response?.data?.data?.community_list
          ?.slice(0, 4)
          ?.map((item, index) => {
            return {
              id: item?.community_id,
              image: (
                <Image
                  source={{uri: `${baseUrl}/${item?.community_info?.image}`}}
                  resizeMode="cover"
                  style={styles.icon}
                />
              ),
              bubble: true,
              item: item,
              source: {uri: `${baseUrl}/${item?.community_info?.image}`},

              private: false,
              onPress: () => {
                navigationService.navigate(
                  'Bubble',
                  {id: item?.community_id},
                  {fromHome: true},
                );
                setSelectedBubbleId(item?.community_id);
              },
            };
          }),
      ]);
    }
  };

  const getMyFeeds = async () => {
    const url = `auth/my-feed-list/${profileData?.id}`;
    setIsLoading(true);
    const response = await Get(url, token);
    setIsLoading(false);
    if (response != undefined) {
      setMyFeeds(response?.data?.feeds_info);
    }
  };

  const animateSideContainer = () => {
    backRef.current?.animate(
      alignment == 'left' ? 'fadeInLeft' : 'fadeInRight',
      2000,
    );
  };

  useEffect(() => {
    if (animationStopped) {
      animateSideContainer();
    }
  }, [animationStopped]);

  useEffect(() => {
    if (newSignUp) {
      setTimeout(() => {
        setPrompt(true);
      }, 10000);
    }
  }, []);
  useEffect(() => {
    getBubbles();
    getHorizontalBubbles();
    getMyFeeds();
  }, [isFocused]);

  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />
      <Header right Title={'Profile'} menu={true}/>

      <ImageBackground
        source={
          privacy == 'private'
            ? require('../Assets/Images/theme2.jpg')
            : require('../Assets/Images/Main.png')
        }
        resizeMode={'cover'}
        style={styles.container}>
        {highlightedIcon && (
          <View style={[styles.highlightedIcon, {transform: [{scaleX: -1}]}]}>
            {highlightedIcon}
          </View>
        )}

        <View style={styles.container2}>
          <Animatable.View ref={backRef} style={styles.animatedView}>
            <View
              style={[
                styles.container4,
                alignment == 'left' && {left: 0},
                alignment == 'right' && {right: 0},
              ]}>
              <CustomText isBold style={[styles.name]}>
                {profileData?.name}
              </CustomText>
            </View>

            <LinearGradient
              style={[
                styles.gradient,
                alignment == 'left' && {left: windowWidth * 0.07},
                alignment == 'right' && {right: windowWidth * 0.07},
              ]}
              colors={themeColor}>
              <View
                style={[
                  styles.profileContainer,
                  {backgroundColor: themeColor},
                ]}>
                {profiles.map(item => {
                  return (
                    <View style={styles.profile}>
                      <CustomImage source={item?.image} style={styles.image} />
                    </View>
                  );
                })}
              </View>
            </LinearGradient>
            <Image
              source={
                privacy == 'private'
                  ? require('../Assets/Images/animatedImage1.png')
                  : require('../Assets/Images/animatedImage.png')
              }
              resizeMode={'cover'}
              style={[
                styles.image,
                styles.image2,
                {transform: [{scaleX: alignment == 'left' ? 1 : -1}]},
                alignment == 'left' && {right: 5},
                alignment == 'right' && {left: 5},
              ]}></Image>
          </Animatable.View>
          <View>
            <View
              style={[
                styles.feedsContainer,
                {
                  paddingVertical: moderateScale(10, 0.6),
                  // backgroundColor :"red",
                  transform: [{scaleX: alignment == 'left' ? 1 : -1}],
                },
                alignment == 'left' && {marginLeft: moderateScale(50, 0.6)},
                alignment == 'right' && {marginRight: moderateScale(50, 0.6)},
              ]}>
              <FlatList
                data={horizontalBubble}
                keyExtractor={item => item?.id}
                scrollEnabled
                showsVerticalScrollIndicator
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  paddingLeft: moderateScale(10, 0.6),
                  paddingRight: moderateScale(30, 0.6),
                }}
                renderItem={({item}) => {
                  // console.log('🚀 ~ HomeScreen ~ item:', item);
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        navigationService.navigate('Bubble', {
                          id: item?.id,
                          fromHome: true,
                        });
                      }}
                      style={styles.feed}>
                      <View
                        style={[
                          styles.feedcircle,
                          {
                            borderColor:
                              item?.type == 'owner'
                                ? Color.neonGreen
                                : item?.type == 'spend time'
                                ? Color.themeColor
                                : item?.type == 'admin'
                                ? 'yellow'
                                : 'black',
                          },
                        ]}>
                        <View style={styles.image1}>
                          <CustomImage
                            onPress={() => {
                              navigationService.navigate(
                                'Bubble',
                                {id: item?.id},
                                {fromHome: true},
                              );
                            }}
                            source={{uri: `${baseUrl}/${item?.image}`}}
                            style={styles.image}
                          />
                        </View>
                      </View>
                      <CustomText
                        isBold
                        numberOfLines={1}
                        style={{
                          // backgroundColor :'green',
                          paddingLeft: moderateScale(10, 0.6),
                          width: windowWidth * 0.13,
                          paddingVertical: moderateScale(5, 0.6),
                          marginHorizontal: moderateScale(10, 0.3),
                          fontSize: moderateScale(13, 0.6),
                        }}>
                        {item?.title}
                      </CustomText>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>

            <GestureHandlerRootView>
              <View
                style={[
                  styles.menuView,
                  {
                    marginLeft:
                      alignment == 'left'
                        ? moderateScale(20, 0.3)
                        : moderateScale(-10, 0.3),
                  },
                ]}>
                <RoundMenu
                  borderColor={
                    profileData?.type == 'Content Creator'
                      ? Color.neonGreen
                      : profileData?.type == 'Business & Entrepreneurship'
                      ? Color.green
                      : profileData?.type == 'Community & Connection'
                      ? 'pink'
                      : profileData?.type == 'Learning & Exploring'
                      ? 'purple'
                      : 'black'
                  }
                  centerContent={
                    <Image
                      source={
                        profileData?.photo
                          ? {uri: `${centerImageUrl}${profileData?.photo}`}
                          :  require('../Assets/Images/dummyUser.png')
                      }
                      // resizeMode="contain"
                      style={styles.centerImage}
                    />
                  }
                  largeImageSize={width / 3.5}
                  content={content}
                  contentContainerStyle={
                    {
                      // borderWidth: 3,
                      // borderColor:'red'
                    }
                  }
                  profileData={profileData}
                  setHighlightedIcon={setHighlightedIcon}
                  setAnimationStopped={setAnimationStopped}
                  rotationAngle={rotationAngle}
                  alignment={alignment}
                  setBubbleData={setBubbleData}
                  elevation={5}
                  setIsVisible={setIsVisible}
                  setSelectedBubbleId={setSelectedBubbleId}
                  setclicked={setclicked}
                  centerImageOnPress={() => {
                    navigationService.navigate('Profile', {isEdit: true});
                  }}
                  ceneterImageOnLongPress={() => {
                    navigationService.navigate('Profile', {
                      fromCreateNewProfile: true,
                    });
                  }}
                />
              </View>
            </GestureHandlerRootView>

            <View
              style={[
                styles.feedsContainer,
                {
                  height: windowHeight * 0.2,
                  paddingVertical: moderateScale(30, 0.6),
                  transform: [{scaleX: alignment == 'left' ? 1 : -1}],
                },
                alignment == 'left' && {marginLeft: moderateScale(50, 0.6)},
                alignment == 'right' && {marginRight: moderateScale(50, 0.6)},
              ]}>
              <FlatList
                data={myFeeds}
                // data={[1,2,3,4,5,6,7,8,9]}
                keyExtractor={item => item?.id}
                scrollEnabled
                showsVerticalScrollIndicator
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  paddingHorizontal: moderateScale(10, 0.6),
                }}
                renderItem={({item}) => {
                  // console.log("🚀 ~ HomeScreen ~ item  =============== < here i m :", item)
                  return (
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('FeedPost', {data: item});
                        }}
                        style={styles.newContainer}>
                        <View style={styles.newimage}>
                          <CustomImage
                            onPress={() => {
                              navigationService.navigate('FeedPost', {
                                data: item,
                              });
                            }}
                            source={{uri: `${baseUrl}/${item?.image}`}}
                            style={styles.image}
                          />
                        </View>
                      </TouchableOpacity>
                      <CustomText
                        isBold
                        numberOfLines={1}
                        style={{
                          // backgroundColor :'green',
                          paddingLeft: moderateScale(10, 0.6),
                          width: windowWidth * 0.13,
                          paddingVertical: moderateScale(5, 0.6),
                          marginHorizontal: moderateScale(10, 0.3),
                          fontSize: moderateScale(13, 0.6),
                        }}>
                        {/* hdhfj */}
                        {item?.name}
                      </CustomText>
                    </View>
                  );
                }}
              />
            </View>
          </View>

          <TouchableOpacity
            style={[
              {
                position: 'absolute',
                bottom: 70,
              },
              alignment == 'left' && {right: 0},
              alignment == 'right' && {left: 0},
            ]}
            onPress={() => {
              setRotationAngle(prev => prev + 180);
            }}>
            <CustomButton
              iconName={'rotate-360'}
              iconType={MaterialCommunityIcons}
              iconStyle={styles.iconStyle}
              textColor={Color.white}
              onPress={() => {
                setRotationAngle(prev => prev + 180);
                setAlignment(alignment == 'left' ? 'right' : 'left');
              }}
              width={windowWidth * 0.3}
              height={windowHeight * 0.09}
              text={'change Side'}
              fontSize={moderateScale(12, 0.3)}
              borderRadius={moderateScale(30, 0.3)}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
      {clicked && (
        <BlurView style={styles.blurView} blurRadius={5} blurType={'light'}>
          <View style={styles.container3}>
            <CustomButton
              text={'Home'}
              textColor={themeColor[1]}
              width={windowWidth * 0.7}
              height={windowHeight * 0.06}
              marginTop={moderateScale(20, 0.3)}
              onPress={() => {
                // disptach(setUserToken({token : 'fasdasd awdawdawdada'}))
                setclicked(false);
                navigationService.navigate(
                  'Bubble',
                  {id: selectedBubbleId},
                  {fromHome: true},
                );
              }}
              bgColor={['#FFFFFF', '#FFFFFF']}
              borderRadius={moderateScale(30, 0.3)}
              isGradient
            />

            <CustomButton
              text={'Close'}
              textColor={themeColor[1]}
              width={windowWidth * 0.7}
              height={windowHeight * 0.06}
              marginTop={moderateScale(20, 0.3)}
              onPress={() => {
                setclicked(false);
              }}
              bgColor={['#FFFFFF', '#FFFFFF']}
              borderRadius={moderateScale(30, 0.3)}
              isGradient
            />
          </View>
        </BlurView>
      )}
      <RequestModal
        selectedBubbleId={selectedBubbleId}
        setIsVisible={setIsVisible}
        isVisible={isVisible}
        bubbleData={bubbleData}
      />
      <Propmpt isVisible={prompt} setVisible={setPrompt} />
    </>
  );
};

export default HomeScreen;
const styles = ScaledSheet.create({
  iconStyle: {
    color: 'white',
    marginRight: moderateScale(5, 0.3),
    width: windowWidth * 0.06,
    height: windowHeight * 0.015,
    fontSize: moderateScale(20, 0.6),
  },
  container4: {
    width: windowWidth * 0.07,
    height: windowHeight * 0.9,
    backgroundColor: Color.black,
    alignItems: 'center',
    zIndex: 1,
    position: 'absolute',
    justifyContent: 'center',
  },
  profileContainer: {
    width: windowWidth * 0.1,
    height: windowHeight * 0.9,
    alignItems: 'center',
    zIndex: 1,
    position: 'absolute',
    justifyContent: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  icon: {
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  profile: {
    width: windowWidth * 0.06,
    height: windowWidth * 0.06,
    backgroundColor: 'white',
    overflow: 'hidden',
    borderRadius: (windowWidth * 0.06) / 2,
    marginTop: moderateScale(12, 0.3),
  },
  image2: {
    position: 'absolute',
    zIndex: 0,
    top: -40,
  },
  gradient: {
    width: windowWidth * 0.08,
    height: windowHeight * 0.9,
    alignItems: 'center',
    zIndex: 1,
    position: 'absolute',
    justifyContent: 'center',
  },
  centerImage: {
    width: '100%',
    height: '100%',
  },
  container: {
    width: windowWidth,
    height: windowHeight * 0.9,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  highlightedIcon: {
    width: windowWidth,
    height: windowHeight,
    position: 'absolute',
    zIndex: 0,
    top: -40,
  },
  container2: {
    width: windowWidth,
    height: windowHeight * 0.9,
    positon: 'absolute',
    overflow: 'hidden',
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,.)',
  },
  blurView: {
    position: 'absolute',
    height: windowHeight * 0.87,
    width: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',

    bottom: 0,
  },
  container3: {
    height: windowHeight * 0.8,
    width: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuView: {
    height: windowHeight * 0.4,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  animatedView: {
    width: windowWidth,
    height: windowHeight * 0.9,
    position: 'absolute',
    flexDirection: 'row',
  },
  name: {
    width: windowWidth,
    fontSize: moderateScale(20, 0.6),
    color: Color.white,
    transform: [{rotate: '270deg'}],
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  feedsContainer: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.16,
  },
  heading: {
    fontSize: moderateScale(25, 0.2),
    marginHorizontal: moderateScale(11, 0.1),
    color: 'white',
    marginBottom: moderateScale(11, 0.3),
  },

  image1: {
    width: windowWidth * 0.17,
    height: windowWidth * 0.17,
    borderRadius: (windowWidth * 0.2) / 2,
    overflow: 'hidden',
  },
  feedcircle: {
    width: windowWidth * 0.15,
    height: windowWidth * 0.15,
    borderRadius: (windowWidth * 0.15) / 2,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    padding: 10,
    marginHorizontal: moderateScale(7, 0.6),
  },
  feedrow: {
    flexDirection: 'row',
    width: windowWidth,
  },
  newContainer: {
    marginHorizontal: moderateScale(8, 0.6),
    borderRadius: moderateScale(10, 0.6),
    borderWidth: 3,
    borderColor: Color.themeColor,
    width: windowWidth * 0.13,
    height: windowHeight * 0.07,
    overflow: 'hidden',
    backgroundColor: 'red',
  },
  newimage: {
    height: '100%',
    width: '100%',
    overflow: 'hidden',
  },
});
