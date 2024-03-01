import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Get} from '../Axios/AxiosInterceptorFunction';
import ScreenBoiler from '../Components/ScreenBoiler';
import Header from '../Components/Header';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {baseUrl} from '../Config';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import CustomText from '../Components/CustomText';
import CustomImage from '../Components/CustomImage';
import {useNavigation} from '@react-navigation/native';
import Color from '../Assets/Utilities/Color';
import RequestModal from '../Components/RequestModal';
import {BlurView} from '@react-native-community/blur';
import CustomButton from '../Components/CustomButton';
import navigationService from '../navigationService';

const Allcommunities = () => {
  const navigation = useNavigation();
  const profileData = useSelector(state => state.commonReducer.selectedProfile);
  const token = useSelector(state => state.authReducer.token);
  const privacy = useSelector(state => state.authReducer.privacy);
  const themeColor = useSelector(state => state.authReducer.ThemeColor);

  const [bubble, setBubble] = useState([]);
  const [isLoading, setIsLaoding] = useState(false);
  const [selectedBubbleId, setSelectedBubbleId] = useState(null);
  const [clicked, setclicked] = useState(false);
  const [bubbleData, setBubbleData] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  const getBubble = async () => {
    const url = `auth/community/${profileData?.id}`;
    setIsLaoding(true);
    console.log('🚀 ~ getBubble ~ url:', url);
    const response = await Get(url, token);
    setIsLaoding(false);
    if (response != undefined) {
      console.log(
        '🚀 ~ getBubble ~ response===================>:',
        response?.data,
      );
      setBubble(response?.data?.data);
    }
  };

  useEffect(() => {
    getBubble();
  }, []);
  return (
    <ScreenBoiler
      statusBarBackgroundColor={'white'}
      statusBarContentStyle={'dark-content'}>
      <Header showBack Title={'My Community'} />
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
        }}>
        <View
          style={{
            width: windowWidth,
            height: windowHeight * 0.9,
            // backgroundColor: 'red',
          }}>
          <FlatList
            data={bubble}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              marginBottom: moderateScale(10, 0.3),
              paddingBottom: moderateScale(130, 0.6),
              marginTop: moderateScale(10, 0.3),
            }}
            renderItem={({item, index}) => {
              console.log('🚀 ~ BubbleSearch ~ item=======> here:', item?.id);
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.row}
                  onPress={() => {
                    if (item?.bubble && item?.private) {
                      console.log('here');
                      console.log('Hrere=========>>>>>>', item);
                      if (
                        item?.profile_id == profileData?.id ||
                        item?.follow?.status == 'follow' ||
                        item?.follow?.status == 'blocked'
                      ) {
                        setSelectedBubbleId(item?.id);
                        setclicked(true);
                        setBubbleData(item);
                      } else {
                        setIsVisible(true);
                        setSelectedBubbleId(item?.id);
                        setBubbleData(item);
                      }
                    } else if (item?.bubble && !item?.private) {
                      setclicked(true);
                      setSelectedBubbleId(item?.id);
                    } else if (!item?.bubble && !item?.private) {
                      navigation.navigate('PostScreen', {item: item});
                    }

                   
                  }}>
                  <View
                    style={[
                      styles.profileSection2,
                      item?.bubble
                        ? {
                            borderRadius: (windowHeight * 0.08) / 2,
                            borderColor: 'yellow',
                          }
                        : {
                            borderRadius: moderateScale(10, 0.6),
                            borderColor: 'green',
                          },
                    ]}>
                    <CustomImage
                      source={{uri: `${baseUrl}/${item?.image}`}}
                      style={{
                        height: '100%',
                        width: '100%',
                      }}
                      resizeMode="cover"
                    />
                  </View>

                  <View
                    style={{
                      marginLeft: moderateScale(15, 0.6),
                      justifyContent: 'center',
                    }}>
                    <CustomText
                      style={{
                        fontSize: moderateScale(16, 0.6),
                        color: '#000',
                        textAlign: 'left',
                      }}
                      isBold>
                      {item?.bubble == 0 ? item?.name : item?.title}
                    </CustomText>
                    {item?.bubble == 0 && (
                      <CustomText
                        style={{
                          fontSize: moderateScale(9, 0.6),
                          textAlign: 'left',
                          color: '#000',
                        }}>
                        {item.hashtags}
                      </CustomText>
                    )}
                  </View>
                </TouchableOpacity>
              );
            }}
            ListEmptyComponent={() => (
              <View style={styles.emptyContainer}>
                <View style={styles.bubbleImage}>
                  <CustomImage
                    style={{width: '100%', height: '100%'}}
                    resizeMode={'contain'}
                    source={require('../Assets/Images/no-data.png')}
                  />
                </View>
                <CustomText style={styles.emptyText}>
                  No data available
                </CustomText>
                {/* You can add fallback images here if needed */}
              </View>
            )}
          />
        </View>
      </ImageBackground>
      <RequestModal
        selectedBubbleId={selectedBubbleId}
        setIsVisible={setIsVisible}
        isVisible={isVisible}
        bubbleData={bubbleData}
      />
      {clicked && (
        <BlurView
          // intensity={100}
          style={styles.blurView}
          blurRadius={5}
          blurType={'light'}>
          <View style={styles.container3}>
            <CustomButton
              text={'Home'}
              textColor={themeColor[1]}
              width={windowWidth * 0.7}
              height={windowHeight * 0.06}
              marginTop={moderateScale(20, 0.3)}
              onPress={() => {
                // disptach(setUserToken({token : 'fasdasd awdawdawdada'}))
                setclicked(false);
                navigationService.navigate('Bubble', {id: selectedBubbleId});
              }}
              bgColor={['#FFFFFF', '#FFFFFF']}
              borderRadius={moderateScale(30, 0.3)}
              isGradient
            />

            <CustomButton
              text={'Close'}
              textColor={themeColor[1]}
              width={windowWidth * 0.7}
              height={windowHeight * 0.06}
              marginTop={moderateScale(20, 0.3)}
              onPress={() => {
                setclicked(false);
              }}
              bgColor={['#FFFFFF', '#FFFFFF']}
              borderRadius={moderateScale(30, 0.3)}
              isGradient
            />
          </View>
        </BlurView>
      )}
    </ScreenBoiler>
  );
};

export default Allcommunities;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    width: windowWidth,
    // height: windowHeight *0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(8, 0.3),
    marginTop: moderateScale(10, 0.3),
  },

  profileSection: {
    height: windowHeight * 0.08,
    width: windowHeight * 0.08,
    backgroundColor: '#fff',
    borderRadius: (windowHeight * 0.08) / 2,
    borderWidth: 3,
    // borderColor: Color.green,
    justifyContent: 'center',
    overflow: 'hidden',
    // alignSelf: 'center',
  },
  profileSection2: {
    height: windowHeight * 0.06,
    width: windowHeight * 0.06,
    backgroundColor: '#fff',
    // borderRadius:(windowHeight * 0.06 )/2,
    borderWidth: 2,

    justifyContent: 'center',
    overflow: 'hidden',
    // alignSelf: 'center',
  },
  search: {
    width: windowWidth * 0.7,
    height: windowHeight * 0.06,
    backgroundColor: '#fff',
    borderRadius: 50,
    justifyContent: 'center',
    //   marginLeft:moderateScale(10,0.3)
  },
  row: {
    width: windowWidth,
    height: windowHeight * 0.08,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: moderateScale(14, 0.6),
  },
  searchCategories: {
    marginTop: moderateScale(5, 0.3),
    flexDirection: 'row',
    // justifyContent:"center",
    gap: moderateScale(18, 0.6),
    alignItems: 'center',
    paddingHorizontal: moderateScale(40, 9),
  },
  category: {
    borderWidth: 1,
    borderRadius: 150,
    padding: moderateScale(5, 0.4),
    alignItems: 'center',
    width: windowWidth * 0.17,
    borderColor: Color.white,
    // backgroundColor: Color.themeBgColor,
  },
  emptyContainer: {
    width: windowWidth,
    height: windowHeight * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: moderateScale(10, 0.5),
  },
  bubbleImage: {
    width: windowWidth * 0.45,
    height: windowWidth * 0.45,
    overflow: 'hidden',
  },
  txt: {
    fontSize: moderateScale(13, 0.6),
  },

  blurView: {
    position: 'absolute',
    height: windowHeight * 0.87,
    width: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',

    bottom: 0,
  },
  container3: {
    height: windowHeight * 0.8,
    width: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
