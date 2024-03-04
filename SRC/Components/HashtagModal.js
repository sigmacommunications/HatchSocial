import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import TextInputWithTitle from './TextInputWithTitle';
import CustomText from './CustomText';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import CustomButton from './CustomButton';
import Feather from 'react-native-vector-icons/Feather';
import CustomImage from './CustomImage';
import {color} from 'react-native-reanimated';
import {baseUrl} from '../Config';
import {Get, Post} from '../Axios/AxiosInterceptorFunction';
import {useSelector} from 'react-redux';
import {Icon} from 'native-base';

const HashtagModal = ({isVisible, setIsVisible, hashtag, setHashtag}) => {
  const token = useSelector(state => state.authReducer.token);
  const themeColor = useSelector(state => state.authReducer.ThemeColor);
  const [timerId, setTimerId] = useState(null);
  const [feedList, setFeedList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');

  const handleInputChange = text => {
    setSearch(text);
    if (timerId) {
      clearTimeout(timerId);
    }
    const newTimerId = setTimeout(() => {
      console.log('gere');
      getHashtags();
    }, 2000);

    setTimerId(newTimerId);
  };

  const getHashtags = async () => {
    const url = `auth/hashtags_list`;
    const body = {
      search_text: search,
    };
    console.log('🚀 ~ getHashtags ~ body:', body);
    setIsLoading(true);

    const response = await Post(url, body, apiHeader(token));
    setIsLoading(false);
    if (response != undefined) {
      console.log('🚀 ~ getHashtags ~ response:', response?.data?.feeds_info);
      setFeedList(response?.data?.feeds_info);
    }
  };

  useEffect(() => {
    if (isVisible) {
      getHashtags();
    }
  }, [isVisible]);

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={() => {
        setIsVisible(false);
      }}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={styles.container}>
        {isLoading ? (
          <View
            style={{
              width: windowWidth * 0.85,
              height: windowHeight * 0.7,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size="large" color={themeColor[0]} />
            <CustomText
              style={{
                color: themeColor[0],
                fontSize: moderateScale(13, 0.6),
              }}>
              loading...
            </CustomText>
          </View>
        ) : (
          <>
            <View
              style={{
                // backgroundColor:'red',
                alignItems: 'center',
              }}>
              <TextInputWithTitle
                secureText={false}
                placeholder={'Alchole'}
                setText={handleInputChange}
                value={search}
                viewHeight={0.05}
                viewWidth={0.8}
                inputWidth={0.75}
                border={1}
                borderColor={Color.veryLightGray}
                marginTop={moderateScale(15, 0.3)}
                placeholderColor={Color.veryLightGray}
                borderRadius={moderateScale(25, 0.3)}
              />
            </View>

            <FlatList
              data={feedList}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                marginBottom: moderateScale(10, 0.3),
                marginTop: moderateScale(10, 0.3),
              }}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      console.log('here is selected hashtag');
                      // }
                      if (
                        hashtag?.some((item1, index) => item1?.id == item?.id)
                      ) {
                        setHashtag(prevHashtags =>
                          prevHashtags.filter(
                            (item2, index) => item2?.id !== item?.id,
                          ),
                        );
                      } else {
                        setHashtag(prevHashtags => [...prevHashtags, item]);
                        // setIsSelected(hashtag)
                      }
                    }}
                    style={{
                      width : '100%',
                      // backgroundColor : 'green',
                      paddingHorizontal: moderateScale(5, 0.6),
                      paddingVertical: moderateScale(5, 0.6),
                      flexDirection: 'row',
                      alignItems : 'center'
                    }}>
                   
                      <View
                        style={{
                          height: windowHeight * 0.07,
                          width: windowHeight * 0.07,
                          borderRadius: (windowHeight * 0.07) / 2,
                          overflow: 'hidden',
                        }}>
                        <CustomImage
                          style={{
                            height: '100%',
                            width: '100%',
                          }}
                          source={{uri : `${baseUrl}/${item?.image}`}}
                        />
                      </View>
                      <View style={{
                        width : windowWidth * .6,
                        height : windowHeight * 0.06,
                        marginLeft : moderateScale(5,0.6)
                        // backgroundColor : 'red'
                      }}>
                        <CustomText
                        numberOfLines={1}
                          style={{
                            marginHorizontal: moderateScale(4, 0.3),
                            color: Color.black,
                            fontSize: moderateScale(13, 0.6),
                            //  backgroundColor:'red',
                          }}>
                          {item?.name}
                        </CustomText>
                        <View
                          style={{
                            backgroundColor: themeColor[1],
                            borderRadius: moderateScale(8, 0.6),
                            marginHorizontal: moderateScale(4, 0.3),
                            position : 'absolute',
                            bottom : 0,
                            paddingHorizontal : moderateScale(5,0.6),
                            paddingVertical : moderateScale(3,0.6)

                          }}>
                        <CustomText
                          style={{
                            // backgroundColor : 'red',
                            fontSize: moderateScale(11, 0.6),
                          }}>
                          {item?.title}
                        </CustomText>
                        </View>
                      </View>
                      {hashtag?.some(
                        (item1, index) => item1?.id == item?.id,
                      ) && (
                        <Icon
                          style={{
                            // backgroundColor:'red',
                            position: 'absolute',
                            right: 10,
                            top: 30,
                          }}
                          name={'check'}
                          as={Feather}
                          size={18}
                          color={themeColor[1]}
                        />
                      )}
                  </TouchableOpacity>
                );
              }}
            />

            <CustomButton
              text={'Close'}
              textColor={'white'}
              width={windowWidth * 0.6}
              height={windowHeight * 0.05}
              fontSize={moderateScale(13, 0.6)}
              onPress={() => {
                setIsVisible(false);
              }}
              marginBottom={moderateScale(10, 0.3)}
              bgColor={['#01E8E3', '#1296AF']}
              isGradient
              isBold={true}
            />
          </>
        )}
      </View>
    </Modal>
  );
};

export default HashtagModal;
const styles = ScaledSheet.create({
  container: {
    width: windowWidth * 0.85,
    height: windowHeight * 0.6,
    // paddingVertical: moderateScale(20, 0.6),
    backgroundColor: Color.white,
    borderRadius: moderateScale(10, 0.6),
    // alignItems: 'center',
    // backgroundColor:'green'
    // overflow: 'hidden',
  },

  profileSection2: {
    height: windowHeight * 0.05,
    width: windowHeight * 0.05,
    backgroundColor: '#fff',
    borderRadius: (windowHeight * 0.05) / 2,
    borderWidth: 2,
    borderColor: Color.green,
    justifyContent: 'center',
    overflow: 'hidden',
    // alignSelf: 'center',
  },
  modalHeader: {
    color: 'black',
    fontSize: moderateScale(15, 0.6),
    width: '100%',
    textAlign: 'center',
    // color: 'white',
    backgroundColor: Color.themeColor[1],
    padding: moderateScale(10, 0.6),
  },
  row: {
    width: windowWidth * 0.85,
    height: windowHeight * 0.06,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: moderateScale(14, 0.6),
    marginVertical: moderateScale(2, 0.3),
    backgroundColor: 'red',
  },
  container2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: moderateScale(30, 0.3),
    paddingHorizontal: moderateScale(30, 0.6),
  },
  textwithicon: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: moderateScale(30, 0.3),
  },
  followbtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: moderateScale(30, 0.3),
  },
  mapview: {
    width: windowWidth,
    marginTop: moderateScale(10, 0.3),
    // paddingHorizontal: moderateScale(10, 0.6),
    // marginLeft:moderateScale(10,.3)
  },
  invite: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 20,
    backgroundColor: 'transparent',
  },
});
