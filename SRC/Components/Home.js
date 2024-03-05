import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomImage from './CustomImage';
import CustomText from './CustomText';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import {windowWidth, windowHeight} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import navigationService from '../navigationService';
import {FlatListComponent} from 'react-native';
import {Get} from '../Axios/AxiosInterceptorFunction';
import {useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import Video from 'react-native-video';

const Home = ({bubbleId}) => {
  const profileData = useSelector(state => state.commonReducer.selectedProfile);
  const token = useSelector(state => state.authReducer.token);
  console.log("🚀 ~ Home ~ token:", token)
  const [selectedTab, setSelectedTab] = useState('Activity');
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isFocused = useIsFocused();

  const getPosts = async () => {
    const url = `auth/post/${bubbleId}?profile_id=${profileData?.id}`;
    setIsLoading(true);
    const response = await Get(url, token);
    setIsLoading(false);
    if (response != undefined) {
     console.log("🚀 ~ file: Home.js:36 ~ getPosts ~ response:", response?.data?.post_info[0]?.post_videos)
      setPosts(
        response?.data?.post_info.filter(item => item?.post_videos?.length > 0),
      );
    }
  };


  useEffect(() => {
    getPosts();
  }, [isFocused]);

  const [activityData, setactivityData] = useState([
    {
      id: 2,
      url: require('../Assets/Images/activity1.png'),
    },
    {
      id: 3,
      url: require('../Assets/Images/activity2.png'),
    },
    {
      id: 4,
      url: require('../Assets/Images/activity3.png'),
    },
    {
      id: 5,
      url: require('../Assets/Images/activity1.png'),
    },
    {
      id: 6,
      url: require('../Assets/Images/activity2.png'),
    },

    {
      id: 7,
      url: require('../Assets/Images/activity3.png'),
    },
  ]);

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          marginLeft: moderateScale(10, 0.3),
          marginRight: moderateScale(10, 0.3),
        }}>
        {/* <View style={styles.image1}>
          <CustomImage
            source={require('../Assets/Images/fitness2.png')}
            style={{
              height: '100%',
              width: '100%',
            }}
            resizeMode={'stretch'}
            //   resizeMode="s"
          />
        </View> */}
        {/* <View>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.profileImage}>
              <CustomImage
                source={require('../Assets/Images/fitness2.png')}
                style={{
                  height: '100%',
                  width: '100%',
                }}
                //   resizeMode={'stretch'}
              />
            </View>
            <View>
              <CustomText
                numberOfLines={1}
                children={'Meko Nakahara'}
                style={{
                  fontSize: moderateScale(12, 0.6),
                  color: 'black',
                  marginTop: moderateScale(12, 0.3),
                  marginRight: moderateScale(8, 0.3),
                  textAlign: 'left',
                }}
                isBold
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: windowWidth * 0.3,
                }}>
                <CustomText
                  numberOfLines={1}
                  children={'New York, USA'}
                  style={{
                    fontSize: moderateScale(10, 0.6),
                    color: Color.veryLightGray,
                    textAlign: 'center',
                  }}
                />
                <CustomText
                  numberOfLines={1}
                  children={'1h Ago'}
                  style={{
                    fontSize: moderateScale(10, 0.6),
                    color: Color.veryLightGray,
                    textAlign: 'right',
                  }}
                />
              </View>
            </View>
          </View>
          <CustomText style={styles.text} numberOfLines={9}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </CustomText>
        </View> */}
      </View>
      {/* <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: moderateScale(10, 0.3),
        }}>
        <CustomText
          numberOfLines={1}
          children={'Activity'}
          style={{
            ...styles.activityText,
            ...{
              borderBottomColor:
                selectedTab == 'Activity' ? Color.white : 'black',
            },
          }}
          onPress={() => {
            setSelectedTab('Activity');
          }}
          isBold
        />
        <CustomText
          numberOfLines={1}
          children={'Archive'}
          style={{
            ...styles.activityText,
            ...{
              borderBottomColor:
                selectedTab == 'Archive' ? Color.white : 'black',
            },
          }}
          onPress={() => {
            setSelectedTab('Archive');
          }}
          isBold
        />
      </View> */}

      <View style={styles.activityContainer}>
        {isLoading ? (
          <ActivityIndicator size={'large'} color={'white'} />
        ) : (
          <FlatList
            numColumns={3}
            data={posts}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              // return console.log("🚀 ~ file: Home.js:210 ~ Home ~ item:", item)
              return (
                <TouchableOpacity
                  style={styles.activityImage}
                  onPress={() => {
                    navigationService.navigate('Feeds', {
                      id: item?.post_videos[0]?.name,
                      item: item,
                      posts: posts,
                      index: index,
                    });
                  }}>
                  <Video
                    repeat={true}
                    resizeMode={'cover'}  
                    mute={true}
                    // controls={true}
                    // source={require('../Assets/Images/video1.mp4')}
                    source={{uri:item?.post_videos[0]?.name}}

                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: Color.white,
                    }}
                  />
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>
    </>
  );
};

export default Home;

const styles = ScaledSheet.create({
  conatiner: {
    width: windowWidth * 0.9,
    paddingVertical: moderateScale(15, 0.6),
    backgroundColor: Color.white,
    alignSelf: 'center',
    borderRadius: moderateScale(15, 0.6),
    alignItems: 'center',
    marginTop: moderateScale(20, 0.3),
  },
  textInput: {
    height: windowHeight * 0.05,
    width: windowWidth * 0.7,
    borderWidth: 1,
    borderColor: Color.darkGray,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  bottomImage: {
    width: windowWidth * 0.4,
    backgroundColor: 'green',
  },

  textContainer: {
    marginTop: moderateScale(20, 0.3),
  },

  Heading: {
    fontSize: moderateScale(20, 0.3),
    color: '#ffffff',
    alignSelf: 'flex-start',
  },

  txt3: {
    fontSize: moderateScale(10, 0.6),
    alignSelf: 'center',
    fontWeight: '600',
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth * 0.9,
  },
  txt4: {
    color: Color.purple,
    fontSize: moderateScale(15, 0.6),
    marginTop: moderateScale(8, 0.3),
    fontWeight: 'bold',
  },
  txt5: {
    color: Color.white,
    marginTop: moderateScale(10, 0.3),
    fontSize: moderateScale(12, 0.6),
  },
  dropDown: {
    backgroundColor: Color.red,
  },
  checkIcon: {
    backgroundColor: Color.white,
    borderRadius: 20,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    width: 25,
    padding: moderateScale(3, 0.6),
  },
  followCount: {
    fontSize: moderateScale(20, 0.6),
    color: 'black',
    marginRight: moderateScale(8, 0.3),
    //   width: windowWidth*0.9,
    textAlign: 'center',
  },
  followText: {
    fontSize: moderateScale(14, 0.6),
    color: Color.white,
    marginRight: moderateScale(8, 0.3),
    textAlign: 'center',
  },
  downIcon: {
    backgroundColor: Color.white,
    borderRadius: (windowWidth * 0.11) / 2,
    height: windowWidth * 0.11,
    justifyContent: 'center',
    marginLeft: moderateScale(8, 0.3),
    alignItems: 'center',
    width: windowWidth * 0.11,
    padding: moderateScale(3, 0.6),
  },
  text: {
    fontSize: moderateScale(9, 0.6),
    color: '#353434',
    width: windowWidth * 0.45,
    textAlign: 'left',
    marginTop: moderateScale(5, 0.3),
    marginLeft: moderateScale(10, 0.3),
  },
  profileImage: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    backgroundColor: Color.white,
    overflow: 'hidden',
    borderColor: 'yellow',
    borderWidth: 1,
    borderRadius: (windowWidth * 0.1) / 2,
    marginTop: moderateScale(12, 0.3),
    marginLeft: moderateScale(5, 0.3),
    marginRight: moderateScale(8, 0.3),
  },
  image1: {
    width: windowWidth * 0.45,
    height: windowHeight * 0.2,
    backgroundColor: Color.white,
    overflow: 'hidden',
    borderRadius: moderateScale(10, 0.6),
    marginTop: moderateScale(12, 0.3),
  },
  image2: {
    width: windowWidth * 0.13,
    height: windowWidth * 0.13,
    backgroundColor: Color.white,
    overflow: 'hidden',
    borderColor: 'yellow',
    borderWidth: 1,
    borderRadius: (windowWidth * 0.13) / 2,
    marginTop: moderateScale(12, 0.3),
    marginLeft: moderateScale(5, 0.3),
    marginRight: moderateScale(8, 0.3),
  },
  eventText: {
    fontSize: moderateScale(14, 0.6),

    marginHorizontal: moderateScale(8, 0.3),
    width: windowWidth * 0.22,
    marginLeft: moderateScale(10, 0.3),
    paddingVertical: moderateScale(5, 0.6),
    borderRadius: moderateScale(5, 0.6),

    textAlign: 'center',
    alignItems: 'center',
  },
  activityText: {
    fontSize: moderateScale(17, 0.6),
    color: Color.white,
    width: windowWidth * 0.4,
    height: windowHeight * 0.04,
    textAlign: 'center',
    borderBottomWidth: 1.5,
  },
  activityContainer: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.55,
    justifyContent: 'center',
    alignSelf: 'center',
    // alignItems:'center',
    marginTop: moderateScale(20, 0.3),
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  activityImage: {
    height: windowHeight * 0.2,
    width: windowWidth * 0.285,
    backgroundColor: Color.white,
    overflow: 'hidden',
    marginVertical: moderateScale(5, 0.3),
    marginHorizontal: moderateScale(2, 0.3),
  },
  card: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.2,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: moderateScale(10, 0.3),
    marginBottom: moderateScale(10, 0.3),
    alignSelf: 'center',
  },
});
