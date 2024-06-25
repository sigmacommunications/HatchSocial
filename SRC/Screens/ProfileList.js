import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
const {height, width} = Dimensions.get('window');
import {moderateScale} from 'react-native-size-matters';
import CustomStatusBar from '../Components/CustomStatusBar';
import Header from '../Components/Header';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import {useSelector} from 'react-redux';
import CustomButton from '../Components/CustomButton';
import Color from '../Assets/Utilities/Color';
import {Icon, ScrollView} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import CardComponent from '../Components/CardComponent';
import {Get} from '../Axios/AxiosInterceptorFunction';
import {useNavigation} from '@react-navigation/native';
import navigationService from '../navigationService';
import ProfileComponent from '../Components/profileComponent';

const ProfileList = () => {
  const navigation = useNavigation();
  const privacy = useSelector(state => state.authReducer.privacy);
  const token = useSelector(state => state.authReducer.token);
  console.log('🚀 ~ file: ProfileList.js:35 ~ ProfileList ~ token:', token);
  const [profileData, setProfileData] = useState([]);
  console.log('🚀 ~ ProfileList ~ profileData----->:', profileData);
  const [isLoading, setIsLoading] = useState(false);

  const profileListing = async () => {
    const url = 'auth/profile';
    setIsLoading(true);
    const response = await Get(url, token);
    setIsLoading(false);
    if (response != undefined) {
      console.log(
        '🚀 ~ file: ProfileList.js:44 ~ profileListing ~ response:',
        JSON.stringify(response?.data?.profile_info, null, 2),
      );
      setProfileData(response?.data?.profile_info);
    }
  };

  useEffect(() => {
    profileListing();
  }, []);

  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />
      <Header Title={'Profile List'} search showBack />

      <ImageBackground
        source={
          privacy == 'private'
            ? require('../Assets/Images/theme2.jpg')
            : require('../Assets/Images/Main.png')
        }
        resizeMode={'cover'}
        style={{
          width: windowWidth * 1,
          height: windowHeight * 0.9,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {/* <View
          style={{
            width: windowWidth,
            height:windowHeight*0.8,
            alignItems:'center',
            justifyContent:'center',
            backgroundColor:'green',
            marginTop: moderateScale(10, 0.3),
          }}> */}
        {isLoading ? (
          <ActivityIndicator size={'large'} color={'white'} />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={profileData}
            contentContainerStyle={{
              paddingBottom: moderateScale(30, 0.3),
            }}
            renderItem={({item, index}) => {
              return (
                <ProfileComponent
                  item={item}
                  check={item?.check}
                  close={item?.close}
                  edit={item?.edit}
                  pending={item?.pending}
                />
              );
            }}
            ListFooterComponent={() => (
              <View
                style={{
                  backgroundColor: 'white',
                  padding: moderateScale(11, 0.3),
                  borderRadius: 11,
                  borderColor: Color.green,
                  borderWidth: 1,
                  width: windowWidth * 0.4,
                  alignSelf: 'center',
                  marginTop: moderateScale(15, 0.6),
                }}>
                <CustomText
                  onPress={() => navigationService.navigate('Profile')}
                  style={{
                    fontSize: moderateScale(13, 0.6),
                    color: '#000',
                    textAlign: 'center',
                  }}
                  isBold>
                  create new profile
                </CustomText>
              </View>
            )}
          />
        )}
        {/* </View> */}
      </ImageBackground>
    </>
  );
};

export default ProfileList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  profileSection: {
    height: windowWidth * 0.2,
    width: windowWidth * 0.2,
    backgroundColor: '#fff',
    borderRadius: (windowWidth * 0.2) / 2,
    borderWidth: 3,
    borderColor: '#33dd50',
    overflow: 'hidden',
    // marginBottom : moderateScale(20,0.3)
  },

  row: {
    width: windowWidth * 0.97,
    // height: windowHeight  * 0.1,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    // paddingLeft: moderateScale(20, 0.6),
    marginBottom: moderateScale(5, 0.3),
    // backgroundColor : 'green',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    // paddingBottom : 20,
  },
});
