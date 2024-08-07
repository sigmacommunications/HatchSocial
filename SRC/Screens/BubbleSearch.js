import {
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
const {height, width} = Dimensions.get('window');
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SearchData} from '../dummyData/SearchData';
import CustomStatusBar from '../Components/CustomStatusBar';
import Header from '../Components/Header';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import Color from '../Assets/Utilities/Color';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import {useSelector} from 'react-redux';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {baseUrl} from '../Config';
import {useNavigation} from '@react-navigation/native';
import RequestModal from '../Components/RequestModal';
import {BlurView} from '@react-native-community/blur';
import CustomButton from '../Components/CustomButton';
import { useDebounce } from 'use-debounce';


const BubbleSearch = () => {
  const navigation = useNavigation();
  const profileData = useSelector(state => state.commonReducer.selectedProfile);
  const themeColor = useSelector(state => state.authReducer.ThemeColor);
  const privacy = useSelector(state => state.authReducer.privacy);
  const token = useSelector(state => state.authReducer.token);
  const [isSelected, setIsSelected] = useState('bubbles');
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedBubbleId, setSelectedBubbleId] = useState(null);
  const [clicked, setclicked] = useState(false);
  const [bubbleData, setBubbleData] = useState({});
  const [debouncedSearch] = useDebounce(search, 3000)

  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    if (debouncedSearch) {
      searchBubble(debouncedSearch);
    }
  }, [debouncedSearch]);


  // const SearchData = [
  //   {
  //     id: 1,
  //     image: require('../Assets/Images/bubble1.png'),
  //     name: 'Alchole',
  //     Tags: '#Architecture',
  //     bubble: true,
  //   },
  //   {
  //     id: 2,
  //     image: require('../Assets/Images/bubble2.png'),
  //     name: 'Alternative Fitness',
  //     Tags: '#Architecture',
  //     bubble: false,
  //   },
  //   {
  //     id: 3,
  //     image: require('../Assets/Images/bubble3.png'),
  //     name: 'Archery',
  //     Tags: '#Architecture',
  //     bubble: true,
  //   },
  //   {
  //     id: 4,
  //     image: require('../Assets/Images/bubble4.png'),
  //     name: 'architecture',
  //     Tags: '#Architecture',
  //     bubble: true,
  //   },
  //   {
  //     id: 5,
  //     image: require('../Assets/Images/bubble5.png'),
  //     name: 'art',
  //     Tags: '#Architecture',
  //     bubble: false,
  //   },
  //   {
  //     id: 6,
  //     image: require('../Assets/Images/bubble6.png'),
  //     name: 'Astrology',
  //     Tags: '#Architecture',
  //     bubble: true,
  //   },
  //   {
  //     id: 7,
  //     image: require('../Assets/Images/bubble10.png'),
  //     name: 'Beer',
  //     Tags: '#Architecture',
  //     bubble: false,
  //   },
  //   {
  //     id: 8,
  //     image: require('../Assets/Images/bubble8.png'),
  //     name: 'Author Books',
  //     Tags: '#Architecture',
  //     bubble: true,
  //   },
  //   {
  //     id: 9,
  //     image: require('../Assets/Images/bubble9.png'),
  //     name: 'Bird Watching',
  //     Tags: '#Architecture',
  //     bubble: false,
  //   },
  //   {
  //     id: 10,
  //     image: require('../Assets/Images/bubble10.png'),
  //     name: 'bolging',
  //     Tags: '#Architecture',
  //     bubble: true,
  //   },
  //   {
  //     id: 11,
  //     image: require('../Assets/Images/bubble11.png'),
  //     name: 'Author books',
  //     Tags: '#Architecture',
  //     bubble: false,
  //   },
  //   {
  //     id: 12,
  //     image: require('../Assets/Images/bubble4.png'),
  //     name: 'bolging',
  //     Tags: '#Architecture',
  //     bubble: false,
  //   },
  //   // {
  //   //   id: 13,
  //   //   image: require('../Assets/Images/Ellipse2.png'),
  //   //   name: 'Author books',
  //   //   Tags: '#Architecture',
  //   //   bubble: false,
  //   // },
  // ];
  const searchBubble = async (searchTerm) => {
    const url = 'auth/search';
    const body = {
      search: searchTerm,
    };
  //  return console.log("🚀 ~ searchBubble ~ body:", body)
    const response = await Post(url, body, apiHeader(token));

    if (response != undefined) {
      // return console.log("🚀 ~ BubbleSearch ~ data====================.>:", data?.feeds)
      console.log(
        'Search : ===> ',
        JSON.stringify(response?.data, null, 2),
      );
      setData(response?.data);
    }
  };

  // const filteredData = SearchData.filter(item =>
  //   item.name.toLowerCase().includes(search.toLowerCase()),
  // );
  console.log(search);
  const toggleBubbles = type => {
    setIsSelected(type);
  };
  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />
      <Header Title={'Search'} />

      <ImageBackground
        source={
          privacy == 'private'
            ? require('../Assets/Images/theme2.jpg')
            : require('../Assets/Images/Main.png')
        }
        resizeMode={'cover'}
        style={{
          width: windowWidth * 1,
          height: windowHeight * 0.9,
          // alignItems: 'center',
        }}>
        <View style={styles.topContainer}>
          <View
            style={[
              styles.profileSection,
              {
                borderColor:
                profileData?.type == 'Content Creator'
                ? Color.neonGreen
                : profileData?.type == 'Business & Entrepreneurship'
                ? Color.green
                : profileData?.type == 'Community & Connection'
                ? 'pink'
                : profileData?.type == 'Learning & Exploring'
                ? 'purple'
                : 'black',
              },
            ]}>
            <CustomImage
              source={
                profileData?.photo
                  ? {uri: `${baseUrl}/${profileData?.photo}`}
                  : require('../Assets/Images/dummyman1.png')
              }
              style={{
                height: '100%',
                width: '100%',
              }}
              // resizeMode="contain"
            />
          </View>

          <TextInputWithTitle
            secureText={false}
            placeholder={'Search here ...'}
            setText={setSearch}
            value={search}
            viewHeight={0.05}
            viewWidth={0.7}
            inputWidth={0.7}
            backgroundColor={'white'}
            color={themeColor[1]}
            placeholderColor={Color.veryLightGray}
            borderRadius={moderateScale(25, 0.3)}
  
           
          />

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={searchBubble}
            style={{justifyContent: 'center'}}>
            <Ionicons name="search" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
        {Object.keys(data).length > 0 && (
          <View style={styles.searchCategories}>
            <TouchableOpacity onPress={() => toggleBubbles('bubbles')}>
            <CustomText
                        numberOfLines={1}
                        children={"Bubbles"}
                        style={{
                          ...styles.eventText,
                          ...{
                            backgroundColor:
                              isSelected == "bubbles"
                                ? Color.white
                                : 'rgba(0,0,0,.2)',
                          },
                          ...{
                            color:
                              isSelected == "bubbles"
                                ? themeColor[1]
                                : Color.white,
                          },
                        }}
                      />
              {/* <View
                style={[
                  styles.category,
                  isSelected == 'bubbles'
                    ? {backgroundColor: Color.white}
                    : null,
                ]}>
                <CustomText isBold style={styles.txt}>
                  Bubbles
                </CustomText>
              </View> */}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toggleBubbles('feeds')}>
            <CustomText
                        numberOfLines={1}
                        children={"Feeds"}
                        style={{
                          ...styles.eventText,
                          ...{
                            backgroundColor:
                              isSelected == "feeds"
                                ? Color.white
                                : 'rgba(0,0,0,.2)',
                          },
                          ...{
                            color:
                              isSelected == "feeds"
                                ? themeColor[1]
                                : Color.white,
                          },
                        }}
                      />
              {/* <View
                style={[
                  styles.category,
                  isSelected == 'feeds' && {backgroundColor: Color.white},
                ]}>
                <CustomText isBold style={styles.txt}>
                  feeds
                </CustomText>
              </View> */}
            </TouchableOpacity>
          </View>
        )}
        <View
          style={{
            width: windowWidth,
            height: windowHeight * 0.7,
            // backgroundColor: 'red',
          }}>
          <FlatList
            data={isSelected == 'bubbles' ? data?.community_list : data?.feeds}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              marginBottom: moderateScale(10, 0.3),
              paddingBottom: moderateScale(130, 0.6),
              marginTop: moderateScale(10, 0.3),
            }}
            renderItem={({item, index}) => {
              console.log(
                '🚀 ~ BubbleSearch ~ item=======> here:',
                item
              );
              return (
                <TouchableOpacity
                  activeOpacity={0.9}
                  // disabled
                  style={styles.row}
                  onPress={() => {
                    if (isSelected == 'bubbles') {
                      if (
                        item?.bubble &&
                        item?.privacy.toLowerCase() == 'yes'
                      ) {
                        console.log('this true 1');
                        console.log('Hrere=========>>>>>>', item);
                        if (
                          item?.profile_id == profileData?.id ||
                          item?.follow?.status == 'follow' ||
                          item?.follow?.status == 'blocked'
                        ) {
                          console.log('this true 2');

                          setSelectedBubbleId(item?.id);
                          // setclicked(true);
                  navigation.navigate('Bubble', {id: selectedBubbleId});

                          setBubbleData(item);
                        } else {
                          console.log('this true 3');

                          setIsVisible(true);
                          setSelectedBubbleId(item?.id);
                          setBubbleData(item);
                        }
                      } else if (
                        item?.bubble &&
                        item?.privacy.toLowerCase() == 'no'
                      ) {
                        console.log('this true 4');
                        navigation.navigate('Bubble', {id: selectedBubbleId});

                        // setclicked(true);
                        setSelectedBubbleId(item?.id);
                      }
                    } else {
                      // navigation.navigate('PostScreen', {item: item});
                      navigation.navigate('FeedPost', {data: item});

                      
                    }
                  }}>
                  <View
                    style={[
                      styles.profileSection2,
                      item?.bubble
                        ? {borderRadius: (windowHeight * 0.08) / 2}
                        : {borderRadius: moderateScale(10, 0.6)},
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
                      // backgroundColor:'red'
                    }}>
                    <CustomText
                      style={{
                        fontSize: moderateScale(16, 0.6),
                        color: '#000',
                        textAlign: 'left',
                      }}
                      isBold>
                      {isSelected == 'feeds' ? item?.name : item?.title}
                    </CustomText>
                    {isSelected == 'feeds' && (
                      <ScrollView
                        horizontal
                        style={{
                          width: windowWidth * 0.25,

                          // backgroundColor : 'red'
                        }}
                        contentContainerStyle={{
                          paddingRight: moderateScale(130, 0.6),
                          gap: moderateScale(5, 0.6),
                        }}>
                        {item?.hashtags?.map((item, index) => {
                          return (
                            <View style={styles.hashContainer}>
                              <CustomText
                                style={{
                                  fontSize: moderateScale(9, 0.6),
                                  textAlign: 'left',
                                  color: '#000',
                                }}>
                                {item?.title}
                              </CustomText>
                            </View>
                          );
                        })}
                      </ScrollView>
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
                  navigation.navigate('Bubble', {id: selectedBubbleId});
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
        <RequestModal
          selectedBubbleId={selectedBubbleId}
          setIsVisible={setIsVisible}
          isVisible={isVisible}
          bubbleData={bubbleData}
        />
      </ImageBackground>
    </>
  );
};

export default BubbleSearch;

const styles = StyleSheet.create({
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
  hashContainer: {
    backgroundColor: 'white',
    paddingVertical: moderateScale(3, 0.6),
    paddingHorizontal: moderateScale(5, 0.6),
    borderRadius: moderateScale(10, 0.6),
    height: moderateScale(25, 0.6),
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
    borderColor: Color.green,
    justifyContent: 'center',
    overflow: 'hidden',
    // alignSelf: 'center',
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
  container2: {
    width: windowWidth,
    height: windowHeight * 0.9,
    positon: 'absolute',
    overflow: 'hidden',
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,.8)',
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
