import {
  StyleSheet,
  Text,
  View,
  Platform,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import {Alert, Icon} from 'native-base';
import CustomText from './CustomText';
import CustomButton from './CustomButton';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import CustomImage from './CustomImage';
import {useSelector} from 'react-redux';
import {Get, Post} from '../Axios/AxiosInterceptorFunction';
import { useIsFocused } from '@react-navigation/native';

const RequestModal = ({
  isVisible,
  setIsVisible,
  bubbleData, 
  selectedBubbleId,
  item,
}) => {
  const themeColor = useSelector(state => state.authReducer.ThemeColor);
  const profileData = useSelector(state => state.commonReducer.selectedProfile);
  const token = useSelector(state => state.authReducer.token);
  
  const [loading, setLoading] = useState(false);
  const [bubbleInfo, setBubbleInfo] = useState([]);
  const isFocused = useIsFocused()
  const [requested, setRequested] = useState(bubbleData?.follow?.status == 'request' ? true : false);
  


 

  const addRequest = async () => {
    const url = 'auth/community_member/add';
    const body = {
      status: 'request',
      profile_id: [profileData?.id],
      community_id: selectedBubbleId,
    };
    setLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setLoading(false);
    if (response != undefined) {
      setIsVisible(false);
      Platform.OS == 'android'
        ? ToastAndroid.show('Request has been sent', ToastAndroid.SHORT)
        : Alert.alert('Request has been sent');
    }
    setRequested(prevRequest => !prevRequest);
  };

  useEffect(() => {
    setRequested(bubbleData?.follow?.status == 'request' ? true : false)
  
    
  }, [bubbleData])
  


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
        <View style={{backgroundColor: themeColor[1]}}>
          <CustomText
            style={{
              color: Color.white,
              fontSize: moderateScale(15, 0.6),
              paddingVertical: moderateScale(10, 0.6),
              paddingHorizontal: moderateScale(30, 0.6),
              textAlign: 'center',
            }}
            isBold>
            Permission
          </CustomText>
        </View>

        <View
          style={styles.container3}>
          <View style={styles.circle}>
            <CustomImage
              source={require('../Assets/Images/user.png')}
              style={{width: '100%', height: '100%'}}
            />
          </View>

          <CustomText
            style={styles.text}
            isBold>
            you need admins permission to get into this bubble
          </CustomText>
        </View>

        <CustomButton
          text={
            loading ? (
              <ActivityIndicator color={Color.white} size={'small'} />
            ) : !requested ? (
              'Request to join'
            ) : (
              'already requested'
            )
          }
          onPress={() => {
            addRequest();
          }}
          textColor={Color.white}
          width={windowWidth * 0.65}
          height={windowHeight * 0.06}
          marginTop={moderateScale(20, 0.3)}
          bgColor={themeColor}
          borderRadius={moderateScale(25, 0.3)}
          elevation
          isGradient
          fontSize={moderateScale(14, 0.6)}
          disabled={requested}
        />
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
    justifyContent: 'center',
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
    paddingVertical: moderateScale(10, 0.6),
    width: '100%',
    backgroundColor: '#EEEEEE',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container3:{
    height: windowHeight * 0.22,
    width: windowWidth * 0.85,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    color: Color.black,
    fontSize: moderateScale(14, 0.6),
    marginTop: moderateScale(20, 0.3),
    paddingHorizontal: moderateScale(30, 0.6),
    textAlign: 'center',
  }
});
