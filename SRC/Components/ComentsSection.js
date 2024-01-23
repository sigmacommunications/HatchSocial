import {
  ActivityIndicator,
  Alert,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import React, { useState } from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import Color from '../Assets/Utilities/Color';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import { moderateScale } from 'react-native-size-matters';
import { Post } from '../Axios/AxiosInterceptorFunction';
import { useSelector } from 'react-redux';
import TextInputWithTitle from './TextInputWithTitle';
import CustomButton from './CustomButton';
import moment from 'moment';
import CustomImage from './CustomImage';
import CustomText from './CustomText';
import { Icon } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { baseUrl } from '../Config';

const ComentsSection = ({ refRBSheet, data, setCommentsCount }) => {
  const [yourComment, setYourComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [commentsData, setCommentsData] = useState(
    data?.comments ? data?.comments : [],
  );

  const themeColor = useSelector(state => state.authReducer.ThemeColor);
  const token = useSelector(state => state.authReducer.token);
  const profileData = useSelector(state => state.commonReducer.selectedProfile);

  const addComment = async () => {
    const url = 'auth/comment';
    const body = {
      profile_id: profileData?.id,
      post_id: data?.id,
      description: yourComment,
    };

    if (yourComment == '') {
      return Platform.OS == 'android'
        ? ToastAndroid.show('Add some text', ToastAndroid.SHORT)
        : Alert.alert('Add some text');
    }

    setIsLoading(true);
    const response = await Post(url, body, apiHeader(token));
    console.log("🚀 ~ file: ComentsSection.js:54 ~ addComment ~ response:", response)
    setIsLoading(false);
    if (response != undefined) {
      setCommentsData(prev => [
        ...prev,
        {
          id: 12,
          user: profileData?.name,
          description: yourComment,
          time: moment(),
          image: profileData?.photo,
        },
      ]);
      setCommentsCount(prev => prev + 1)
      Platform.OS == 'android'
        ? ToastAndroid.show('Comment added', ToastAndroid.SHORT)
        : Alert.alert('Comment added');
    }
  };
  return (
    <RBSheet
      ref={refRBSheet}
      closeOnDragDown={true}
      closeOnPressMask={true}
      customStyles={{
        draggableIcon: {
          backgroundColor: Color.veryLightGray,
        },
      }}
      height={700}>
      <View
        style={{
          height: windowHeight * 0.8,
        }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: moderateScale(60, 0.6),
            // backgroundColor: 'red',
          }}

          data={commentsData}

          renderItem={({ item, index }) => {

            return (
              <View
                style={styles.mainView}>
                <View
                  style={styles.View2}>
                  <View
                    style={styles.profileView3}>
                    <View style={styles.profileSection2}>
                      <CustomImage
                        source={
                          item?.profile_info?.photo
                            ? { uri: `${baseUrl}/${item?.profile_info?.photo}` }
                            : item?.image
                              ? { uri: `${baseUrl}/${item?.image}` }
                              : require('../Assets/Images/permissions.png')
                        }
                        style={{
                          height: '100%',
                          width: '100%',
                        }}
                      // resizeMode="contain"
                      />
                    </View>

                    <View
                      style={styles.view4}>
                      <CustomText
                        numberOfLines={1}
                        style={styles.customT}
                        isBold>
                        {item?.profile_info?.name
                          ? item?.profile_info?.name
                          : item?.user}
                      </CustomText>
                      <CustomText
                        style={styles.text2}
                        numberOfLines={2}>
                        {item?.description}
                      </CustomText>
                    </View>
                  </View>

                  <View
                    style={styles.textView}>
                    <CustomText style={styles.text} isBold>
                      Like
                    </CustomText>
                    <CustomText style={[styles.text, { fontSize: 11 }]} isBold>
                      {moment(item?.created_at).startOf('hour').fromNow()}
                    </CustomText>

                  </View>
                </View>
              </View>
            );
          }}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: windowHeight * 0.8,
                }}>
                <Text>No Comments</Text>
              </View>
            );
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          // backgroundColor: 'green',
          position: 'absolute',
          bottom: 0,
          width: windowWidth,
          justifyContent: 'space-between',
          paddingHorizontal: moderateScale(10, 0.6),
          paddingBottom: moderateScale(10, 0.6),
          alignItems: 'center',
        }}>
        <TextInputWithTitle
          titleText={'your comment'}
          placeholder={'your comment'}
          setText={setYourComment}
          value={yourComment}
          viewHeight={0.06}
          viewWidth={0.84}
          inputWidth={0.84}
          backgroundColor={'#F5F5F5'}
          marginRight={moderateScale(10, 0.3)}
          placeholderColor={Color.veryLightGray}
          borderRadius={moderateScale(25, 0.3)}
        />
        <Icon
          name={'send-outline'}
          size={6}
          color={Color.themeDarkGray}
          as={Ionicons}

          onPress={() => {
            addComment()
            setYourComment('')
          }}
        />
      </View>
    </RBSheet>
  );
};

export default ComentsSection;

const styles = StyleSheet.create({
  mainView: {
    width: windowWidth,
    marginTop: moderateScale(5, 0.3)
  },
  View2: {
    width: windowWidth,
  },
  profileView3: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(10, 0.6),
    width: windowWidth,
  },
  text2: {
    color: 'black',
    fontSize: moderateScale(12, 0.6),
  },
  view4: {
    paddingVertical: moderateScale(5, 0.6),
    paddingHorizontal: moderateScale(15, 0.6),
    backgroundColor: Color.lightGrey,
    borderRadius: moderateScale(10, 0.6),
    marginLeft: moderateScale(10, 0.3),
  },
  textView: {
    flexDirection: 'row',
    width: windowWidth * 0.6,
    marginLeft: moderateScale(60, 0.3),
    justifyContent: 'space-between',
    marginBottom: moderateScale(10, 0.3),

  },
  profileSection2: {
    height: windowHeight * 0.08,
    width: windowHeight * 0.08,
    backgroundColor: '#336ecb',
    borderRadius: (windowHeight * 0.08) / 2,
    borderWidth: 2,
    borderColor: Color.themeColor,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  customT: {
    color: 'black',
    fontSize: moderateScale(14, 0.6),
  },
  text: { fontSize: moderateScale(12, 0.6), color: 'black' },
  profileSection2: {
    height: windowHeight * 0.06,
    width: windowHeight * 0.06,
    backgroundColor: '#336ecb',
    borderRadius: (windowHeight * 0.06) / 2,
    borderWidth: 2,
    borderColor: Color.themeColor,
    justifyContent: 'center',
    overflow: 'hidden',
  },
});
