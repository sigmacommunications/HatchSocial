import React, {useState, useRef, useEffect} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, FlatList} from 'react-native';
import {ImageBackground, ScrollView} from 'react-native';

import Color from '../Assets/Utilities/Color';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import CustomImage from '../Components/CustomImage';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Video from 'react-native-video';
import numeral from 'numeral';
import CustomText from '../Components/CustomText';
import {Icon} from 'native-base';
import {useSelector} from 'react-redux';
import {baseUrl} from '../Config';
// import ComentsSection from './ComentsSection';
import {Get, Post} from '../Axios/AxiosInterceptorFunction';
import ShowMoreAndShowLessText from '../Components/ShowMoreAndShowLessText';
import FeedVideo from '../Components/FeedVideo';

const FeedPost = props => {
  const data = props?.route?.params?.data;
  const refRBSheet = useRef();
  console.log(
    '🚀 ~ FeedsPostScreen ~ item ================ >>>>>>>>>>>>>>>:',
    data?.id,
  );
  // const item = props?.route?.params?.data;
  const profileData = useSelector(state => state.commonReducer.selectedProfile);
  const token = useSelector(state => state.authReducer.token);
  const themeColor = useSelector(state => state.authReducer.ThemeColor);
  // const [like, setLike] = useState(item?.my_like ? true : false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setloading] = useState(false);
  //   const [commentsCount, setCommentsCount] = useState(0)
  const [views, setViews] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [feedDetail, setFeedDetail] = useState([]);
  console.log('🚀 ~ FeedsPostScreen ~ feedDetail:', feedDetail);

  const getFeedData = async () => {
    const url = `auth/feed-post-list/${data?.id}`;
    setIsLoading(true);
    const response = await Get(url, token);
    setIsLoading(false);
    if (response != undefined) {
      console.log(
        '🚀 response feed-post-list ================== >>>>>>>>>>>>:',
        response?.data?.feeds_post_list,
      );
      setFeedDetail(response?.data?.feeds_post_list?.data);
    }
  };

  useEffect(() => {
    getFeedData();
  }, []);

  return (
    <>
      <FeedVideo
        data={feedDetail}
        currentTime={currentTime}
        duration={duration}
        setCurrentTime={setCurrentTime}
        setDuration={setDuration}
      />
    </>
  );
};

const styles = StyleSheet.create({});

export default FeedPost;
