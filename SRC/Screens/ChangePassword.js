import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
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
// import CustomText from '../Components/CustomText';
// import CustomImage from '../Components/CustomImage';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
// import TextInputWithTitle from '../Components/TextInputWithTitle';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import CustomButton from '../Components/CustomButton';
import {Image, ScrollView} from 'native-base';
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

const ChangePassword = () => {
  const privacy = useSelector(state=> state.authReducer.privacy)
  const themeColor = useSelector(state => state.authReducer.ThemeColor);

  
  const disptach = useDispatch();
  const [firstSection, setFirstSection] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setusername] = useState('');
  const [email, setEmail] = useState();
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [selectedRole, setSelectedType] = useState('Qbid Member');

  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />
      <Header right />
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
          style={styles.mainheading}
          isBold={true}
          children={'Change password'}
        />

        <View style={styles.conatiner}>
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
            title={'New password'}
            titleText={'New Password'}
            secureText={true}
            placeholder={'New password'}
            setText={setNewPassword}
            value={newPassword}
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
            title={'Confirm New password'}
            titleText={'Confirm New Password'}
            secureText={true}
            placeholder={'Confirm New password'}
            setText={setConfirmNewPassword}
            value={confirmNewPassword}
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
                'Change Password'
              )
            }
            textColor={Color.white}
            width={windowWidth * 0.7}
            height={windowHeight * 0.06}
            marginTop={moderateScale(20, 0.3)}
            onPress={() => {
              // disptach(setUserToken({token : 'fasdasd awdawdawdada'}))
            }}
            bgColor={themeColor}
            borderRadius={moderateScale(30, 0.3)}
            isGradient
          />
        </View>
      </ImageBackground>
    </>
  );
};

const styles = ScaledSheet.create({
  conatiner: {
    width: windowWidth * 0.9,
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

  // Heading: {
  //   fontSize: moderateScale(20, 0.3),
  //   color: '#ffffff',
  //   alignSelf: 'flex-start',
  // },

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
  mainheading:{
    fontSize: moderateScale(25, 0.6),
    color: '#353434',
    width: windowWidth * 0.9,
    textAlign: 'left',
    marginTop: moderateScale(10, 0.3),
  }
});

export default ChangePassword;
