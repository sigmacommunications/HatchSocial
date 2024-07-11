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
  ToastAndroid,
  Platform,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
const {height, width} = Dimensions.get('window');
import {moderateScale} from 'react-native-size-matters';
import CustomStatusBar from '../Components/CustomStatusBar';
import Header from '../Components/Header';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import {useDispatch, useSelector} from 'react-redux';
import CustomButton from '../Components/CustomButton';
import Color from '../Assets/Utilities/Color';
import {Icon, ScrollView} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CardComponent from '../Components/CardComponent';
import {Delete, Get} from '../Axios/AxiosInterceptorFunction';
import {useNavigation} from '@react-navigation/native';
import navigationService from '../navigationService';
import ProfileComponent from '../Components/profileComponent';
import {
  setBubbleSelected,
  setInterestSelected,
  setProfileSelcted,
  setQuestionAnswered,
} from '../Store/slices/auth';
import {setSelectedProfileData} from '../Store/slices/common';

const ProfileList = () => {
  const navigation = useNavigation();
  const privacy = useSelector(state => state.authReducer.privacy);
  const profileData1 = useSelector(
    state => state.commonReducer.selectedProfile,
  );

  console.log('🚀 ~ file: ProfileList.js:34 ~ profileData:', profileData1);
  const token = useSelector(state => state.authReducer.token);
  console.log('🚀 ~ file: ProfileList.js:35 ~ ProfileList ~ token:', token);
  const [profileData, setProfileData] = useState([]);
  // console.log('🚀 ~ ProfileList ~ profileData----->:', profileData);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
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
  const deleteProfile = async id => {
    const url = `auth/profile/${id}?_method=DELETE`;
    const response = await Delete(url, apiHeader(token));
    // setIsLoading(false);
    //  return  console.log( 'id ==>> ', profileData1?.id)
    //  return console.log("🚀 ~ deleteProfile ~ profileData:", profileData)
    if (response != undefined) {
      console.log('🚀 ~ deleteProfile ~ response:', response?.data);
      if (profileData1?.id == id) {
        console.log('Running ===', id);
        dispatch(setQuestionAnswered(false));
        dispatch(setSelectedProfileData({}));
        dispatch(setProfileSelcted(false));
        dispatch(setBubbleSelected(false));
        dispatch(setInterestSelected(false));
      }
      setProfileData(prevData => prevData?.filter(item => item?.id !== id));

      Platform.OS == 'android'
        ? ToastAndroid.show('Profile deleted', ToastAndroid.SHORT)
        : Alert.alert('Profile deleted');
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
      {/* <Header Title={'Profile List'} search showBack /> */}

      <View style={styles.HeaderView}>
        <Icon
          onPress={() => {
            navigation.goBack();
          }}
          style={{position: 'absolute', left: moderateScale(15, 0.6)}}
          name="arrow-back-ios"
          as={MaterialIcons}
          color={Color.themeColor}
          size={moderateScale(20, 0.6)}
        />
        <CustomText
          numberOfLines={1}
          isBold
          style={{fontSize: moderateScale(20, 0.6)}}>
          {'Profile List'}
        </CustomText>
        <Icon
          onPress={() => navigationService.navigate('Profile')}
          name="plus"
          style={{
            fontWeight: 'bold',
            position: 'absolute',
            right: moderateScale(10, 0.6),
          }}
          as={AntDesign}
          color={Color.themeColor}
          size={moderateScale(25, 0.6)}
        />
      </View>

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
                  onDelete={() => {
                    deleteProfile(item?.id);
                  }}
                />
              );
            }}
            // ListFooterComponent={() => (
            //   <View
            //     style={{
            //       backgroundColor: 'white',
            //       padding: moderateScale(11, 0.3),
            //       borderRadius: 11,
            //       borderColor: Color.green,
            //       borderWidth: 1,
            //       width: windowWidth * 0.4,
            //       alignSelf: 'center',
            //       marginTop: moderateScale(15, 0.6),
            //     }}>
            //     <CustomText
            //       onPress={() => navigationService.navigate('Profile')}
            //       style={{
            //         fontSize: moderateScale(13, 0.6),
            //         color: '#000',
            //         textAlign: 'center',
            //       }}
            //       isBold>
            //       create new profile
            //     </CustomText>
            //   </View>
            // )}
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
  HeaderView: {
    width: windowWidth,
    height: windowHeight * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
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
