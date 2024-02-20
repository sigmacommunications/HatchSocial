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
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
const {height, width} = Dimensions.get('window');
import {moderateScale} from 'react-native-size-matters';
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
import {useIsFocused} from '@react-navigation/native';


import RoundMenu from '../react-native-rotating-menu/src';
import { baseUrl } from '../Config';

const HomeScreen = props => {
  const privacy = useSelector(state => state.authReducer.privacy);
  const themeColor = useSelector(state => state.authReducer.ThemeColor);
  const profileData = useSelector(state => state.commonReducer.selectedProfile);
   console.log("🚀 ~ file: HomeScreen.js:46 ~ HomeScreen ~ profileData:", profileData)
  const newSignUp = useSelector(state => state.authReducer.newSignUp);
  const token = useSelector(state => state.authReducer.token);
  const [selectedBubbleId, setSelectedBubbleId] = useState(null);
  const [prompt, setPrompt] = useState(false);
  const [clicked, setclicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alignment, setAlignment] = useState('left');
  const [highlightedIcon, setHighlightedIcon] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [text, setText] = useState('');
  const isFocused = useIsFocused();

  const [animationStopped, setAnimationStopped] = useState(false);

  const backRef = useRef(null);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [bubbleData, setBubbleData] = useState({})
  // console.log("🚀 ~ file: HomeScreen.js:63 ~ HomeScreen ~ bubbleData:", bubbleData?.map(item => item?.id))
  // const token = useSelector(state => state.authReducer.token);

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

  const getBubbles = async () => {
    const url = `auth/community/${profileData?.id}`;
    setIsLoading(true);
    const response = await Get(url, token);
    setIsLoading(false);
    if (response != undefined) {
      console.log(JSON.stringify(response?.data,null,2))
      setBubbles(response?.data?.community_info);
      setContent(
        response?.data?.data?.map(item => {
          return {
            id: item?.id,
            image: (
              <Image
                source={{uri: `${baseUrl}/${item?.bubble ? item?.image : item?.photo}`}}
                resizeMode="cover"
                style={style.icon}
              />
            ),
            bubble: item?.bubble == 1 ? true : false,
            item:item,
            source: {uri: `${baseUrl}/${item?.image}`},
            private: item?.privacy?.toLowerCase() == 'yes' ? true : false,
          };
        }),
      );
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
        // console.log('New Signup');
        setPrompt(true);
      }, 10000);
    }
  }, []);
  useEffect(() => {
    getBubbles();
  }, [isFocused]);

  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />
      <Header right Title={'Profile'} />

      <ImageBackground
        source={
          privacy == 'private'
            ? require('../Assets/Images/theme2.jpg')
            : require('../Assets/Images/Main.png')
        }
        resizeMode={'cover'}
        style={style.container}>
        {highlightedIcon && (
          <View style={style.highlightedIcon}>{highlightedIcon}</View>
        )}

        <View style={style.container2}>
          <Animatable.View ref={backRef} style={style.animatedView}>
            <View
              style={[
                style.container4,
                alignment == 'left' && {left: 0},
                alignment == 'right' && {right: 0},
              ]}>
              <CustomText isBold style={style.name}>
                {profileData?.name}
              </CustomText>
            </View>
            <LinearGradient
              style={[
                style.gradient,
                alignment == 'left' && {left: windowWidth * 0.08},
                alignment == 'right' && {right: windowWidth * 0.08},
              ]}
              colors={themeColor}>
              <View
                style={[style.profileContainer, {backgroundColor: themeColor}]}>
                {profiles.map(item => {
                  return (
                    <View style={style.profile}>
                      <CustomImage source={item?.image} style={style.image} />
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
                style.image,
                style.image2,
                {transform: [{scaleX: alignment == 'left' ? 1 : -1}]},
                alignment == 'left' && {right: 5},
                alignment == 'right' && {left: 5},
              ]}></Image>
          </Animatable.View>
          <GestureHandlerRootView>
            <View
              style={[
                style.menuView,
                {
                  marginLeft:
                    alignment == 'left'
                      ? moderateScale(20, 0.3)
                      : moderateScale(-10, 0.3),
                },
              ]}>
              <RoundMenu
                centerContent={
                  <ImageBackground
                    source={profileData?.photo ? {uri : `${baseUrl}/${profileData?.photo}`} : require('../Assets/Images/dummyman1.png')}
                    resizeMode="cover"
                    style={style.centerImage}
                  />
                }
                largeImageSize={width / 2.5}
                content={content}
                contentContainerStyle={{
                  borderWidth: 3,
                }}
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
                setText={setText}
              />
            </View>
          </GestureHandlerRootView>
          <TouchableOpacity
            style={[
              {
                position: 'absolute',
                bottom: 100,
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
              iconStyle={style.iconStyle}
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
        <BlurView
          // intensity={100}
          style={style.blurView}
          blurRadius={5}
          blurType={'light'}>
          <View style={style.container3}>
            <CustomButton
              text={'Home'}
              textColor={themeColor[1]}
              width={windowWidth * 0.7}
              height={windowHeight * 0.06}
              marginTop={moderateScale(20, 0.3)}
              onPress={() => {
                // disptach(setUserToken({token : 'fasdasd awdawdawdada'}))
                setclicked(false);
                navigationService.navigate('Bubble', {id: selectedBubbleId});
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
        text={text}
        bubbleData={bubbleData}
      />
      <Propmpt isVisible={prompt} setVisible={setPrompt} />
    </>
  );
};

export default HomeScreen;
const style = StyleSheet.create({
  iconStyle: {
    color: 'white',
    marginRight: moderateScale(5, 0.3),
    width: windowWidth * 0.06,
    height: windowHeight * 0.015,
    fontSize: moderateScale(20, 0.6),
  },
  container4: {
    width: windowWidth * 0.08,
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
    backgroundColor: 'rgba(0,0,0,.8)',
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
    // width: windowWidth * 0.9,
    height: windowHeight * 0.75,
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
});
