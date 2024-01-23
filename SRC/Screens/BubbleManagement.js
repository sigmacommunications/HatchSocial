import React, {useState} from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  View,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  Alert,
  Platform,
} from 'react-native';
import Color from '../Assets/Utilities/Color';
import CustomStatusBar from '../Components/CustomStatusBar';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import CustomImage from '../Components/CustomImage';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import CustomText from '../Components/CustomText';
import Header from '../Components/Header';
import DropDownSingleSelect from '../Components/DropDownSingleSelect';
import {useSelector} from 'react-redux';
import CustomButton from '../Components/CustomButton';
import navigationService from '../navigationService';
import ImagePickerModal from '../Components/ImagePickerModal';
import {Icon} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ToggleComponent from '../Components/ToggleComponent';
import CustomSwitch from '../Components/CustomSwitch';
import { useNavigation } from '@react-navigation/native';
import { Post } from '../Axios/AxiosInterceptorFunction';

const BubbleManagement = (props) => {
  const bubbleInfo = props?.route?.params?.bubbleInfo;
  console.log("🚀 ~ BubbleManagement ~ bubInfo:", bubbleInfo)
  const navigation = useNavigation()
  const themeColor = useSelector(state => state.authReducer.ThemeColor);
  const  token = useSelector(state => state.authReducer. token);
  const privacy = useSelector(state => state.authReducer.privacy);

  const [isLoading , setIsLoading] = useState(false)
  const [adminCanCreateContent, setadminCanCreateContent] = useState(bubbleInfo?.admin_create_content);
  const [openToAll, setOpenToAll] = useState(bubbleInfo?.privacy);
  const [memberCreateContent, setmemberCreateContent] = useState(bubbleInfo?.member_create_content);
  const [bubbleTeamCanCreateContent, setbubbleTeamCanCreateContent] = useState(bubbleInfo?.moderator_create_content);
  
  const UpdateBubble = async () => {
    const url = `auth/community_update/${bubbleInfo?.id}`;
    const body = {
      title: bubbleInfo?.title,
      profile_id: bubbleInfo?.follow?.profile_id,
      approval_post: bubbleInfo?.approval_post,
      membership_cost: bubbleInfo?.membership_cost,
      admin_create_content : adminCanCreateContent,
      moderator_create_content : bubbleTeamCanCreateContent ,
      member_create_content : memberCreateContent ,
      privacy: openToAll,
     };
    //  for (let key in body) {
    //    if (body[key] == '') {
    //      return Platform.OS == 'android'
    //      ? ToastAndroid.show(`${key} is required`, ToastAndroid.SHORT)
    //      : Alert.alert(`${key} is required`);
    //     }
        
    //   }
      
      // return console.log("🚀 ~ createBubble ~ body:", body)
   
    
  

    setIsLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setIsLoading(false);

    if (response != undefined) {
      Platform.OS == 'android'
        ? ToastAndroid.show('Bubble Updated Successfully', ToastAndroid.SHORT)
        : Alert.alert('Bubble Updated Successfully');
    // return  console.log('response ==== >' , response?.data)
      navigation.goBack();
    }
  };




  
  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />
      <Header Title={'Bubble Management'} showBack />
      <ScrollView>
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
          <CustomText
            isBold
            style={{
              width: windowWidth,
              paddingHorizontal: moderateScale(10, 0.6),
              fontSize: moderateScale(15, 0.6),
              marginTop: moderateScale(20, 0.6),
            }}>
            Bubble Management
          </CustomText>

          <View
            style={{
              width: windowWidth,
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: moderateScale(10, 0.6),
              alignItems: 'center',
            }}>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  width: windowWidth * 0.75,
                  marginTop: moderateScale(10, 0.3),
                  alignItems: 'center',
                }}>
                <CustomText
                  style={{
                    fontSize: moderateScale(14, 0.6),
                    color: Color.themeLightGray,
                  }}>
                  Owner :
                </CustomText>
                <CustomText
                  style={{
                    fontSize: moderateScale(13, 0.6),
                    color: Color.black,
                  }}>
                  {''} Default to Bubble Creator
                </CustomText>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  width: windowWidth * 0.75,
                  marginTop: moderateScale(10, 0.3),
                  alignItems: 'center',
                }}>
                <CustomText
                  style={{
                    fontSize: moderateScale(14, 0.6),
                    color: Color.black,
                  }}>
                  Moderator :
                </CustomText>
                <CustomText
                  style={{
                    fontSize: moderateScale(13, 0.6),
                    color: Color.themeLightGray,
                  }}>
                  {''} Bubble Team
                </CustomText>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  width: windowWidth * 0.75,
                  marginTop: moderateScale(10, 0.3),
                  alignItems: 'center',
                }}>
                <CustomText
                  style={{
                    fontSize: moderateScale(14, 0.6),
                    color: Color.black,
                  }}>
                  Admin :
                </CustomText>
                <CustomText
                  style={{
                    fontSize: moderateScale(13, 0.6),
                    color: Color.themeLightGray,
                  }}>
                  {''} Bubble Admin
                </CustomText>
              </View>
            </View>

            <View>
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  width: windowWidth * 0.05,
                  height: windowHeight * 0.03,
                  backgroundColor: Color.white,
                  justifyContent: 'center',
                  marginTop: moderateScale(10, 0.3),
                  alignItems: 'center',
                  borderRadius: moderateScale(3, 0.3),
                  shadowColor: '#000000',
                  shadowOffset: {
                    width: 0,
                    height: 5,
                  },
                  shadowOpacity: 0.2,
                  shadowRadius: 5.62,
                  elevation: 7,
                }}>
                <Icon
                  name={'right'}
                  as={AntDesign}
                  size={moderateScale(12, 0.6)}
                  color={'#000'}
                />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  width: windowWidth * 0.05,
                  height: windowHeight * 0.03,
                  backgroundColor: Color.white,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: moderateScale(3, 0.3),
                  marginTop: moderateScale(5, 0.3),
                  shadowColor: '#000000',
                  shadowOffset: {
                    width: 0,
                    height: 5,
                  },
                  shadowOpacity: 0.2,
                  shadowRadius: 5.62,
                  elevation: 7,
                }}>
                <Icon
                  name={'right'}
                  as={AntDesign}
                  size={moderateScale(12, 0.6)}
                  color={'#000'}
                />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  width: windowWidth * 0.05,
                  height: windowHeight * 0.03,
                  backgroundColor: Color.white,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: moderateScale(3, 0.3),
                  marginTop: moderateScale(5, 0.3),
                  shadowColor: '#000000',
                  shadowOffset: {
                    width: 0,
                    height: 5,
                  },
                  shadowOpacity: 0.2,
                  shadowRadius: 5.62,
                  elevation: 7,
                }}>
                <Icon
                  name={'right'}
                  as={AntDesign}
                  size={moderateScale(12, 0.6)}
                  color={'#000'}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              marginTop: moderateScale(40, 0.3),
            }}>
            <CustomText
              isBold
              style={{
                width: windowWidth,
                paddingHorizontal: moderateScale(10, 0.6),
                fontSize: moderateScale(15, 0.6),
                marginTop: moderateScale(10, 0.6),
              }}>
              Team Role | Perms
            </CustomText>
           
             <SwitchComponent
                text1={'Admin can create content / post'}
                text2={'(N) Admin can not post'}
                value={adminCanCreateContent}
                setValue={setadminCanCreateContent}
              />
              {/* bubble member can post or not */}

              <SwitchComponent
                text1={'Member can create content / post'}
                text2={'Member can not create content / post'}
                value={memberCreateContent}
                setValue={setmemberCreateContent}
              />
              {/* bubble team / moderator can post or not */}

              <SwitchComponent
                text1={'Bubble team can create content'}
                text2={'bubble team can not create content'}
                value={bubbleTeamCanCreateContent}
                setValue={setbubbleTeamCanCreateContent}
              />
               <SwitchComponent
                text1={'Make bubble private'}
                text2={'Make bubble public'}
                value={openToAll}
                setValue={setOpenToAll}
              />
          </View>

          <TouchableOpacity
            onPress={() => {
              UpdateBubble()
            }}
            activeOpacity={0.7}
            style={{
              width: windowWidth * 0.3,
              height: windowHeight * 0.05,
              backgroundColor: Color.white,
              borderRadius: moderateScale(5, 0.3),
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: moderateScale(20, 0.3),
              alignItems: 'center',
              shadowColor: '#000000',
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.18,
              shadowRadius: 4.59,
              elevation: 5,
            }}>
            <Icon
              name={'zip-disk'}
              as={MaterialCommunityIcons}
              size={moderateScale(25, 0.6)}
              color={Color.black}
              style={{
                width : 30,

              }}
            />

            <CustomText
            // isBold
              style={{fontSize: moderateScale(15, 0.3), color: Color.black}}>
              Save
            </CustomText>
          </TouchableOpacity>

        
        </ImageBackground>
      </ScrollView>
    </>
  );
  
};

export default BubbleManagement;


const SwitchComponent = ({ text1, text2, setValue, value }) => {
  console.log("🚀 ~ SwitchComponent ~ value:", value)
  // const onSelectSwitch = index => {
  //   if (index == 1) {
  //     setValue('Yes');
  //   } else if (index == 2) {
  //     setValue('No');
  //   }
  // };
  return (
    <View style={{ flexDirection: 'row' }}>
      <View
        style={{
          width: windowWidth * 0.7,
          paddingVertical: moderateScale(8, 0.6),
          paddingHorizontal: moderateScale(10, 0.6),
        }}>
        <CustomText
          style={{
            fontSize: moderateScale(13, 0.6),
            color: Color.veryLightGray,
          }}>
          {text1}
        </CustomText>
        <CustomText
          style={{
            fontSize: moderateScale(11, 0.6),
            color: Color.black,
          }}>
          {text2}
        </CustomText>
      </View>
      <View
        style={{
          width: windowWidth * 0.3,
          alignItems: 'flex-end',
          justifyContent: 'center',
          paddingHorizontal: moderateScale(10, 0.6),
        }}>
        <CustomSwitch
          // selectionMode={1}
          roundCorner={true}
          option1={'Yes'}
          option2={'No'}
          value={value.toLowerCase() == 'no' ? 2 : 1}
          setValue={setValue}
          // onSelectSwitch={onSelectSwitch}
          selectionColor={'#11d40d'}
        />
      </View>
    </View>
  );
};