import React, {useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import FastImage from 'react-native-fast-image';
import {
  ImageBackground,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import Header from '../Components/Header';
import {View} from 'react-native';
import CustomButton from '../Components/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {
  setInterestSelected,
} from '../Store/slices/auth';
import {Get, Post} from '../Axios/AxiosInterceptorFunction';
import {setSelectedFeeds, setSelectedProfileData} from '../Store/slices/common';
import CustomText from '../Components/CustomText';
import { baseUrl } from '../Config';

const InterestSelection = () => {
  const privacy = useSelector(state => state.authReducer.privacy);
  const themeColor = useSelector(state => state.authReducer.ThemeColor);
  const token = useSelector(state => state.authReducer.token);
  const profileData = useSelector(state => state.commonReducer.selectedProfile);

  const [isLaoding, setIsLaoding] = useState(false);
  const [selectedBubble, setSelectedBubble] = useState([]);
  console.log("🚀 ~ file: InterestsSelection.js:38 ~ InterestSelection ~ selectedBubble:", selectedBubble)
 const [interestListing, setInterestListing] = useState([])

  const selectedProfile = useSelector(
    state => state.commonReducer.selectedProfile,
  );

  const dispatch = useDispatch();

  const [BubbleImageArraty, setBubbleImageArraty] = useState([
    {
      id: 1,
      image: require('../Assets/Images/amazing.jpg'),
      added: false,
      name: 'Sports',
    },
    {
      id: 2,
      image: require('../Assets/Images/autumn.jpg'),
      added: false,
      name: 'Music',
    },
    {
      id: 3,
      image: require('../Assets/Images/cake.jpg'),
      added: false,
      name: 'Technology',
    },
    {
      id: 4,
      image: require('../Assets/Images/colorful.jpg'),
      added: false,
      name: 'Arts and Crafts',
    },
    {
      id: 5,
      image: require('../Assets/Images/dubai.jpg'),
      added: false,
      name: 'Travel',
    },
    {
      id: 6,
      image: require('../Assets/Images/frozen.jpg'),
      added: false,
      name: 'Food',
    },
    {
      id: 7,
      image: require('../Assets/Images/Historical.jpg'),
      added: false,
      name: 'Gaming',
    },
    {
      id: 8,
      image: require('../Assets/Images/leave.jpg'),
      added: false,
      name: 'pets',
    },
    {
      id: 9,
      image: require('../Assets/Images/london.jpg'),
      added: false,
      name: 'learning',
    },
    {
      id: 10,
      image: require('../Assets/Images/turkey.jpg'),
      added: false,
      name: 'Books',
    },
    {
      id: 11,
      image: require('../Assets/Images/vege.jpg'),
      added: false,
      name: 'Fashion',
    },
    {
      id: 12,
      image: require('../Assets/Images/frozen.jpg'),
      added: false,
      name: 'Science and nature',
    },
    // {
    //   id: 13,
    //   image: require('../Assets/Images/Historical.jpg'),
    //   added: false,
    //   name: 'Movies and entertainment',
    // },
    // {
    //   id: 14,
    //   image: require('../Assets/Images/dubai.jpg'),
    //   added: false,
    //   name: 'Photography',
    // },
    // {
    //   id: 15,
    //   image: require('../Assets/Images/leave.jpg'),
    //   added: false,
    //   name: 'Health',
    // },
    // {
    //   id: 16,
    //   image: require('../Assets/Images/london.jpg'),
    //   added: false,
    //   name: 'Parenting',
    // },
    // {
    //   id: 17,
    //   image: require('../Assets/Images/london.jpg'),
    //   added: false,
    //   name: 'Parenting',
    // },
    // {
    //   id: 18,
    //   image: require('../Assets/Images/london.jpg'),
    //   added: false,
    //   name: 'Parenting',
    // },
  ]);

  const getInterest = async () => {
    const url = `auth/interest_list`;
    setIsLaoding(true);
    const response = await Get(url, token);
    setIsLaoding(false);
    if (response != undefined) {
     console.log("🚀 ~ file: InterestsSelection.js:165 ~ getInterest ~ response:", response?.data)
      setInterestListing(response?.data?.post_info);
    }
  };
 

  const sendSelectedFeeds = async () => {
    const url = 'auth/subscribe';
    const body = {
      id: profileData?.id,
      interests: selectedBubble,
    };
    setIsLaoding(true);
    const response = await Post(url, body, apiHeader(token));
    setIsLaoding(false);
    if (response != undefined) {
      dispatch(setSelectedProfileData(response?.data?.profile_info));
      dispatch(setInterestSelected(true));
      Platform.OS == 'android'
        ? ToastAndroid.show('Saved', ToastAndroid.SHORT)
        : Alert.alert('Saved');
    }
  };

  useEffect(() => {
    getInterest();
  }, []);

  return (
    <ScreenBoiler
      statusBarBackgroundColor={'white'}
      statusBarContentStyle={'dark-content'}>
      <Header right Title={'Interests'} />
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
        }}>
        <View
          style={{
            position: 'absolute',
            bottom: moderateScale(100, 0.3),
            right: moderateScale(15, 0.6),
            zIndex: 1,
          }}>
          <CustomButton
            text={
              isLaoding ? (
                <ActivityIndicator color={'white'} size={'small'} />
              ) : (
                'Save'
              )
            }
            textColor={Color.white}
            width={windowWidth * 0.2}
            height={windowHeight * 0.04}
            onPress={() => {
              if (selectedBubble.length > 0) {
                // setIsVisible(true)
                sendSelectedFeeds();
              } else {
                Platform.OS == 'android'
                  ? ToastAndroid.show('Select any Bubble', ToastAndroid.SHORT)
                  : Alert.alert('Select any Bubble');
              }
            }}
            fontSize={moderateScale(12, 0.6)}
            bgColor={themeColor}
            borderRadius={moderateScale(30, 0.3)}
            isGradient
          />
          <CustomButton
            text={'skip'}
            textColor={themeColor[1]}
            width={windowWidth * 0.2}
            height={windowHeight * 0.04}
            fontSize={moderateScale(12, 0.6)}
            onPress={() => {
              dispatch(setInterestSelected(true));
            }}
            marginTop={moderateScale(10, 0.3)}
            bgColor={['#ffffff', '#ffffff']}
            borderRadius={moderateScale(30, 0.3)}
            isGradient
          />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: moderateScale(5, 0.6),
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingTop: moderateScale(10, 0.6),
            paddingBottom: moderateScale(40, 0.6),
            // justifyContent: 'center',
          }}
          style={{
            width: windowWidth,
          }}>
          {interestListing.map((item, index) => {
            return (
              <TouchableOpacity
              key={index}
                onPress={() => {
                  console.log('Here');
                  if (selectedBubble.findIndex(i => i == item?.id) != -1) {
                    setSelectedBubble(
                      selectedBubble?.filter(i => i != item?.id),
                    );
                  } else {
                    setSelectedBubble(prev => [...prev, item?.id]);
                  }
                  const data = [...BubbleImageArraty];
                  data[index].added = !data[index].added;

                  setBubbleImageArraty(data);
                }}
                style={{
                  width: windowWidth * 0.3,
                  height:
                    index % 2 == 0 ? windowHeight * 0.3 : windowHeight * 0.17,
                  borderRadius: moderateScale(15, 0.6),
                  overflow: 'hidden',
                  marginTop:
                    index == 4 || index == 10 ? -windowHeight * 0.13 : 0,
                  zIndex: 1,
                  marginVertical: moderateScale(5, 0.3),
                  marginHorizontal: moderateScale(2, 0.3),
                }}>
                <CustomText
                  numberOfLines={1}
                  style={{
                    fontSize: moderateScale(11, 0.6),
                    fontWeight: '700',
                    textAlign: 'left',
                    position: 'absolute',
                    bottom: 0,
                    padding: moderateScale(5, 0.6),
                    width: '100%',
                    paddingLeft: moderateScale(10, 0.3),
                    zIndex: 1,
                    color: 'white',
                    backgroundColor: 'rgba(0,0,0,0.6)',
                  }}>
                  {item?.name}
                </CustomText>
                <CustomImage
                  onPress={() => {
                    if (selectedBubble.findIndex(i => i == item?.id) != -1) {
                      setSelectedBubble(
                        selectedBubble?.filter(i => i != item?.id),
                      );
                    } else {
                      setSelectedBubble(prev => [...prev, item?.id]);
                    }
                    const data = [...BubbleImageArraty];
                    data[index].added = !data[index].added;

                    setBubbleImageArraty(data);
                  }}
                  source={item?.image ? {uri:`${baseUrl}/${item.image}`} :BubbleImageArraty[index]?.image}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                />
                {selectedBubble.includes(item?.id)&& (
                  <View
                    style={{
                      width: windowWidth * 0.3,
                      height:
                        index % 2 == 0
                          ? windowHeight * 0.3
                          : windowHeight * 0.17,
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      position: 'absolute',
                      zIndex: 1,
                    }}>
                    <Animatable.View
                      animation="pulse"
                      easing="ease-out"
                      iterationCount="infinite"
                      style={{
                        width: moderateScale(60, 0.6),
                        height: moderateScale(60, 0.6),

                        alignSelf: 'center',
                        top: '35%',
                      }}>
                      <CustomImage
                        onPress={() => {
                          if (
                            selectedBubble.findIndex(i => i == item?.id) !=
                            -1
                          ) {
                            setSelectedBubble(
                              selectedBubble?.filter(i => i != item?.id),
                            );
                          } else {
                            setSelectedBubble(prev => [...prev, item?.id]);
                          }
                          const data = [...BubbleImageArraty];
                          data[index].added = !data[index].added;

                          setBubbleImageArraty(data);
                        }}
                        source={require('../Assets/Images/heart.png')}                                
                        resizeMode={'stretch'}
                        style={{width: '100%', height: '100%'}}
                      />
                    </Animatable.View>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </ImageBackground>
    </ScreenBoiler>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    justifyContent: 'center',
    height: windowHeight,
    width: windowWidth,
    // backgroundColor: themeColor[1],
  },
});

export default InterestSelection;
