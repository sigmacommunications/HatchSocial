import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList} from 'react-native';
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
import {setInterestSelected} from '../Store/slices/auth';
import {Get, Post} from '../Axios/AxiosInterceptorFunction';
import {setSelectedFeeds, setSelectedProfileData} from '../Store/slices/common';
import CustomText from '../Components/CustomText';
import {baseUrl} from '../Config';
import {useNavigation} from '@react-navigation/native';
import { color } from 'react-native-reanimated';

const InterestSelection = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const privacy = useSelector(state => state.authReducer.privacy);
  const themeColor = useSelector(state => state.authReducer.ThemeColor);
  const token = useSelector(state => state.authReducer.token);
  const profileData = useSelector(state => state.commonReducer.selectedProfile);

  const [isLaoding, setIsLaoding] = useState(false);
  const [selectedBubble, setSelectedBubble] = useState([]);
  const [interestListing, setInterestListing] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState('invest');
  const selectedProfile = useSelector(
    state => state.commonReducer.selectedProfile,
  );
  console.log(selectedProfile)

 


 
  const getInterest = async () => {
    const url = `auth/interest_list?type=${selectedInterests}`
    setIsLaoding(true);
    const response = await Get(url, token);
    setIsLaoding(false);
    if (response != undefined) {console.log('data ===== >', response?.data?.interest_info)
      setInterestListing(response?.data?.interest_info);
    }
  };

  const sendSelectedFeeds = async () => {
    const url = 'auth/subscribe';
    const body = {
      id: profileData?.id,
      interests: selectedBubble,
      // interest_img :selectedBubble[0]?.image,
    };
    console.log("🚀 ~ sendSelectedFeeds ~ body:", body)
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
    console.log("🚀 ~ InterestSelection ~ selectedProfile:", selectedProfile)
    console.log("🚀 ~ InterestSelection ~ selectedProfile:", selectedProfile)
    if (selectedInterests != '') {
    getInterest();
    }
  }, [selectedInterests]);
 

  return (
    <ScreenBoiler
      statusBarBackgroundColor={'white'}
      statusBarContentStyle={'dark-content'}>
      <Header Title={'Interests'} />

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
        <View style={styles.container1}>
          <TouchableOpacity
            style={[
              styles.btn,
              {
                backgroundColor:
                  selectedInterests == 'invest' ? 'purple' : 'white',
              },
            ]}
            onPress={() => {
              setSelectedInterests('invest');
            }}>
            <View style={styles.tabBarButton}>
              <CustomText
                isBold
                // style={{
                //   color:
                //     selectedInterests == 'invest' ? Color.white : Color.black,
                // }}
              >
                invest
              </CustomText>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              console.log('i m Text here social');
              setSelectedInterests('social');
            }}
            style={[
              styles.btn,
              {
                backgroundColor:
                  selectedInterests == 'social' ? '#ff66f5' : 'white',
              },
            ]}>
            <View style={styles.tabBarButton}>
              <CustomText isBold>Social</CustomText>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelectedInterests('traders');
            }}
            style={[
              ,
              styles.btn,
              {
                backgroundColor:
                  selectedInterests == 'traders' ? 'green' : 'white',
              },
            ]}>
            <View style={styles.tabBarButton}>
              <CustomText isBold>trade</CustomText>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelectedInterests('biz');
            }}
            style={[
              styles.btn,
              {
                backgroundColor:
                  selectedInterests == 'biz' ? '#39FF14' : 'white',
                // borderBottomWidth: selectedInterests == 'biz' ? 1 : 0,
                // borderColor: selectedInterests == 'biz' && Color.themeblue,
              },
            ]}>
            <View style={styles.tabBarButton}>
              <CustomText isBold>biz</CustomText>
            </View>
          </TouchableOpacity>
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
          <FlatList
            showsVerticalScrollIndicator={true}
            nestedScrollEnabled={true}
            numColumns={3}
            data={
             
            interestListing
            }
            keyExtractor={item => item.id}
            contentContainerStyle={{
              paddingBottom: moderateScale(50, 0.6),
            }}
            style={
              {
                // width: windowWidth * 0.95,
                // alignSelf: 'center',
              }
            }
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    console.log('Here');
                    if (selectedBubble.findIndex(i => i == item?.id) != -1) {
                      setSelectedBubble(
                        selectedBubble?.filter(i => i != item?.id),
                      );
                    } else if (selectedBubble.length == 8) {
                      console.log('you can select only eight interest');
                      Platform.OS == 'android'
                        ? ToastAndroid.show(
                            'you can select only eight interest',
                            ToastAndroid.SHORT,
                          )
                        : Alert.alert('you can select only eight interest');
                    } else {
                      setSelectedBubble(prev => [...prev, item?.id]);
                    }
                   
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
                      } else if (selectedBubble.length == 8) {
                        console.log('you can select only eight interest');
                        Platform.OS == 'android'
                          ? ToastAndroid.show(
                              'you can select only eight interest',
                              ToastAndroid.SHORT,
                            )
                          : Alert.alert('you can select only eight interest');
                      } else {
                        setSelectedBubble(prev => [...prev, item?.id]);
                      }
                    
                    }}
                    source={{uri :`${baseUrl}/${item?.image}` }}
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                  />
                  {selectedBubble.includes(item?.id) && (
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
                              selectedBubble.findIndex(i => i == item?.id) != -1
                            ) {
                              setSelectedBubble(
                                selectedBubble?.filter(i => i != item?.id),
                              );
                            }else if (selectedBubble.length == 8) {
                              console.log('you can select only eight interest');
                              Platform.OS == 'android'
                                ? ToastAndroid.show(
                                    'you can select only eight interest',
                                    ToastAndroid.SHORT,
                                  )
                                : Alert.alert('you can select only eight interest');
                            } else {
                              setSelectedBubble(prev => [...prev, item?.id]);
                            }
                          
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
            }}
            // ListEmptyComponent={() => {
            //   return (
            //     <View
            //       style={{
            //         width: '100%',
            //         height: windowHeight * 0.7,
            //         justifyContent: 'center',
            //         alignItems: 'center',
            //       }}>
            //       <View
            //         style={{
            //           width: windowWidth * 0.25,
            //           height: windowHeight * 0.15,

            //           // backgroundColor:'red',
            //         }}>
            //         <CustomImage
            //           style={{
            //             height: '100%',
            //             width: '100%',
            //           }}
            //           source={require('../Assets/Images/emptybox.png')}
            //         />
            //       </View>
            //     </View>
            //   );
            // }}
          />

        
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
  container1: {
    width: windowWidth,
    height: windowHeight * 0.07,
    paddingVertical: moderateScale(12, 0.5),
    paddingHorizontal: moderateScale(15, 0.3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(25, 0.6),
    // backgroundColor: Color.white,
  },
  tabBarButton: {
    // borderBottomWidth: 1,
    paddingVertical: moderateScale(3, 0.7),
    // borderBottomColor: Color.darkGray,
    alignItems: 'center',
  },
  btn: {
    justifyContent: 'center',
    paddingHorizontal: moderateScale(15, 0.6),
    borderRadius: moderateScale(8, 0.6),
  },
});

export default InterestSelection;
