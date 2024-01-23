import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
  Platform,
  ToastAndroid,
  Alert,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
const {height, width} = Dimensions.get('window');
import {moderateScale} from 'react-native-size-matters';
import CustomStatusBar from '../Components/CustomStatusBar';
import Header from '../Components/Header';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from '../Components/CustomText';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import DropDownSingleSelect from '../Components/DropDownSingleSelect';
import {Icon} from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import LinearGradient from 'react-native-linear-gradient';
import CustomSwitch from '../Components/CustomSwitch';
import CustomButton from '../Components/CustomButton';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import ImagePickerModal from '../Components/ImagePickerModal';
import navigationService from '../navigationService';
import {ScaledSheet} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import {setBubbleCreated} from '../Store/slices/auth';
import {Get, Post} from '../Axios/AxiosInterceptorFunction';
import CustomDropDownMultiSelect from '../Components/CustomDropDownMultiSelect';
import {useNavigation} from '@react-navigation/native';

const CreateNewBubble = props => {
  const item = props?.route?.params?.item;
  const token = useSelector(state => state.authReducer.token);
  console.log('🚀 ~ CreateNewBubble ~ token:', token);
  const userData = useSelector(state => state.commonReducer.userData);
  // console.log("🚀 ~ file: CreateNewBubble.js:47 ~ CreateNewBubble ~ userData:", userData)

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const themeColor = useSelector(state => state.authReducer.ThemeColor);
  const privacy = useSelector(state => state.authReducer.privacy);
  const profileData = useSelector(state => state.commonReducer.selectedProfile);
  //  console.log("🚀 ~ file: CreateNewBubble.js:55 ~ CreateNewBubble ~ profileData:", profileData)
  const [CreateBubble, setCreateBubble] = useState('');
  const [Admin, setAdmin] = useState(
    userData?.first_name ? userData?.first_name : '',
  );
  const [bubbleTitle, setBubbleTitle] = useState(item?.name ? item?.name : '');
  const [moderator, setModerator] = useState(
    item?.moderator ? item?.moderator : '',
  );
  const [interests, setInterests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [profilePicture, setProfilePicture] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [adminCanCreateContent, setadminCanCreateContent] = useState('Yes');
  // console.log("🚀 ~ CreateNewBubble ~ adminCanCreateContent:", adminCanCreateContent)
  const [openToAll, setOpenToAll] = useState('Yes');
  const [memberCreateContent, setmemberCreateContent] = useState('Yes');
  const [bubbleTeamCanCreateContent, setbubbleTeamCanCreateContent] =
    useState('Yes');
  const [allCanSendInvite, setAllCanSendInvite] = useState('Yes');
  const [text, setText] = useState('');
  const [displayText, setDisplayText] = useState([]);

  const [architectureValue, setArchitectureValue] = useState([]);
  console.log(
    '🚀 ~ file: CreateNewBubble.js:136 ~ CreateNewBubble ~ architectureValue:',
    architectureValue,
  );
  const [switchValue, setSwitchValue] = useState('Private');
  const ApprovalForAdmittance = ['yes', 'No'];
  const [ApprovalForAdmittanceValue, SetApprovalForAdmittance] = useState('');

  const ApprovaltoPost = ['yes', 'No'];
  const [ApprovalToPostValue, setApprovalToPostValue] = useState('');

  const MembershipCost = ['yes', 'No'];
  const [MembershipCostValue, setMembershipCost] = useState('');

  const createBubble = async () => {
    const url = 'auth/community';
    const body = {
      title: bubbleTitle,
      profile_id: profileData?.id,
      approval_post: ApprovalToPostValue,
      membership_cost: MembershipCostValue,
      admin_create_content: adminCanCreateContent,
      moderator_create_content: bubbleTeamCanCreateContent,
      member_create_content: memberCreateContent,
      privacy: ApprovalForAdmittanceValue,
      // approval_admittance: ApprovalForAdmittanceValue,
      // post_privacy: adminCanCreateContent,
      // remove_content: bubbleTeamCanCreateContent,
      // remove_comments: memberCreateContent,
      // invite_members: allCanSendInvite,
    };
    // return console.log("🚀 ~ file: CreateNewBubble.js:197 ~ createBubble ~ body:", body)
    const formData = new FormData();
    for (let key in body) {
      if (body[key] == '') {
        return Platform.OS == 'android'
          ? ToastAndroid.show(`${key} is required`, ToastAndroid.SHORT)
          : Alert.alert(`${key} is required`);
      } else {
        formData.append(key, body[key]);
      }
    }

    if (Object.keys(profilePicture).length > 0) {
      formData.append('image', profilePicture);
    } else {
      return Platform.OS == 'android'
        ? ToastAndroid.show(`image is empty`, ToastAndroid.SHORT)
        : Alert.alert(`image is empty`);
    }
    if (architectureValue?.length > 0) {
      architectureValue.map((item, index) =>
        formData.append(`keywords[${index}]`, item),
      );
      console.log(
        '🚀 ~ file: CreateNewBubble.js:216 ~ createBubble ~ architectureValue:',
        architectureValue,
      );
    } else {
      return Platform.OS == 'android'
        ? ToastAndroid.show(`Please select interest`, ToastAndroid.SHORT)
        : Alert.alert(`Please select interest`);
    }

    setIsLoading(true);
    const response = await Post(url, formData, apiHeader(token));
    setIsLoading(false);

    if (response != undefined) {
      dispatch(setBubbleCreated(true));
      Platform.OS == 'android'
        ? ToastAndroid.show('Bubble created Successfully', ToastAndroid.SHORT)
        : Alert.alert('Bubble created Successfully');
      // return  console.log('response ==== >' , response?.data)
      navigation.goBack();
    }
  };

  const getInterest = async () => {
    const url = `auth/interest_list`;
    setIsLoading(true);
    const response = await Get(url, token);
    setIsLoading(false);
    if (response != undefined) {
      setInterests(response?.data?.post_info);
    }
  };

  useEffect(() => {
    getInterest();
  }, []);

  useEffect(() => {
    if (Object.keys(profilePicture).length > 0) {
    }
  }, [profilePicture]);

  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />
      <Header right Title={'Create new Bubble'} menu={true} />
      <ScrollView>
        <ImageBackground
          source={
            privacy == 'private'
              ? require('../Assets/Images/theme2.jpg')
              : require('../Assets/Images/Main.png')
          }
          resizeMode={'cover'}
          style={styles.bgimage}>
          <ScrollView nestedScrollEnabled>
            <View style={styles.topContainer}>
              <View>
                <TextInputWithTitle
                  placeholder={'Enter Bubble Title'}
                  setText={setBubbleTitle}
                  value={bubbleTitle}
                  marginTop={moderateScale(5, 0.3)}
                  viewHeight={0.04}
                  viewWidth={0.58}
                  inputHeight={0.05}
                  inputWidth={0.58}
                  color={Color.black}
                  placeholderColor={'#000000'}
                  isBold
                  borderBottomWidth={1}
                  // backgroundColor={'red'}
                />
                <View
                  style={{
                    marginTop: moderateScale(5, 0.6),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: windowWidth * 0.56,
                    borderBottomWidth: 1,
                    marginLeft: moderateScale(5, 0.3),
                    // backgroundColor:'red',
                    //  paddingHorizontal:moderateScale(10,.6)
                  }}>
                  <TextInput
                    style={{
                      width: windowWidth * 0.45,
                      // backgroundColor: Color.white,
                      borderRadius: moderateScale(5, 0.6),
                      paddingHorizontal: moderateScale(10, 0.6),
                    }}
                    placeholder="More Keywords"
                    value={text}
                    onChangeText={item => setText(item)}
                    placeholderTextColor={'#000000'}
                  />

                  {text.length > 0 && (
                    <CustomButton
                      onPress={() => {
                        setArchitectureValue(prev => [...prev, text]);
                        // setArchitectureValues(text)
                        setText('');
                      }}
                      // style={{

                      //   position:'absolute',
                      //   right:0,
                      // }}
                      text={'Add'}
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
                </View>

                <View style={styles.mapview}>
                  {architectureValue.map((item, index) => {
                    return (
                      <View
                        style={
                          {
                            // paddingHorizontal: 2,
                            // width : 100,
                          }
                        }>
                        <CustomText
                          style={[
                            styles.mapText,
                            {
                              backgroundColor: Color.white,
                              color: '#000000',
                            },
                          ]}>
                          {item}
                        </CustomText>

                        <Icon
                          name={'close'}
                          as={FontAwesome}
                          color={'red'}
                          size={moderateScale(13, 0.6)}
                          style={{
                            position: 'absolute',
                            right: 2,
                            // zIndex : 1,
                          }}
                          onPress={() => {
                            let temp = [...architectureValue];
                            temp.splice(index, 1);
                            setArchitectureValue(temp);
                          }}
                        />
                      </View>
                    );
                  })}
                </View>
                {/* <View>
                  <CustomText
                    style={{
                      color: Color.Grey,
                      fontSize: moderateScale(14, 0.6),
                      marginTop: moderateScale(20, 0.3),
                      paddingHorizontal: moderateScale(30, 0.6),
                      textAlign: 'center',
                    }}
                    isBold>
                    {text}
                  </CustomText>
                </View> */}
                {/* <CustomDropDownMultiSelect
                  title={'select category'}
                  array={interests}
                  item={architectureValue}
                  setItem={setArchitectureValue}
                  maxHeight={windowHeight * 0.13}
                  marginTop={moderateScale(8, 0.3)}
                  containerStyle={{
                    width: windowWidth * 0.55,
                    height: windowHeight * 0.05,
                  }}
                /> */}
              </View>

              <TouchableOpacity
                onPress={() => {
                  setShowModal(true);
                }}
                style={[
                  {
                    height: windowHeight * 0.27,
                    width: width * 0.35,
                    backgroundColor: 'white',
                    borderRadius: moderateScale(20, 0.6),
                    // marginLeft: moderateScale(25, 0.3),
                    justifyContent: 'center',
                    overflow: 'hidden',
                  },
                  Object.keys(profilePicture).length == 0 && {
                    alignItems: 'center',
                  },
                ]}>
                {item?.image || Object.keys(profilePicture).length > 0 ? (
                  <CustomImage
                    source={
                      item?.image ? item?.image : {uri: profilePicture?.uri}
                    }
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                    onPress={() => {
                      setShowModal(true);
                    }}
                  />
                ) : (
                  <Icon
                    name={'camera'}
                    as={Entypo}
                    size={moderateScale(45, 0.6)}
                    onPress={() => {
                      setShowModal(true);
                    }}
                  />
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.line}></View>

            <View style={styles.view}>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  height: windowHeight * 0.045,
                  width: windowWidth * 0.9,
                  marginBottom: moderateScale(-5, 0.3),
                  marginLeft: moderateScale(0.1, 0.3),
                  color: Color.black,
                  marginTop: moderateScale(5, 0.3),
                  placeholderColor: Color.veryLightGray,
                  borderRadius: moderateScale(20, 0.3),
                  backgroundColor: Color.white,
                  alignItems: 'center',
                  paddingHorizontal: moderateScale(20, 0.3),
                }}>
                <TextInput
                  // style={{
                  //   height:windowHeight*0.045,
                  //   width:windowWidth*0.9,
                  //   marginBottom:moderateScale(-5, 0.3),
                  //   marginLeft:moderateScale(0.1, 0.3),
                  //   color:Color.black,
                  //   marginTop:moderateScale(5, 0.3),
                  //   placeholderColor:Color.veryLightGray,
                  //   borderRadius:moderateScale(20, 0.3),
                  //   // backgroundColor:Color.white,
                  //   backgroundColor:'red',
                  //   justifyContent:'center',
                  //   paddingHorizontal:moderateScale(20,0.3)
                  // }}
                  style={{
                    color: Color.black,
                  }}
                  // placeholder={Admin}
                  disable={true}
                  value={Admin}
                />
                {/* 
                <TextInputWithTitle
                  disable={true}
                  placeholder={'Admin'}
                  setText={setAdmin}
                  value={Admin}
                  viewHeight={0.045}
                  viewWidth={0.9}
                  inputWidth={0.9}
                  inputHeight={0.05}
                  marginBottom={moderateScale(-5, 0.3)}
                  marginLeft={moderateScale(0.1, 0.3)}
                  color={Color.black}
                  marginTop={moderateScale(5, 0.3)}
                  placeholderColor={Color.veryLightGray}
                  borderRadius={moderateScale(20, 0.3)}
                  backgroundColor={Color.white}
                  // placeholder={'owner'}
                /> */}
                <CustomText
                  style={{
                    color: Color.themeColor1,
                    fontSize: moderateScale(12, 0.6),
                    // marginTop: moderateScale(20, 0.3),
                    paddingHorizontal: moderateScale(30, 0.6),
                    // textAlign: 'center',
                    // position:'absolute',
                    // right:0,
                    paddingVertical: moderateScale(6, 0.3),
                  }}
                  isBold>
                  {/* {profileData?.community_list?.role} */}
                  owner
                </CustomText>
              </View>

              <DropDownSingleSelect
                array={ApprovalForAdmittance}
                item={ApprovalForAdmittanceValue}
                setItem={SetApprovalForAdmittance}
                width={windowWidth * 0.9}
                placeholder={'Ápproval for Admittance'}
                dropdownStyle={{
                  borderBottomWidth: 0,
                  width: windowWidth * 0.9,
                  marginTop: 10,
                }}
                btnStyle={{
                  backgroundColor: '#fff',
                  height: windowHeight * 0.045,
                }}
              />

              <DropDownSingleSelect
                array={ApprovaltoPost}
                item={ApprovalToPostValue}
                setItem={setApprovalToPostValue}
                width={windowWidth * 0.9}
                placeholder={'Approval To Post'}
                dropdownStyle={{
                  borderBottomWidth: 0,
                  width: windowWidth * 0.9,
                }}
                btnStyle={{
                  backgroundColor: '#fff',
                  height: windowHeight * 0.045,
                }}
              />

              <DropDownSingleSelect
                array={MembershipCost}
                item={MembershipCostValue}
                setItem={setMembershipCost}
                width={windowWidth * 0.9}
                placeholder={'Membership Cost'}
                dropdownStyle={{
                  borderBottomWidth: 0,
                  width: windowWidth * 0.9,
                }}
                btnStyle={{
                  backgroundColor: '#fff',
                  height: windowHeight * 0.045,
                }}
              />
            </View>

            <View style={styles.line}></View>

            <View
              style={{
                marginTop: moderateScale(10, 0.3),
                marginBottom: moderateScale(20, 0.3),
              }}>
              <CustomText isBold style={styles.ct}>
                Team Role | Perms
              </CustomText>
              {/* every one can post or not  */}
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
              {/* <SwitchComponent
                text1={'Joining is open to everyone'}
                text2={'(N) Only bubble team can accept request'}
                value={openToAll}
                setValue={setOpenToAll}
              /> */}
              {/* <SwitchComponent
                text1={'Entire bubble can invite new members'}
                text2={'(N) Only bubble team can send invites'}
                value={allCanSendInvite}
                setValue={setAllCanSendInvite}
              />
               */}
            </View>
            <View style={styles.btnView}>
              <CustomButton
                text={'cancel'}
                textColor={themeColor[1]}
                width={windowWidth * 0.4}
                height={windowHeight * 0.06}
                bgColor={['#FFFFFF', '#FFFFFF']}
                borderRadius={moderateScale(30, 0.3)}
                isGradient
                isBold={true}
                marginBottom={moderateScale(50)}
                onPress={() => {
                  navigation.goBack();
                  dispatch(setBubbleCreated(true));
                }}
              />

              <CustomButton
                text={
                  isLoading ? (
                    <ActivityIndicator color={themeColor[1]} size={'small'} />
                  ) : (
                    'Next'
                  )
                }
                textColor={themeColor[1]}
                width={windowWidth * 0.4}
                height={windowHeight * 0.06}
                // marginTop={moderateScale(10, 0.3)}
                bgColor={['#FFFFFF', '#FFFFFF']}
                borderRadius={moderateScale(30, 0.3)}
                isGradient
                isBold={true}
                marginBottom={moderateScale(50)}
                onPress={() => {
                  createBubble();
                }}
              />
            </View>
          </ScrollView>
        </ImageBackground>
      </ScrollView>
      <ImagePickerModal
        show={showModal}
        setShow={setShowModal}
        setFileObject={setProfilePicture}
      />
    </>
  );
};

export default CreateNewBubble;
const styles = ScaledSheet.create({
  topContainer: {
    paddingHorizontal: moderateScale(10, 0.6),
    // height: windowHeight * 0.3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: moderateScale(15, 0.3),
    // backgroundColor:'red'
  },
  mapText: {
    color: Color.Grey,
    fontSize: moderateScale(13, 0.6),
    marginHorizontal: moderateScale(5, 0.3),
    marginVertical: moderateScale(5, 0.3),
    padding: moderateScale(5, 0.6),
    borderRadius: moderateScale(10, 0.6),
  },
  bgimage: {
    width: windowWidth,
    height: windowHeight * 0.9,
  },
  switchContainer: {
    height: windowHeight * 0.08,
    width: windowWidth * 0.8,
    marginTop: moderateScale(10, 0.3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },
  crownIcon: {
    height: windowWidth * 0.12,
    width: windowWidth * 0.12,
    borderWidth: 1,

    borderRadius: (windowWidth * 0.12) / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    width: '90%',
    height: 2,
    backgroundColor: '#a0e8eb',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: moderateScale(15, 0.3),
  },
  ct: {
    width: windowWidth,
    paddingHorizontal: moderateScale(10, 0.6),
    fontSize: moderateScale(15, 0.6),
    marginTop: moderateScale(10, 0.6),
  },
  image: {
    height: height * 0.04,
    width: windowWidth * 0.3,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnView: {
    flexDirection: 'row',
    // backgroundColor: 'red',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(30, 0.6),
  },
  view: {
    height: windowHeight * 0.27,
    width: windowWidth * 0.9,
    alignSelf: 'center',
    marginTop: moderateScale(18, 0.3),
    alignItems: 'center',
    // backgroundColor:'green'
  },
  Row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: windowHeight * 0.045,
    width: windowWidth * 0.9,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginTop: moderateScale(10, 0.3),
  },
  mapview: {
    // backgroundColor:'red',
    width: windowWidth * 0.55,
    flexDirection: 'row',
    flexWrap: 'wrap',
    // paddingHorizontal: moderateScale(10, 0.6),
    paddingVertical: moderateScale(5, 0.6),
  },
});

const SwitchComponent = ({text1, text2, setValue, value}) => {
  console.log('🚀 ~ SwitchComponent ~ value:', value);
  // const onSelectSwitch = index => {
  //   if (index == 1) {
  //     setValue('Yes');
  //   } else if (index == 2) {
  //     setValue('No');
  //   }
  // };
  return (
    <View style={{flexDirection: 'row'}}>
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
