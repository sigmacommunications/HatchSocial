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

const FeedsPostScreen = (props) => {
  const data = props?.route?.params?.data
  const refRBSheet = useRef();
  // console.log("🚀 ~ FeedsPostScreen ~ item ================ >>>>>>>>>>>>>>>:", data?.id)
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
  const [isLoading ,setIsLoading]=useState(false)
  const [feedDetail ,setFeedDetail] =useState([])
  console.log("🚀 ~ FeedsPostScreen ~ feedDetail:", feedDetail)

  // const PostData = [
  //   {
  //     id: 1,
  //     feedtitle: 'chris',
  //     Name: 'Travelling Tour Posted a video to playlist Special Content',
  //     date: '17 July',
  //     desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry',
  //     profileImage: require('../Assets/Images/avatar4.png'),
  //     post_images: require('../Assets/Images/travel.jpg'),
  //     post_videos: [
  //       {
  //         uri :require('../Assets/Images/video1.mp4'),
  //         Like: 157,
  //         love: 1100,
  //         comment: 405,
  //         commentData: [
  //           {
  //             id: 1,
  //             name: 'James',
  //             comment: 'Looking Geourgous',
  //             pic: require('../Assets/Images/avatar6.jpg'),
  //             Time: '16',
  //           },
  //           {
  //             id: 2,
  //             name: 'Levik',
  //             comment: 'Nice',
  //             pic: require('../Assets/Images/avatar4.png'),
  //             Time: '3',
  //           },
  //           {
  //             id: 3,
  //             name: 'Frank',
  //             comment: 'Good',
  //             pic: require('../Assets/Images/avatar3.png'),
  //             Time: '10',
  //           },
  //           {
  //             id: 4,
  //             name: 'Salina',
  //             comment: 'Killer',
  //             pic: require('../Assets/Images/avatar1.png'),
  //             Time: '5',
  //           },
  //         ],
  //         View: null,
  //       },
  //       {
  //         uri :require('../Assets/Images/video2.mp4'),
          
  //     Like: 457,
  //     love: 1800,
  //     comment: 905,
  //     commentData: [
  //       {
  //         id: 1,
  //         name: 'James',
  //         comment: 'Killer',
  //         pic: require('../Assets/Images/avatar6.jpg'),
  //         Time: '2',
  //       },
  //       {
  //         id: 2,
  //         name: 'Levik',
  //         comment: 'Nice',
  //         pic: require('../Assets/Images/avatar4.png'),
  //         Time: '20',
  //       },
  //       {
  //         id: 3,
  //         name: 'Frank',
  //         comment: 'Looking Beauty',
  //         pic: require('../Assets/Images/avatar3.png'),
  //         Time: '15',
  //       },
  //       {
  //         id: 4,
  //         name: 'Salina',
  //         comment: 'Nice',
  //         pic: require('../Assets/Images/avatar1.png'),
  //         Time: '3',
  //       },
  //     ],
  //     View: null,
  //       }

  //       // '../Assets/Images/video2.mp4',
  //       // '../Assets/Images/video3.mp4',
  //       // '../Assets/Images/video4.mp4',
  //     ],

     
  //   },
  //   {
  //     id: 2,
  //     feedtitle: 'john',
  //     Name: 'We hope you got to enjoy the great weather today, Vienna! 🥂✨ by WaitsForYou ',
  //     date: '24 Aug',
  //     desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry',
  //     profileImage: require('../Assets/Images/avatar3.png'),
  //     post_images: require('../Assets/Images/art.png'),
  //     // video: null,
  //     post_videos: [
  //       {
  //         uri: require('../Assets/Images/video1.mp4'),
  //         Like: 357,
  //         love: 4100,
  //         comment: 205,
  //         commentData: [
  //           {
  //             id: 1,
  //             name: 'James',
  //             comment: 'Killer',
  //             pic: require('../Assets/Images/avatar6.jpg'),
  //             Time: '1',
  //           },
  //           {
  //             id: 2,
  //             name: 'Levik',
  //             comment: 'Nice',
  //             pic: require('../Assets/Images/avatar4.png'),
  //             Time: '3',
  //           },
  //           {
  //             id: 3,
  //             name: 'Frank',
  //             comment: 'Superb',
  //             pic: require('../Assets/Images/avatar3.png'),
  //             Time: '8',
  //           },
  //           {
  //             id: 4,
  //             name: 'Salina',
  //             comment: 'Beauty',
  //             pic: require('../Assets/Images/avatar1.png'),
  //             Time: '5',
  //           },
  //         ],
  //         View: 1084,
  //       },
  //       {
  //         uri:require( '../Assets/Images/video2.mp4'),
  //         Like: 357,
  //         love: 4100,
  //         comment: 205,
  //         commentData: [
  //           {
  //             id: 1,
  //             name: 'James',
  //             comment: 'Killer',
  //             pic: require('../Assets/Images/avatar6.jpg'),
  //             Time: '1',
  //           },
  //           {
  //             id: 2,
  //             name: 'Levik',
  //             comment: 'Nice',
  //             pic: require('../Assets/Images/avatar4.png'),
  //             Time: '3',
  //           },
  //           {
  //             id: 3,
  //             name: 'Frank',
  //             comment: 'Superb',
  //             pic: require('../Assets/Images/avatar3.png'),
  //             Time: '8',
  //           },
  //           {
  //             id: 4,
  //             name: 'Salina',
  //             comment: 'Beauty',
  //             pic: require('../Assets/Images/avatar1.png'),
  //             Time: '5',
  //           },
  //         ],
  //         View: 1084,
  //       },
  //       // '../Assets/Images/video3.mp4',
  //       // '../Assets/Images/video4.mp4',
  //     ],
  //   },

  //   {
  //     id: 3,
  //    feedtitle: 'christina',
  //     Name: 'Traveling Post We hope you got to enjoy the great weather today Vienna',
  //     date: '1 May',
  //     desc: 'The beauty of our private island paradise rests in its enhanced interior decorum. Minimalist, monochromatic interior design emphasizes',
  //     profileImage: require('../Assets/Images/avatar4.png'),
  //     post_images: null,
  //     post_videos: [
  //       {
  //         uri: require('../Assets/Images/video1.mp4'),
  //         Like: 357,
  //         love: 4100,
  //         comment: 205,
  //         commentData: [
  //           {
  //             id: 1,
  //             name: 'James',
  //             comment: 'Nice',
  //             pic: require('../Assets/Images/avatar6.jpg'),
  //             Time: '8',
  //           },
  //           {
  //             id: 2,
  //             name: 'Levik',
  //             comment: 'Good',
  //             pic: require('../Assets/Images/avatar4.png'),
  //             Time: '6',
  //           },
  //           {
  //             id: 3,
  //             name: 'Frank',
  //             comment: 'Looking',
  //             pic: require('../Assets/Images/avatar3.png'),
  //             Time: '3',
  //           },
  //           {
  //             id: 4,
  //             name: 'Salina',
  //             comment: 'Smart',
  //             pic: require('../Assets/Images/avatar1.png'),
  //             Time: '7',
  //           },
  //         ],
  //         View: null,
  //       },
  //       {
  //         uri: require('../Assets/Images/video2.mp4'),
  //         Like: 357,
  //         love: 4100,
  //         comment: 205,
  //         commentData: [
  //           {
  //             id: 1,
  //             name: 'James',
  //             comment: 'Nice',
  //             pic: require('../Assets/Images/avatar6.jpg'),
  //             Time: '8',
  //           },
  //           {
  //             id: 2,
  //             name: 'Levik',
  //             comment: 'Good',
  //             pic: require('../Assets/Images/avatar4.png'),
  //             Time: '6',
  //           },
  //           {
  //             id: 3,
  //             name: 'Frank',
  //             comment: 'Looking',
  //             pic: require('../Assets/Images/avatar3.png'),
  //             Time: '3',
  //           },
  //           {
  //             id: 4,
  //             name: 'Salina',
  //             comment: 'Smart',
  //             pic: require('../Assets/Images/avatar1.png'),
  //             Time: '7',
  //           },
  //         ],
  //         View: null,
  //       },
  //       //
  //       // '../Assets/Images/video3.mp4',
  //       // '../Assets/Images/video4.mp4',
  //     ],
  //   },
  //   {
  //     id: 4,
  //     feedtitle: 'maha',
  //     Name: 'Travelling Tour Posted We hope you got to enjoy the great',
  //     date: '4 Dec',
  //     desc: `📍Italy Gorgeous pastel buildings picture-perfect harbors, and crystal-clear waters — experience everything this Italian seaside oasis has to offer on our trip to Northern Italy`,
  //     profileImage: require('../Assets/Images/avatar1.png'),
  //     post_images: require('../Assets/Images/travel3.jpg'),
  //     post_videos: [
  //       {
  //         uri: require('../Assets/Images/video1.mp4'),
  //         Like: 457,
  //         love: 1800,
  //         comment: 905,
  //         commentData: [
  //           {
  //             id: 1,
  //             name: 'James',
  //             comment: 'Killer',
  //             pic: require('../Assets/Images/avatar6.jpg'),
  //             Time: '2',
  //           },
  //           {
  //             id: 2,
  //             name: 'Levik',
  //             comment: 'Nice',
  //             pic: require('../Assets/Images/avatar4.png'),
  //             Time: '20',
  //           },
  //           {
  //             id: 3,
  //             name: 'Frank',
  //             comment: 'Looking Beauty',
  //             pic: require('../Assets/Images/avatar3.png'),
  //             Time: '15',
  //           },
  //           {
  //             id: 4,
  //             name: 'Salina',
  //             comment: 'Nice',
  //             pic: require('../Assets/Images/avatar1.png'),
  //             Time: '3',
  //           },
  //         ],
  //         View: null,
  //       },
  //       {
  //         uri  :require('../Assets/Images/video2.mp4'),
  //         Like: 357,
  //         love: 4100,
  //         comment: 205,
  //         commentData: [
  //           {
  //             id: 1,
  //             name: 'James',
  //             comment: 'Nice',
  //             pic: require('../Assets/Images/avatar6.jpg'),
  //             Time: '8',
  //           },
  //           {
  //             id: 2,
  //             name: 'Levik',
  //             comment: 'Good',
  //             pic: require('../Assets/Images/avatar4.png'),
  //             Time: '6',
  //           },
  //           {
  //             id: 3,
  //             name: 'Frank',
  //             comment: 'Looking',
  //             pic: require('../Assets/Images/avatar3.png'),
  //             Time: '3',
  //           },
  //           {
  //             id: 4,
  //             name: 'Salina',
  //             comment: 'Smart',
  //             pic: require('../Assets/Images/avatar1.png'),
  //             Time: '7',
  //           },
  //         ],
  //         View: null,
  //       }
  //       // '../Assets/Images/video2.mp4',
  //       // '../Assets/Images/video3.mp4',
  //       // '../Assets/Images/video4.mp4',
  //     ],
  //   },
  // ];

  // const likePost = async () => {
  //   const url = `auth/post_like`;
  //   const body = {
  //     post_id: item?.id,
  //     profile_id: profileData?.id,
  //   };
  //   setloading(true);
  //   const response = await Post(url, body, apiHeader(token));
  //   // return console.log("🚀 ~ file: FeedContainer.js:59 ~ likePost ~ response:", response)
  //   setloading(false);
  //   if (response != undefined) {
  //     setLike(!like);
  //   }
  // };
  // const Views = async () => {
  //   //  const url = 'auth/post_video_detail/{id}'
  //   const url = `auth/post_video_detail/${item?.id}`;
  //   setloading(true);
  //   const response = await Get(url, token);
  //   // console.log(
  //   //   '🚀 ~ file: FeedContainer.js:43 ~ Views ~ response:',
  //   //   response?.data,
  //   // );
  //   setloading(false);
  //   if (response != undefined) {
  //     setViews(response?.data?.post_info?.views);
  //   }
  // };
  const handleHorizontalScroll = event => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.floor(offsetX / windowWidth);
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
  };

  // const getFeedData = async () => {
  //   const url = `auth/feed-post-list/${ data?.id}`;
  //   setIsLoading(true); const response = await Get(url, token);
  //   setIsLoading(false);
  //   if (response != undefined) {
  //     console.log('🚀 ~kamal ================== >>>>>>>>>>>>:', response?.data?.feeds_info);
  //     // setFeedDetail(response?.data?.feeds_info);
  //   }
  // };

  // useEffect(() => {
  //   getFeedData()
  // }, [])
  

  return (
    <>
      <FlatList
        horizontal
        data={feedDetail}
        pagingEnabled={true}
        style={{
          width: windowWidth,
        }}
        onScroll={event => {
          // handleHorizontalScroll(event);
        }}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={() => {
          return (
            <View
              style={{
                justifyContent: 'center',
                height: windowHeight * 0.4,
                alignItems: 'center',
              }}>
              <CustomText style={{color: Color.black}} isBold>
                No data Found! 
              </CustomText>
            </View>
          );
        }}
        renderItem={({item, index}) => {
          // console.log('video component here ',item)
          return (
            <FeedVideo
              item1={item}
              data={item}
              currentTime={currentTime}
              duration={duration}
              setCurrentTime={setCurrentTime}
              setDuration={setDuration}
            />
          );
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({});

export default FeedsPostScreen;
