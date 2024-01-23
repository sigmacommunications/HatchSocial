import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {moderateScale} from 'react-native-size-matters';
import CustomStatusBar from '../Components/CustomStatusBar';
import Header from '../Components/Header';
import CustomText from '../Components/CustomText';
import CustomButton from '../Components/CustomButton';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomImage from '../Components/CustomImage';
import navigationService from '../navigationService';
import {useNavigation} from '@react-navigation/native';
import Color from '../Assets/Utilities/Color';
import { useSelector } from 'react-redux';

const AccountDetails = () => {
  const themeColor = useSelector(state => state.authReducer.ThemeColor);
  const privacy = useSelector(state=> state.authReducer.privacy)
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />
      <Header right Title={'Account Details'} search />

      <ImageBackground
        source={privacy == 'private' ? require('../Assets/Images/theme2.jpg'): require('../Assets/Images/Main.png')}
        resizeMode={'cover'}
        style={{
          width: windowWidth * 1,
          height: windowHeight * 0.9,
          alignItems: 'center',
        }}>
        <View style={[styles.profileSection,{borderColor:privacy=='private' ? Color.red : Color.green }]}>
          <CustomImage
            source={require('../Assets/Images/dummyman1.png')}
            style={{
              height: '100%',
              width: '100%',
            }}
            resizeMode={'stretch'}
          />
        </View>

        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <CustomText
            style={{
              color: '#22393a',
              fontSize: moderateScale(22, 0.6),
              marginTop: moderateScale(5, 0.3),
            }}
            isBold>
            Jonathan
          </CustomText>
        </View>

        <CustomButton
          text={
            isLoading ? (
              <ActivityIndicator color={'#FFFFFF'} size={'small'} />
            ) : (
              'Create New Profile'
            )
          }
          textColor={themeColor[1]}
          width={windowWidth * 0.7}
          height={windowHeight * 0.06}
          marginTop={moderateScale(10, 0.3)}
          onPress={() => {
            navigationService.navigate('Profile');
          }}
          fontSize={moderateScale(12, 0.6)}
          bgColor={['#FFFFFF', '#FFFFFF']}
          borderRadius={moderateScale(30, 0.3)}
          isGradient
        //   isBold
        />

        <CustomButton
          text={
            isLoading ? (
              <ActivityIndicator color={'#FFFFFF'} size={'small'} />
            ) : (
              'Add Bubbles'
            )
          }
          textColor={themeColor[1]}
          width={windowWidth * 0.7}
          height={windowHeight * 0.06}
          marginTop={moderateScale(10, 0.3)}
          fontSize={moderateScale(12, 0.6)}
          onPress={() => {
            navigationService.navigate('CreateNewBubble');
          }}
          bgColor={['#FFFFFF', '#FFFFFF']}
          borderRadius={moderateScale(30, 0.3)}
          isGradient
        //   isBold
        />
        {/* <CustomButton
          text={
            isLoading ? (
              <ActivityIndicator color={'#FFFFFF'} size={'small'} />
            ) : (
              'Back'
            )
          }
          textColor={themeColor[1]}
          width={windowWidth * 0.7}
          height={windowHeight * 0.06}
          marginTop={moderateScale(10, 0.3)}
          fontSize={moderateScale(12, 0.6)}
          onPress={() => {
            navigation.goBack();
          }}
          bgColor={['#FFFFFF', '#FFFFFF']}
          borderRadius={moderateScale(30, 0.3)}
          isGradient
        //   isBold
        /> */}
      </ImageBackground>
    </>
  );
};

export default AccountDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  profileSection: {
    height: windowWidth * 0.35,
    width: windowWidth * 0.35,
    backgroundColor: '#ACACAC',
    borderRadius: (windowWidth * 0.35) / 2,
    marginTop: windowHeight * 0.2,
    overflow: 'hidden',
    borderWidth: 4,
    // borderColor: Color.green,
  },
});
