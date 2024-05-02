import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Platform,
  ToastAndroid,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {moderateScale} from 'react-native-size-matters';
// const {height, width} = Dimensions.get('window');
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomStatusBar from '../Components/CustomStatusBar';
import Header from '../Components/Header';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../Components/CustomButton';
import Color from '../Assets/Utilities/Color';
import navigationService from '../navigationService';
import {useDispatch, useSelector} from 'react-redux';
import {
  setAccountPrivate,
  setBubbleSelected,
  setFeedsSelected,
  setInterestSelected,
  setNumOfProfiles,
  setProfileSelcted,
  setQuestionAnswered,
  setUserToken,
} from '../Store/slices/auth';
import Modal from 'react-native-modal';
import DropDownSingleSelect from '../Components/DropDownSingleSelect';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Icon} from 'native-base';
import ImagePickerModal from '../Components/ImagePickerModal';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {setSelectedProfileData} from '../Store/slices/common';
import {baseUrl, profilePicUrl} from '../Config';
import ResetProfilePassword from '../Components/ResetProfilePassword';
import {useNavigation} from '@react-navigation/native';

const Profile = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const fromCreateNewProfile =props?.route?.params?.fromCreateNewProfile
  console.log("🚀 ~ Profile ~ fromCreateNewProfile:", fromCreateNewProfile)
  const item = props?.route?.params?.item;
  const category = props?.route?.params?.category;
  const subscriptionPlan = props?.route?.params?.subscriptionPlan;
  console.log("🚀 ~ Profile ~ subscriptionPlan:", subscriptionPlan)
  const isEdit = props?.route?.params?.isEdit;
  const token = useSelector(state => state.authReducer.token);
  const profileData = useSelector(state => state.commonReducer.selectedProfile);
  const themeColor = useSelector(state => state.authReducer.ThemeColor);
  const privacy = useSelector(state => state.authReducer.privacy);
  console.log('🚀 ~ Profile ~ privacy:', privacy);
  const [username, setUserName] = useState(
    isEdit == true && profileData?.name ? profileData?.name : '',
  );
  const [desc, setDesc] = useState(
    isEdit == true && profileData?.description ? profileData?.description : '',
  );
  const [selectedTab, setSelectedTab] = useState(privacy);
  const [isLoading, setIsLoading] = useState(false);
  const [passCode, setPassCode] = useState(isEdit ? profileData?.passcode : '');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [imagePickerModal, setImagePickerModal] = useState(false);
  // const [type, setType] = useState(
  //   profileData?.type
  //     ? profileData?.type
  //     : category 
  //     ? category
  //     : 'Select Profile Type',
  // );
  
  const [type, setType] = useState(
    
  profileData?.type
      ? profileData?.type 
      : subscriptionPlan === 'Basic' ? "Learning & Exploring"
      : 'Select Profile Type',
  );
  const [image, setImage] = useState({});
  console.log('🚀 ~ Profile ~ image:', image, profileData?.photo);

  const createProfile = async () => {
    const url = 'auth/profile';
    const body = {
      name: username,
      type: type,

      privacy: selectedTab,
    };

    const formData = new FormData();

    if (Object.keys(desc).length > 0) {
      formData.append('description', desc);
    }
    if (Object.keys(image).length > 0) {
      formData.append('photo', image);
    } else {
      return Platform.OS == 'android'
        ? ToastAndroid.show(`Uplaod profile photo`, ToastAndroid.SHORT)
        : Alert.alert(`Uplaod profile photo`);
    }

    for (let key in body) {
      console.log('🚀 ~ createProfile ~ key:', key);

      if (body[key] == '' && key !== 'description') {
        return Platform.OS == 'android'
          ? ToastAndroid.show(`${key} cannot be empty`, ToastAndroid.SHORT)
          : Alert.alert(`${key} cannot be empty`);
      }
      formData.append(key, body[key]);
    }
    if (type == 'Select Profile Type') {
      return Platform.OS == 'android'
        ? ToastAndroid.show(`Select Profile Type`, ToastAndroid.SHORT)
        : Alert.alert(`Select Profile Type`);
    }
    if (desc && desc.length < 30) {
      return Platform.OS == 'android'
        ? ToastAndroid.show(`Description is too short`, ToastAndroid.SHORT)
        : Alert.alert(`Description is too short`);
    }

    if (privacy == 'private' && passCode == '') {
      return Platform.OS == 'android'
        ? ToastAndroid.show(`passcode is required`, ToastAndroid.SHORT)
        : Alert.alert(`passcode is required`);
    } else if (privacy == 'private' && passCode != '') {
      formData.append('passcode', passCode);
    }

    setIsLoading(true);
    const response = await Post(url, formData, apiHeader(token));
    //  return console.log("🚀 ~ createProfile ~ response:", response.data)
    setIsLoading(false);

    if (response?.data?.success) {
      console.log(
        '🚀 ~ file: Profile.js:104 ~ createProfile ~ response:',
        JSON.stringify(response?.data, null, 2),
      );
      dispatch(
        setQuestionAnswered(
          response?.data?.profile_info?.qa_status == 0 ? false : true,
        ),
      );
      dispatch(setProfileSelcted(true));
      dispatch(setSelectedProfileData(response?.data?.profile_info));
      dispatch(
        setNumOfProfiles(
          response?.data?.profile_info?.user_infos?.total_profile,
        ),
      );
      dispatch(setBubbleSelected(false));
      dispatch(setInterestSelected(false));
    }
  };

  const updateProfile = async () => {
    const url = `auth/profile/${profileData?.id}?_method=PUT`;
    const body = {
      name: username,
      // description: desc,
      privacy: selectedTab,
    };

    const formData = new FormData();
    if (Object.keys(desc).length > 0) {
      formData.append('description', desc);
    }

    if (Object.keys(image).length > 0) {
      formData.append('photo', image);
    }
    for (let key in body) {
      if (body[key] == '') {
        return Platform.OS == 'android'
          ? ToastAndroid.show(`${key} cannot be empty`, ToastAndroid.SHORT)
          : Alert.alert(`${key} cannot be empty`);
      }
      formData.append(key, body[key]);
    }

    //decription validation
    // if (desc.length < 30) {
    //   return Platform.OS == 'android'
    //     ? ToastAndroid.show(`Description is too short`, ToastAndroid.SHORT)
    //     : Alert.alert(`Description is too short`);
    // }

    //private and passcode validation
    if (privacy == 'private' && passCode == '') {
      return Platform.OS == 'android'
        ? ToastAndroid.show(`passcode is required`, ToastAndroid.SHORT)
        : Alert.alert(`passcode is required`);
    } else if (privacy == 'private' && passCode != '') {
      formData.append('passcode', passCode);
    }

    setIsLoading(true);
    const response = await Post(url, formData, apiHeader(token));
    setIsLoading(false);

    if (response?.data?.success) {
      console.log(
        '🚀 ~ file: Profile.js:104 ~ createProfile ~ response:',
        JSON.stringify(response?.data?.profile_info, null, 2),
      );

      dispatch(setSelectedProfileData(response?.data?.profile_info));
      navigation.goBack();
    }
  };

  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />
      <Header
        Title={isEdit ? 'Update Profile' : 'Create Profile'}
        showBack={true}
      />

      <ImageBackground
        source={
          privacy == 'private'
            ? require('../Assets/Images/theme2.jpg')
            : require('../Assets/Images/Main.png')
        }
        resizeMode={'cover'}
        style={{
          width: windowWidth * 1,
        }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: 'center',
            paddingBottom: moderateScale(80, 0.6),
          }}>
          <View>
            <View
              style={[
                styles.profileSection,
                {
                  borderColor:
                  type == 'Content Creator'
                  ? Color.neonGreen
                  : type == 'Business & Entrepreneurship'
                  ? Color.green
                  : type == 'Community & Connection'
                  ? 'pink'
                  : type == 'Learning & Exploring'
                  ? 'purple'
                  : 'black',
                },
              ]}>
              <CustomImage
                source={
                  Object.keys(image).length > 0 
                    ? {uri: image?.uri}
                    : (profileData?.photo && isEdit)
                    ? {uri: `${baseUrl}/${profileData?.photo}`}
                    : require('../Assets/Images/dummyman1.png')
                }
                style={{
                  height: '100%',
                  width: '100%',
                }}
                resizeMode={'cover'}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                setImagePickerModal(true);
              }}
              style={styles.Editbtn}>
              <Icon
                name={'pencil'}
                as={FontAwesome}
                color={'black'}
                size={6}
                onPress={() => {
                  setImagePickerModal(true);
                }}
              />
            </TouchableOpacity>
          </View>

          <LinearGradient
            style={{
              width: windowWidth * 0.9,

              marginTop: moderateScale(30, 0.3),
              borderRadius: moderateScale(20, 0.6),
              borderLeftWidth: 4,
              borderColor:
              type == 'Content Creator'
              ? Color.neonGreen
              : type == 'Business & Enterpreneurship'
              ? Color.green
              : type == 'Community & Connection'
              ? 'pink'
              : type == 'Learning & Exploring'
              ? 'purple'
              : 'black',
              borderTopWidth: 4,
              paddingVertical: moderateScale(20, 0.3),
            }}
            colors={['rgba(234, 234, 234 , 0.6)', 'rgba(209,209,209,0.6)']}>
            <View
              style={{
                alignSelf: 'center',
              }}>
              <TextInputWithTitle
                title={'Profile Name'}
                secureText={false}
                placeholder={'Profile Name'}
                setText={setUserName}
                value={username}
                viewHeight={0.06}
                viewWidth={0.82}
                inputWidth={0.8}
                border={1}
                borderColor={'#353535'}
                color={themeColor[1]}
                placeholderColor={Color.themeLightGray}
                borderRadius={moderateScale(10, 0.3)}
                titleColor={'#353535'}
              />
              <CustomText
                style={{
                  color: '#353535',
                  fontSize: moderateScale(10, 0.3),
                  marginBottom: moderateScale(5, 0.3),
                  width: windowWidth * 0.82,
                  // marginTop: props.marginTop,
                  marginTop: moderateScale(10, 0.3),
                  textAlign: 'left',
                }}>
                Profile Type
              </CustomText>
              <DropDownSingleSelect
                array={
                subscriptionPlan == "Basic" ? ['Learning & Exploring'] :  
                  [
                  'Content Creator',
                  'Business & Enterpreneurship',
                  'Community & Connection',
                  'Learning & Exploring',
                ]}
                item={type}
                setItem={setType}
                // width={windowWidth * 0.34}
                placeholder={type}
                fontSize={moderateScale(10, 0.5)}
                dropdownStyle={{
                  marginTop: moderateScale(1, 0.3),
                  borderBottomWidth: 0,
                  width: windowWidth * 0.82,
                  height: windowHeight * 0.06,
                }}
                btnStyle={{
                  backgroundColor: 'transparent',
                  width: windowWidth * 0.7,
                  height: windowHeight * 0.06,
                  borderRadius: moderateScale(10, 0.3),
                  borderWidth: 1,
                }}
                disabled={isEdit == true && true}
              />
              <TextInputWithTitle
                title={'Description '}
                optional
                secureText={false}
                placeholder={'Description'}
                setText={setDesc}
                value={desc}
                viewHeight={0.16}
                viewWidth={0.84}
                inputWidth={0.8}
                border={1}
                borderColor={'#353535'}
                color={themeColor[1]}
                placeholderColor={Color.themeLightGray}
                borderRadius={moderateScale(10, 0.3)}
                titleColor={'#353535'}
                multiline
                marginTop={moderateScale(1, 0.3)}
              />
            </View>

            <View style={styles.View}>
              <CustomText
                style={{
                  color: '#000',
                  fontSize: moderateScale(11, 0.6),
                }}>
                Privacy Setting
              </CustomText>

              <View style={[styles.radioButtonContainer]}>
                <TouchableOpacity
                  onPress={() => {
                    if (isLoading == false) {
                      console.log('private');
                      dispatch(setAccountPrivate('private'));
                      setSelectedTab('private');
                    }
                  }}
                  style={[
                    styles.radioButton,
                    {
                      backgroundColor:
                        selectedTab == 'private'
                          ? Color.red
                          : Color.veryLightGray,
                    },
                  ]}></TouchableOpacity>
                <CustomText
                  onPress={() => {
                    if (isLoading == false) {
                      dispatch(setAccountPrivate('private'));
                      setSelectedTab('private');
                    }
                  }}
                  style={styles.radioButtonText}>
                  Private
                </CustomText>

                <TouchableOpacity
                  onPress={() => {
                    if (isLoading == false) {
                      dispatch(setAccountPrivate('public'));
                      setSelectedTab('public');
                    }
                  }}
                  style={[
                    styles.radioButton,
                    {
                      backgroundColor:
                        selectedTab == 'public'
                          ? themeColor[1]
                          : Color.veryLightGray,
                    },
                  ]}></TouchableOpacity>
                <CustomText
                  onPress={() => {
                    if (isLoading == false) {
                      dispatch(setAccountPrivate('public'));
                      setSelectedTab('public');
                    }
                  }}
                  style={styles.radioButtonText}>
                  Public
                </CustomText>
              </View>
            </View>
            {privacy == 'private' && (
              <>
                <View
                  style={{
                    alignItems: 'center',
                    // backgroundColor: 'red',
                    // width:windowWidth*0.8,
                  }}>
                  <TextInputWithTitle
                    secureText
                    title={'Passcode'}
                    placeholder={'Passcode'}
                    setText={setPassCode}
                    value={passCode}
                    viewHeight={0.06}
                    viewWidth={0.82}
                    inputWidth={0.8}
                    border={1}
                    borderColor={'#353535'}
                    color={themeColor[1]}
                    placeholderColor={Color.themeLightGray}
                    borderRadius={moderateScale(10, 0.3)}
                    titleColor={'#353535'}
                    maxLength={4}
                    disable={
                      [null, undefined, ''].includes(profileData?.passcode) ==
                        false && isEdit
                    }

                    // textAlign={'center'}a
                  />
                </View>
                {![null, undefined, ''].includes(profileData?.passcode) && (
                  <TouchableOpacity
                    style={{
                      // alignItems:'flex-end',
                      width: windowWidth * 0.25,
                      position: 'absolute',
                      right: 0,
                      bottom: 60,
                      paddingVertical: moderateScale(5, 0.6),
                      // backgroundColor: 'red',
                    }}
                    onPress={() => {
                      setIsModalVisible(true);
                    }}>
                    <CustomText
                      style={{
                        // backgroundColor:'green',
                        fontSize: moderateScale(11, 0.6),
                      }}>
                      {' '}
                      Reset Passcode
                    </CustomText>
                  </TouchableOpacity>
                )}
              </>
            )}
            <CustomButton
              text={
                isLoading ? (
                  <ActivityIndicator color={themeColor[1]} size={'small'} />
                ) : isEdit ? (
                  'Update'
                ) : (
                  'Insert'
                )
              }
              textColor={privacy == 'private' ? 'black' : themeColor[1]}
              width={windowWidth * 0.3}
              height={windowHeight * 0.04}
              marginTop={moderateScale(35, 0.3)}
              fontSize={moderateScale(12, 0.3)}
              onPress={() => {
                isEdit == true ? updateProfile() : createProfile();
                // dispatch(setNumOfProfiles(1))

                // navigationService.navigate('QuestionScreen',{type:type})
              }}
              bgColor={'#FFFFFF'}
              borderRadius={moderateScale(30, 0.3)}
              elevation
              disabled={isLoading}
            />
          </LinearGradient>
          <ResetProfilePassword
            setIsModalVisible={setIsModalVisible}
            isModalVisible={isModalVisible}
            setPassCode={setPassCode}
          />
        </ScrollView>
      </ImageBackground>

      <ImagePickerModal
        show={imagePickerModal}
        setShow={setImagePickerModal}
        setFileObject={setImage}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },

  profileSection: {
    height: windowWidth * 0.4,
    width: windowWidth * 0.4,
    backgroundColor: '#EEEEEE',
    borderRadius: (windowWidth * 0.4) / 2,
    marginTop: moderateScale(40, 0.3),
    overflow: 'hidden',
    borderWidth: 4,
  },

  textInput: {
    height: windowHeight * 0.05,
    width: windowWidth * 0.8,
    borderWidth: 1,
    borderRadius: 10,
    margin: moderateScale(15, 0.3),
    fontSize: moderateScale(14, 0.6),
    paddingLeft: moderateScale(10, 0.6),
  },

  radioButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '50%',
    paddingLeft: moderateScale(20, 0.3),
  },
  radioButton: {
    height: moderateScale(11, 0.6),
    width: moderateScale(11, 0.6),
    backgroundColor: '#e8e8e8',
    borderRadius: moderateScale(11, 0.6),
    borderWidth: 2,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonIcon: {
    height: 8,
    width: 8,
    borderRadius: 7,
    backgroundColor: '#98CFB6',
  },
  radioButtonText: {
    fontSize: moderateScale(12, 0.6),
    fontWeight: '600',
    color: '#000',
  },
  Editbtn: {
    position: 'absolute',
    right: 5,
    bottom: 20,
    backgroundColor: 'rgba(255,255,255,.8)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: moderateScale(5, 0.6),
    borderRadius: (windowWidth * 0.08) / 2,
    width: windowWidth * 0.08,
    height: windowWidth * 0.08,
  },
  View: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    marginTop: moderateScale(10, 0.3),
  },
});

export default Profile;
