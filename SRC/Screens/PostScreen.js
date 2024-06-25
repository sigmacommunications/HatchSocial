import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ImageBackground,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomStatusBar from '../Components/CustomStatusBar';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import {Icon} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import PostComponent from '../Components/PostComponent';
import navigationService from '../navigationService';
import {useNavigation} from '@react-navigation/native';
import {Get, Post} from '../Axios/AxiosInterceptorFunction';
import {Image} from 'react-native-svg';
import {baseUrl} from '../Config';
import CustomImage from '../Components/CustomImage';
import moment from 'moment';

const PostScreen = props => {
  const item = props?.route?.params?.item;
  // console.log(`${baseUrl}/${item?.image}` , item?.id);
  const profileData = useSelector(state => state.commonReducer.selectedProfile);
  const privacy = useSelector(state => state.authReducer.privacy);
  const token = useSelector(state => state.authReducer.token);
  const [isLoading, setIsLoading] = useState(false);
  const [feedDetails, setFeedDetails] = useState({});
  const [isFollow, setIsFollow] = useState(null);
  const [postData, setPostData] = useState([]);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'Top'},
    {key: 'second', title: 'Latest'},
  ]);
  const navigation = useNavigation();

  const PostData = [
    {
      id: 1,
      Name: 'Travelling Tour Posted a video to playlist Special Content',
      date: '17 July',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry',
      profileImage: require('../Assets/Images/avatar4.png'),
      post_images: require('../Assets/Images/travel.jpg'),
      post_videos: 'https://www.youtube.com/watch?v=qD2PTHSRBYA&list=RD6nfghmEEpyY&index=8',
      Like: 157,
      love: 1100,
      comment: 405,
      commentData: [
        {
          id: 1,
          name: 'James',
          comment: 'Looking Geourgous',
          pic: require('../Assets/Images/avatar6.jpg'),
          Time: '16',
        },
        {
          id: 2,
          name: 'Levik',
          comment: 'Nice',
          pic: require('../Assets/Images/avatar4.png'),
          Time: '3',
        },
        {
          id: 3,
          name: 'Frank',
          comment: 'Good',
          pic: require('../Assets/Images/avatar3.png'),
          Time: '10',
        },
        {
          id: 4,
          name: 'Salina',
          comment: 'Killer',
          pic: require('../Assets/Images/avatar1.png'),
          Time: '5',
        },
      ],
      View: null,
    },
    {
      id: 2,
      Name: 'We hope you got to enjoy the great weather today, Vienna! 🥂✨ by WaitsForYou ',
      date: '24 Aug',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry',
      profileImage: require('../Assets/Images/avatar3.png'),
      post_images: require('../Assets/Images/art.png'),
      // video: null,
      post_videos: 'https://vjs.zencdn.net/v/oceans.mp4',
      Like: 357,
      love: 4100,
      comment: 205,
      commentData: [
        {
          id: 1,
          name: 'James',
          comment: 'Killer',
          pic: require('../Assets/Images/avatar6.jpg'),
          Time: '1',
        },
        {
          id: 2,
          name: 'Levik',
          comment: 'Nice',
          pic: require('../Assets/Images/avatar4.png'),
          Time: '3',
        },
        {
          id: 3,
          name: 'Frank',
          comment: 'Superb',
          pic: require('../Assets/Images/avatar3.png'),
          Time: '8',
        },
        {
          id: 4,
          name: 'Salina',
          comment: 'Beauty',
          pic: require('../Assets/Images/avatar1.png'),
          Time: '5',
        },
      ],
      View: 1084,
    },

    {
      id: 3,
      Name: 'Traveling Post We hope you got to enjoy the great weather today Vienna',
      date: '1 May',
      desc: 'The beauty of our private island paradise rests in its enhanced interior decorum. Minimalist, monochromatic interior design emphasizes',
      profileImage: require('../Assets/Images/avatar4.png'),
      post_images: null,
      post_videos: 'https://www.youtube.com/watch?v=qD2PTHSRBYA&list=RD6nfghmEEpyY&index=8',
    
      // video: null,
      Like: 357,
      love: 4100,
      comment: 205,
      commentData: [
        {
          id: 1,
          name: 'James',
          comment: 'Nice',
          pic: require('../Assets/Images/avatar6.jpg'),
          Time: '8',
        },
        {
          id: 2,
          name: 'Levik',
          comment: 'Good',
          pic: require('../Assets/Images/avatar4.png'),
          Time: '6',
        },
        {
          id: 3,
          name: 'Frank',
          comment: 'Looking',
          pic: require('../Assets/Images/avatar3.png'),
          Time: '3',
        },
        {
          id: 4,
          name: 'Salina',
          comment: 'Smart',
          pic: require('../Assets/Images/avatar1.png'),
          Time: '7',
        },
      ],
      View: null,
    },
    {
      id: 4,
      Name: 'Travelling Tour Posted We hope you got to enjoy the great',
      date: '4 Dec',
      desc: `📍Italy Gorgeous pastel buildings picture-perfect harbors, and crystal-clear waters — experience everything this Italian seaside oasis has to offer on our trip to Northern Italy`,
      profileImage: require('../Assets/Images/avatar1.png'),
      post_images: require('../Assets/Images/travel3.jpg'),
      post_videos: null,
      Like: 457,
      love: 1800,
      comment: 905,
      commentData: [
        {
          id: 1,
          name: 'James',
          comment: 'Killer',
          pic: require('../Assets/Images/avatar6.jpg'),
          Time: '2',
        },
        {
          id: 2,
          name: 'Levik',
          comment: 'Nice',
          pic: require('../Assets/Images/avatar4.png'),
          Time: '20',
        },
        {
          id: 3,
          name: 'Frank',
          comment: 'Looking Beauty',
          pic: require('../Assets/Images/avatar3.png'),
          Time: '15',
        },
        {
          id: 4,
          name: 'Salina',
          comment: 'Nice',
          pic: require('../Assets/Images/avatar1.png'),
          Time: '3',
        },
      ],
      View: null,
    },
  ];

  const Follow = async () => {
    const body = {
      profile_id: profileData?.id,
      feed_id: item?.id,
    };
    // return console.log("🚀 ~ Follow ~ body:", body)

    const url = 'auth/feed-follow';
    setIsLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setIsLoading(false);
    if (response != undefined) {
      console.log('🚀 ~ Follow ~ response:', response?.data);
    }
  };
  const getDetails = async () => {
    const url = `auth/feed-detail/${item?.id}`;
    setIsLoading(true);
    // console.log('🚀 ~ getPosts ~ url:', url);
    const response = await Get(url, token);
    setIsLoading(false);
    if (response != undefined) {
      //  console.log(
      //   '🚀 ~ getPosts ~ response:================>',
      //   response?.data?.feeds_info,
      // );
      setFeedDetails(response?.data?.feeds_info);
      setIsFollow(response?.data?.feeds_info?.follow);
    }
  };

  const postList = async () => {
    const url = `auth/post-by-feed/${item?.id}?profile_id=${profileData?.id}`;
    setIsLoading(true);
    const response = await Get(url, token);
    setIsLoading(false);
    if (response != undefined) {
      console.log(
        '🚀 ~ postList ~ response=======================>:',
        response?.data?.feeds_info?.data,
      );
      setPostData(response?.data?.feeds_info?.data);
    }
  };

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabBar}
      labelStyle={styles.label}
    />
  );

  const FirstRoute = () => (
    <FlatList
      // scrollEnabled={false}
      data={postData}
      contentContainerStyle={{
        paddingBottom: moderateScale(80, 0.3),
      }}
      renderItem={({item, index}) => {
        console.log("🚀 ~ PostScreen ~ item==========>:", item)
        return (
          <PostComponent
            data={item}
            setData={setPostData}
            wholeData={postData}
          />
        );
      }}
    />
  );

  const SecondRoute = () => (
    <FlatList
      data={postData}
      // scrollEnabled={false}
      // data={postData.filter((item , index)=> moment(item?.created_at).fromNow())}
      contentContainerStyle={{
        paddingBottom: moderateScale(80, 0.3),
      }}
      renderItem={({item, index}) => {
        return <PostComponent data={item} />;
      }}
    />
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  useEffect(() => {
    getDetails();
    postList();
  }, []);

  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />
      {/* Header START  */}
      <View style={styles.headerview1}>
        <TouchableOpacity
          style={{
            // backgroundColor:'red',
            position: 'absolute',
            left: 10,
          }}
          activeOpacity={0.8}
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon
            as={AntDesign}
            name="arrowleft"
            size={28}
            color={Color.black}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </TouchableOpacity>
      </View>
      {/* Header END */}

      <ImageBackground
        source={
          privacy == 'private'
            ? require('../Assets/Images/theme2.jpg')
            : require('../Assets/Images/Main.png')
        }
        resizeMode={'cover'}
        style={{
          width: windowWidth * 1,
          height: windowHeight,
        }}>
        {isLoading ? (
          <View
            style={{
              width: windowWidth,
              height: windowHeight * 0.8,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator color={Color.white} size={'large'} />
            <CustomText
              style={{
                color: Color.white,
                fontSize: moderateScale(13, 0.6),
              }}>
              Please wait
            </CustomText>
          </View>
        ) : (
          <>
            <View style={styles.container}>
              <View style={styles.LinearGradient1}>
                <CustomImage
                  resizeMode="cover"
                  source={{
                    uri: `${baseUrl}/${feedDetails?.image}`,
                  }}
                  style={{height: '100%', width: '100%'}}
                />
              </View>
              <View
                style={{
                  width: windowWidth * 0.5,
                  marginLeft: moderateScale(15, 0.3),
                }}>
                <CustomText
                  style={{
                    fontSize: moderateScale(18, 0.6),
                    color: Color.black,
                    textAlign: 'left',
                  }}
                  isBold>
                  {feedDetails?.name}
                </CustomText>
                <CustomText
                  style={{
                    fontSize: moderateScale(14, 0.6),
                    color: Color.veryLightGray,
                    textAlign: 'left',
                  }}>
                  {feedDetails?.total_posts} Posts
                </CustomText>
              </View>
              {profileData?.id != feedDetails?.profile_id && (
                <TouchableOpacity onPress={() => Follow()} activeOpacity={0.8}>
                  <LinearGradient
                    style={styles.LinearGradient}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    colors={['#e9f4ff', '#e8f4ff']}>
                    <CustomText
                      isBold
                      style={{
                        fontSize: moderateScale(15, 0.6),
                        color: '#0942a0',
                      }}>
                      {isLoading ? (
                        <ActivityIndicator size={'small'} color={'#0942a0'} />
                      ) : isFollow instanceof Object ? (
                        'Following'
                      ) : (
                        'follow'
                      )}
                    </CustomText>
                  </LinearGradient>
                </TouchableOpacity>
              )}
            </View>

            <TabView
              navigationState={{index, routes}}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={{width: windowWidth}}
              renderTabBar={renderTabBar}
            />
          </>
        )}
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: windowHeight * 0.04,
    width: windowWidth * 0.7,
    padding: 5,
    fontSize: moderateScale(15, 0.6),
  },
  indicator: {
    backgroundColor: Color.black,
  },
  tabBar: {
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 15,
    color: Color.black,
  },
  headerview1: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: windowWidth,
    height: windowHeight * 0.07,
    backgroundColor: Color.white,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: Color.veryLightGray,
    // position:'absolute',
    // left:20,
  },
  headerview2: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: windowWidth * 0.82,
    height: windowHeight * 0.05,
    borderRadius: moderateScale(20, 0.3),
    backgroundColor: '#eff3f6',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    paddingHorizontal: moderateScale(10, 0.6),
    // paddingLeft: moderateScale(15, 0.6),
    paddingTop: moderateScale(10, 0.6),
    width: windowWidth,
    backgroundColor: Color.white,
    alignItems: 'center',
  },
  LinearGradient1: {
    width: windowWidth * 0.19,
    height: windowHeight * 0.09,
    // alignItems: 'center',
    // justifyContent: 'center',
    borderRadius: moderateScale(15, 0.3),
    overflow: 'hidden',
    // backgroundColor:'red'
  },
  LinearGradient: {
    padding: moderateScale(10, 0.6),
    // width: windowWidth * 0.18,
    // height: windowHeight * 0.05,
    backgroundColor: Color.black,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(10, 0.3),
    // marginRight:moderateScale(10,.3)
  },
});

export default PostScreen;
