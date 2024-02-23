import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ToastAndroid,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {moderateScale} from 'react-native-size-matters';
import CustomText from './CustomText';
import TextInputWithTitle from './TextInputWithTitle';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import CustomButton from './CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {Post} from '../Axios/AxiosInterceptorFunction';
import { setSelectedProfileData } from '../Store/slices/common';

const ResetProfilePassword = ({setIsModalVisible, isModalVisible ,setPassCode}) => {
  const dispatch = useDispatch()
  const [currentPasscode, setCurrentPasscode] = useState('');
  const [confirmPasscode, setConfirmPasscode] = useState('');
  const [newPasscode, setNewPasscode] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  console.log('🚀 ~ isLoading:', isLoading);
  const token = useSelector(state => state.authReducer.token);
  // console.log("🚀 ~ token:", token)
  const ProfileData = useSelector(state => state.commonReducer.selectedProfile);

  const changePasscode = async () => {
    const url = `auth/change_passcode/${ProfileData?.id}`;
    const body = {
      current_passcode: currentPasscode,
      new_passcode: newPasscode,
      confirm_passcode: confirmPasscode,
    };
    
    if (newPasscode != confirmPasscode) {
      return Platform.OS == 'android'
        ? ToastAndroid.show('Passwords does not match', ToastAndroid.SHORT)
        : alert('Passwords does not match');
    }

    setIsLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setIsLoading(false);
    if (response != undefined) {
    console.log('🚀 ~ changePasscode ~ response:', response?.data);
    setPassCode
    dispatch(setSelectedProfileData(response?.data?.profile_info));
    setPassCode(response?.data?.profile_info?.passcode)
    Platform.OS == 'android'
        ? ToastAndroid.show(
            'Password sucessfully reset',
            ToastAndroid.SHORT,
          )
        : alert('Password sucessfully reset');
      // return console.log('response data =>', response?.data);
          setIsModalVisible(false)
    }
  };

  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={() => {
        isLoading ==false && setIsModalVisible(false);
      }}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={styles.modalContainer}>
        <View
          style={{
            width: '100%',
            backgroundColor: '#e6b800',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <CustomText
            style={{
              color: Color.white,
              fontSize: moderateScale(15, 0.6),
              // marginTop: moderateScale(20, 0.3),
              paddingVertical: moderateScale(15, 0.6),
              paddingHorizontal: moderateScale(30, 0.6),
              textAlign: 'center',
            }}
            isBold>
            Reset Passcode
          </CustomText>
        </View>

        <TextInputWithTitle
          marginTop={moderateScale(25, 0.6)}
          // title={'Title'}
          secureText={true}
          placeholder={'Current Passcode'}
          setText={setCurrentPasscode}
          value={currentPasscode}
          viewHeight={0.06}
          viewWidth={0.7}
          inputWidth={0.65}
          border={1}
          borderColor={'#353535'}
          // borderColor={Color.veryLightGray}
          // marginTop={moderateScale(10, 0.3)}
          // borderColor={'#FFFFFF'}

          color={Color.themeColor[1]}
          placeholderColor={Color.themeLightGray}
          borderRadius={moderateScale(10, 0.3)}
          maxLength={4}
        />

        <TextInputWithTitle
          marginTop={moderateScale(15, 0.6)}
          // title={'Title'}
          secureText={true}
          placeholder={'New Passcode'}
          setText={setNewPasscode}
          value={newPasscode}
          viewHeight={0.06}
          viewWidth={0.7}
          inputWidth={0.65}
          border={1}
          borderColor={'#353535'}
          backgroundColor={'white'}
          // marginTop={moderateScale(10, 0.3)}
          // borderColor={'#FFFFFF'}
          maxLength={4}
          color={Color.themeColor[1]}
          placeholderColor={Color.themeLightGray}
          borderRadius={moderateScale(10, 0.3)}
        />

        <TextInputWithTitle
          marginTop={moderateScale(15, 0.6)}
          // title={'Title'}
          secureText={true}
          placeholder={'Confirm New Passcode'}
          setText={setConfirmPasscode}
          value={confirmPasscode}
          viewHeight={0.06}
          viewWidth={0.7}
          inputWidth={0.65}
          border={1}
          borderColor={'#353535'}
          backgroundColor={'white'}
          // borderColor={Color.veryLightGray}
          // marginTop={moderateScale(10, 0.3)}
          // borderColor={'#FFFFFF'}
          maxLength={4}
          color={Color.themeColor[1]}
          placeholderColor={Color.themeLightGray}
          borderRadius={moderateScale(10, 0.3)}
        />

        <CustomButton
          text={  isLoading ?  <ActivityIndicator color={Color.black} size={'small'} /> :'Reset'}
          onPress={() => {
            changePasscode();
          }}
          textColor={Color.black}
          width={windowWidth * 0.5}
          height={windowHeight * 0.06}
          marginTop={moderateScale(20, 0.3)}
          bgColor={'#e6b800'}
          marginBottom={moderateScale(20, 0.6)}
          borderRadius={moderateScale(25, 0.3)}
          fontSize={moderateScale(14, 0.6)}
        />
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: Color.white,
    width: windowWidth * 0.8,
    alignItems: 'center',
    borderRadius: moderateScale(15, 0.6),
    overflow: 'hidden',
  },
});

export default ResetProfilePassword;
