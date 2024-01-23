import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  Platform,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  ScrollView,
  View,
} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Color from '../Assets/Utilities/Color';
import CustomStatusBar from '../Components/CustomStatusBar';
// import CustomText from '../Components/CustomText';
// import CustomImage from '../Components/CustomImage';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
// import TextInputWithTitle from '../Components/TextInputWithTitle';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import CustomButton from '../Components/CustomButton';
import {Image, } from 'native-base';
import {useIsFocused} from '@react-navigation/native';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {validateEmail} from '../Config';
import {setSelectedRole, setUserData} from '../Store/slices/common';
import {setUserLogin, setUserToken, setWalkThrough} from '../Store/slices/auth';
import {useDispatch, useSelector} from 'react-redux';
import CustomImage from '../Components/CustomImage';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import CustomText from '../Components/CustomText';
import CustomButton from '../Components/CustomButton';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {FloatingLabelInput} from 'react-native-floating-label-input';
import Header from '../Components/Header';
import navigationService from '../navigationService';

const VerifyNumber = props => {
  const privacy = useSelector(state=> state.authReducer.privacy)
  const themeColor = useSelector(state => state.authReducer.ThemeColor);


  const disptach = useDispatch();
  const [firstSection, setFirstSection] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setusername] = useState('');
  const [email, setEmail] = useState();
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedType] = useState('Qbid Member');
  const phoneNumber = props?.route?.params?.phoneNumber;
  console.log("🚀 ~ file: VerifyNumber.js:57 ~ VerifyNumber ~ phoneNumber:", phoneNumber)

  //states
  const [code, setCode] = useState('');

  const CELL_COUNT = 4;
  const ref = useBlurOnFulfill({code, cellCount: CELL_COUNT});
  const [abcd, getCellOnLayoutHandler] = useClearByFocusCell({
    code,
    setCode,
  });
  const [time, settime] = useState(120);
  const [timerLabel, settimerLabel] = useState('Resend In ');
  if (time > 0) {
    setTimeout(function () {
      settime(time - 1);
    }, 1000);
  }

  const label = () => {
    time == 0 && (settimerLabel('Resend Code '), settime(''));
  };

  const sendOTP = async () => {
    const url = 'password/email';
    setIsLoading(true);
    const response = await Post(url, {email: phoneNumber}, apiHeader());
    setIsLoading(false);
    if (response != undefined) {
      console.log(response?.data)
     alert(response?.data?.data[0]?.code)
      settimerLabel('ReSend in '), settime(120);
      Platform.OS == 'android'
        ? ToastAndroid.show(`OTP sent to ${phoneNumber}`, ToastAndroid.SHORT)
        : alert(`OTP sent to ${phoneNumber}`);
    }
  };



  const VerifyOTP = async () => {
    const url = 'password/code/check';
    setIsLoading(true);
    console.log(code);
    const response = await Post(url, {code: code}, apiHeader());
    setIsLoading(false);
    if (response != undefined) {
      console.log(response?.data)
      Platform.OS == 'android'
        ? ToastAndroid.show(`otp verified`, ToastAndroid.SHORT)
        : alert(`otp verified`);

      navigationService.navigate('ResetPassword', {phoneNumber: phoneNumber});
    }
  };

  useEffect(() => {
    label();
  }, [time]);

  // useEffect(()=>{
  //   if(timerLabel == )
  //   sendOTP();
  // },[timerLabel])

  // const handleLogin = async loginFor => {
  //   console.log(
  //     '🚀 ~ file: LoginScreen.js:38 ~ handleLogin ~ loginFor',
  //     loginFor,
  //   );
  //   const url = 'login';
  //   const body = {
  //     email: email.trim(),
  //     password: password,
  //   };
  //   if (email == '' || password == '') {
  //     return Platform.OS == 'android'
  //       ? ToastAndroid.show('Required Field is empty', ToastAndroid.SHORT)
  //       : alert('Required Field is empty');
  //   }
  //   if (!validateEmail(email)) {
  //     return Platform.OS == 'android'
  //       ? ToastAndroid.show('Please use valid email', ToastAndroid.SHORT)
  //       : alert('Please use valid email');
  //   }
  //   setIsLoading(true);
  //   const response = await Post(url, body, apiHeader());
  //   setIsLoading(false);
  //   if (response != undefined) {
  //     console.log(response?.data);
  //     // console.log('yes' ,  response?.data?.data?.user_info?.role , loginFor)
  //     response?.data?.data?.user_info?.role == loginFor
  //       ? (dispatch(setUserData(response?.data?.data?.user_info)),
  //         dispatch(setUserLogin(response?.data?.data?.token)))
  //       : Platform.OS == 'android'
  //       ? ToastAndroid.show(
  //           'This User is not registered for selected role',
  //           ToastAndroid.SHORT,
  //         )
  //       : alert('This User is not registered for selected role');
  //   }
  // };

  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />
      <Header right />
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
          style={styles.text}
          isBold={true}
          children={'Enter OTP'}
        />
            <View style={styles.conatiner}>
        <CodeField
          placeholder={'0'}
          ref={ref}
          value={code}
          onChangeText={setCode}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
            <View
              onLayout={getCellOnLayoutHandler(index)}
              key={index}
              style={[styles.cellRoot, isFocused && styles.focusCell,{borderColor: themeColor[1],}]}>
              <CustomText
                style={[styles.cellText,{ color: themeColor[1],}, isFocused && {color: Color.black}]}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </CustomText>
            </View>
          )}
        />
        <CustomText style={[styles.txt3, {width: windowWidth * 0.6}]}>
          Haven't Recieved Verification Code ?{' '}
          {
            <TouchableOpacity
              disabled={timerLabel == 'Resend Code ' ? false : true}
              onPress={() => {
                sendOTP()
               
              }}>
              <CustomText style={[styles.txt4]}>
                {timerLabel} {time}
              </CustomText>
            </TouchableOpacity>
          }
        </CustomText>
        <CustomButton
            text={
              isLoading ? (
                <ActivityIndicator color={'#FFFFFF'} size={'small'} />
              ) : (
                'Verify Now'
              )
            }
            textColor={Color.white}
            width={windowWidth * 0.7}
            height={windowHeight * 0.06}
            marginTop={moderateScale(20, 0.3)}
            onPress={() => {
              VerifyOTP()
              // disptach(setUserToken({token : 'fasdasd awdawdawdada'}))
              // navigationService.navigate('ResetPassword')
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

const styles = ScaledSheet.create({
  conatiner: {
    width: windowWidth * 0.9,
    // height: windowHeight *0.4,
    paddingVertical: moderateScale(15, 0.6),
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: moderateScale(15, 0.6),
    alignItems: 'center',
    marginTop: windowHeight*0.2 ,
  },
  
  txt3: {
    color: Color.themeLightGray,
    fontSize: moderateScale(11, 0.6),
    textAlign: 'center',
    width: '95%',
    marginTop: moderateScale(10, 0.3),
    lineHeight: moderateScale(20, 0.3),
  },
  txt4: {
    color: Color.black,
    fontSize: moderateScale(14, 0.6),
    borderBottomWidth: 1,
    borderColor: Color.white,
    // alignSelf : 'center'
  },
  txt5: {
    color: Color.black,

    fontSize: moderateScale(12, 0.6),
  },

  codeFieldRoot: {
    marginTop: moderateScale(20, 0.3),
    marginBottom: moderateScale(15, 0.3),
    width: windowWidth * 0.6,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cellRoot: {
    width: moderateScale(40, 0.3),
    height: moderateScale(40, 0.3),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: moderateScale(5, 0.3),
    // backgroundColor: Color.black,
    // borderRadius: moderateScale(10, 0.3),
  },
  focusCell: {
    // backgroundColor: themeColor[1],
    // borderRadius: moderateScale(10, 0.3),

    
    borderWidth: 1,
  },
  cellText: {
   
    fontSize: moderateScale(20, 0.3),
    textAlign: 'center',
  },
  text:{
    fontSize: moderateScale(25, 0.6),
    color: '#353434',
    width: windowWidth * 0.9,
    textAlign: 'left',
    marginTop: moderateScale(10, 0.3),
  }
});

export default VerifyNumber;

