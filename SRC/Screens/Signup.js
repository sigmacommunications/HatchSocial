import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  Platform,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Color from '../Assets/Utilities/Color';
import CustomStatusBar from '../Components/CustomStatusBar';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {Image, ScrollView} from 'native-base';
import {useIsFocused} from '@react-navigation/native';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {validateEmail} from '../Config';
import {setSelectedRole, setUserData} from '../Store/slices/common';
import {
  setBubbleCreated,
  setInterestSelected,
  setNewSignUp,
  setNumOfProfiles,
  setUserLogin,
  setUserToken,
  setWalkThrough,
} from '../Store/slices/auth';
import {useDispatch, useSelector} from 'react-redux';
import CustomImage from '../Components/CustomImage';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import CustomText from '../Components/CustomText';
import CustomButton from '../Components/CustomButton';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {FloatingLabelInput} from 'react-native-floating-label-input';
import Header from '../Components/Header';
import navigationService from '../navigationService';

const Signup = () => {
  const servicesArray = useSelector(state => state.commonReducer.servicesArray);
  const themeColor = useSelector(state => state.authReducer.ThemeColor);

  const privacy = useSelector(state => state.authReducer.privacy);

  const SelecteduserRole = useSelector(
    state => state.commonReducer.selectedRole,
  );
  console.log(
    '🚀 ~ file: Signup.js:33 ~ Signup ~ SelecteduserRole:',
    SelecteduserRole,
  );
  const dispatch = useDispatch();

  const [image, setImage] = useState({});
  const [userRole, setUserRole] = useState('Qbid Member');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // const formData = new FormData();

  const SignUp = async () => {
    const params = {
      // role: userRole,
      first_name: `${firstName}`,
      last_name: `${lastName}`,
      email: email,
      // phone: contact,
      password: password,
      confirm_password: confirmPassword,
      // current_role: current_role,
    };

    for (let key in params) {
      if (params[key] === '') {
        return Platform.OS == 'android'
          ? ToastAndroid.show(` ${key} field is empty`, ToastAndroid.SHORT)
          : Alert.alert(` ${key} field is empty`);
      }
    }

    if (!validateEmail(email)) {
      return Platform.OS == 'android'
        ? ToastAndroid.show('email is not validate', ToastAndroid.SHORT)
        : Alert.alert('email is not validate');
    }
    if (password.length < 8) {
      return Platform.OS == 'android'
        ? ToastAndroid.show(
            'Password should atleast 8 character long',
            ToastAndroid.SHORT,
          )
        : Alert.alert('Password should atleast 8 character long');
    }
    if (password != confirmPassword) {
      return Platform.OS == 'android'
        ? ToastAndroid.show('Password does not match', ToastAndroid.SHORT)
        : Alert.alert('Password does not match');
    }

    const url = 'register';
    setIsLoading(true);
    const response = await Post(url, params, apiHeader());
    setIsLoading(false);
    if (response != undefined) {
    console.log('response?.data', response?.data?.user_info);
      Platform.OS === 'android'
        ? ToastAndroid.show('User Registered Succesfully', ToastAndroid.SHORT)
        : Alert.alert('User Registered Succesfully');
      dispatch(setInterestSelected(false));
      dispatch(setUserData(response?.data?.user_info));
      dispatch(setUserLogin(response?.data?.token));
      dispatch(setUserToken({token: response?.data?.token}));
      dispatch(setNumOfProfiles([undefined ,null ,'null' ,0 ,]?.includes(response?.data?.user_info?.total_profile) ? 0 : (response?.data?.user_info?.total_profile) ));
      dispatch(setNewSignUp(true))
      // dispatch(setBubbleCreated(false))
    }
  };

  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />
      <Header right showBack Title={'Sign up'} />
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
            // justifyContent : 'center',
            alignItems: 'center',
          }}>
          <CustomText
            style={styles.mainHeading}
            isBold={true}
            children={' Create an account'}
          />

          <CustomText
            style={styles.text}
            children={'its quick and easy'}></CustomText>
          <View style={styles.conatiner}>
            <TextInputWithTitle
              title={'First Name'}
              secureText={false}
              placeholder={'first Name'}
              setText={setFirstName}
              value={firstName}
              viewHeight={0.07}
              viewWidth={0.82}
              inputWidth={0.8}
              border={1}
              borderColor={'#A7A7A7'}
              backgroundColor={'#FFFFFF'}
              // marginTop={moderateScale(20,0.3)}
              color={themeColor[1]}
              placeholderColor={Color.themeLightGray}
              borderRadius={moderateScale(10, 0.3)}
            />
            <TextInputWithTitle
              title={'Last Name'}
              secureText={false}
              placeholder={'Last Name'}
              setText={setLastName}
              value={lastName}
              viewHeight={0.07}
              viewWidth={0.82}
              inputWidth={0.8}
              border={1}
              borderColor={'#A7A7A7'}
              backgroundColor={'#FFFFFF'}
              // marginTop={moderateScale(20,0.3)}
              color={themeColor[1]}
              placeholderColor={Color.themeLightGray}
              borderRadius={moderateScale(10, 0.3)}
            />
            <TextInputWithTitle
              title={'Email Address'}
              secureText={false}
              placeholder={'Email Address'}
              setText={setEmail}
              value={email}
              viewHeight={0.07}
              viewWidth={0.82}
              inputWidth={0.8}
              border={1}
              borderColor={'#A7A7A7'}
              backgroundColor={'#FFFFFF'}
              // marginTop={moderateScale(20,0.3)}
              color={themeColor[1]}
              placeholderColor={Color.themeLightGray}
              borderRadius={moderateScale(10, 0.3)}
            />
            <TextInputWithTitle
              title={'password'}
              titleText={'Password'}
              secureText={true}
              placeholder={'password'}
              setText={setPassword}
              value={password}
              viewHeight={0.07}
              viewWidth={0.82}
              inputWidth={0.8}
              border={1}
              borderColor={'#A7A7A7'}
              backgroundColor={'#FFFFFF'}
              // marginTop={moderateScale(30,0.3)}
              color={themeColor[1]}
              placeholderColor={Color.themeLightGray}
              borderRadius={moderateScale(10, 0.3)}
            />
            <TextInputWithTitle
              title={'Confirm Password'}
              titleText={'Confirm Password'}
              secureText={true}
              placeholder={'Confirm Password'}
              setText={setConfirmPassword}
              value={confirmPassword}
              viewHeight={0.07}
              viewWidth={0.82}
              inputWidth={0.8}
              border={1}
              borderColor={'#A7A7A7'}
              backgroundColor={'#FFFFFF'}
              // marginTop={moderateScale(30,0.3)}
              color={themeColor[1]}
              placeholderColor={Color.themeLightGray}
              borderRadius={moderateScale(10, 0.3)}
            />

            <CustomButton
              text={
                isLoading ? (
                  <ActivityIndicator color={'#FFFFFF'} size={'small'} />
                ) : (
                  'Sign Up'
                )
              }
              textColor={Color.white}
              width={windowWidth * 0.7}
              height={windowHeight * 0.06}
              marginTop={moderateScale(20, 0.3)}
              onPress={() => {
                SignUp();
                // dispatch(setUserToken({token: 'fasdasd awdawdawdada'}));
                // navigationService.navigate('BubbleSelection');
              }}
              bgColor={themeColor}
              borderRadius={moderateScale(30, 0.3)}
              isGradient
            />
          </View>
        </ImageBackground>
      </ScrollView>
    </>
  );
};

export default Signup;

const styles = ScaledSheet.create({
  conatiner: {
    width: windowWidth * 0.9,
    // height: windowHeight *0.4,
    paddingVertical: moderateScale(15, 0.6),
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: moderateScale(15, 0.6),
    alignItems: 'center',
    marginTop: moderateScale(20, 0.3),
  },
  textInput: {
    height: windowHeight * 0.05,
    width: windowWidth * 0.7,
    borderWidth: 1,
    borderColor: Color.darkGray,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  bottomImage: {
    width: windowWidth * 0.4,
    backgroundColor: 'green',
  },

  textContainer: {
    marginTop: moderateScale(20, 0.3),
  },

  Heading: {
    fontSize: moderateScale(20, 0.3),
    // fontWeight: 'bold',
    color: '#ffffff',

    alignSelf: 'flex-start',
  },

  txt3: {
    fontSize: moderateScale(10, 0.6),
    alignSelf: 'center',
    fontWeight: '600',
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth * 0.9,
    // marginTop: moderateScale(10,0.3),
  },
  txt4: {
    color: Color.purple,
    fontSize: moderateScale(15, 0.6),
    marginTop: moderateScale(8, 0.3),
    fontWeight: 'bold',
  },
  txt5: {
    color: Color.white,
    marginTop: moderateScale(10, 0.3),
    fontSize: moderateScale(12, 0.6),
  },
  dropDown: {
    backgroundColor: Color.red,
  },
  mainHeading: {
    fontSize: moderateScale(25, 0.6),
    color: '#353434',
    width: windowWidth * 0.9,
    textAlign: 'center',
    marginTop: moderateScale(10, 0.3),
  },
  text: {
    fontSize: moderateScale(15, 0.6),
    color: '#353434',
    width: windowWidth * 0.9,
    textAlign: 'center',
  },
});
