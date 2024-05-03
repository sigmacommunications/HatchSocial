import React, {useState} from 'react';
import {Alert, Icon} from 'native-base';
import {View, Platform, Dimensions, TouchableOpacity} from 'react-native';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from './CustomText';
import CustomImage from './CustomImage';
const {height, width} = Dimensions.get('window');
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import {useDispatch, useSelector} from 'react-redux';
import navigationService from '../navigationService';
import Modal from 'react-native-modal';
import {
  setAccountPrivate,
  setBubbleCreated,
  setBubbleSelected,
  setFeedsSelected,
  setInterestSelected,
  setNewSignUp,
  setNumOfProfiles,
  setProfileSelcted,
  setQuestionAnswered,
  setUserToken,
} from '../Store/slices/auth';
import {setSelectedBubbles, setSelectedProfileData} from '../Store/slices/common';

const Header = props => {
  const themeColor = useSelector(state => state.authReducer.ThemeColor);
  const {showBack, Title, right, search, signup, menu} = props;
  const token = useSelector(state => state.authReducer.token);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const modalData = [
    {
      name: 'Notifications',
      onPress: () => {
        navigationService.navigate('Notifications');
        setModalVisible(!modalVisible);
      },
    },
    {
      name: 'Profile',
      onPress: () => {
        navigationService.navigate('ProfileList');
        setModalVisible(!modalVisible);
      },
    },
   
    {
      name: 'Bubble List',
      onPress: () => {
        navigationService.navigate('BubbleList');
        setModalVisible(!modalVisible);
      },
    },
    {
      name: 'Membership',
      onPress: () => {
        // navigationService.navigate('SubscriptionScreen');
        navigationService.navigate('MemberShipScreen', {fromHeaderMenu:true});
        setModalVisible(!modalVisible);
      },
    },
    {name: 'Privacy', onPress: () => {}},
    {
      name: 'settings',
      onPress: () => {
        navigationService.navigate('AccountSetting');
        setModalVisible(!modalVisible);
      },
    },
    {
      name: 'Logout',
      onPress: () => {
        dispatch(setUserToken(null));
        dispatch(setBubbleSelected(false));
        dispatch(setProfileSelcted(false));
        dispatch(setNumOfProfiles(0));
      dispatch(setFeedsSelected(false));
        setModalVisible(!modalVisible);
        dispatch(setAccountPrivate('public'));
        // dispatch(setQuestionAnswered(false));
        dispatch(setBubbleCreated(false));
        dispatch(setNewSignUp(false));
        dispatch(setSelectedBubbles(false));
        dispatch(setSelectedProfileData({}))
        dispatch(setInterestSelected(false));

        // navigationService.navigate('LoginScreen');
      },
    },
  ];

  return (
    <>
      <View
        style={{
          width: windowWidth,
          height: windowHeight * 0.1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        {showBack ? (
          <Icon
            name={'chevron-left'}
            as={Feather}
            size={moderateScale(28, 0.6)}
            color={themeColor[1]}
            onPress={() => {
              navigation.goBack();
            }}
            style={{
              position: 'absolute',
              left: moderateScale(15, 0.6),
              // backgroundColor:'red',
              // width : moderateScale(100,0.6),
              // height : windowHeight * 0.1,
            }}
          />
        ) : (
          <View
            style={{
              position: 'absolute',
              left: 10,
              width: moderateScale(30, 0.6),
              height: 40,
            }}>
            <CustomImage
              source={require('../Assets/Images/logosmall.png')}
              resizeMode={'stretch'}
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </View>
        )}
        {Title && (
          <CustomText style={{fontSize: 23}} isBold>
            {Title}
          </CustomText>
        )}
        {right && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              position: 'absolute',
              right: moderateScale(10, 0.6),
            }}>
            {search && (
              //   <Icon
              // name={'search'}
              // as={Ionicons}
              // size={moderateScale(20,0.6)}
              // color={'#757575'}
              // style={{

              // }}
              <CustomImage
                source={require('../Assets/Images/search.png')}
                style={{
                  width: moderateScale(20, 0.6),
                  height: moderateScale(20, 0.6),
                }}
                onPress={() => {
                  navigationService.navigate('BubbleSearch');
                }}
              />
            )}

            {!menu && (
              <Icon
                name={'reorder-three'}
                as={Ionicons}
                size={moderateScale(40, 0.6)}
                color={themeColor[1]}
                style={{}}
                onPress={() => token != null && setModalVisible(!modalVisible)}
              />
            )}
          </View>
        )}
      </View>

      <Modal
        visible={modalVisible}
        onBackdropPress={() => {
          // Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            width: windowWidth * 0.32,
            top: 40,
            // right: 0,
            position: 'absolute',
            alignSelf: 'flex-end',
            alignItems: 'center',
            borderRadius: moderateScale(10, 0.6),
            // backgroundColor: 'rgba(225,225,225,.5)',
            backgroundColor: Color.white,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}>
          {/* <CustomText style={{fontSize:moderateScale(20,.6)}}>Hello</CustomText> */}
          {modalData.map(item => {
            return (
              <>
                <CustomText
                
                  style={{
                    fontSize: moderateScale(15, 0.6),
                    paddingVertical: moderateScale(5, 0.6),
                  }}
                  onPress={item?.onPress}>
                  {item?.name}
                </CustomText>
                <View
                  style={{
                    width: windowWidth * 0.25,
                    backgroundColor: 'rgba(0,0,0,0.1)',
                    height: 2,
                  }}></View>
              </>
            );
          })}
        </View>
      </Modal>
    </>
  );
};
const styles = ScaledSheet.create({
  header1: {
    width: windowWidth,
    height: windowHeight * 0.1,
    backgroundColor: Color.white,
    marginBottom: moderateScale(5, 0.3),
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  statusModal: {
    alignSelf: 'flex-end',
    paddingVertical: moderateScale(15, 0.3),
    paddingHorizontal: moderateScale(10, 0.3),
    backgroundColor: Color.white,
    // borderRadius: moderateScale(5, 0.3),
    marginTop: moderateScale(60, 0.3),
    // borderWidth: 1,
    borderColor: Color.green,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 3,
  },
  header2: {
    width: windowWidth,
    // height: windowHeight * 0.13,
    // backgroundColor: themeColor[1],
    // justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20, 0.3),
    paddingVertical: moderateScale(15, 0.3),
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  notificationCircle: {
    position: 'absolute',
    height: moderateScale(10, 0.3),
    width: moderateScale(10, 0.3),
    borderRadius: moderateScale(5, 0.3),
    backgroundColor: Color.green,
    right: moderateScale(5, 0.3),
    // marginTop : moderateScale(10,0.3)
  },
});
export default Header;
