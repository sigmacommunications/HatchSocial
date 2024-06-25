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
import {moderateScale, } from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import {Divider, Icon} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import PostComponent from '../Components/PostComponent';

import {useNavigation} from '@react-navigation/native';
import {Get, Post} from '../Axios/AxiosInterceptorFunction';


const MyPost = props => {
  const item = props?.route?.params?.item;
  const profileData = useSelector(state => state.commonReducer.selectedProfile);
  const privacy = useSelector(state => state.authReducer.privacy);
  const token = useSelector(state => state.authReducer.token);
  const [isLoading, setIsLoading] = useState(false);
  const [postData, setPostData] = useState([]);
  console.log("🚀 ~ MyPost ~ postData========================>:", postData)

  const navigation = useNavigation();

// const PostData = [
  //   {
  //     id: 1,
  //     Name: 'Travelling Tour Posted a video to playlist Special Content',
  //     date: '17 July',
  //     desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry',
  //     profileImage: require('../Assets/Images/avatar4.png'),
  //     image: require('../Assets/Images/travel.jpg'),
  //     video: null,
  //     Like: 157,
  //     love: 1100,
  //     comment: 405,
  //     commentData: [
  //       {
  //         id: 1,
  //         name: 'James',
  //         comment: 'Looking Geourgous',
  //         pic: require('../Assets/Images/avatar6.jpg'),
  //         Time: '16',
  //       },
  //       {
  //         id: 2,
  //         name: 'Levik',
  //         comment: 'Nice',
  //         pic: require('../Assets/Images/avatar4.png'),
  //         Time: '3',
  //       },
  //       {
  //         id: 3,
  //         name: 'Frank',
  //         comment: 'Good',
  //         pic: require('../Assets/Images/avatar3.png'),
  //         Time: '10',
  //       },
  //       {
  //         id: 4,
  //         name: 'Salina',
  //         comment: 'Killer',
  //         pic: require('../Assets/Images/avatar1.png'),
  //         Time: '5',
  //       },
  //     ],
  //     View: null,
  //   },
  //   {
  //     id: 2,
  //     Name: 'We hope you got to enjoy the great weather today, Vienna! 🥂✨ by WaitsForYou ',
  //     date: '24 Aug',
  //     desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry',
  //     profileImage: require('../Assets/Images/avatar3.png'),
  //     image: require('../Assets/Images/art.png'),
  //     video: null,
  //     // video: 'https://vjs.zencdn.net/v/oceans.mp4',
  //     Like: 357,
  //     love: 4100,
  //     comment: 205,
  //     commentData: [
  //       {
  //         id: 1,
  //         name: 'James',
  //         comment: 'Killer',
  //         pic: require('../Assets/Images/avatar6.jpg'),
  //         Time: '1',
  //       },
  //       {
  //         id: 2,
  //         name: 'Levik',
  //         comment: 'Nice',
  //         pic: require('../Assets/Images/avatar4.png'),
  //         Time: '3',
  //       },
  //       {
  //         id: 3,
  //         name: 'Frank',
  //         comment: 'Superb',
  //         pic: require('../Assets/Images/avatar3.png'),
  //         Time: '8',
  //       },
  //       {
  //         id: 4,
  //         name: 'Salina',
  //         comment: 'Beauty',
  //         pic: require('../Assets/Images/avatar1.png'),
  //         Time: '5',
  //       },
  //     ],
  //     View: 1084,
  //   },

  //   {
  //     id: 3,
  //     Name: 'Traveling Post We hope you got to enjoy the great weather today Vienna',
  //     date: '1 May',
  //     desc: 'The beauty of our private island paradise rests in its enhanced interior decorum. Minimalist, monochromatic interior design emphasizes',
  //     profileImage: require('../Assets/Images/avatar4.png'),
  //     image: null,
  //     video: null,
  //     Like: 357,
  //     love: 4100,
  //     comment: 205,
  //     commentData: [
  //       {
  //         id: 1,
  //         name: 'James',
  //         comment: 'Nice',
  //         pic: require('../Assets/Images/avatar6.jpg'),
  //         Time: '8',
  //       },
  //       {
  //         id: 2,
  //         name: 'Levik',
  //         comment: 'Good',
  //         pic: require('../Assets/Images/avatar4.png'),
  //         Time: '6',
  //       },
  //       {
  //         id: 3,
  //         name: 'Frank',
  //         comment: 'Looking',
  //         pic: require('../Assets/Images/avatar3.png'),
  //         Time: '3',
  //       },
  //       {
  //         id: 4,
  //         name: 'Salina',
  //         comment: 'Smart',
  //         pic: require('../Assets/Images/avatar1.png'),
  //         Time: '7',
  //       },
  //     ],
  //     View: null,
  //   },
  //   {
  //     id: 4,
  //     Name: 'Travelling Tour Posted We hope you got to enjoy the great',
  //     date: '4 Dec',
  //     desc: `📍Italy Gorgeous pastel buildings picture-perfect harbors, and crystal-clear waters — experience everything this Italian seaside oasis has to offer on our trip to Northern Italy`,
  //     profileImage: require('../Assets/Images/avatar1.png'),
  //     image: require('../Assets/Images/travel3.jpg'),
  //     video: null,
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
  //   },
  // ];

  const postList = async () => {
    const url = `auth/post-by-profile/${profileData?.id}`;
    setIsLoading(true);
    const response = await Get(url, token);
    setIsLoading(false);
    if (response != undefined) {
      console.log(
        '🚀 ~ postList ~ response=======================>:',
        JSON.stringify(response?.data , null ,2),
      );
      setPostData(response?.data?.post_list);
    }
  };

  useEffect(() => {
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
        <CustomText
          isBold
          style={{
            fontSize: moderateScale(18, 0.6),
            color: Color.black,
          }}>
          my post
        </CustomText>
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
            <FlatList
              data={postData}
              contentContainerStyle={{
               paddingBottom: moderateScale(80, 0.3),
              }}
              renderItem={({item, index}) => {
                return <PostComponent data={item} fromMyPost={true} setData={setPostData} wholeData={postData} />;
              }}
            />
          </>
        )}
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  headerview1: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: windowWidth,
    height: windowHeight * 0.07,
    backgroundColor: Color.white,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: Color.veryLightGray,
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

  text: {fontSize: moderateScale(12, 0.6), color: 'black'},
});

export default MyPost;
