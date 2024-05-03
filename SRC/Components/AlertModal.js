import {
  StyleSheet,
  Text,
  View,
  Platform,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {Alert, Icon} from 'native-base';
import CustomText from './CustomText';
import CustomButton from './CustomButton';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomImage from './CustomImage';
import {useDispatch, useSelector} from 'react-redux';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {setSelectedProfileData} from '../Store/slices/common';
import {
  setAccountPrivate,
  setBubbleSelected,
  setInterestSelected,
  setProfileSelcted,
  setQuestionAnswered,
} from '../Store/slices/auth';
import navigationService from '../navigationService';

const RequestModal = ({isVisible, setIsVisible, item}) => {
  // console.log('🚀 ~ file: AlertModal.js:23 ~ RequestModal ~ data:', item);
  const themeColor = useSelector(state => state.authReducer.ThemeColor);
  const [loading, setLoading] = useState(false);
  const profileData = useSelector(state => state.commonReducer.selectedProfile);
  const token = useSelector(state => state.authReducer.token);
  const dispatch = useDispatch();

  const onPress = () => {
    setIsVisible(false);
   
    if (item?.privacy == 'private') {
      dispatch(setAccountPrivate('private'));
      navigationService.navigate('LoginProfile', {item});
      dispatch(setSelectedProfileData({}));
      // dispatch(setProfileSelcted(false));
      // dispatch(setBubbleSelected(false));
      // dispatch(setInterestSelected(false));
    } else {
    
      dispatch(setAccountPrivate('public'));
      // dispatch(setQuestionAnswered(item?.qa_status));
      dispatch(setSelectedProfileData(item));
      dispatch(setProfileSelcted(true));
      dispatch(
        setBubbleSelected(
          [0, '0', undefined, null, [], 'null'].includes(item?.community_info)
            ? false
            : true,
        ),
      );
      dispatch(
        setInterestSelected(
          [0, '0', undefined, null, [], 'null'].includes(item?.interests)
            ? false
            : true,
        ),
      );
    }
  };

  return (
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
        <CustomText
          style={{
            color: Color.black,
            fontSize: moderateScale(14, 0.6),
            marginTop: moderateScale(20, 0.3),
            paddingHorizontal: moderateScale(30, 0.6),
            textAlign: 'center',
          }}
          isBold>
          are You sure you want to switch?
        </CustomText>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: windowWidth * 0.65,
            alignSelf: 'center',
          }}>
          <CustomButton
            text={
              loading ? (
                <ActivityIndicator color={Color.white} size={'small'} />
              ) : (
                'Cancel'
              )
            }
            onPress={() => {
              setIsVisible(false);
            }}
            textColor={Color.white}
            width={windowWidth * 0.3}
            height={windowHeight * 0.04}
            marginTop={moderateScale(20, 0.3)}
            bgColor={themeColor}
            borderRadius={moderateScale(25, 0.3)}
            elevation
            isGradient
            fontSize={moderateScale(12, 0.6)}
          />
          <CustomButton
            text={
              loading ? (
                <ActivityIndicator color={Color.white} size={'small'} />
              ) : (
                'Confirm'
              )
            }
            onPress={() => {
              onPress();
            }}
            textColor={Color.white}
            width={windowWidth * 0.3}
            height={windowHeight * 0.04}
            marginTop={moderateScale(20, 0.3)}
            bgColor={themeColor}
            borderRadius={moderateScale(25, 0.3)}
            elevation
            isGradient
            fontSize={moderateScale(12, 0.6)}
          />
        </View>
      </View>
    </Modal>
  );
};

export default RequestModal;

const styles = ScaledSheet.create({
  container: {
    width: windowWidth * 0.85,
    paddingBottom: moderateScale(20, 0.6),
    backgroundColor: Color.white,
    borderRadius: moderateScale(10, 0.6),
    overflow: 'hidden',
  },
  circle: {
    width: moderateScale(60, 0.6),
    height: moderateScale(60, 0.6),
    borderRadius: moderateScale(30, 0.6),
    //   backgroundColor: Color.white,
    justifyContent: 'center',
    //   alignItems: 'center',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  container2: {
    // height: windowHeight * 0.13,
    paddingVertical: moderateScale(10, 0.6),
    width: '100%',
    backgroundColor: '#EEEEEE',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
