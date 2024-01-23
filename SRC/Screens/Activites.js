import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React ,{useState ,useEffect} from 'react'
import PostComponentBubble from '../Components/PostComponentBubble';
import { moderateScale } from 'react-native-size-matters';
import { windowHeight, windowWidth } from '../Utillity/utils';
import { useIsFocused } from '@react-navigation/native';
import CustomText from '../Components/CustomText';
import { useSelector } from 'react-redux';
import { Get } from '../Axios/AxiosInterceptorFunction';


const Activites = (props) => {
    const bubbleInfo = props?.route?.params?.bubbleInfo
console.log("🚀 ~ Activites ~ bubbleInfo:", bubbleInfo)
const profileData = useSelector(state => state.commonReducer.selectedProfile);
const token = useSelector(state => state.authReducer.token);

const  [isLoading ,setIsLoading]= useState(false)

    const isFocused = useIsFocused();
    const [posts,setPosts] =useState([])


    
  const getPosts = async () => {
    const url = `auth/pending_post/${bubbleInfo?.id}`;
    setIsLoading(true);
    // return console.log("🚀 ~ getPosts ~ url:", url)
    const response = await Get(url, token);
    setIsLoading(false);
    if (response != undefined) {
    console.log("🚀 ~ getPosts ~ response:", response?.data)
    setPosts(response?.data?.post_info)

    //   setPosts(
    //     response?.data?.post_info?.filter(
    //       item => item?.post_videos?.length == 0,
    //     ),
    //   );
    }
  };

  useEffect(() => {
    getPosts();
  }, [isFocused]);
  return (
    <View>
      {/* {(bubbleInfo?.profile_id == profileData?.id ||
        (bubbleInfo?.follow?.role?.toLowerCase() == 'moderator' &&
          bubbleInfo?.moderator_create_content?.toLowerCase() == 'yes') ||
          (bubbleInfo?.follow?.role?.toLowerCase() == 'member' &&
            bubbleInfo?.member_create_content?.toLowerCase() == 'yes')
            ||
            (bubbleInfo?.follow?.role?.toLowerCase() == 'admin' &&
              bubbleInfo?.admin_create_content?.toLowerCase() == 'yes')
            
            ) && (
        <View
          style={{
            flexDirection: 'row',
            marginTop: moderateScale(10, 0.6),
            alignItems: 'center',
            paddingVertical: moderateScale(10, 0.6),
            justifyContent: 'space-between',
            paddingHorizontal: moderateScale(10, 0.6),
          }}>
          <View style={styles.profileImage}>
            <CustomImage
              // source={require('../Assets/Images/fitness2.png')}
              source={{uri: `${baseUrl}/${profileData?.photo}`}}
              style={{
                height: '100%',
                width: '100%',
              }}
            />
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: 'white',
              borderRadius: moderateScale(10, 0.6),
              width: windowWidth * 0.7,
              height: windowHeight * 0.05,
              paddingHorizontal: moderateScale(10, 0.6),
              justifyContent: 'center',
            }}
            onPress={() => {
              onPress();
            }}>
            <CustomText
              style={{
                color: 'black',
                fontSize: moderateScale(13, 0.6),
                width: windowWidth * 0.6,
              }}
              onPress={() => {
                onPress();
              }}>
              What's on your mind?
            </CustomText>
          </TouchableOpacity>

          <View>
            <Icon name={'images'} as={Entypo} color={'white'} size={7} />
          </View>
        </View>
      )} */}
      {isLoading ? (
        <View style={styles.loaderView}>
          <ActivityIndicator color={Color.white} size={'large'} />
        </View>
      ) : (
        <FlatList
          data={posts}
          contentContainerStyle={{
            paddingBottom: moderateScale(80, 0.3),
          }}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  justifyContent: 'center',
                  height: windowHeight * 0.4,
                  alignItems: 'center',
                }}>
                <CustomText style={{color: Color.black}} isBold>
                  No Posts Added yet!
                </CustomText>
              </View>
            );
          }}
          renderItem={({item, index}) => {
            return <PostComponentBubble data={item} bubbleInfo={bubbleInfo} forApproval={true}  setData={setPosts} wholeData={posts}/>;
          }}
        />
      )}
    </View>
    // <View>
    //  <FlatList
    //       data={posts}
    //       contentContainerStyle={{
    //         paddingBottom: moderateScale(80, 0.3),
    //       }}
    //       ListEmptyComponent={() => {
    //         return (
    //           <View
    //             style={{
    //               justifyContent: 'center',
    //               height: windowHeight * 0.4,
    //               alignItems: 'center',
    //             }}>
    //             <CustomText style={{color: Color.black}} isBold>
    //               No Posts Added yet!
    //             </CustomText>
    //           </View>
    //         );
    //       }}
    //       renderItem={({item, index}) => {
    //         return <PostComponentBubble data={item} bubbleInfo={bubbleInfo} />;
    //       }}
    //     />
    // </View>
  )
}

export default Activites

const styles = StyleSheet.create({
    loaderView: {
        // backgroundColor: 'red',
        width: windowWidth,
        height: windowHeight * 0.4,
        justifyContent: 'center',
      },
})