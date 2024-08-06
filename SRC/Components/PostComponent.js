import {
  View,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  video,
  Alert,
  ToastAndroid,
  Platform,
SafeAreaView,
  Text,
  TouchableHighlight,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import {Icon} from 'native-base';
import {Divider} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import CustomImage from './CustomImage';
import ShowMoreAndShowLessText from './ShowMoreAndShowLessText';
import VideoController from './VideoController';
import OptionsMenu from 'react-native-options-menu';
import RBSheet from 'react-native-raw-bottom-sheet';
import {FlatList} from 'react-native';
import navigationService from '../navigationService';
import {baseUrl} from '../Config';
import {Delete, Post} from '../Axios/AxiosInterceptorFunction';
import {useSelector} from 'react-redux';
import moment from 'moment';
import Modal from 'react-native-modal';
import TextInputWithTitle from './TextInputWithTitle';
import Entypo from 'react-native-vector-icons/Entypo';
// import AntDesign from 'react-native-vector-icons/AntDesign';
import FeedVideo from './FeedVideo';
import VideoComponent from '../Components/VideoComponent';
import ImageSlider from 'react-native-image-slider';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomButton from './CustomButton';
import ImageView from "react-native-image-viewing";


const PostComponent = ({data, setData, wholeData, fromMyPost}) => {
  console.log(
    '🚀 ~ PostComponent ~ data:',
    data?.hashtags
    // JSON.stringify(data, null, 2),
  );

  const refRBSheet = useRef();
  const token = useSelector(state => state.authReducer.token);
  const profileData = useSelector(state => state.commonReducer.selectedProfile);
  const MoreIcon = require('../Assets/Images/threedots.png');

  const [like, setLike] = useState(data?.my_like ? data?.my_like : null);
  const [loading, setloading] = useState(false);
  const [yourComment, setYourComment] = useState('');
  const [comments, setComments] = useState(data?.comments);
  const [currImageIndex , setCurrImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
    const [keyboardShown, setKeyboardShown] = useState(false)
  const editPost = () => {
    navigationService.navigate('AddPost', {data: data, fromHome: true});
  };

  const handledeletePost = async () => {
    const url = `auth/post/${data?.id}`;
    setloading(true);
  //  return console.log("🚀 ~ handledeletePost ~ url:", url)
    const response = await Delete(url, apiHeader(token));
  console.log("🚀 ~ handledeletePost ~ response:", response)

    setloading(false);
    if (response != undefined) {
      // let temp = [...wholeData];
      setData(wholeData.filter((item, index) => item?.id != data?.id));
    }
  };

  const likePost = async () => {
    // const url = `auth/post_like`;
    const url = `auth/feed_post_like `;

    const body = {
      post_id: data?.id,
      profile_id: profileData?.id,
    };
    setLike(!like);
    setloading(true);
    const response = await Post(url, body, apiHeader(token));
    setloading(false);
    if (response != undefined) {
      Platform.OS == 'android'
        ? ToastAndroid.show('like added', ToastAndroid.SHORT)
        : Alert.alert('like added');
    }
  };

  const addComment = async () => {
    // const url = 'auth/comment';
    const url = `auth/feed_post_comment`;
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

    setloading(true);
    const response = await Post(url, body, apiHeader(token));
    setloading(false);
    if (response != undefined) {
      setComments(prev => [
        ...prev,
        {
          id: 12,
          profile_info: {name: profileData?.name},
          description: yourComment,
          created_at: moment(),
          photo: profileData?.photo,
        },
      ]);

      Platform.OS == 'android'
        ? ToastAndroid.show('Comment added', ToastAndroid.SHORT)
        : Alert.alert('Comment added');
      setYourComment('');
    }
  };
console.log("first ============= > ", data?.images[currImageIndex])
  return (
    <>
      <View style={styles.mainVew}>
        <View
          style={[
            styles.profileView,
            profileData?.id != data?.profile_info?.id && {
              justifyContent: 'flex-start',
            },
          ]}>
          <View style={styles.profileSection2}>
            <CustomImage
              source={{
                uri: fromMyPost
                  ? `${baseUrl}/${data?.feed?.image}`
                  : `${baseUrl}/${data?.profile_info?.photo}`,
              }}
              style={{
                height: '100%',
                width: '100%',
              }}
            />
          </View>

          <View
            style={[
              {
                width: windowWidth * 0.65,
                justifyContent: 'center',
                // backgroundColor: 'green',
              },
              profileData?.id != data?.profile_info?.id && {
                marginLeft: moderateScale(10, 0.6),
              },
            ]}>
            <View
              style={{
                //             // backgroundColor:'red',
                flexDirection: 'row',
              }}>
              <CustomText numberOfLines={2}>
                {fromMyPost ? data?.feed?.name : data?.profile_info?.name}
              </CustomText>
              {fromMyPost == true && (
                <>
                  <Icon
                    name={'triangle-right'}
                    size={19}
                    color={Color.mediumGray}
                    as={Entypo}
                  />
                  <CustomText
                    // isBold
                    numberOfLines={2}>
                    you
                    {/* {item?.feed?.name} */}
                  </CustomText>
                </>
              )}
            </View>

            <View style={styles.btnView}>
              <CustomText
                style={{
                  textAlign: 'left',
                  fontSize: moderateScale(11, 0.6),
                  color: Color.veryLightGray,
                }}>
                {moment(data?.created_at).fromNow()}
              </CustomText>
              {/* <TouchableOpacity activeOpacity={0.7}>
                <Entypo name="globe" size={14} color={Color.veryLightGray} />
              </TouchableOpacity> */}
            </View>
          </View>

          {profileData?.id == data?.profile_info?.id && (
            <OptionsMenu
              button={MoreIcon}
              buttonStyle={{
                width: 36,
                height: 30,
                tintColor: '#000',
              }}
              destructiveIndex={1}
              options={['Delete']}
              actions={[() => handledeletePost()]}
            />
          )}
        </View>

        <View style={styles.textView}>
          <CustomText style={styles.customT}>
            {data?.caption}
            {'\n\n'}
            {/* <CustomText
              style={{
                color: Color.blue,
                marginLeft: moderateScale(5, 0.6),
              }}>
              {data?.hashtags[0]?.post_hashtags[0]?.title}
            </CustomText> */}
            <View
              style={{
                flexDirection: 'row',
              }}>
              {fromMyPost ? (
                <CustomText
                  style={{
                    color: Color.blue,
                    fontSize: moderateScale(12, 0.6),
                    textAlign: 'left',
                    // color: '#000',
                  }}>
                  {data?.hashtags?.join(' ').replace(/(\s*#\s*){2,}/g, ' ').trim()}
                </CustomText>
              ) : (
                data?.hashtags?.map((item, index) => {

                  console.log('🚀 ~ data?.hashtags?.map ~ item=======>:', item);
                  return (
                    <View style={styles.hashContainer}>
                      <CustomText
                        style={{
                          color: Color.blue,
                          fontSize: moderateScale(12, 0.6),
                          textAlign: 'left',
                          // color: '#000',
                        }}>
                        {item?.post_hashtags[0]?.title} {}
                      </CustomText>
                    </View>
                  );
                })
              )}
            </View>
          </CustomText>
        </View>
        {/* {(data?.post_images || data?.post_videos ) && (
          <View style={{width: windowWidth, height: windowHeight * 0.3}}>
            {data?.post_images != null  ? (
              <CustomImage
                onPress={() => {
                  // navigationService.navigate('Feeds', {image: data?.image});
                }}
                source={{uri: `${baseUrl}/${data?.post_images[0]?.name}`}}
                style={{
                  height: '100%',
                  width: '100%',
                  marginTop: moderateScale(5, 0.3),
                }}
                resizeMode="cover"
              />
              
            ) : ( */}
        {data?.images?.length > 0 ?    <ImageSlider
      
          // loopBothSides
          // autoPlayWithInterval={3000}
          images={data?.images}
          customSlide={({ index, item, style, width }) => (
            // It's important to put style here because it's got offset inside
            <TouchableOpacity key={index} style={[style, styles.customSlide]} onPress={() =>{
              console.log("Index ====> ",index)
            }}>
              {/* <Text>{item?.name}</Text> */}
              <CustomImage onPress={() =>{
                setCurrImageIndex(index);
                // setIsVisible(true)
                navigationService.navigate('Image', {
                  imageData: {
                    uri: `${baseUrl}/${item?.name}`,
                    index: index
                  }
                })
                console.log("Index ====> ",index)
              }} source={{ uri: `${baseUrl}/${item?.name}` }} style={styles.customImage} />
            </TouchableOpacity>
          )}
          
        />  : <VideoComponent item={data}/>}
              {/* <FeedVideo item={data}/> */}
              {/* // <VideoController item={data?.post_videos} />
            )}
          </View>
        )} */}

        <View style={styles.container}>
          <View style={styles.containerView}>
            <CustomText style={styles.text1}>
              {data?.total_likes_count ? data?.total_likes_count : 0}
            </CustomText>
            <View style={styles.imageView}>
              <CustomImage
                source={require('../Assets/Images/like.png')}
                style={{
                  height: '100%',
                  width: '100%',
                  // backgroundColor: 'red',
                }}
                resizeMode="cover"
              />
            </View>
            {/* <View style={styles.image2}>
              <CustomImage
                source={require('../Assets/Images/heart.png')}
                style={{
                  height: '100%',
                  width: '100%',
                }}
                resizeMode="cover"
              />
            </View> */}
          </View>

          <View style={styles.rbView}>
            <CustomText
              onPress={() => refRBSheet.current.open()}
              numberOfLines={1}
              style={[
                {
                  color: Color.veryLightGray,
                  fontSize: moderateScale(13, 0.6),
                  width: windowWidth * 0.3,
                },
                data?.View == null && {textAlign: 'right', width: '90%'},
              ]}>
              {data?.comments_count} comments
            </CustomText>
            {data?.View && (
              <CustomText numberOfLines={1} style={styles.cT}>
                {data?.View} views
              </CustomText>
            )}
          </View>
        </View>

        <Divider my="2" _light={{color: Color.veryLightGray}} />

        <View
          style={{
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            onPress={() => {
              likePost();
            }}
            style={styles.likebtn}>
            <Icon
              as={AntDesign}
              name={like ? 'like1' : 'like2'}
              size={23}
              color={like ? '#2a95fd' : Color.themeBlack}
              onPress={() => {
                likePost();
              }}
            />

            <CustomText>Like</CustomText>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => refRBSheet.current.open()}
            style={styles.button}>
            <Octicons
              name="comment"
              size={23}
              color={Color.themeBlack}
              onPress={() => refRBSheet.current.open()}
            />
            <CustomText>comments</CustomText>
          </TouchableOpacity>
      

        
          <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={false}
            useNativeDriver={false}
            customStyles={{
              draggableIcon: {
                backgroundColor: Color.veryLightGray,
              },
            }}
            height={windowHeight * 0.85}
            
            >
          {/* <ScrollView
          style={{
          }}
        
          > */}
<KeyboardAwareScrollView
contentContainerStyle={{ flexGrow: 1 }}
scrollEnabled={true}
extraScrollHeight={Platform.OS === 'ios' ? 20 : 0}
keyboardShouldPersistTaps="handled"
onKeyboardDidShow={()=>{
  console.log('shows')
  setKeyboardShown(true)
}}
onKeyboardDidHide={() =>{
  console.log('Hide')
  setKeyboardShown(false);
}}
>

            <FlatList
              data={comments}
              contentContainerStyle={{
                height: windowHeight * 0.7,
              // backgroundColor:'red'
              }}
              renderItem={({item, index}) => {
                return (
                  // <View style={{width: windowWidth}}>
                  <View style={styles.flatView}>
                    <View style={styles.profileView2}>
                      <View style={styles.profileSection2}>
                        <CustomImage
                          source={{
                            uri: `${baseUrl}/${item?.profile_info?.photo}`,
                          }}
                          style={{
                            height: '100%',
                            width: '100%',
                          }}
                          resizeMode="cover"
                        />
                      </View>

                      <View style={styles.Views}>
                        <CustomText
                          numberOfLines={1}
                          style={{
                            color: 'black',
                            fontSize: moderateScale(14, 0.6),
                          }}
                          isBold>
                          {item?.profile_info?.name}
                        </CustomText>
                        <CustomText style={styles.text} numberOfLines={2}>
                          {item?.description}
                        </CustomText>
                      </View>
                    </View>

                    <View style={styles.rowView}>
                      <CustomText
                        style={[
                          styles.text,
                          {fontSize: moderateScale(10, 0.6)},
                        ]}>
                        {moment(item?.time).fromNow()}
                      </CustomText>
                      {/* <CustomText style={styles.text}>Like</CustomText>
                        <CustomText style={styles.text}>Reply</CustomText> */}
                    </View>
                  </View>
                  // </View>
                );
              }}
             
            />
                 
        <View
              style={[{
                flexDirection: 'row',
              
                width: windowWidth,
                height:windowHeight * 0.15,
                justifyContent: 'space-between',
                paddingHorizontal: moderateScale(10, 0.6),
                paddingBottom: moderateScale(10, 0.6),
                alignItems: 'center',
              },
           keyboardShown && {
            position: 'absolute',
            bottom: moderateScale(145,0.3),
           }   
              ]}>
              <TextInputWithTitle
                titleText={'your comment'}
                placeholder={'Write Yout Comment'}
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
                name={'send'}
                size={6}
                color={loading ? Color.themeDarkGray : Color.purple}
                as={Ionicons}
                onPress={() => {
                  addComment();
                }}
              />
            </View>
            
          {/* </ScrollView>
           */}

         

</KeyboardAwareScrollView>
          </RBSheet>
        </View>
  
      </View>
      {isVisible && <View style={{flex:1, 
      
        zIndex:1,
        backgroundColor:'white'}}></View>}
      {/* <Modal visible={isVisible} 
      >
        <View style={styles.imageView}>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => {
                setIsVisible(false)
              }}>
              <View
                // colors={Color.themeBgColor}
                // style={styles.customBtn}>
                >
                <Icon
                  name="left"
                  as={AntDesign}
                  size={moderateScale(20, 0.6)}
                  color={'white'}
                />
              </View>
            </TouchableOpacity>

            {/* <CustomButton
              iconStyle={{
                width: windowWidth * 0.09,
                height: windowHeight * 0.05,
                textAlign: 'center',
                paddingHorizontal: moderateScale(12, 0.2),
                paddingTop: moderateScale(15, 0.6),
                fontSize: moderateScale(24, 0.6),
                color: Color.black,
              }}
              iconName="cross"
              iconType={Entypo}
              iconSize={18}
              // color={Color.white}
              marginTop={moderateScale(5, 0.3)}
              // text={'Use'}
              isGradient={true}
              onPress={() => {
                setIsVisible(false);
              }}
              bgColor={['white', 'white']}
              width={windowHeight * 0.06}
              height={windowHeight * 0.06}
            /> 
          </View>
          <View style={{width: windowWidth, height:windowHeight, overflow:'hidden'}}>

         <CustomImage style={{width:'100%', height: '100%'}} source={{uri: `${baseUrl}/${data?.images[currImageIndex]?.name}`}}/>
          </View>
        </View>
     
    </Modal> */}

    </>
  );
};

const styles = StyleSheet.create({
  mainVew: {
    width: windowWidth,
    paddingVertical: moderateScale(15, 0.6),
    backgroundColor: Color.white,
    marginTop: moderateScale(10, 0.3),
    elevation: 2,
  },
  row: {
    paddingHorizontal: moderateScale(10, 0.6),
    paddingVertical: moderateScale(15, 0.6),
    flexDirection: 'row',
    width:windowWidth,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor :'red'
  },
  imageView: {
    widtth: windowWidth,
    height: windowHeight,
    // zIndex:1,

    backgroundColor:'black',
    // justifyContent: 'center',

    // paddingHorizontal:moderateScale(12,0.2)
  },
  likebtn: {
    flexDirection: 'row',
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    gap: moderateScale(3, 0.6),
    borderColor: Color.veryLightGray,
  },
  flatView: {
    width: windowWidth,
    marginTop: moderateScale(10, 0.3),
   
  },
  cT: {
    color: Color.veryLightGray,
    fontSize: moderateScale(13, 0.6),
    width: windowWidth * 0.3,
  },
  customT: {
    textAlign: 'left',
    marginLeft: moderateScale(15, 0.3),
    fontSize: moderateScale(13, 0.6),
  },
  button: {
    flexDirection: 'row',
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: moderateScale(4, 0.6),
  },
  image2: {
    width: moderateScale(25, 0.6),
    height: moderateScale(25, 0.6),
  },
  container: {
    flexDirection: 'row',
    width: windowWidth,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(10, 0.3),
    marginTop: moderateScale(15, 0.3),
  },
  text1: {
    color: Color.veryLightGray,
    marginLeft: moderateScale(5, 0.3),
    fontSize: moderateScale(15, 0.6),
    // width: windowWidth * 0.16,
  },
  rbView: {
    flexDirection: 'row',
    width: windowWidth * 0.62,
    alignItems: 'center',
    // backgroundColor:'red',
    justifyContent: 'space-evenly',
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
  rowView: {
    alignSelf: 'flex-end',
    // backgroundColor : 'red',
    marginTop: moderateScale(5, 0.3),
    paddingRight: moderateScale(5, 0.6),
  },
  imageView: {
    // marginRight: moderateScale(3, 0.3),
    width: moderateScale(20, 0.6),
    height: moderateScale(20, 0.6),
  },
  profileView2: {
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent : 'center',
    // paddingHorizontal: moderateScale(10, 0.6),
    width: windowWidth,
    // backgroundColor: 'green',
  },
  hashContainer: {
    // backgroundColor: Color.blue,
    // flexDirection:'row',
    paddingVertical: moderateScale(3, 0.6),
    paddingHorizontal: moderateScale(5, 0.6),
    borderRadius: moderateScale(10, 0.6),
    height: moderateScale(25, 0.6),
    borderColor: Color.blue,
    borderWidth: 1,
    marginRight: moderateScale(5, 0.3),
  },
  Views: {
    // paddingVertical: moderateScale(5, 0.6),
    // paddingHorizontal: moderateScale(15, 0.6),
    // backgroundColor: Color.lightGrey,
    // borderRadius: moderateScale(10, 0.6),
    marginLeft: moderateScale(10, 0.3),
  },
  text: {fontSize: moderateScale(12, 0.6), color: 'black'},
  profileSection2: {
    height: windowHeight * 0.06,
    width: windowHeight * 0.06,
    // backgroundColor: '#336ecb',
    borderRadius: (windowHeight * 0.06) / 2,
    borderWidth: 2,
    borderColor: Color.themeColor,
    // justifyContent: 'center',
    overflow: 'hidden',
  },
  containerView: {
    flexDirection: 'row',
    // width: windowWidth * 0.25,
    // backgroundColor:'green',
    // alignItems: 'center',
    gap: 10,
  },
  btnView: {
    // flexDirection: 'row',
    // width: windowWidth * 0.17,
    // justifyContent: 'space-around',
    // alignItems: 'center',/
  },
  textView: {
    width: windowWidth,
    marginTop: moderateScale(8, 0.3),
  },
  profileView: {
    flexDirection: 'row',
    // backgroundColor: 'red',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(10, 0.6),
    marginTop: moderateScale(10, 0.3),
  },
  content2: {
    width: '100%',
    height: 100,
    marginTop: 10,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: { color: '#fff' },
  buttons: {
    zIndex: 1,
    height: 15,
    marginTop: -25,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  button1: {
    margin: 3,
    width: 15,
    height: 15,
    opacity: 0.9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSelected: {
    opacity: 1,
    color: 'red',
  },
  customSlide: {
    width:windowWidth ,
    height:windowHeight * 0.34,
    // backgroundColor: 'green',
    // overflow:'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  customImage: {
    width: 250,
    height: 500,
  },
});

export default PostComponent;
