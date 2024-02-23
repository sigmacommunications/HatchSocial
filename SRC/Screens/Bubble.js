import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  Platform,
  Text,
  TextInput,
  FlatList,
  ToastAndroid,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import Color from '../Assets/Utilities/Color';
import CustomStatusBar from '../Components/CustomStatusBar';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import CustomImage from '../Components/CustomImage';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import CustomText from '../Components/CustomText';
import CustomButton from '../Components/CustomButton';
import Header from '../Components/Header';
import navigationService from '../navigationService';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {Icon, ScrollView, Toast} from 'native-base';
import Home from '../Components/Home';
import Posts from '../Components/Posts';
import Events from '../Components/Events';
import Entypo from 'react-native-vector-icons/Entypo';
import Modal from 'react-native-modal';
import Feather from 'react-native-vector-icons/Feather';
import OptionsMenu from 'react-native-options-menu';
import {Get, Post} from '../Axios/AxiosInterceptorFunction';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {baseUrl} from '../Config';

const Bubble = props => {
  const bubbleId = props?.route?.params?.id;
  const themeColor = useSelector(state => state.authReducer.ThemeColor);
  const token = useSelector(state => state.authReducer.token);
  const privacy = useSelector(state => state.authReducer.privacy);
  const profileData = useSelector(state => state.commonReducer.selectedProfile);
  const [isLoading, setIsLoading] = useState(false);
  const isFocused = useIsFocused();
  const [loadingInvite, setLoadingInvite] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [bubbleInfo, setBubbleInfo] = useState({});
  const [startFollowing, setStartFollowing] = useState(
    bubbleInfo?.follow?.status == 'follow' ? true : false,
  );
  const events = ['Posts', 'Reels', 'Chats', 'Events', 'Members'];
  const [selectedEvent, setSelectedEvent] = useState('Posts');
  const [search, setSearch] = useState('');
  const [timerId, setTimerId] = useState(null);
  const [newData, setnewData] = useState([]);
  const [invitedPeople, setInvitedPeople] = useState([]);

  const MoreIcon = require('../Assets/Images/threedots.png');
  const navigation =useNavigation()

  const handleInputChange = text => {
    setSearch(text);
    if (timerId) {
      clearTimeout(timerId);
    }
    const newTimerId = setTimeout(() => {
      SearchMembers(text);
    }, 300);

    setTimerId(newTimerId);
  };

  const SearchMembers = async text => {
    const url = `auth/member_search`;
    const body = {
      search: text,
      profile_id: profileData?.id,
    };

    const response = await Post(url, body, apiHeader(token));
    if (response != undefined) {
      setnewData(response?.data?.profile_info);
    }
  };

  const SendInvite = async () => {
    const url = 'auth/community_member/add';0
    const invitedIds = invitedPeople.map((item, index) => {
      return item?.id;
    });
    const body = {
      status: 'invite',
      profile_id: invitedIds,
      community_id: bubbleId,
      invite_profile_id: profileData?.id,
    };
    setLoadingInvite(true);
    const response = await Post(url, body, apiHeader(token));
    setLoadingInvite(false);
    if (response != undefined) {
      setIsVisible(false);
      Platform.OS == 'android'
        ? ToastAndroid.show('Request has been sent', ToastAndroid.SHORT)
        : Alert.alert('Request has been sent');
    }
  };

  const follow = async () => {
    const url = 'auth/community_member/add';
    const body = {
      status: 'request',
      profile_id: [profileData?.id],
      community_id: bubbleId,
    };
    setFollowLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setFollowLoading(false);
    if (response != undefined) {
      getBubbleDetails();
      setStartFollowing(!startFollowing);
    }
  };

  const getBubbleDetails = async () => {
    const url = `auth/community_detail/${bubbleId}?profile_id=${profileData?.id}`;
    setIsLoading(true);
    const response = await Get(url, token);
    setIsLoading(false);
    if (response != undefined) {
      setBubbleInfo(response?.data?.community_info);
      setStartFollowing(
        response?.data?.community_info?.follow?.status == 'follow'
          ? true
          : false,
      );
    }
  };

  const InviteMember = () => {
    if (
      bubbleInfo?.profile_id == profileData?.id ||
      // bubbleInfo?.follow?.role == 'member' ||
      bubbleInfo?.follow?.role == 'admin'
      // bubbleInfo?.follow?.role == 'moderator'
    ) {
      setIsVisible(true);
    } else {
      Alert.alert('you donot have permissions to invite the others');
    }
  };

  const BubbleMangement = () => {
    console.log(bubbleInfo?.follow?.role)
    bubbleInfo?.follow?.role == 'owner'
      ? navigationService.navigate('BubbleManagement', {bubbleInfo: bubbleInfo})
      : Platform.OS == 'android'
      ? ToastAndroid.show('Access Denied', ToastAndroid.SHORT)
      : alert('Access Denied');
  };

  const handleActivity = () => {
    console.log(bubbleInfo?.follow?.role)
    bubbleInfo?.follow?.role.toLowerCase() != 'member'
      ? navigationService.navigate('Activites', {bubbleInfo: bubbleInfo})
      : Platform.OS == 'android'
      ? ToastAndroid.show('Access Denied', ToastAndroid.SHORT)
      : alert('Access Denied');
  };
 

  useEffect(() => {
    getBubbleDetails();
  }, [isFocused]);



  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />
      <Header Title="Bubble" showBack />
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
          alignItems: 'center',
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {isLoading ? (
            <View style={styles.loaderView}>
              <ActivityIndicator color={Color.white} size={'large'} />
            </View>
          ) : bubbleInfo?.follow?.status == 'blocked' ? (
            <View
              style={{
                width: windowWidth,
                // height : moderateScale(20,0.6),
                backgroundColor: Color.red,
                alignItems: 'center',
                paddingVertical: moderateScale(5, 0.6),
              }}>
              <CustomText
                style={{
                  color: Color.white,
                  width: windowWidth * 0.9,
                  textAlign: 'center',
                  fontSize: moderateScale(12, 0.6),
                }}>
                It seems like you have breach community guidline thus you are
                temporary blocked by our team
              </CustomText>
            </View>
          ) : (
            <>
              <ImageBackground
                //  source={require('../Assets/Images/fitness.png')}
                source={
                  bubbleInfo?.image
                    ? {uri: `${baseUrl}/${bubbleInfo?.image}`}
                    : require('../Assets/Images/fitness.png')
                }
                resizeMode={'cover'}
                style={{
                  width: windowWidth,
                  height: windowHeight * 0.35,
                }}>
                <View style={styles.textwithicon}>
                  <CustomText
                    numberOfLines={1}
                    children={bubbleInfo?.title}
                    style={{
                      fontSize: moderateScale(17, 0.6),
                      color: 'black',
                      marginRight: moderateScale(8, 0.3),
                      textAlign: 'center',
                    }}
                    isBold
                  />
                  <View style={styles.checkIcon}>
                    <Icon
                      name="check"
                      as={AntDesign}
                      color={themeColor[1]}
                      size={5}
                      zIndex={1}
                    />
                  </View>
                </View>
                <View style={styles.container2}>
                  <View style={{justifyContent: 'center'}}>
                    <CustomText
                      numberOfLines={1}
                      children={'36'}
                      style={styles.followCount}
                      isBold
                    />
                    <CustomText
                      numberOfLines={1}
                      children={'following'}
                      style={styles.followText}
                    />
                  </View>
                  <View
                    style={{
                      backgroundColor: Color.white,
                      height: 50,
                      width: 1,
                    }}></View>
                  <View style={{justifyContent: 'center'}}>
                    <CustomText
                      numberOfLines={1}
                      children={bubbleInfo?.total_members}
                      style={styles.followCount}
                      isBold
                    />
                    <CustomText
                      numberOfLines={1}
                      children={'followers'}
                      style={styles.followText}
                    />
                  </View>
                  <View
                    style={{
                      backgroundColor: Color.white,
                      height: 50,
                      width: 1,
                    }}></View>
                  <View style={{justifyContent: 'center'}}>
                    <CustomText
                      numberOfLines={1}
                      children={bubbleInfo?.total_posts_count}
                      style={styles.followCount}
                      isBold
                    />
                    <CustomText
                      numberOfLines={1}
                      children={'posts'}
                      style={styles.followText}
                    />
                  </View>
                </View>
                <View style={styles.followbtn}>
                  <CustomButton
                    text={
                      followLoading ? (
                        <ActivityIndicator
                          color={themeColor[1]}
                          size={'small'}
                        />
                      ) : startFollowing ? (
                        'Following'
                      ) : (
                        'Follow'
                      )
                    }
                    textColor={themeColor[1]}
                    width={windowWidth * 0.5}
                    height={windowHeight * 0.06}
                    onPress={() => {
                      follow();
                    }}
                    fontSize={moderateScale(15, 0.6)}
                    bgColor={['#FFFFFF', '#FFFFFF']}
                    borderRadius={moderateScale(30, 0.3)}
                    isGradient
                    isBold
                  />
                  <TouchableOpacity activeOpacity={0.8} style={styles.downIcon}>
                    <OptionsMenu
                      button={MoreIcon}
                      buttonStyle={{
                        width: 40,
                        height: 30,
                        tintColor: '#000',
                      }}
                      destructiveIndex={1}
                      options={['Invite Member', 'Bubble Management' , 'See Activity' ]}
                      actions={[InviteMember, BubbleMangement , handleActivity ]}
                    />
                  </TouchableOpacity>
                </View>
              </ImageBackground>
              <View style={styles.mapview}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  {events?.map(data => {
                    return (
                      <CustomText
                        numberOfLines={1}
                        children={data}
                        style={{
                          ...styles.eventText,
                          ...{
                            backgroundColor:
                              selectedEvent == data
                                ? Color.white
                                : 'rgba(0,0,0,.2)',
                          },
                          ...{
                            color:
                              selectedEvent == data
                                ? themeColor[1]
                                : Color.white,
                          },
                        }}
                        onPress={() => {
                          setSelectedEvent(data);
                          if (data == 'Members') {
                            navigationService.navigate('MemberList', {
                              BubbleId: bubbleId,
                              bubbleInfo: bubbleInfo,
                            });
                          }
                        }}
                      />
                    );
                  })}
                </ScrollView>

                {selectedEvent == 'Reels' ? (
                  <Home bubbleId={bubbleId} />
                ) : selectedEvent == 'Events' ? (
                  <Events
                    bubbleInfo={bubbleInfo}
                    onPress={() => {
                      navigationService.navigate('AddEvents', {
                        bubbleId: bubbleId,
                      });
                    }}
                    bubbleId={bubbleId}
                  />
                ) : selectedEvent == 'Posts' ? (
                  <Posts
                    bubbleInfo={bubbleInfo}
                    bubbleId={bubbleId}
                    onPress={() => {
                      navigationService.navigate('AddPost', {
                        bubbleId: bubbleId,
                      });
                    }}
                  />
                ) : selectedEvent == 'Chats' ? (
                  <NullData />
                ) : (
                  <></>
                )}
              </View>
            </>
          )}
        </ScrollView>
      </ImageBackground>
      <Modal
        isVisible={isVisible}
        onBackdropPress={() => {
          setIsVisible(false);
        }}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor:'red',
          // paddingVertical:moderateScale(20,.6),
        }}>
        <View style={styles.container}>
          <CustomText
            style={[styles.modalHeader, {backgroundColor: themeColor[1]}]}
            isBold>
            Invite Members
          </CustomText>

          <TextInputWithTitle
            iconName={'search'}
            iconType={Feather}
            secureText={false}
            placeholder={'Alchole'}
            setText={handleInputChange}
            value={search}
            viewHeight={0.05}
            viewWidth={0.8}
            inputWidth={0.7}
            border={1}
            borderColor={Color.veryLightGray}
            marginTop={moderateScale(15, 0.3)}
            // backgroundColor={'black'}
            color={themeColor[1]}
            placeholderColor={Color.veryLightGray}
            borderRadius={moderateScale(25, 0.3)}
          />

          <FlatList
            data={newData}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              // marginBottom: moderateScale(10, 0.3),
              paddingBottom: moderateScale(70, 0.6),
              marginTop: moderateScale(10, 0.3),
            }}
            style={{
              height: windowHeight * 0.5,
            }}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.row}
                  onPress={() => {
                    if (
                      invitedPeople?.some((data, index) => data?.id == item?.id)
                    ) {
                      const tempData = [...invitedPeople];
                      tempData.splice(
                        invitedPeople?.findIndex(
                          (data, index) => data?.id == item?.id,
                        ),
                        1,
                      );
                      setInvitedPeople(tempData);
                    } else {
                      setInvitedPeople(prev => [...prev, item]);
                    }
                  }}>
                  <View style={styles.profileSection2}>
                    <CustomImage
                      source={{uri: `${baseUrl}/${item.photo}`}}
                      style={{
                        height: '100%',
                        width: '100%',
                      }}
                      resizeMode="contain"
                    />
                  </View>

                  <View
                    style={{
                      marginLeft: moderateScale(15, 0.6),
                      justifyContent: 'center',
                    }}>
                    <CustomText
                      style={{
                        fontSize: moderateScale(13, 0.6),
                        color: '#000',
                        textAlign: 'left',
                      }}
                      isBold>
                      {/* {item?.name} */}
                    </CustomText>
                    <CustomText
                      style={{
                        fontSize: moderateScale(9, 0.6),
                        textAlign: 'left',
                        color: '#000',
                      }}>
                      {item.Tags}
                    </CustomText>
                  </View>
                  {invitedPeople?.some(
                    (data, index) => data?.id == item?.id,
                  ) && (
                    <View
                      style={[
                        styles.checkIcon,
                        {
                          backgroundColor: themeColor[1],
                          position: 'absolute',
                          right: 10,
                          top: 5,
                          borderRadius: moderateScale(10, 0.6),
                          height: moderateScale(20, 0.6),
                          width: moderateScale(20, 0.6),
                        },
                      ]}>
                      <Icon
                        name="check"
                        as={AntDesign}
                        color={'white'}
                        size={4}
                        zIndex={1}
                        onPress={() => {
                          const tempData = [...invitedPeople];
                          tempData.splice(
                            invitedPeople?.findIndex(
                              (data, index) => data?.id == item?.id,
                            ),
                            1,
                          );
                          setInvitedPeople(tempData);
                        }}
                      />
                    </View>
                  )}
                </TouchableOpacity>
              );
            }}
          />
          {invitedPeople?.length > 0 && (
            <View style={styles.invite}>
              <CustomButton
                text={
                  loadingInvite ? (
                    <ActivityIndicator color={'#01E8E3'} size={'small'} />
                  ) : (
                    'invite'
                  )
                }
                textColor={'white'}
                width={windowWidth * 0.4}
                height={windowHeight * 0.05}
                // marginTop={moderateScale(20, 0.3)}
                onPress={() => {
                  invitedPeople.length > 0 && SendInvite();
                }}
                bgColor={themeColor}
                borderRadius={moderateScale(30, 0.3)}
                isGradient
              />
            </View>
          )}
        </View>
      </Modal>
    </>
  );
};

const styles = ScaledSheet.create({
  checkIcon: {
    backgroundColor: Color.white,
    borderRadius: moderateScale(12.5, 0.6),
    height: moderateScale(25, 0.6),
    justifyContent: 'center',
    alignItems: 'center',
    width: moderateScale(25, 0.6),
    padding: moderateScale(3, 0.6),
  },
  followCount: {
    fontSize: moderateScale(20, 0.6),
    color: 'black',
    marginRight: moderateScale(8, 0.3),
    //   width: windowWidth*0.9,
    textAlign: 'center',
  },
  followText: {
    fontSize: moderateScale(14, 0.6),
    color: Color.white,
    marginRight: moderateScale(8, 0.3),
    textAlign: 'center',
  },
  downIcon: {
    backgroundColor: Color.white,
    borderRadius: (windowWidth * 0.11) / 2,
    height: windowWidth * 0.11,
    justifyContent: 'center',
    marginLeft: moderateScale(8, 0.3),
    alignItems: 'center',
    width: windowWidth * 0.11,
    padding: moderateScale(3, 0.6),
  },
  loaderView: {
    // backgroundColor: 'red',
    width: windowWidth,
    height: windowHeight * 0.4,
    justifyContent: 'center',
  },
  eventText: {
    fontSize: moderateScale(14, 0.6),

    marginHorizontal: moderateScale(8, 0.3),
    width: windowWidth * 0.22,
    marginLeft: moderateScale(10, 0.3),
    paddingVertical: moderateScale(5, 0.6),
    borderRadius: moderateScale(5, 0.6),
    textAlign: 'center',
    alignItems: 'center',
  },
  container: {
    width: windowWidth * 0.85,
    // height: windowHeight * 0.55,
    // paddingVertical: moderateScale(20, 0.6),
    backgroundColor: Color.white,
    borderRadius: moderateScale(10, 0.6),
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  ct: {
    fontSize: moderateScale(17, 0.6),
    color: 'black',
    marginRight: moderateScale(8, 0.3),
    textAlign: 'center',
  },
  profileSection2: {
    height: windowHeight * 0.05,
    width: windowHeight * 0.05,
    backgroundColor: '#fff',
    borderRadius: (windowHeight * 0.05) / 2,
    borderWidth: 2,
    borderColor: Color.green,
    justifyContent: 'center',
    overflow: 'hidden',
    // alignSelf: 'center',
  },
  modalHeader: {
    color: 'black',
    fontSize: moderateScale(15, 0.6),
    width: '100%',
    textAlign: 'center',
    color: 'white',
    // backgroundColor: themeColor[1],
    padding: moderateScale(10, 0.6),
  },
  row: {
    width: windowWidth * 0.85,
    height: windowHeight * 0.06,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: moderateScale(14, 0.6),
    marginVertical: moderateScale(2, 0.3),
    // backgroundColor:'red',
  },
  container2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: moderateScale(30, 0.3),
    paddingHorizontal: moderateScale(30, 0.6),
  },
  textwithicon: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: moderateScale(30, 0.3),
  },
  followbtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: moderateScale(30, 0.3),
  },
  mapview: {
    width: windowWidth,
    marginTop: moderateScale(10, 0.3),
    // paddingHorizontal: moderateScale(10, 0.6),
    // marginLeft:moderateScale(10,.3)
  },
  invite: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 20,
    backgroundColor: 'transparent',
  },
});

export default Bubble;

const NullData = () => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        height: windowHeight * 0.4,
      }}>
      <CustomText>Chats has not been implemented yet</CustomText>
    </View>
  );
};
