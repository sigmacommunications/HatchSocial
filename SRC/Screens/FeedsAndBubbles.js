import {
  ActivityIndicator,
  Alert,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../Components/Header';
import CustomStatusBar from '../Components/CustomStatusBar';
import {useSelector} from 'react-redux';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import {ScrollView} from 'react-native';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import Color from '../Assets/Utilities/Color';
import {Icon} from 'native-base';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {baseUrl} from '../Config';
import {NewComponent, NewComponent3} from '../Components/NewComponent';
import {Get} from '../Axios/AxiosInterceptorFunction';
import Home from '../Components/Home';
import navigationService from '../navigationService';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import {BlurView} from '@react-native-community/blur';
import RequestModal from '../Components/RequestModal';
import CustomButton from '../Components/CustomButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
import {useNavigation} from '@react-navigation/native';
import NullDataComponent from '../Components/NullDataComponent';

const FeedsAndBubbles = ({route}) => {
  const interest_id = route?.params?.interest_id;
  const interestImage = route?.params?.interestImage;
  const interestName = route?.params?.interestName;
  const themeColor = useSelector(state => state.authReducer.ThemeColor);
  const privacy = useSelector(state => state.authReducer.privacy);
 
  const profileData = useSelector(state => state.commonReducer.selectedProfile);
  const token = useSelector(state => state.authReducer.token);

  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedBubbleId, setSelectedBubbleId] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]);

  const getInterestData = async () => {
    const url = `auth/community_interest/${interest_id}?profile_id=${profileData}`;
    setIsLoading(true);
    const response = await Get(url, token);
    setIsLoading(false);
    if (response !== undefined) {
      setData(response?.data?.data);
    }
  };
  useEffect(() => {
    getInterestData();
  }, []);

  const PostData = [
    {
      id: 1,
      feedtitle: 'chris',
      Name: 'Travelling Tour Posted a video to playlist Special Content',
      date: '17 July',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry',
      profileImage: require('../Assets/Images/avatar4.png'),
      post_images: require('../Assets/Images/travel.jpg'),
      post_videos: [
        {
          uri: '../Assets/Images/video1.mp4',
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
          uri: '../Assets/Images/video2.mp4',

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

        // '../Assets/Images/video2.mp4',
        // '../Assets/Images/video3.mp4',
        // '../Assets/Images/video4.mp4',
      ],
    },
    {
      id: 2,
      feedtitle: 'john',
      Name: 'We hope you got to enjoy the great weather today, Vienna! 🥂✨ by WaitsForYou ',
      date: '24 Aug',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry',
      profileImage: require('../Assets/Images/avatar3.png'),
      post_images: require('../Assets/Images/art.png'),
      // video: null,
      post_videos: [
        {
          uri: '../Assets/Images/video1.mp4',
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
          uri: '../Assets/Images/video2.mp4',
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
        // '../Assets/Images/video3.mp4',
        // '../Assets/Images/video4.mp4',
      ],
    },

    {
      id: 3,
      feedtitle: 'christina',
      Name: 'Traveling Post We hope you got to enjoy the great weather today Vienna',
      date: '1 May',
      desc: 'The beauty of our private island paradise rests in its enhanced interior decorum. Minimalist, monochromatic interior design emphasizes',
      profileImage: require('../Assets/Images/avatar4.png'),
      post_images: null,
      post_videos: [
        {
          uri: '../Assets/Images/video1.mp4',
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
          uri: '../Assets/Images/video2.mp4',
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
        //
        // '../Assets/Images/video3.mp4',
        // '../Assets/Images/video4.mp4',
      ],
    },
    {
      id: 4,
      feedtitle: 'maha',
      Name: 'Travelling Tour Posted We hope you got to enjoy the great',
      date: '4 Dec',
      desc: `📍Italy Gorgeous pastel buildings picture-perfect harbors, and crystal-clear waters — experience everything this Italian seaside oasis has to offer on our trip to Northern Italy`,
      profileImage: require('../Assets/Images/avatar1.png'),
      post_images: require('../Assets/Images/travel3.jpg'),
      post_videos: [
        {
          uri: '../Assets/Images/video1.mp4',
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
        {
          uri: '../Assets/Images/video2.mp4',
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
        // '../Assets/Images/video2.mp4',
        // '../Assets/Images/video3.mp4',
        // '../Assets/Images/video4.mp4',
      ],
    },
    {
      id: 4,
      feedtitle: 'roy',
      Name: 'Travelling Tour Posted We hope you got to enjoy the great',
      date: '4 Dec',
      desc: `📍Italy Gorgeous pastel buildings picture-perfect harbors, and crystal-clear waters — experience everything this Italian seaside oasis has to offer on our trip to Northern Italy`,
      profileImage: require('../Assets/Images/avatar1.png'),
      post_images: require('../Assets/Images/travel3.jpg'),
      post_videos: [
        {
          uri: '../Assets/Images/video1.mp4',
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
        {
          uri: '../Assets/Images/video2.mp4',
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
        // '../Assets/Images/video2.mp4',
        // '../Assets/Images/video3.mp4',
        // '../Assets/Images/video4.mp4',
      ],
    },
  ];
  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />
      <View style={styles.HeaderView}>
        <Icon
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.icon1}
          name="arrow-back-ios"
          as={MaterialIcons}
          color={Color.themeColor}
          size={moderateScale(20, 0.6)}
        />
        <CustomText
          numberOfLines={1}
          isBold
          style={{width: windowWidth * 0.67, fontSize: moderateScale(20, 0.6)}}>
          {interestName}
        </CustomText>
        <Icon
          onPress={() => {
            setModalVisible(true);
          }}
          name="menu"
          as={Entypo}
          color={Color.themeColor}
          size={moderateScale(35, 0.6)}
        />
      </View>

      <ImageBackground
        source={
          privacy == 'private'
            ? require('../Assets/Images/theme2.jpg')
            : require('../Assets/Images/Main.png')
        }
        resizeMode={'cover'}
        style={styles.container}>
        {isLoading ? (
          <ActivityIndicator
            color={Color.themeColor}
            size={moderateScale(24, 0.3)}
          />
        ) : (
          <ScrollView style={{width: windowWidth, height: windowHeight * 0.89}}>
            <View style={styles.feedsContainer}>
              <CustomText isBold style={styles.heading}>
                Feeds
              </CustomText>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{
                  height: windowHeight * 0.13,
                  width: windowWidth,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    navigationService.navigate('CreateNewFeed', {
                      selectedInterest: interestName,
                      fromInterest: true,
                    });
                  }}
                  style={styles.feed}>
                  <Icon
                    style={styles.icon}
                    name="plus"
                    as={FontAwesome}
                    color={Color.themeColor}
                    size={moderateScale(12, 0.6)}
                  />
                  <View style={styles.circle}>
                    <View style={styles.image2}>
                      <CustomImage
                        onPress={() => {
                          navigationService.navigate('CreateNewFeed', {
                            selectedInterest: interestName,
                            fromInterest: true,
                          });
                        }}
                        source={{uri: `${baseUrl}/${interestImage}`}}
                        style={styles.image}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
                <View style={styles.feedrow}>
                  {PostData?.map((item, index) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          navigationService.navigate('FeedsPostScreen', {
                            data: item,
                          });
                        }}
                        style={styles.feed}>
                        <View style={styles.feedcircle}>
                          <View style={styles.image1}>
                            <CustomImage
                              onPress={() => {
                                navigationService.navigate('FeedsPostScreen', {
                                  data: item,
                                });
                              }}
                              source={{uri: `${baseUrl}/${item?.image}`}}
                              style={styles.image}
                            />
                          </View>
                        </View>
                        <CustomText
                          style={{
                            fontSize: moderateScale(14, 0.6),
                            color: Color.white,
                          }}
                          isBold>
                          {item?.feedtitle}
                        </CustomText>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </ScrollView>
            </View>

            <View>
              <CustomText isBold style={styles.heading}>
                Popular Bubbles
              </CustomText>

              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: moderateScale(6, 0.2),

                  width: windowWidth,
                }}>
                <FlatList
                  data={data?.popular_community} //actual data
                  keyExtractor={item => item?.id}
                  scrollEnabled
                  showsVerticalScrollIndicator
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({item}) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          item?.privacy.toLowerCase() == 'yes'
                            ? setIsVisible(true)
                            : setClicked(true);
                          setSelectedBubbleId(item);
                        }}
                        style={styles.pBubbles}>
                        <View
                          style={{
                            height: windowHeight * 0.1,
                          }}>
                          <CustomImage
                            onPress={() => {
                              item?.privacy.toLowerCase() == 'yes'
                                ? setIsVisible(true)
                                : setClicked(true);
                              setSelectedBubbleId(item);
                            }}
                            style={{
                              height: '100%',
                              width: '100%',
                            }}
                            source={{uri: `${baseUrl}/${item?.image}`}}
                          />
                          <CustomText
                            numberOfLines={1}
                            style={{
                              width: windowWidth * 0.2,
                              fontSize: moderateScale(13, 0.6),
                              marginHorizontal: moderateScale(10, 0.3),
                            }}>
                            {item?.title}
                          </CustomText>
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                  ListEmptyComponent={() => {
                    return <NullDataComponent />;
                  }}
                />
              </View>
            </View>

            <View style={styles.bubblesContainer}>
              <CustomText isBold style={styles.heading}>
                Bubbles
              </CustomText>
              <View style={{flex: 5}}>
                <FlatList
                  data={data?.community_list}
                  scrollEnabled
                  showsVerticalScrollIndicator={false}
                  renderItem={({item}) => {
                    return (
                      <NewComponent3
                        item={item}
                        clicked={clicked}
                        setClicked={setClicked}
                        selectedBubble={selectedBubbleId}
                        setSelectedBubble={setSelectedBubbleId}
                        setIsVisible={setIsVisible}
                        isVisible={isVisible}
                      />
                    );
                  }}
                  keyExtractor={item => item?.id}
                  alwaysBounceVertical={false}
                  ListEmptyComponent={() => {
                    return <NullDataComponent />;
                  }}
                />
              </View>
            </View>
            {clicked && (
              <BlurView
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
                      setClicked(false);
                      navigationService.navigate('Bubble', {
                        id: selectedBubbleId?.id,
                      });
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
                      setClicked(false);
                    }}
                    bgColor={['#FFFFFF', '#FFFFFF']}
                    borderRadius={moderateScale(30, 0.3)}
                    isGradient
                  />
                </View>
              </BlurView>
            )}
            <RequestModal
              selectedBubbleId={selectedBubbleId?.id}
              setIsVisible={setIsVisible}
              isVisible={isVisible}
              bubbleData={selectedBubbleId}
            />
            <Modal
              visible={modalVisible}
              onBackdropPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <View style={styles.modal}>
                <CustomText
                  style={styles.modalt}
                  onPress={() => {
                    navigationService.navigate('CreateNewBubble', {
                      selectedInterestId: interest_id,
                      selectedInterest: interestName,
                      fromInterest: true,
                    });
                    setModalVisible(!modalVisible);
                  }}>
                  Add bubble
                </CustomText>
                <View style={styles.modalView}></View>
                <CustomText
                  style={styles.modalt}
                  onPress={() => {
                    navigationService.navigate('CreateNewFeed', {
                      selectedInterest: interestName,
                      fromInterest: true,
                    });
                    setModalVisible(!modalVisible);
                  }}>
                  add feed
                </CustomText>
              </View>
            </Modal>
          </ScrollView>
        )}
      </ImageBackground>
    </>
  );
};

export default FeedsAndBubbles;

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight * 0.9,
    justifyContent: 'center',
  },

  feedsContainer: {
    width: windowWidth,
    marginTop: 10,
    paddingVertical: moderateScale(18, 0.2),
  },
  circle: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    borderColor: Color.themeColor,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: (windowWidth * 0.2) / 2,
    overflow: 'hidden',
    padding: 10,
  },
  bubblesContainer: {
    marginBottom: moderateScale(20, 0.2),
  },
  image: {
    width: '100%',
    height: '100%',
  },
  icon1: {
    marginHorizontal: moderateScale(10, 0.6),
    width: windowWidth * 0.05,
  },
  heading: {
    fontSize: moderateScale(25, 0.2),
    marginHorizontal: moderateScale(11, 0.1),
    color: 'white',
    marginBottom: moderateScale(11, 0.3),
  },
  feed: {
    alignItems: 'center',
    marginHorizontal: moderateScale(10, 0.2),
  },
  bubble: {
    alignItems: 'center',
    gap: 10,
    height: windowHeight * 0.35,
    marginHorizontal: moderateScale(10, 0.2),
  },
  title: {
    fontSize: moderateScale(15, 0.2),
  },
  modalView: {
    width: windowWidth * 0.25,
    backgroundColor: 'rgba(0,0,0,0.1)',
    height: 2,
  },
  modal: {
    width: windowWidth * 0.35,
    top: 40,
    position: 'absolute',
    alignSelf: 'flex-end',
    alignItems: 'center',
    borderRadius: moderateScale(10, 0.6),
    backgroundColor: Color.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalt: {
    fontSize: moderateScale(15, 0.6),
    paddingVertical: moderateScale(5, 0.6),
  },
  HeaderView: {
    height: windowHeight * 0.1,
    width: windowWidth,
    paddingHorizontal: moderateScale(15, 0.6),
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    height: windowHeight * 0.025,
    width: windowHeight * 0.025,
    borderRadius: (windowHeight * 0.025) / 2,
    backgroundColor: 'white',
    textAlign: 'center',
    position: 'absolute',
    bottom: 28,
    zIndex: 1,
    right: 5,
    paddingTop: moderateScale(4, 0.6),
  },
  container3: {
    height: windowHeight,
    width: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blurView: {
    position: 'absolute',
    height: windowHeight,
    width: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
  },
  image1: {
    width: windowWidth * 0.17,
    height: windowWidth * 0.17,
    borderRadius: (windowWidth * 0.2) / 2,
    overflow: 'hidden',
  },
  feedcircle: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    borderColor: Color.themeColor,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: (windowWidth * 0.2) / 2,
    overflow: 'hidden',
    padding: 10,
  },
  feedrow: {
    flexDirection: 'row',
    width: windowWidth,
  },
  image2: {
    width: windowWidth * 0.17,
    height: windowWidth * 0.17,
    borderRadius: (windowWidth * 0.2) / 2,
    overflow: 'hidden',
  },
  pBubbles: {
    height: windowHeight * 0.13,
    width: windowWidth * 0.25,
    borderRadius: moderateScale(10, 0.6),
    marginHorizontal: moderateScale(10, 0.3),
    overflow: 'hidden',
    backgroundColor: 'white',
  },
});
