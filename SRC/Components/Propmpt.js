import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import CustomButton from './CustomButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import navigationService from '../navigationService';
import {useDispatch, useSelector} from 'react-redux';
import CustomText from './CustomText';
import {setNewSignUp} from '../Store/slices/auth';
import CustomImage from './CustomImage';

const Propmpt = ({setVisible, isVisible}) => {
  const themeColor = useSelector(state => state.authReducer.ThemeColor);
  const dispatch = useDispatch();

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={() => {
        dispatch(setNewSignUp(false));
        setVisible(false);
      }}>
    
        <ImageBackground  source={require('../Assets/Images/background1.jpg')}  style={styles.container} >
        <CustomText isBold style={styles.name}>
        Early bird catches the worm. Start your nest today. Start earning tomorrow.
        </CustomText>
        <View
          style={{
            width: windowWidth * 0.2,
            height: windowHeight * 0.2,
            alignSelf: 'center',
            // backgroundColor:'red'
            // marginVertical:moderateScale(10,0.3)
            // paddingVertical:moderateScale(20,0.3)
          }}>
          <CustomImage
          resizeMode={'cover'}
            source={require('../Assets/Images/Hatch.png')}
            style={{width: '100%', height: '100%'}}
          />
        </View>
        {/* <CustomText style={styles.text}>
        Early bird catches the worm. Start your nest today. Start earning tomorrow.
        </CustomText> */}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: windowWidth * 0.55,
            alignSelf: 'center',
          }}>
          <CustomButton
            text={'Create'}
            textColor={Color.white}
            width={windowWidth * 0.25}
            height={windowHeight * 0.04}
            marginTop={moderateScale(20, 0.3)}
            fontSize={moderateScale(12, 0.6)}
            onPress={() => {
              dispatch(setNewSignUp(false));
              navigationService.navigate('CreateNewBubble');
            }}
            bgColor={themeColor}
            borderRadius={moderateScale(30, 0.3)}
            isGradient
          />

          <CustomButton
            borderWidth={2}
            borderColor={themeColor[1]}
            text={'Cancel'}
            textColor={themeColor[1]}
            width={windowWidth * 0.25}
            height={windowHeight * 0.04}
            marginTop={moderateScale(20, 0.3)}
            fontSize={moderateScale(12, 0.6)}
            onPress={() => {
              dispatch(setNewSignUp(false));
              setVisible(false);
            }}
            bgColor={Color.white}
            borderRadius={moderateScale(30, 0.3)}
          />
        </View>
        </ImageBackground>
      
    </Modal>
  );
};

export default Propmpt;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: moderateScale(10, 0.6),
    paddingVertical: moderateScale(15, 0.6),
    overflow:'hidden'
  },
  iconStyle: {
    color: 'white',
    marginRight: moderateScale(5, 0.3),
    width: windowWidth * 0.06,
    height: windowHeight * 0.015,
    fontSize: moderateScale(20, 0.6),
  },
  text: {
    paddingVertical:moderateScale(5,.6),
    borderRadius:moderateScale(10,.6),
    // backgroundColor:'white',
    color: 'black',
    marginHorizontal: moderateScale(10, 0.6),
    textAlign: 'center',
    fontSize: moderateScale(12, 0.6),
  },
  name: {
    // color: '#1296AF',
    color: 'black',
    textAlign: 'center',
    fontSize: moderateScale(18, 0.6),
  },
});
