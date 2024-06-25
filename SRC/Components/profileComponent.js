import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  Platform,
  ToastAndroid,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
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
import Feather from 'react-native-vector-icons/Feather';

import Modal from 'react-native-modal';
import navigationService from '../navigationService';
import TextInputWithTitle from './TextInputWithTitle';
import {baseUrl} from '../Config';
import moment from 'moment';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {
  setAccountPrivate,
  setBubbleSelected,
  setInterestSelected,
  setProfileSelcted,
  setQuestionAnswered,
} from '../Store/slices/auth';
import { setSelectedProfileData } from '../Store/slices/common';

const ProfileComponent = ({
  item,
  borderColor,
  pending,
  check,
  close,
  edit,
  MemberList,
  invited,
  Requested,
  blocked,
}) => {
  // console.log("🚀 ~ item:", item)
  const themeColor = useSelector(state => state.authReducer.ThemeColor);
  const token = useSelector(state => state.authReducer.token);
  const profileData = useSelector(state => state.commonReducer.profileData);
  const [isLoading, setisLoading] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      <TouchableOpacity
        style={styles.row}
        onPress={() => {
           console.log("🚀 ~ file: profileComponent.js:69 ~ item:", item)
          if (item?.privacy == 'private') {
            dispatch(setAccountPrivate('private'));
            navigationService.navigate('LoginProfile', {item});
            dispatch(setSelectedProfileData({}));
          } else {
            dispatch(setAccountPrivate('public'));
            // dispatch(setQuestionAnswered(item?.qa_status));
            dispatch(setSelectedProfileData(item));
            dispatch(setProfileSelcted(true));
            dispatch(
              setInterestSelected
              (
                item?.interests?.length == 0 ? false : true,
              ),
            );
            dispatch(
              setBubbleSelected(
                item?.community_list?.length == 0
                  ? false
                  : true,
              ),
            );
            navigationService.navigate('TabNavigation')
          }
        }}>
        <View>
          <View style={[styles.profileSection,{borderColor: item?.type == 'Content Creator'
                ? Color.neonGreen
                : item?.type == 'Business & Entrepreneurship'
                ? Color.green
                : item?.type == 'Community & Connection'
                ? 'pink'
                : item?.type == 'Learning & Exploring'
                ? 'purple'
                : 'black',}]}>
            <CustomImage
              source={{uri: `${baseUrl}/${item?.photo}`}}
              style={{width: '100%', height: '100%'}}
            />
          </View>
        </View>

        <View
          style={styles.mainView}>
          <CustomText
            numberOfLines={1}
            style={styles.customT}>
            {item?.name}
          </CustomText>
          <CustomText
            numberOfLines={1}
            style={styles.T2}>
            {moment(item?.created_at).format('ll')}
          </CustomText>
          <CustomText
            style={{
              fontSize: moderateScale(11, 0.6),
              color: '#000',
              textAlign: 'left',
            }}>
            {item?.privacy}
          </CustomText>
        </View>
              </TouchableOpacity>
    </>
  );
};
export default ProfileComponent;

const styles = StyleSheet.create({
  profileSection: {
    height: windowWidth * 0.2,
    width: windowWidth * 0.2,
    backgroundColor: '#fff',
    borderRadius: (windowWidth * 0.2) / 2,
    borderWidth: 3,
    // borderColor: '#33dd50',
    overflow: 'hidden',
  },
  view: {
    backgroundColor: 'white',
    height: windowHeight * 0.03,
    width: windowHeight * 0.03,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: (windowHeight * 0.03) / 2,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  
  row: {
    paddingVertical: moderateScale(5, 0.6),
    width: windowWidth * 0.97,
    paddingHorizontal: moderateScale(10, 0.6),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    // backgroundColor:'red',
    borderColor: 'rgba(255,255,255,0.5)',
  },

  container: {
    width: windowWidth * 0.85,
    paddingBottom: moderateScale(20, 0.6),
    backgroundColor: Color.white,
    borderRadius: moderateScale(10, 0.6),
    overflow: 'hidden',
  },
  circle: {
    width: moderateScale(70, 0.6),
    height: moderateScale(70, 0.6),
    justifyContent: 'center',
    overflow: 'hidden',
  },
  customT:{
    fontSize: moderateScale(16, 0.6),
    color: '#000',
    fontWeight: '500',
    textAlign: 'left',
  },
  mainView:{
    paddingLeft: moderateScale(15, 0.6),
    // backgroundColor:'green',
    width: windowWidth * 0.6,
  },
  T2:{
    fontSize: moderateScale(11, 0.6),
    color: '#000',
    textAlign: 'left',
  }
});
