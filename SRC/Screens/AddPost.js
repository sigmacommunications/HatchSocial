import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  ImageBackground,
  Platform,
  ToastAndroid,
  TouchableOpacity,
  Image,
  ScrollView,
  View,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import Color from '../Assets/Utilities/Color';
import CustomStatusBar from '../Components/CustomStatusBar';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {Icon} from 'native-base';
import Video from 'react-native-video';
import CustomText from '../Components/CustomText';
import CustomButton from '../Components/CustomButton';
import Header from '../Components/Header';
import navigationService from '../navigationService';
import Entypo from 'react-native-vector-icons/Entypo';
import {useSelector} from 'react-redux';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import ImagePickerModal from '../Components/ImagePickerModal';
import CustomImage from '../Components/CustomImage';
import {Get, Post} from '../Axios/AxiosInterceptorFunction';
import {useNavigation} from '@react-navigation/native';
import OptionsMenu from 'react-native-options-menu';
import MentionModal from '../Components/MentionModal';
import {Text} from 'react-native-svg';
import Feather from 'react-native-vector-icons/Feather';
import HashtagModal from '../Components/HashtagModal';

const AddPost = props => {
  const bubbleId = props?.route?.params?.bubbleId;
  console.log('🚀 ~ AddPost ~ bubbleId:', bubbleId);
  const data = props?.route?.params?.data;
  const fromHome = props?.route?.params?.fromHome;
  console.log('🚀 ~ fromHome:', fromHome);
  const themeColor = useSelector(state => state.authReducer.ThemeColor);
  const privacy = useSelector(state => state.authReducer.privacy);
  const token = useSelector(state => state.authReducer.token);
  const profileData = useSelector(state => state.commonReducer.selectedProfile);
  const [selectedTab, setSelectedTab] = useState('Tag People');
  const [image, setImage] = useState({});
  const [images, setImages] = useState(
    data?.post_images ? data?.post_images : [],
  );
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState(
    data?.caption ? data?.caption : '',
  );
  const [imagePickerVisible, setImagePickerVisible] = useState(false);
  const [videoPicker, setVideoPicker] = useState(false);
  const [hashtag, setHashtag] = useState([]);
  console.log('🚀 ~ AddPost ~ hashtag =================>:', hashtag);
  const [video, setVideo] = useState({});
  const [videos, setVideos] = useState(
    data?.post_videos ? data?.post_videos : [],
  );
  const [hashtags, setHashtags] = useState(
    data?.hashtags ? JSON.parse(data?.hashtags) : [],
  );
  console.log('🚀 ~ hashtags:', hashtags);
  const [isVisible, setIsVisible] = useState(false);
  const [text, setText] = useState('');
  // console.log('🚀 ~ text:', text.split('')[0]);

  const navigation = useNavigation();

  useEffect(() => {
    if (Object.keys(image).length > 0) {
      setImages(prev => [...prev, image]);
      setImage({});
    }
  }, [image]);

  useEffect(() => {
    if (Object.keys(video).length > 0) {
      setVideos(prev => [...prev, video]);
      setVideo({});
    }
  }, [video]);

  const AddPost = async () => {
    const url = 'auth/post';
    const formData = new FormData();
    const body = {
      caption: description,
      profile_id: profileData?.id,
    };
    if (bubbleId != undefined) {
      body.community_id = bubbleId;
    }
    if (images.length == 0 && videos.length == 0 && description == '') {
      Platform.OS == 'android'
        ? ToastAndroid.show(
            ` please fill atleast one feild`,
            ToastAndroid.SHORT,
          )
        : Alert.alert(` plaease fill atleast one feild`);
    } else {
      for (let key in body) {
        formData.append(key, body[key]);
      }
      if (images.length > 0) {
        images?.map((item, index) =>
          formData.append(`image[${index}]`, images[index]),
        );
      }
      if (videos.length > 0) {
        videos?.map((item, index) =>
          formData.append(`video[${index}]`, videos[index]),
        );
      }
      if (hashtags.length > 0) {
        hashtags?.map((item, index) =>
          formData.append(`hashtags[${index}]`, hashtags[index]),
        );
      }
     
    }

   

    setLoading(true);
    const response = await Post(url, formData, apiHeader(token));
    console.log(
      '🚀 ~ file: AddPost.js:115 ~ AddPost ~ response:',
      response?.data,
    );
    setLoading(false);
    if (response != undefined) {
      Platform.OS == 'android'
        ? ToastAndroid.show(
            'Post has been sent to bubble team for approval , it will be post in feed when approved',
            ToastAndroid.SHORT,
          )
        : alert(
            'Post has been sent to bubble team for approval , it will be post in feed when approved',
          );
      console.log('🚀 ~ AddPost ~ response:', response?.data);
      navigation.goBack();
    }
  };

  const UpdatePost = async () => {
    const url = 'auth/post';
    const formData = new FormData();
    const body = {
      caption: description,
      hashtags: hashtags[0],
      community_id: bubbleId,
    };
    if (images.length == 0 && videos.length == 0 && description == '') {
      Platform.OS == 'android'
        ? ToastAndroid.show(
            ` please fill atleast one feild`,
            ToastAndroid.SHORT,
          )
        : Alert.alert(` plaease fill atleast one feild`);
    } else {
      for (let key in body) {
        formData.append(key, body[key]);
      }
      if (images.length > 0) {
        images?.map((item, index) =>
          formData.append(`image[${index}]`, images[index]),
        );
      }
      if (videos.length > 0) {
        videos?.map((item, index) =>
          formData.append(`video[${index}]`, videos[index]),
        );
      }
      if (hashtags.length > 0) {
        hashtags?.map((item, index) =>
          formData.append(`hashtags[${index}]`, hashtags[index]),
        );
      }
    }

    setLoading(true);
    const response = await Post(url, formData, apiHeader(token));
    setLoading(false);
    if (response != undefined) {
      navigation.goBack();
    }
  };
  const UpdateFeedPost = async () => {
    const url = 'auth/post';
    const formData = new FormData();
    const body = {
      caption: description,
      // hashtags: hashtags[0],
      community_id: bubbleId,
    };
    if (images.length == 0 && videos.length == 0 && description == '') {
      Platform.OS == 'android'
        ? ToastAndroid.show(
            ` please fill atleast one feild`,
            ToastAndroid.SHORT,
          )
        : Alert.alert(` plaease fill atleast one feild`);
    } else {
      for (let key in body) {
        formData.append(key, body[key]);
      }
      if (images.length > 0) {
        images?.map((item, index) =>
          formData.append(`image[${index}]`, images[index]),
        );
      }
      if (videos.length > 0) {
        videos?.map((item, index) =>
          formData.append(`video[${index}]`, videos[index]),
        );
      }
     
    }

    setLoading(true);
    const response = await Post(url, formData, apiHeader(token));
    setLoading(false);
    if (response != undefined) {
      navigation.goBack();
    }
  };

  const Video = () => {
    if (videos.length == 0 && images.length == 0) {
      setVideoPicker(true);
    } else {
      Platform.OS == 'android'
        ? ToastAndroid.show('you can only add one image', ToastAndroid.SHORT)
        : Alert.alert('you can select only five images');
    }
  };

  const Image = () => {
    if (videos?.length == 0 && images.length < 5) {
      setImagePickerVisible(true);
    } else {
      Platform.OS == 'android'
        ? ToastAndroid.show(
            'you can select only five images.',
            ToastAndroid.SHORT,
          )
        : Alert.alert('you can select only five images');
    }
  };

  const AddFeedPost = async () => {
    const url = 'auth/post-feed';
    const formData = new FormData();
    const body = {
      caption: description,
      profile_id: profileData?.id,
    };
    if (images.length == 0 && videos.length == 0 && description == '') {
      Platform.OS == 'android'
        ? ToastAndroid.show(
            ` please fill atleast one feild`,
            ToastAndroid.SHORT,
          )
        : Alert.alert(` plaease fill atleast one feild`);
    } else {
      for (let key in body) {
        formData.append(key, body[key]);
      }
      if (images.length > 0) {
        images?.map((item, index) =>
          formData.append(`image[${index}]`, images[index]),
        );
      }
      if (videos.length > 0) {
        videos?.map((item, index) =>
          formData.append(`video[${index}]`, videos[index]),
        );
      }

      if (hashtag.length > 0) {
        hashtag?.map((item, index) =>
          formData.append(`hashtags[${index}]`, item?.id),
        );
      }
    }

      console.log(
        '🚀 ~ file: AddPost.js:108 ~ AddPost ~ formData:',
        JSON.stringify(formData, null, 2),
      );

    setLoading(true);
    const response = await Post(url, formData, apiHeader(token));
   
    setLoading(false);
    if (response != undefined) {
     
      console.log('🚀 ~ AddPost ~ response:', response?.data);
      navigation.goBack();
    }
  };

  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />
      <Header showBack Title={'ADD POST'} right />
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
          minHeight: windowHeight * 0.9,
        }}>
        <ImageBackground
          source={
            privacy == 'private'
              ? require('../Assets/Images/theme2.jpg')
              : require('../Assets/Images/Main.png')
          }
          resizeMode={'cover'}
          style={{
            width: windowWidth,
            height: windowHeight * 0.9,
            // justifyContent : 'center',
            alignItems: 'center',
          }}>
          <CustomText
            style={styles.title}
            isBold={true}
            children={' Write Captions'}
          />
          <TextInputWithTitle
            maxLength={2000}
            secureText={false}
            placeholder={'Description'}
            setText={setDescription}
            value={description}
            viewHeight={0.22}
            viewWidth={0.9}
            inputWidth={0.85}
            marginTop={moderateScale(5, 0.3)}
            color={Color.red}
            border={1}
            // marginLeft={moderateScale(10, 0.3)}
            borderColor={Color.white}
            placeholderColor={Color.themeLightGray}
            multiline
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: windowWidth * 0.9,
              paddingVertical: moderateScale(10, 0.6),
              alignItems: 'center',
              // backgroundColor:'red'
            }}>
            <CustomText
              style={[
                styles.title,
                {marginTop: moderateScale(10, 0.3), width: windowWidth * 0.5},
              ]}
              isBold={true}
              children={'Add Media'}
            />

            <OptionsMenu
              button={require('../Assets/Images/plus2.png')}
              buttonStyle={{
                width: 15,
                height: 15,
                tintColor: '#000',
              }}
              destructiveIndex={1}
              options={['Video', 'Image']}
              actions={[Video, Image]}
            />
          </View>
          <View style={styles.imagesContainer}>
            {images?.map(item => {
              return (
                <View style={styles.image}>
                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      right: 2,
                      top: 2,
                      zIndex: 1,
                    }}
                    onPress={() => {
                      images.filter(data => data?.uri != item?.uri);
                    }}>
                    <Icon
                      name={'cross'}
                      color={Color.white}
                      as={Entypo}
                      onPress={() => {
                        setImages(
                          images.filter(data => data?.uri != item?.uri),
                        );
                      }}
                    />
                  </TouchableOpacity>
                  <CustomImage
                    style={{width: '100%', height: '100%'}}
                    source={{uri: item?.uri}}
                  />
                </View>
              );
            })}
          </View>
          <View style={styles.videoContainer}>
            {videos?.map(item => {
              return (
                <>
                  <VideoComponent
                    item={item}
                    videos={videos}
                    setVideos={setVideos}
                  />
                </>
              );
            })}
          </View>

          {fromHome ? (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  // backgroundColor:'red',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: windowWidth * 0.92,
                }}>
                <CustomText
                  style={[
                    styles.title,
                    {
                      marginTop: moderateScale(10, 0.3),
                      width: windowWidth * 0.5,
                    },
                  ]}
                  isBold={true}
                  children={'Add hashtag'}
                />
                <Icon
                  onPress={() => {
                    setIsVisible(true);
                  }}
                  name={'plus'}
                  as={Feather}
                  color={Color.black}
                  size={22}
                />
              </View>
              <View style={styles.mapview}>
                {hashtag?.map((item, index) => {
                  // console.log("🚀 ~ {hashtag?.map ~ item:===========>", item)
                  return (
                    <CustomText
                      style={[
                        styles.mapText,
                        {
                          backgroundColor: themeColor[1],
                        },
                      ]}>
                      {item?.title}
                    </CustomText>
                  );
                })}
              </View>
            </>
          ) : (
            <>
              <View style={styles.hashtagview}>
                <TextInputWithTitle
                  secureText={false}
                  placeholder={'#Hashtags'}
                  setText={setText}
                  value={text}
                  viewHeight={0.06}
                  viewWidth={0.65}
                  inputWidth={0.65}
                  backgroundColor={'white'}
                  border={1}
                  borderColor={'#FFFFFF'}
                  color={themeColor[1]}
                  placeholderColor={Color.themeLightGray}
                  borderRadius={moderateScale(10, 0.3)}
                />

                <CustomButton
                  text={'Add'}
                  textColor={themeColor[1]}
                  width={windowWidth * 0.2}
                  height={windowHeight * 0.05}
                  fontSize={moderateScale(13, 0.6)}
                  onPress={() => {
                    if (text == '') {
                      Platform.OS == 'android'
                        ? ToastAndroid.show(
                            'Please add any hashtag',
                            ToastAndroid.SHORT,
                          )
                        : Alert.alert('Please add any hashtag');
                    } else if (text.split('')[0] != '#') {
                      Platform.OS == 'android'
                        ? ToastAndroid.show(
                            'Letter must be start with #',
                            ToastAndroid.SHORT,
                          )
                        : Alert.alert('Letter must be start with #');
                    } else {
                      setHashtags(prev => [text, ...prev]);
                      setText('');
                    }
                  }}
                  bgColor={['#FFFFFF', '#FFFFFF']}
                  isGradient
                  isBold={true}
                />
              </View>
              <View style={styles.mapview}>
                {hashtags?.map((item, index) => {
                  // console.log("🚀 ~ {hashtag?.map ~ item:===========>", item)
                  return (
                    <CustomText
                      style={[
                        styles.mapText,
                        {
                          backgroundColor: themeColor[1],
                        },
                      ]}>
                      {item}
                    </CustomText>
                  );
                })}
              </View>
            </>
          )}

          <View style={styles.postView}>
            <CustomButton
              text={
                loading ? (
                  <ActivityIndicator color={themeColor[1]} size={'small'} />
                ) : data ? (
                  'Update'
                ) : (
                  'Post'
                )
              }
              textColor={themeColor[1]}
              width={windowWidth * 0.7}
              height={windowHeight * 0.06}
              // marginTop={moderateScale(40, 0.3)}
              onPress={() => {
                if (data) {
                 fromHome ? UpdateFeedPost() : UpdatePost();
                } else {
                  fromHome ? AddFeedPost() : AddPost();
                }
              }}
              bgColor={['#FFFFFF', '#FFFFFF']}
              borderRadius={moderateScale(30, 0.3)}
              isGradient
              isBold={true}
            />
          </View>
        </ImageBackground>
      </ScrollView>
      <ImagePickerModal
        show={imagePickerVisible}
        setShow={setImagePickerVisible}
        setFileObject={setImage}
        type={'photo'}
      />
      <ImagePickerModal
        show={videoPicker}
        type={'video'}
        setShow={setVideoPicker}
        setFileObject={setVideo}
      />
      <HashtagModal
        setHashtag={setHashtag}
        hashtag={hashtag}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
    </>
  );
};

const styles = ScaledSheet.create({
  text: {
    fontSize: moderateScale(12, 0.6),
    color: '#353434',
    width: windowWidth * 0.9,
    textAlign: 'left',
    marginTop: moderateScale(10, 0.3),
  },

  imagesContainer: {
    width: windowWidth,
    paddingHorizontal: moderateScale(10, 0.6),
    flexDirection: 'row',
    marginVertical: moderateScale(5, 0.3),
    flexWrap: 'wrap',
    // justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'red',
  },
  videoContainer: {
    width: windowWidth,
    paddingHorizontal: moderateScale(10, 0.6),
    flexDirection: 'row',
    marginVertical: moderateScale(5, 0.3),
    flexWrap: 'wrap',
    // justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'red',
  },
  conatiner: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.0009,
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: moderateScale(20, 0.3),
  },
  image: {
    width: windowWidth * 0.16,
    height: windowWidth * 0.16,
    borderRadius: moderateScale(10, 0.6),
    overflow: 'hidden',
    margin: moderateScale(5, 0.6),
    // justifyContent:'center',
    // alignItems:'center'
  },

  title: {
    fontSize: moderateScale(18, 0.6),
    color: '#353434',
    // backgroundColor:'red',
    width: windowWidth * 0.9,
    textAlign: 'left',
    marginTop: moderateScale(15, 0.3),
  },
  plus: {
    width: windowWidth * 0.16,
    height: windowWidth * 0.16,
    backgroundColor: 'white',
    borderRadius: moderateScale(10, 0.6),
    marginHorizontal: moderateScale(5, 0.3),
    alignItems: 'center',
    justifyContent: 'center',
    // marginLeft: moderateScale(18, 0.3),
    // alignSelf: 'flex-start',
    // marginTop: moderateScale(10, 0.3),
  },
  hashtagview: {
    flexDirection: 'row',
    paddingVertical: moderateScale(5, 0.6),
    width: windowWidth,
    paddingHorizontal: moderateScale(15, 0.6),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mapview: {
    width: windowWidth,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: moderateScale(10, 0.6),
    paddingVertical: moderateScale(5, 0.6),
  },
  mapText: {
    color: 'white',
    fontSize: moderateScale(13, 0.6),
    marginHorizontal: moderateScale(5, 0.3),
    marginVertical: moderateScale(5, 0.3),
    padding: moderateScale(5, 0.6),
    borderRadius: moderateScale(10, 0.6),
  },
  postView: {
    position: 'absolute',
    bottom: 40,
    width: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddPost;

const VideoComponent = ({item, videos, setVideos}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <View style={styles.image}>
      <TouchableOpacity
        style={{
          position: 'absolute',
          right: 2,
          top: 2,
          zIndex: 2,
          // backgroundColor: 'green',
        }}
        onPress={() => {
          setVideos(videos.filter(data => data?.uri != item?.uri));
        }}>
        <Icon
          name={'cross'}
          color={Color.black}
          as={Entypo}
          onPress={() => {
            setVideos(videos.filter(data => data?.uri != item?.uri));
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setIsPlaying(!isPlaying);
        }}
        style={{
          position: 'absolute',
          zIndex: 1,
          // backgroundColor:'red',
          width: windowWidth * 0.12,
          height: windowWidth * 0.12,
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: 'green',
          alignSelf: 'center',
        }}>
        {!isPlaying && (
          <Icon
            onPress={() => {
              setIsPlaying(!isPlaying);
            }}
            name={'controller-play'}
            as={Entypo}
            size={10}
            color={'rgba(255,255,255,.9)'}
          />
        )}
      </TouchableOpacity>
      <Video
        // muted
        paused={!isPlaying}
        repeat={true}
        // controls={true}
        source={{uri: item?.uri}}
        // ref={videoRef}
        // onProgress={x => {
        //   console.log(
        //     '🚀 ~ file: VideoController.js:46 ~ VideoController ~ x:',
        //     x,
        //   );
        //   setProgress(x);
        // }}
        // onBuffer={() => console.log('buffering video')}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: Color.white,
        }}
      />
    </View>
  );
};
