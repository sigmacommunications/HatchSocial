import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Color from '../Assets/Utilities/Color';
import {moderateScale} from 'react-native-size-matters';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {Icon} from 'native-base';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomText from '../Components/CustomText';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {useSelector} from 'react-redux';
import CustomImage from '../Components/CustomImage';
import NullDataComponent from '../Components/NullDataComponent';
import {Get} from '../Axios/AxiosInterceptorFunction';
import {baseUrl} from '../Config';
import Header from '../Components/Header';

const SpotifyScreen = ({navigation}) => {
  const privacy = useSelector(state => state.authReducer.privacy);
  const profileData = useSelector(state => state.commonReducer.selectedProfile);
  const token = useSelector(state => state.authReducer.token);

  const [interests, setInterests] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const interestsArray = [
    {
      id: '1',
      name: 'Comedy',
      image: require('../Assets/Images/int_Social_Compress/Comedy.jpg'),
    },
    {
      id: '2',
      name: 'Comedy',
      image: require('../Assets/Images/int_Social_Compress/Comedy.jpg'),
    },
    {
      id: '3',
      name: 'Comedy',
      image: require('../Assets/Images/int_Social_Compress/Comedy.jpg'),
    },
    {
      id: '4',
      name: 'Comedy',
      image: require('../Assets/Images/int_Social_Compress/Comedy.jpg'),
    },
    {
      id: '5',
      name: 'Comedy',
      image: require('../Assets/Images/int_Social_Compress/Comedy.jpg'),
    },
    {
      id: '6',
      name: 'Comedy',
      image: require('../Assets/Images/int_Social_Compress/Comedy.jpg'),
    },
  ];
  const getInterests = async () => {
    const url = `auth/interest/${profileData?.id}`;
    setIsLoading(true);
    const response = await Get(url, token);
    setIsLoading(false);
    if (response != undefined) {
      //    return console.log("🚀 ~ getInterests ~ response:", response?.data?.data?.recommond_interests)
      setInterests(response?.data?.data);
    }
  };

  useEffect(() => {
    getInterests();
  }, []);

  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />
     <Header showBack Title="Spotify"/>
     
      {/* header with custom menu options */}
     
     {/* <View style={styles.HeaderView}>
        <Icon
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.icon1}
          name="arrow-back-ios"
          as={MaterialIcons}
          color={Color.themeColor}
          size={moderateScale(20, 0.6)}
        />
        <CustomText
          numberOfLines={1}
          isBold
          style={{width: windowWidth * 0.67, fontSize: moderateScale(20, 0.6)}}>
          {interestName}
        </CustomText>
        <Icon
          onPress={() => {
            setModalVisible(true);
          }}
          name="menu"
          as={Entypo}
          color={Color.themeColor}
          size={moderateScale(35, 0.6)}
        />
      </View> */}
      <ImageBackground
        source={
          privacy == 'private'
            ? require('../Assets/Images/theme2.jpg')
            : require('../Assets/Images/Main.png')
        }
        resizeMode={'cover'}
        style={[
          styles.container,
          isLoading && {
            justifyContent: 'center',
          },
        ]}>
        {isLoading ? (
          <ActivityIndicator
            color={Color.themeColor}
            size={moderateScale(24, 0.3)}
          />
        ) : (
          <>
            <View>
              <CustomText isBold style={styles.heading}>
                My Interests
              </CustomText>

              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: moderateScale(6, 0.2),

                  width: windowWidth,
                }}>
                <FlatList
                  data={interests?.profile_interests} //actual data
                  keyExtractor={item => item?.id}
                  scrollEnabled
                  showsVerticalScrollIndicator
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({item}) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('feedsnBubbles', {
                            interest_id: item?.id,
                            interestImage: item?.image,
                            interestName: item?.name,
                          });
                        }}
                        style={styles.feed}>
                        <View style={styles.feedcircle}>
                          <View style={styles.image1}>
                            <CustomImage
                              onPress={() => {
                                navigation.navigate('feedsnBubbles', {
                                  interest_id: item?.id,
                                  interestImage: item?.image,
                                  interestName: item?.name,
                                });
                                // navigationService.navigate('FeedsPostScreen', {
                                //   data: item,
                                // });
                              }}
                              source={{uri: `${baseUrl}/${item?.image}`}}
                              style={styles.image}
                            />
                          </View>
                        </View>
                        <CustomText
                          numberOfLines={1}
                          style={{
                            width: windowWidth * 0.2,
                            fontSize: moderateScale(14, 0.6),
                            color: Color.white,
                          }}
                          isBold>
                          {item?.name}
                        </CustomText>
                      </TouchableOpacity>
                    );
                  }}
                  ListEmptyComponent={() => {
                    return <NullDataComponent />;
                  }}
                />
              </View>
            </View>

            <View>
              <CustomText isBold style={styles.heading}>
                Recommended For You
              </CustomText>

              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: moderateScale(6, 0.2),

                  width: windowWidth,
                }}>
                <FlatList
                  data={interests?.recommond_interests} //actual data
                  keyExtractor={item => item?.id}
                  scrollEnabled
                  showsVerticalScrollIndicator
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({item}) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                        //   item?.privacy.toLowerCase() == 'yes'
                        //     ? setIsVisible(true)
                        //     : setClicked(true);
                        //   setSelectedBubbleId(item);
                        }}
                        style={styles.pBubbles}>
                        <View
                          style={{
                            height: windowHeight * 0.1,
                          }}>
                          <CustomImage
                            onPress={() => {
                            //   navigation;
                            }}
                            style={{
                              height: '100%',
                              width: '100%',
                            }}
                            source={{uri: `${baseUrl}/${item?.image}`}}
                          />
                          <CustomText
                            numberOfLines={1}
                            style={{
                              width: windowWidth * 0.2,
                              fontSize: moderateScale(13, 0.6),
                              marginHorizontal: moderateScale(10, 0.3),
                            }}>
                            {item?.name}
                          </CustomText>
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                  ListEmptyComponent={() => {
                    return <NullDataComponent />;
                  }}
                />
              </View>
            </View>
          </>
        )}
      </ImageBackground>
    </>
  );
};

export default SpotifyScreen;

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight * 0.9,
    // justifyContent: 'center',
    gap: moderateScale(20, 0.2),
  },

  feedsContainer: {
    width: windowWidth,
    marginTop: 10,
    paddingVertical: moderateScale(18, 0.2),
  },
  circle: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    borderColor: Color.themeColor,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: (windowWidth * 0.2) / 2,
    overflow: 'hidden',
    padding: 10,
  },
  bubblesContainer: {
    marginBottom: moderateScale(20, 0.2),
  },
  image: {
    width: '100%',
    height: '100%',
  },
  icon1: {
    marginHorizontal: moderateScale(10, 0.6),
    width: windowWidth * 0.05,
  },
  heading: {
    fontSize: moderateScale(25, 0.2),
    marginHorizontal: moderateScale(11, 0.1),
    color: 'white',
    marginBottom: moderateScale(11, 0.3),
  },
  feed: {
    alignItems: 'center',
    marginHorizontal: moderateScale(10, 0.2),
  },
  bubble: {
    alignItems: 'center',
    gap: 10,
    height: windowHeight * 0.35,
    marginHorizontal: moderateScale(10, 0.2),
  },
  title: {
    fontSize: moderateScale(15, 0.2),
  },
  modalView: {
    width: windowWidth * 0.25,
    backgroundColor: 'rgba(0,0,0,0.1)',
    height: 2,
  },
  modal: {
    width: windowWidth * 0.35,
    top: 40,
    position: 'absolute',
    alignSelf: 'flex-end',
    alignItems: 'center',
    borderRadius: moderateScale(10, 0.6),
    backgroundColor: Color.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalt: {
    fontSize: moderateScale(15, 0.6),
    paddingVertical: moderateScale(5, 0.6),
  },
  HeaderView: {
    height: windowHeight * 0.1,
    width: windowWidth,
    paddingHorizontal: moderateScale(15, 0.6),
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    // justifyContent: 'space-between',
  },
  icon: {
    height: windowHeight * 0.025,
    width: windowHeight * 0.025,
    borderRadius: (windowHeight * 0.025) / 2,
    backgroundColor: 'white',
    textAlign: 'center',
    position: 'absolute',
    bottom: 28,
    zIndex: 1,
    right: 5,
    paddingTop: moderateScale(4, 0.6),
  },
  container3: {
    height: windowHeight,
    width: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blurView: {
    position: 'absolute',
    height: windowHeight,
    width: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
  },
  image1: {
    width: windowWidth * 0.17,
    height: windowWidth * 0.17,
    borderRadius: (windowWidth * 0.2) / 2,
    overflow: 'hidden',
  },
  feedcircle: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    borderColor: Color.themeColor,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: (windowWidth * 0.2) / 2,
    overflow: 'hidden',
    padding: 10,
  },
  feedrow: {
    flexDirection: 'row',
    width: windowWidth,
  },
  image2: {
    width: windowWidth * 0.17,
    height: windowWidth * 0.17,
    borderRadius: (windowWidth * 0.2) / 2,
    overflow: 'hidden',
  },
  pBubbles: {
    height: windowHeight * 0.13,
    width: windowWidth * 0.25,
    borderRadius: moderateScale(10, 0.6),
    marginHorizontal: moderateScale(10, 0.3),
    overflow: 'hidden',
    backgroundColor: 'white',
  },
});
