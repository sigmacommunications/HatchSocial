import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React,{useState} from 'react';
const {height, width} = Dimensions.get('window');
import {moderateScale} from 'react-native-size-matters';
import CustomText from '../Components/CustomText';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomStatusBar from '../Components/CustomStatusBar';
import Header from '../Components/Header';
import CustomButton from '../Components/CustomButton';
import { useSelector } from 'react-redux'; 
import navigationService from '../navigationService';
// import { Header } from 'react-native/Libraries/NewAppScreen';

const Posting = () => {
  const themeColor = useSelector(state => state.authReducer.ThemeColor);
  const privacy = useSelector(state=> state.authReducer.privacy)
  const [isLoading, setIsLoading] = useState(false)
  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />
      <Header right Title={'Posting'} />

      <ImageBackground
         source={
          privacy == 'private'
            ? require('../Assets/Images/theme2.jpg')
            : require('../Assets/Images/Main.png')
        }
        resizeMode={'cover'}
        blurRadius={5}
        style={{
          width: windowWidth * 1,
          height: windowHeight * 0.9,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <CustomButton
          text={
            isLoading ? (
              <ActivityIndicator color={'#01E8E3'} size={'small'} />
            ) : (
              'Create New Profile'
            )
          }
          textColor={themeColor[1]}
          width={windowWidth * 0.7}
          height={windowHeight * 0.06}
          marginTop={moderateScale(10, 0.3)}
          onPress={() => {
            // disptach(setUserToken({token : 'fasdasd awdawdawdada'}))
            navigationService.navigate('Profile');
          }}
          bgColor={['#FFFFFF', '#FFFFFF']}
          borderRadius={moderateScale(30, 0.3)}
          isGradient
        />
        <CustomButton
          text={
            isLoading ? (
              <ActivityIndicator color={'#01E8E3'} size={'small'} />
            ) : (
              'Create New Bubble'
            )
          }
          textColor={themeColor[1]}
          width={windowWidth * 0.7}
          height={windowHeight * 0.06}
          marginTop={moderateScale(10, 0.3)}
          onPress={() => {
            // disptach(setUserToken({token : 'fasdasd awdawdawdada'}))
            navigationService.navigate('CreateNewBubble');
          }}
          bgColor={['#FFFFFF', '#FFFFFF']}
          borderRadius={moderateScale(30, 0.3)}
          isGradient
        />
         <CustomButton
          text={
            isLoading ? (
              <ActivityIndicator color={'#01E8E3'} size={'small'} />
            ) : (
              'Create New Feed'
            )
          }
          textColor={themeColor[1]}
          width={windowWidth * 0.7}
          height={windowHeight * 0.06}
          marginTop={moderateScale(10, 0.3)}
          onPress={() => {
            // disptach(setUserToken({token : 'fasdasd awdawdawdada'}))
            navigationService.navigate('CreateNewFeed');
          }}
          bgColor={['#FFFFFF', '#FFFFFF']}
          borderRadius={moderateScale(30, 0.3)}
          isGradient
        />
         <CustomButton
          text={
            isLoading ? (
              <ActivityIndicator color={'#01E8E3'} size={'small'} />
            ) : (
              'Create New post'
            )
          }
          textColor={themeColor[1]}
          width={windowWidth * 0.7}
          height={windowHeight * 0.06}
          marginTop={moderateScale(10, 0.3)}
          onPress={() => {
            // disptach(setUserToken({token : 'fasdasd awdawdawdada'}))
            navigationService.navigate('AddPost', {fromHome : true});
          }}
          bgColor={['#FFFFFF', '#FFFFFF']}
          borderRadius={moderateScale(30, 0.3)}
          isGradient
        />
        {/* <CustomButton
          text={
            isLoading ? (
              <ActivityIndicator color={'#01E8E3'} size={'small'} />
            ) : (
              'My post'
            )
          }
          textColor={themeColor[1]}
          width={windowWidth * 0.7}
          height={windowHeight * 0.06}
          marginTop={moderateScale(10, 0.3)}
          onPress={() => {
            // disptach(setUserToken({token : 'fasdasd awdawdawdada'}))
            navigationService.navigate('MyPost', {fromHome : true});
          }}
          bgColor={['#FFFFFF', '#FFFFFF']}
          borderRadius={moderateScale(30, 0.3)}
          isGradient
        /> */}
       
      </ImageBackground>
    </>
  );
};

export default Posting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  btn: {
    height: height / 16,
    width: width / 1.3,
    borderRadius: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    marginTop: moderateScale(15, 0.3),
  },
  btnText: {
    fontSize: moderateScale(14, 0.6),
    // color: themeColor[1],
  },
});
