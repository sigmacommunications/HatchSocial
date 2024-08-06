import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  Platform,
  ToastAndroid,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
const {height, width} = Dimensions.get('window');
import {moderateScale} from 'react-native-size-matters';
import CustomStatusBar from '../Components/CustomStatusBar';
import Header from '../Components/Header';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import {useSelector} from 'react-redux';
import CustomButton from '../Components/CustomButton';
import Color from '../Assets/Utilities/Color';
import {Icon, ScrollView} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';
import navigationService from '../navigationService';
import TextInputWithTitle from './TextInputWithTitle';
import {baseUrl} from '../Config';
import {Post} from '../Axios/AxiosInterceptorFunction';
import { useNavigation } from '@react-navigation/native';

const BubbleCard = ({
  item,
  pending,
  check,
  close,
  edit,
  MemberList,
  request,
  getRequests,
  getList,
}) => {

  console.log("🚀 ~ ite======================>:", item)
  console.log("🚀 ~ request================> request here:", request)
  // console.log("🚀 ~ item:", item?.status)
  const navigation= useNavigation()
  const profileData = useSelector(state => state.commonReducer.selectedProfile);
  const token = useSelector(state => state.authReducer.token);
  const [loading, setLoading] = useState(false);

  const unFollow = async () => {
    const url = 'auth/community_member/add';
    const body = {
      status: 'remove',
      profile_id: [profileData?.id],
      community_id: item?.community_id,
    };
    setLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setLoading(false);
    if (response != undefined) {
      getList();
    }
  };
  const changeInviteStatus = async value => {
    const url = `auth/community_member/pending_list/${item?.id}`;
    const body = {
      status: value,
    };
    setLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setLoading(false);
    if (response != undefined) {
      request ? getRequests() : getList();
    }
  };

  const themeColor = useSelector(state => state.authReducer.ThemeColor);
  const [isVisible, setIsVisible] = useState(false);
  const [msg, setMsg] = useState('');
  return (
    <>
      <TouchableOpacity 
      onPress={() =>{
        navigation.navigate('Bubble', {
          id: item?.community_id
        })
      }}
      style={styles.row}>
        <View>
          <View style={styles.profileSection}>
            <CustomImage
              source={
                item?.community_info?.image
                  ? {uri: `${baseUrl}/${item?.community_info?.image}`}
                  : require('../Assets/Images/travel.jpg')
              }
              style={{width: '100%', height: '100%'}}
            />
          </View>
          {/* {MemberList && (
              <TouchableOpacity
                onPress={() => {
                  setIsVisible(true);
                }}
                style={{
                  backgroundColor: 'white',
                  height: windowHeight * 0.03,
                  width: windowHeight * 0.03,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: (windowHeight * 0.03) / 2,
                  position: 'absolute',
                  top: 0,
                  right: 0,
                }}>
                <Icon
                  name="message1"
                  as={AntDesign}
                  color={themeColor[1]}
                  onPress={() => {
                    setIsVisible(true);
                  }}
                />
              </TouchableOpacity>
            )} */}
        </View>

        <View
          style={{
            paddingLeft: moderateScale(15, 0.6),
            width: windowWidth * 0.5,
          }}>
          <CustomText
            numberOfLines={1}
            style={{
              fontSize: moderateScale(16, 0.6),
              color: '#000',
              fontWeight: '500',
              textAlign: 'left',
            }}>
            {item?.community_info?.title}
          </CustomText>

          <CustomText
            style={{
              fontSize: moderateScale(11, 0.6),
              color: '#000',
              textAlign: 'left',
            }}>
            {item?.role}
          </CustomText>
         {item?.status == 'invite'  && <CustomText
            style={{
              fontSize: moderateScale(11, 0.6),
              color: '#000',
              textAlign: 'left',
              width:windowWidth*0.35
            }}>
            {item?.profile_info?.name} invited you to join this bubble
          </CustomText>}
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            position: 'absolute',
            right: 20,
          }}>
          {item?.role?.toLowerCase() == 'member' &&
            item?.status?.toLowerCase() == 'request' &&
            request && (
              <CustomButton
                text={'Pending'}
                textColor={Color.black}
                // width={windowWidth * 0.13}
                height={windowHeight * 0.05}
                fontSize={moderateScale(10, 0.6)}
                bgColor={'#FFFFFF'}
                borderRadius={moderateScale(10, 0.3)}
                paddingHorizontal={moderateScale(10, 0.3)}
                marginRight={moderateScale(5, 0.3)}
              />
            )}
          {check && (
            <CustomButton
              iconName={'check'}
              iconType={Entypo}
              iconStyle={{
                color: Color.black,
              }}
              textColor={Color.black}
              height={windowHeight * 0.05}
              fontSize={moderateScale(12, 0.6)}
              borderRadius={moderateScale(10, 0.3)}
              bgColor={'#FFFFFF'}
              paddingHorizontal={moderateScale(15, 0.3)}
              marginRight={moderateScale(5, 0.3)}
            />
          )}
          {item?.role.toLowerCase() == 'admin' && (
            <CustomButton
              onPress={() => {
                alert('Edit bubble')
                // navigationService.navigate('CreateNewBubble', {item: item});
              }}
              text={'Edit'}
              textColor={Color.black}
              width={windowWidth * 0.13}
              height={windowHeight * 0.05}
              fontSize={moderateScale(10, 0.6)}
              borderRadius={moderateScale(10, 0.3)}
              bgColor={'#FFFFFF'}
              paddingHorizontal={moderateScale(5, 0.3)}
              // marginRight={moderateScale(5, 0.3)}
            />
          )}
          {item?.role?.toLowerCase() == 'member' &&
            item?.status?.toLowerCase() == 'follow' &&
            !request && (
              <CustomButton
                iconName={'cross'}
                iconType={Entypo}
                iconStyle={{
                  color: Color.black,
                }}
                onPress={() => {
                  unFollow();
                }}
                textColor={Color.black}
                height={windowHeight * 0.05}
                fontSize={moderateScale(12, 0.6)}
                borderRadius={moderateScale(10, 0.3)}
                paddingHorizontal={moderateScale(15, 0.3)}
                bgColor={'#FFFFFF'}
              />
            )}
          {!item?.bubble &&
            (item?.status == 'invite' ? (
              <>
                <CustomButton
                  iconName={'check'}
                  iconType={Entypo}
                  iconStyle={{
                    color: Color.black,
                  }}
                  textColor={Color.black}
                  onPress={() => {
                    changeInviteStatus('accept');
                  }}
                  height={windowHeight * 0.05}
                  fontSize={moderateScale(12, 0.6)}
                  borderRadius={moderateScale(10, 0.3)}
                  paddingHorizontal={moderateScale(15, 0.3)}
                  marginRight={moderateScale(5, 0.3)}
                  bgColor={'#FFFFFF'}
                />
                <CustomButton
                  iconName={'cross'}
                  iconType={Entypo}
                  iconStyle={{
                    color: Color.black,
                  }}
                  onPress={() => {
                    changeInviteStatus('reject');
                  }}
                  textColor={Color.black}
                  height={windowHeight * 0.05}
                  fontSize={moderateScale(12, 0.6)}
                  borderRadius={moderateScale(10, 0.3)}
                  paddingHorizontal={moderateScale(15, 0.3)}
                  bgColor={'#FFFFFF'}
                />
              </>
            ) : item?.title == 'Member' ? (
              <>
                <CustomButton
                  iconName={'pause'}
                  iconType={AntDesign}
                  iconStyle={{
                    color: Color.black,
                  }}
                  textColor={Color.black}
                  // width={windowWidth * 0.15}
                  height={windowHeight * 0.05}
                  fontSize={moderateScale(12, 0.6)}
                  borderRadius={moderateScale(10, 0.3)}
                  paddingHorizontal={moderateScale(15, 0.3)}
                  marginRight={moderateScale(5, 0.3)}
                  bgColor={'#FFFFFF'}
                />
                <CustomButton
                  iconName={'cross'}
                  iconType={Entypo}
                  iconStyle={{
                    // width: 120,
                    // height: 120,
                    color: Color.black,
                    // padding: 55,
                    // marginLeft: 92,
                  }}
                  textColor={Color.black}
                  // width={windowWidth * 0.15}
                  height={windowHeight * 0.05}
                  fontSize={moderateScale(12, 0.6)}
                  borderRadius={moderateScale(10, 0.3)}
                  paddingHorizontal={moderateScale(15, 0.3)}
                  marginRight={moderateScale(5, 0.3)}
                  bgColor={'#FFFFFF'}
                />
              </>
            ) : item?.title == 'Invited' ? (
              <CustomButton
                text={'invited'}
                textColor={Color.black}
                // width={windowWidth * 0.13}
                height={windowHeight * 0.05}
                fontSize={moderateScale(10, 0.6)}
                bgColor={'#FFFFFF'}
                borderRadius={moderateScale(10, 0.3)}
                paddingHorizontal={moderateScale(5, 0.3)}
                marginRight={moderateScale(5, 0.3)}
              />
            ) : (
              <></>
            ))}
        </View>
      </TouchableOpacity>

      <Modal
        isVisible={isVisible}
        onBackdropPress={() => {
          setIsVisible(false);
        }}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={styles.container}>
          <View
            style={{
              backgroundColor: themeColor[1],
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <CustomText
              style={{
                color: Color.white,
                fontSize: moderateScale(15, 0.6),
                // marginTop: moderateScale(20, 0.3),
                paddingVertical: moderateScale(10, 0.6),
                paddingHorizontal: moderateScale(30, 0.6),
                textAlign: 'center',
              }}
              isBold>
              send Message Request
            </CustomText>
          </View>
          <View
            // colors={['#286086', '#dfecf5']}
            style={{
              height: windowHeight * 0.22,
              width: windowWidth * 0.85,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View style={styles.circle}>
              <CustomImage
                source={require('../Assets/Images/chat.png')}
                style={{width: '100%', height: '100%'}}
              />
            </View>
            <TextInputWithTitle
              marginTop={moderateScale(10, 0.6)}
              // title={'Title'}
              secureText={false}
              placeholder={'Write message here'}
              setText={setMsg}
              value={msg}
              viewHeight={0.1}
              viewWidth={0.7}
              inputWidth={0.65}
              backgroundColor={'white'}
              border={1}
              borderColor={Color.veryLightGray}
              // marginTop={moderateScale(10, 0.3)}
              // borderColor={'#FFFFFF'}

              color={themeColor[1]}
              placeholderColor={Color.themeLightGray}
              borderRadius={moderateScale(10, 0.3)}
            />
          </View>

          <CustomButton
            text={'Send'}
            onPress={() => {
              setIsVisible(false);
              Platform.OS == 'android'
                ? ToastAndroid.show('Message request sent', ToastAndroid.SHORT)
                : Alert.alert('Message request sent');
            }}
            textColor={Color.white}
            width={windowWidth * 0.7}
            height={windowHeight * 0.06}
            marginTop={moderateScale(20, 0.3)}
            bgColor={Color.themeBgColor}
            borderRadius={moderateScale(25, 0.3)}
            elevation
            isGradient
            multiline
            fontSize={moderateScale(14, 0.6)}
          />
        </View>
      </Modal>
    </>
  );
};
export default BubbleCard;

const styles = StyleSheet.create({
  profileSection: {
    height: windowWidth * 0.2,
    width: windowWidth * 0.2,
    backgroundColor: '#fff',
    borderRadius: (windowWidth * 0.2) / 2,
    borderWidth: 3,
    borderColor: '#33dd50',
    overflow: 'hidden',
    // marginBottom : moderateScale(20,0.3)
  },

  row: {
    width: windowWidth,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    // marginBottom: moderateScale(5, 0.3),
    paddingHorizontal: moderateScale(20, 0.6),
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
  },

  container: {
    width: windowWidth * 0.85,
    paddingBottom: moderateScale(20, 0.6),
    backgroundColor: Color.white,
    borderRadius: moderateScale(10, 0.6),
    overflow: 'hidden',
  },
  circle: {
    width: moderateScale(70, 0.6),
    height: moderateScale(70, 0.6),
    // borderRadius: moderateScale(30, 0.6),
    justifyContent: 'center',
    overflow: 'hidden',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 4,
    // },
    // shadowOpacity: 0.32,
    // shadowRadius: 5.46,

    // elevation: 9,
  },
});
