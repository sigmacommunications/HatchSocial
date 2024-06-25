import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {windowHeight, windowWidth} from '../Utillity/utils';
import React, {useRef, useState} from 'react';
import FeedContainer from '../Components/FeedContainer';
import {FlatList, ScrollView} from 'native-base';
import CustomText from '../Components/CustomText';
import {moderateScale} from 'react-native-size-matters';
import {Icon} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import Color from '../Assets/Utilities/Color';
import CustomStatusBar from '../Components/CustomStatusBar';
import Header from '../Components/Header';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import CustomImage from '../Components/CustomImage';
import {baseUrl} from '../Config';

const Feeds = props => {
  const navigation = useNavigation();
  const privacy = useSelector(state => state.authReducer.privacy);
  const themeColor = useSelector(state => state.authReducer.ThemeColor);
  const image = props?.route?.params?.image;
  const uri = props?.route?.params?.id;
  const posts = props?.route?.params?.posts;
  console.log('🚀 ~ Feeds ~ posts===============>:', posts);
  const PostData = props?.route?.params?.PostData;

  const index = props?.route?.params?.index;

  const [selectedTab, SetSelectedTab] = useState('Fitness');
  const [isLoading, setIsLoading] = useState(false);
  const onViewableItemsChanged = ({viewableItems}) => {
    // Do stuff
  };
  const viewabilityConfigCallbackPairs = useRef([{onViewableItemsChanged}]);

  feedsArray = [
    {
      Image: require('../Assets/Images/video1.mp4'),
      likes: 2,
      dislikes: 4,
      downloads: 4,
      enabled: true,
      postUser: {
        name: 'Johnathon',
        city: ' new york',
        profilepicture: require('../Assets/Images/avatar3.png'),
      },
      views: 22,
      comments: 20,
      description: 'lorem upsum',

      commentArray: [
        {
          name: 'test',
          date: 20 / 2 / 2022,
          message: 'lorem upsum',
          image: require('../Assets/Images/avatar2.png'),
        },
      ],
    },

    {
      Image: require('../Assets/Images/video1.mp4'),
      likes: 2,
      dislikes: 4,
      downloads: 4,
      enabled: true,
      postUser: {
        name: 'steven',
        city: 'new york',
        profilepicture: require('../Assets/Images/avatar2.png'),
      },

      views: 22,
      comments: 20,
      description: 'lorem upsum',

      commentArray: [
        {
          name: 'test',
          date: 20 / 2 / 2022,
          message: 'lorem upsum',
          image: require('../Assets/Images/avatar2.png'),
        },
      ],
    },
  ];
 
  return (
    <View
      style={{
        width: windowWidth,
      
      }}>
      <FlatList
        pagingEnabled
        decelerationRate={'normal'}
        scrollEventThrottle={16}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        showsVerticalScrollIndicator={false}
     
        data={posts?.slice(index)}
        renderItem={({item, index}) => {
          return (
            <FeedContainer source={item?.post_videos[0]?.name} item={item} />
          );
        }}
      />
    </View>
  );
};

export default Feeds;
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

{
  /* <FlatList
          vertical={true}
          showsVerticalScrollIndicator={true}
          data={feedsArray}
          contentContainerStyle={{
            zIndex: 0,
          }}
          renderItem={({item, index}) => { */
}
{
  /* return */
}
{
  /* }} */
}
{
  /* /> */
}
