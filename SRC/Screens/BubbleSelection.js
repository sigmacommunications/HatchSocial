import React, {useState, useEffect} from 'react';
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
  ActivityIndicator,
} from 'react-native';
import Header from '../Components/Header';
import {View} from 'react-native';
import CustomButton from '../Components/CustomButton';
import navigationService from '../navigationService';
import {useDispatch, useSelector} from 'react-redux';
import {setBubbleSelected} from '../Store/slices/auth';
import {Get, Post} from '../Axios/AxiosInterceptorFunction';
import {
  setSelectedBubbles,
  setSelectedProfileData,
} from '../Store/slices/common';
import CustomText from '../Components/CustomText';
import {baseUrl} from '../Config';

const BubbleSelection = () => {
  const privacy = useSelector(state => state.authReducer.privacy);
  const themeColor = useSelector(state => state.authReducer.ThemeColor);
  const token = useSelector(state => state.authReducer.token);
  const profileData = useSelector(state => state.commonReducer.selectedProfile);
  const [isLaoding, setIsLaoding] = useState(false);
  const [selectedBubble, setSelectedBubble] = useState([]);

  const [bubble, setBubble] = useState([]);

  const selectedProfile = useSelector(
    state => state.commonReducer.selectedProfile,
  );

  const dispatch = useDispatch();
  const selectedBubbles = useSelector(
    state => state.commonReducer.selectedBubble,
  );

  const [BubbleImageArraty, setBubbleImageArraty] = useState([
    {
      id: 1,
      image: require('../Assets/Images/bubble1.png'),
      added: false,
      name: 'Alchol',
    },
    {
      id: 2,
      image: require('../Assets/Images/bubble2.png'),
      added: false,
      name: 'Statue',
    },
    {
      id: 3,
      image: require('../Assets/Images/bubble3.png'),
      added: false,
      name: 'Bow and Arrow',
    },
    {
      id: 4,
      image: require('../Assets/Images/bubble4.png'),
      added: false,
      name: 'Travelling',
    },
    {
      id: 5,
      image: require('../Assets/Images/bubble5.png'),
      added: false,
      name: 'Mona Lisa',
    },
    {
      id: 6,
      image: require('../Assets/Images/bubble6.png'),
      added: false,
      name: 'Astrology',
    },
    {
      id: 7,
      image: require('../Assets/Images/bubble1.png'),
      added: false,
      name: 'Alchol',
    },
    {
      id: 8,
      image: require('../Assets/Images/bubble8.png'),
      added: false,
      name: 'Beer',
    },
    {
      id: 9,
      image: require('../Assets/Images/bubble9.png'),
      added: false,
      name: 'photography',
    },
    {
      id: 10,
      image: require('../Assets/Images/bubble10.png'),
      added: false,
      name: 'Indoor game',
    },
    {
      id: 11,
      image: require('../Assets/Images/bubble11.png'),
      added: false,
      name: 'Bolging',
    },
    {
      id: 12,
      image: require('../Assets/Images/bubble3.png'),
      added: false,
      name: 'Bow and Arrow',
    },
  ]);

  const handleBubbleSelection = index => {
    const updatedBubbleArray = [...BubbleImageArraty];
    updatedBubbleArray[index].added = !updatedBubbleArray[index].added;
    setBubbleImageArraty(updatedBubbleArray);

    const selectedBubblesArray = updatedBubbleArray
      .filter(bubble => bubble.added)
      .map(bubble => bubble.name);
    dispatch(setSelectedBubbles(selectedBubblesArray));
  };

  const saveSelection = () => {
    if (selectedBubbles.length > 0) {
      dispatch(setBubbleSelected(true));
      ToastAndroid.show('Saved', ToastAndroid.SHORT);
    } else {
      ToastAndroid.show('Please select any bubble', ToastAndroid.SHORT);
    }
  };

  const getBubble = async () => {
    const url = `auth/community/${profileData?.id}`;
    setIsLaoding(true);
    console.log('🚀 ~ getBubble ~ url:', url);
    const response = await Get(url, token);
    setIsLaoding(false);
    if (response != undefined) {
      // console.log("🚀 ~ getBubble ~ response===================>:", response?.data)
      setBubble(response?.data?.data);
    }
  };

  useEffect(() => {
    getBubble();
  }, []);

  const MultiAddCommunity = async () => {
    const url = `auth/community_multi_request`;
    const communityid = selectedBubble?.map((item, index) => {
      // console.log("🚀 ~ communityid ~ item======================>:", item)
      return item?.id;
    });
    const body = {
      status: 'request',
      community_id: communityid,
      profile_id: profileData?.id,
    };
    setIsLaoding(true);
    const response = await Post(url, body, apiHeader(token));
    setIsLaoding(false);
    if (response != undefined) {
      console.log('🚀 ~ MultiAddCommunity ~ response:', response?.data);
      dispatch(setBubbleSelected(true));
      Platform.OS == 'android'
        ? ToastAndroid.show('Saved', ToastAndroid.SHORT)
        : Alert.alert('Saved');
    }
  };

  return (
    <ScreenBoiler
      statusBarBackgroundColor={'white'}
      statusBarContentStyle={'dark-content'}>
      <Header right Title={'Popular Bubbles'} />
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
          //   justifyContent: 'center',
          //   alignItems: 'center',
        }}>
        <View
          style={{
            position: 'absolute',
            bottom: moderateScale(100, 0.3),
            right: moderateScale(15, 0.6),
            zIndex: 1,
          }}>
          <CustomButton
            disabled={bubble?.length == 0 ? true : false}
            text={
              isLaoding ? (
                <ActivityIndicator color={Color.white} size={'small'} />
              ) : (
                'Save'
              )
            }
            textColor={Color.white}
            width={windowWidth * 0.2}
            height={windowHeight * 0.04}
            onPress={() => {
              if (selectedBubble.length > 0) {
                MultiAddCommunity();
                // sendSelectedBubble();
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
              dispatch(setBubbleSelected(true));
              //  navigationService.navigate('FeedSelection')
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
            // alignItems : 'center',
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
          {isLaoding ? (
          <ActivityIndicator
              style={{
                height: windowHeight * 0.8,
                // backgroundColor:'red',
                width: windowWidth,
              }}
              size={'large'}
              color={Color.white}
            />
          ) : (
            bubble?.map((item, index) => {
              // return console.log("🚀 ~ bubble?.map ~ item=============>:", item)
              return (
                <TouchableOpacity
                  onPress={() => {
                    if (selectedBubble.findIndex(i => i.id == item?.id) != -1) {
                      setSelectedBubble(
                        selectedBubble?.filter(i => i?.id != item?.id),
                      );
                    } else {
                      setSelectedBubble(prev => [...prev, item]);
                    }
                    const data = [...BubbleImageArraty];
                    data[index].added = !data[index].added;
                    handleBubbleSelection(index);
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
                      bottom: 10,
                      width: '100%',
                      paddingLeft: moderateScale(10, 0.3),
                      zIndex: 1,
                      color: 'white',
                      backgroundColor: 'rgba(0,0,0,0.6)',
                    }}>
                    {item?.title}
                  </CustomText>
                  <CustomImage
                    onPress={() => {
                      console.log('hello==================>');

                      if (
                        selectedBubble.findIndex(i => i.id == item?.id) != -1
                      ) {
                        setSelectedBubble(
                          selectedBubble?.filter(i => i?.id != item?.id),
                        );
                      } else {
                        setSelectedBubble(prev => [...prev, item]);
                      }
                      const data = [...BubbleImageArraty];
                      data[index].added = !data[index].added;

                      setBubbleImageArraty(data);
                    }}
                    source={
                      item?.image
                        ? {uri: `${baseUrl}/${item?.image}`}
                        : require('../Assets/Images/travel.jpg')
                    }
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                  />
                  {selectedBubble?.some(data => data?.id == item?.id) && (
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
                        // borderRightWidth:1,
                        // borderColor:'red',
                        // backgroundColor:'green'
                      }}>
                      <Animatable.View
                        animation="pulse"
                        easing="ease-out"
                        iterationCount="infinite"
                        style={{
                          width: moderateScale(60, 0.6),
                          height: moderateScale(60, 0.6),
                          // position: 'absolute',
                          // zInd
                          ex: 1,
                          alignSelf: 'center',
                          top: '35%',
                        }}>
                        <CustomImage
                          onPress={() => {
                            console.log('Here==================>');
                            if (
                              selectedBubble.findIndex(i => i.id == item?.id) !=
                              -1
                            ) {
                              setSelectedBubble(
                                selectedBubble?.filter(i => i?.id != item?.id),
                              );
                            } else {
                              setSelectedBubble(prev => [...prev, item]);
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
            })
          )}
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

export default BubbleSelection;
