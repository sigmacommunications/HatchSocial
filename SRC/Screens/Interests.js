import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomText from '../Components/CustomText';
import CustomImage from '../Components/CustomImage';
import {moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {setSelectedProfileData} from '../Store/slices/common';
import {setInterestSelected} from '../Store/slices/auth';
import {useDispatch, useSelector} from 'react-redux';
import CustomButton from '../Components/CustomButton';
import Header from '../Components/Header';

const Interests = () => {
  const privacy = useSelector(state => state.authReducer.privacy);

  const themeColor = useSelector(state => state.authReducer.ThemeColor);
  const token = useSelector(state => state.authReducer.token);
  const profileData = useSelector(state => state.commonReducer.selectedProfile);
  const dispatch = useDispatch();

  const [selectedBubble, setSelectedBubble] = useState([]);
  console.log('🚀 ~ Interests ~ selectedBubble:', selectedBubble);
  const [isLaoding, setIsLaoding] = useState(false);
  const [images1, setimages1] = useState([
    {
      id: 'img11',
      image: require('../Assets/Images/int_Biz_Compress/shutterstock_1.jpg'),
      name: 'Finanace',
      added: false,
    },
    {
      id: 'img12',
      image: require('../Assets/Images/int_Biz_Compress/shutterstock_2.jpg'),
      name: 'Alternative Medicine',
      added: false,
    },
    {
      id: 'img13',
      image: require('../Assets/Images/int_Biz_Compress/shutterstock_3.jpg'),
      name: 'Commercial Real-estate',
      added: false,
    },
    {
      id: 'img14',
      image: require('../Assets/Images/int_Biz_Compress/shutterstock_4.jpg'),
      name: 'Management Consulting',
      added: false,
    },
    {
      id: 'img15',
      image: require('../Assets/Images/int_Biz_Compress/shutterstock_5.jpg'),
      name: 'Marketing/sales/Advertising',
      added: false,
    },
    {
      id: 'img16',
      image: require('../Assets/Images/int_Biz_Compress/shutterstock_6.jpg'),
      name: 'Audio/Visual Technology and Communications',
      added: false,
    },
    {
      id: 'img17',
      image: require('../Assets/Images/int_Biz_Compress/shutterstock_7.jpg'),
      name: 'education',
      added: false,
    },
    {
      id: 'img18',
      image: require('../Assets/Images/int_Biz_Compress/shutterstock_8.jpg'),
      name: 'Graphics Designer',
      added: false,
    },
    {
      id: 'img19',
      image: require('../Assets/Images/int_Biz_Compress/shutterstock_9.jpg'),
      name: 'Arts,Entertainment,Recreation',
      added: false,
    },
    {
      id: 'img110',
      image: require('../Assets/Images/int_Biz_Compress/shutterstock_10.jpg'),
      name: 'Tech',
      added: false,
    },
    {
      id: 'img111',
      image: require('../Assets/Images/int_Biz_Compress/shutterstock_11.jpg'),
      name: 'Energy/Public Utiliy',
      added: false,
    },
    {
      id: 'img112',
      image: require('../Assets/Images/int_Biz_Compress/shutterstock_12.jpg'),
      name: 'Restaurant/Hotel',
      added: false,
    },
    {
      id: 'img113',
      image: require('../Assets/Images/int_Biz_Compress/shutterstock_13.jpg'),
      name: 'Proudction',
      added: false,
    },
    {
      id: 'img114',
      image: require('../Assets/Images/int_Biz_Compress/shutterstock_14.jpg'),
      name: 'Publish',
      added: false,
    },
    {
      id: 'img115',
      image: require('../Assets/Images/int_Biz_Compress/shutterstock_15.jpg'),
      name: 'Building/Construction/Desgin',
      added: false,
    },
    {
      id: 'img116',
      image: require('../Assets/Images/int_Biz_Compress/shutterstock_16.jpg'),
      name: 'Statistician',
      added: false,
    },
    {
      id: 'img117',
      image: require('../Assets/Images/int_Biz_Compress/shutterstock_17.jpg'),
      name: 'Insurance',
      added: false,
    },
    {
      id: 'img118',
      image: require('../Assets/Images/int_Biz_Compress/shutterstock_18.jpg'),
      name: 'Residential Real-estate',
      added: false,
    },
    {
      id: 'img119',
      image: require('../Assets/Images/int_Biz_Compress/shutterstock_19.jpg'),
      name: 'IT Support',
      added: false,
    },
    {
      id: 'img120',
      image: require('../Assets/Images/int_Biz_Compress/shutterstock_20.jpg'),
      name: 'Human Resources',
      added: false,
    },
    {
      id: 'img121',
      image: require('../Assets/Images/int_Biz_Compress/shutterstock_21.jpg'),
      name: 'Natural Resources/Mining',
      added: false,
    },
    {
      id: 'img122',
      image: require('../Assets/Images/int_Biz_Compress/shutterstock_22.jpg'),
      name: 'Hospitatlity/Tourism',
      added: false,
    },
  ]);

  const [images2, setimages2] = useState([
    {
      id: 'img21',
      image: require('../Assets/Images/int_Invest_Compress/invest_1.jpg'),
      name: 'Mutual Fund',
      added: false,
    },
    {
      id: 'img22',
      image: require('../Assets/Images/int_Invest_Compress/invest_2.jpg'),
      name: 'Money Market Fund',
      added: false,
    },
    // {
    //   id: 'img3',
    //   image: require('../Assets/Images/int_Invest_Compress/invest_3.jpg'),
    //   name: 'Consectetur Adipiscing',
    //   added: false,
    // },
    {
      id: 'img24',
      image: require('../Assets/Images/int_Invest_Compress/invest_4.jpg'),
      name: 'Stock',
      added: false,
    },
    {
      id: 'img25',
      image: require('../Assets/Images/int_Invest_Compress/invest_5.jpg'),
      name: 'Real-estate',
      added: false,
    },
    {
      id: 'img26',
      image: require('../Assets/Images/int_Invest_Compress/invest_6.jpg'),
      name: 'Ut Labore Et Dolore',
      added: false,
    },
    {
      id: 'img27',
      image: require('../Assets/Images/int_Invest_Compress/invest_7.jpg'),
      name: 'annuity',
      added: false,
    },
    {
      id: 'img28',
      image: require('../Assets/Images/int_Invest_Compress/invest_8.jpg'),
      name: 'Muncipal Bond',
      added: false,
    },
    {
      id: 'img29',
      image: require('../Assets/Images/int_Invest_Compress/invest_9.jpg'),
      name: 'Crowd Funding',
      added: false,
    },
    {
      id: 'img210',
      image: require('../Assets/Images/int_Invest_Compress/invest_10.jpg'),
      name: 'Index Funds',
      added: false,
    },
    {
      id: 'img211',
      image: require('../Assets/Images/int_Invest_Compress/invest_11.jpg'),
      name: 'Crypto',
      added: false,
    },
    {
      id: 'img212',
      image: require('../Assets/Images/int_Invest_Compress/invest_12.jpg'),
      name: 'Exchange-Traded Fund',
      added: false,
    },
    {
      id: 'img213',
      image: require('../Assets/Images/int_Invest_Compress/invest_13.jpg'),
      name: 'investment fund',
      added: false,
    },
    {
      id: 'img214',
      image: require('../Assets/Images/int_Invest_Compress/invest_14.jpg'),
      name: 'NFT',
      added: false,
    },
  ]);
  const [images3, setimages3] = useState([
    {
      id: 'img31',
      image: require('../Assets/Images/int_Social_Compress/Social_1.jpg'),
      name: 'Comedy',
      added: false,
    },
    {
      id: 'img32',
      image: require('../Assets/Images/int_Social_Compress/Social_2.jpg'),
      name: 'Writing',
      added: false,
    },
    {
      id: 'img33',
      image: require('../Assets/Images/int_Social_Compress/Social_43.jpg'),
      name: 'Musician',
      added: false,
    },
    {
      id: 'img34',
      image: require('../Assets/Images/int_Social_Compress/Social_4.jpg'),
      name: 'News',
      added: false,
    },
    {
      id: 'img35',
      image: require('../Assets/Images/int_Social_Compress/Social_5.jpg'),
      name: 'Textile Activities',
      added: false,
    },
    {
      id: 'img36',
      image: require('../Assets/Images/int_Social_Compress/Social_6.jpg'),
      name: 'Birds Watching',
      added: false,
    },
    {
      id: 'img37',
      image: require('../Assets/Images/int_Social_Compress/Social_7.jpg'),
      name: 'Music',
      added: false,
    },
    {
      id: 'img38',
      image: require('../Assets/Images/int_Social_Compress/Social_8.jpg'),
      name: 'Food/Cooking',
      added: false,
    },
    {
      id: 'img39',
      image: require('../Assets/Images/int_Social_Compress/Social_9.jpg'),
      name: 'Entertaining',
      added: false,
    },
    {
      id: 'img310',
      image: require('../Assets/Images/int_Social_Compress/Social_10.jpg'),
      name: 'Equestrian',
      added: false,
    },
    {
      id: 'img311',
      image: require('../Assets/Images/int_Social_Compress/Social_11.jpg'),
      name: 'Pro Sports',
      added: false,
    },
    {
      id: 'img312',
      image: require('../Assets/Images/int_Social_Compress/Social_12.jpg'),
      name: 'Blogging',
      added: false,
    },
    {
      id: 'img313',
      image: require('../Assets/Images/int_Social_Compress/Social_13.jpg'),
      name: 'Floral Design',
      added: false,
    },
    {
      id: 'img314',
      image: require('../Assets/Images/int_Social_Compress/Social_14.jpg'),
      name: 'Alternative Fitness',
      added: false,
    },
    // Up to Social_14.jpg, continue up to Social_42.jpg
    {
      id: 'img315',
      image: require('../Assets/Images/int_Social_Compress/Social_15.jpg'),
      name: 'Art',
      added: false,
    },
    {
      id: 'img316',
      image: require('../Assets/Images/int_Social_Compress/Social_44.jpg'),
      name: 'Outdoor Sports',
      added: false,
    },
    {
      id: 'img317',
      image: require('../Assets/Images/int_Social_Compress/Social_17.jpg'),
      name: 'BeeKeeping',
      added: false,
    },
    {
      id: 'img318',
      image: require('../Assets/Images/int_Social_Compress/Social_45.jpg'),
      name: 'Travelling',
      added: false,
    },
    {
      id: 'img319',
      image: require('../Assets/Images/int_Social_Compress/Social_19.jpg'),
      name: 'Brewing',
      added: false,
    },
    {
      id: 'img320',
      image: require('../Assets/Images/int_Social_Compress/Social_20.jpg'),
      name: 'Build',
      added: false,
    },
    {
      id: 'img321',
      image: require('../Assets/Images/int_Social_Compress/Social_21.jpg'),
      name: 'Dining',
      added: false,
    },
    {
      id: 'img322',
      image: require('../Assets/Images/int_Social_Compress/Social_22.jpg'),
      name: 'Board Games',
      added: false,
    },
    {
      id: 'img323',
      image: require('../Assets/Images/int_Social_Compress/Social_23.jpg'),
      name: 'Out-Door Sports',
      added: false,
    },
    {
      id: 'img324',
      image: require('../Assets/Images/int_Social_Compress/Social_24.jpg'),
      name: 'Wine',
      added: false,
    },
    {
      id: 'img325',
      image: require('../Assets/Images/int_Social_Compress/Social_25.jpg'),
      name: 'Cocktails',
      added: false,
    },
    {
      id: 'img326',
      image: require('../Assets/Images/int_Social_Compress/Social_26.jpg'),
      name: 'Poker',
      added: false,
    },
    {
      id: 'img327',
      image: require('../Assets/Images/int_Social_Compress/Social_27.jpg'),
      name: 'Barrista',
      added: false,
    },
    {
      id: 'img328',
      image: require('../Assets/Images/int_Social_Compress/Social_28.jpg'),
      name: 'Snow Sports',
      added: false,
    },
    {
      id: 'img329',
      image: require('../Assets/Images/int_Social_Compress/Social_29.jpg'),
      name: 'Gardening',
      added: false,
    },
    {
      id: 'img330',
      image: require('../Assets/Images/int_Social_Compress/Social_30.jpg'),
      name: 'Architecture',
      added: false,
    },
    {
      id: 'img331',
      image: require('../Assets/Images/int_Social_Compress/Social_31.jpg'),
      name: 'language',
      added: false,
    },
    {
      id: 'img332',
      image: require('../Assets/Images/int_Social_Compress/Social_32.jpg'),
      name: 'Fantasy Sports',
      added: false,
    },
    {
      id: 'img333',
      image: require('../Assets/Images/int_Social_Compress/Social_33.jpg'),
      name: 'Concerts',
      added: false,
    },
    {
      id: 'img334',
      image: require('../Assets/Images/int_Social_Compress/Social_34.jpg'),
      name: 'College Sports',
      added: false,
    },
    {
      id: 'img335',
      image: require('../Assets/Images/int_Social_Compress/Social_35.jpg'),
      name: 'Spirituality',
      added: false,
    },
    {
      id: 'img336',
      image: require('../Assets/Images/int_Social_Compress/Social_36.jpg'),
      name: 'Ut Enim Ad Minim',
      added: false,
    },
    {
      id: 'img337',
      image: require('../Assets/Images/int_Social_Compress/Social_37.jpg'),
      name: 'Fashion',
      added: false,
    },
    {
      id: 'img338',
      image: require('../Assets/Images/int_Social_Compress/Social_38.jpg'),
      name: 'Charity',
      added: false,
    },
    {
      id: 'img339',
      image: require('../Assets/Images/int_Social_Compress/Social_39.jpg'),
      name: 'Dance',
      added: false,
    },
    {
      id: 'img340',
      image: require('../Assets/Images/int_Social_Compress/Social_40.jpg'),
      name: 'Astrology',
      added: false,
    },
    {
      id: 'img341',
      image: require('../Assets/Images/int_Social_Compress/Social_41.jpg'),
      name: 'Beauty',
      added: false,
    },
    {
      id: 'img342',
      image: require('../Assets/Images/int_Social_Compress/Social_46.jpg'),
      name: 'Book Club',
      added: false,
    },
    {
      id: 'img343',
      image: require('../Assets/Images/int_Social_Compress/Social_47.jpg'),
      name: 'Fitness',
      added: false,
    },
  ]);
  const [images4, setimages4] = useState([
    {
      id: 'img41',
      image: require('../Assets/Images/int_Traders_Compress/traders_1.jpg'),
      name: 'Ultrasonographer',
      added: false,
    },
    {
      id: 'img42',
      image: require('../Assets/Images/int_Traders_Compress/traders_2.jpg'),
      name: 'Construction Managers',
      added: false,
    },
    {
      id: 'img43',
      image: require('../Assets/Images/int_Traders_Compress/traders_3.jpg'),
      name: 'Boileramker',
      added: false,
    },
    {
      id: 'img44',
      image: require('../Assets/Images/int_Traders_Compress/traders_4.jpg'),
      name: 'Nuclear Medicine',
      added: false,
    },
    {
      id: 'img45',
      image: require('../Assets/Images/int_Traders_Compress/traders_5.jpg'),
      name: 'Welder',
      added: false,
    },
    {
      id: 'img46',
      image: require('../Assets/Images/int_Traders_Compress/traders_6.jpg'),
      name: 'Mason',
      added: false,
    },
    {
      id: 'img47',
      image: require('../Assets/Images/int_Traders_Compress/traders_7.jpg'),
      name: 'HVAC',
      added: false,
    },
    {
      id: 'img48',
      image: require('../Assets/Images/int_Traders_Compress/traders_8.jpg'),
      name: 'Real estate Inspectors/Appraisor',
      added: false,
    },
    {
      id: 'img410',
      image: require('../Assets/Images/int_Traders_Compress/traders_10.jpg'),
      name: 'Millwright',
      added: false,
    },
    {
      id: 'img411',
      image: require('../Assets/Images/int_Traders_Compress/traders_11.jpg'),
      name: 'Civil engineering tech',
      added: false,
    },
    {
      id: 'img412',
      image: require('../Assets/Images/int_Traders_Compress/traders_12.jpg'),
      name: 'Electrician',
      added: false,
    },
    {
      id: 'img413',
      image: require('../Assets/Images/int_Traders_Compress/traders_13.jpg'),
      name: 'Mechanic',
      added: false,
    },
    {
      id: 'img414',
      image: require('../Assets/Images/int_Traders_Compress/traders_14.jpg'),
      name: 'Dental Hygenists',
      added: false,
    },
    // Up to traders_14.jpg, continue up to traders_21.jpg
    {
      id: 'img415',
      image: require('../Assets/Images/int_Traders_Compress/traders_15.jpg'),
      name: 'Industrial Engg. Tech',
      added: false,
    },
    {
      id: 'img416',
      image: require('../Assets/Images/int_Traders_Compress/traders_16.jpg'),
      name: 'Plumber',
      added: false,
    },
    {
      id: 'img417',
      image: require('../Assets/Images/int_Traders_Compress/traders_17.jpg'),
      name: 'Lineworker',
      added: false,
    },
    {
      id: 'img418',
      image: require('../Assets/Images/int_Traders_Compress/traders_18.jpg'),
      name: 'Carpentry',
      added: false,
    },
    {
      id: 'img419',
      image: require('../Assets/Images/int_Traders_Compress/traders_19.jpg'),
      name: 'Respiratory therapist',
      added: false,
    },

    {
      id: 'img421',
      image: require('../Assets/Images/int_Traders_Compress/traders_21.jpg'),
      name: 'Pipefitter',
      added: false,
    },
  ]);

 

  const sendSelectedFeeds = async () => {
    const url = 'auth/subscribe';
    const body = {
      id: profileData?.id,
      interests: selectedBubble?.map(item => {
        return {interest_id: item?.id, name: item?.name};
      }),
    };
    console.log('🚀 ~ sendSelectedFeeds ~ body:', body);
    setIsLaoding(true);
    const response = await Post(url, body, apiHeader(token));
    setIsLaoding(false);
    if (response != undefined) {
     console.log("🚀 ~ sendSelectedFeeds ~ response:", response?.data)
      dispatch(setSelectedProfileData(response?.data?.profile_info));
      dispatch(setInterestSelected(true));
      Platform.OS == 'android'
        ? ToastAndroid.show('Saved', ToastAndroid.SHORT)
        : Alert.alert('Saved');
    }
  };

  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />
      <Header Title="Select Your Interests"/>
      <ImageBackground
        source={
          // ? require('../Assets/Images/theme2.jpg')
          privacy == 'private'
            ? require('../Assets/Images/theme2.jpg')
            : require('../Assets/Images/Main.png')
        }
        resizeMode={'cover'}
        style={{
          width: windowWidth,
          height: windowHeight * 0.9,
          paddingVertical: moderateScale(12, 0.2),
        }}>

<View
          style={{
            position: 'absolute',
            bottom: moderateScale(100, 0.3),
            right: moderateScale(15, 0.6),
            zIndex: 1,
          }}>
          <CustomButton
            text={
              isLaoding ? (
                <ActivityIndicator color={'white'} size={'small'} />
              ) : (
                'Save'
              )
            }
            textColor={Color.white}
            width={windowWidth * 0.2}
            height={windowHeight * 0.04}
            onPress={() => {
              if (selectedBubble.length > 0) {
      // dispatch(setSelectedProfileData(response?.data?.profile_info));
                  sendSelectedFeeds()
              

                // setIsVisible(true)
                // sendSelectedFeeds();
              } else {
                Platform.OS == 'android'
                  ? ToastAndroid.show('Select any Bubble', ToastAndroid.SHORT)
                  : Alert.alert('Select any Bubble');
              }
            }}
            fontSize={moderateScale(12, 0.6)}
            bgColor={themeColor}
            borderRadius={moderateScale(30, 0.3)}
            isGradient
          />
          <CustomButton
            text={'skip'}
            textColor={themeColor[1]}
            width={windowWidth * 0.2}
            height={windowHeight * 0.04}
            fontSize={moderateScale(12, 0.6)}
            onPress={() => {
              dispatch(setInterestSelected(true));
            }}
            marginTop={moderateScale(10, 0.3)}
            bgColor={['#ffffff', '#ffffff']}
            borderRadius={moderateScale(30, 0.3)}
            isGradient
          />
        </View>
        <ScrollView>
          {/* replaces Grow Bubble Tips */}
          <CustomText
            isBold
            style={{
              color: 'green',
              fontSize: moderateScale(24, 0.2),
              margin: moderateScale(10, 0.2),
            }}>
            Trade
          </CustomText>
          <FlatList
            data={images4}
            keyExtractor={item => item.id}
            horizontal
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.card}
                  onPress={() => {
                    console.log('Here');
                    if (
                      selectedBubble.findIndex(i => i?.id == item?.id) != -1
                    ) {
                      setSelectedBubble(
                        selectedBubble?.filter(i => i?.id != item?.id),
                      );
                      const data = [...images4];
                      data[index].added = false;

                      setimages4(data);
                    } else {
                      setSelectedBubble(prev => [
                        ...prev,
                        {id: item?.id, name: item?.name},
                      ]);
                      const data = [...images4];
                      data[index].added = true;

                      setimages4(data);
                    }
                  }}>
                  <ImageBackground
                    resizeMode="cover"
                    source={item.image}
                    style={styles.image}>
                    <CustomText
                      style={[
                        styles.catText,
                        item?.added && {postion: 'absolute', bottom: 5},
                      ]}
                      isBold>
                      {item.name}
                    </CustomText>
                    {item?.added && (
                      <Animatable.View
                        animation="pulse"
                        easing="ease-out"
                        iterationCount="infinite"
                        style={{
                          width: moderateScale(60, 0.6),
                          height: moderateScale(60, 0.6),
                          zIndex: 1,
                          alignSelf: 'center',
                          // /top: '35%',
                        }}>
                        <CustomImage
                          onPress={() => {
                            console.log('Here');
                            if (
                              selectedBubble.findIndex(
                                i => i?.id == item?.id,
                              ) != -1
                            ) {
                              setSelectedBubble(
                                selectedBubble?.filter(i => i?.id != item?.id),
                              );
                              const data = [...images4];
                              data[index].added = false;

                              setimages4(data);
                            } else {
                              setSelectedBubble(prev => [
                                ...prev,
                                {id: item?.id, name: item?.name},
                              ]);
                              const data = [...images4];
                              data[index].added = true;

                              setimages4(data);
                            }
                          }}
                          source={require('../Assets/Images/heart.png')}
                          resizeMode={'stretch'}
                          style={{width: '100%', height: '100%'}}
                        />
                      </Animatable.View>
                    )}
                    <LinearGradient
                      colors={['#c7c9c9', '#232324']}
                      start={{x: 0.1, y: 0.1}}
                      end={{x: 0.2, y: 0.5}}
                      style={{
                        opacity: 0.65,
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                      }}></LinearGradient>
                  </ImageBackground>
                </TouchableOpacity>
              );
            }}
          />
          {/* setup and bubble management */}
          <CustomText
            isBold
            style={{
              color: '#39FF14',
              fontSize: moderateScale(24, 0.2),
              margin: moderateScale(10, 0.2),
            }}>
            Biz
          </CustomText>
          <FlatList
            data={images1}
            keyExtractor={item => item.id}
            horizontal
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={styles.card}
                  onPress={() => {
                    console.log('Here');
                    if (
                      selectedBubble.findIndex(i => i?.id == item?.id) != -1
                    ) {
                      setSelectedBubble(
                        selectedBubble?.filter(i => i?.id != item?.id),
                      );
                    } else {
                      setSelectedBubble(prev => [
                        ...prev,
                        {id: item?.id, name: item?.name},
                      ]);
                    }
                    const data = [...images1];
                    data[index].added = !data[index].added;

                    setimages1(data);
                  }}>
                  <ImageBackground
                    resizeMode="cover"
                    source={item.image}
                    style={styles.image}>
                    <CustomText
                      style={[
                        styles.catText,
                        item?.added && {postion: 'absolute', bottom: 5},
                      ]}
                      isBold>
                      {item.name}
                    </CustomText>
                    {item?.added && (
                      <Animatable.View
                        animation="pulse"
                        easing="ease-out"
                        iterationCount="infinite"
                        style={{
                          width: moderateScale(60, 0.6),
                          height: moderateScale(60, 0.6),
                          zIndex: 1,
                          alignSelf: 'center',
                          // /top: '35%',
                        }}>
                        <CustomImage
                          onPress={() => {
                            console.log('Here');
                            if (
                              selectedBubble.findIndex(
                                i => i?.id == item?.id,
                              ) != -1
                            ) {
                              setSelectedBubble(
                                selectedBubble?.filter(i => i?.id != item?.id),
                              );
                              const data = [...images1];
                              data[index].added = false;

                              setimages1(data);
                            } else {
                              setSelectedBubble(prev => [
                                ...prev,
                                {id: item?.id, name: item?.name},
                              ]);
                              const data = [...images1];
                              data[index].added = true;

                              setimages1(data);
                            }
                          }}
                          source={require('../Assets/Images/heart.png')}
                          resizeMode={'stretch'}
                          style={{width: '100%', height: '100%'}}
                        />
                      </Animatable.View>
                    )}
                    <LinearGradient
                      colors={['#c7c9c9', '#232324']}
                      start={{x: 0.1, y: 0.1}}
                      end={{x: 0.2, y: 0.5}}
                      style={{
                        opacity: 0.65,
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                      }}></LinearGradient>
                  </ImageBackground>
                </TouchableOpacity>
              );
            }}
          />
          {/* replaces  bubble membership mangement */}
          <CustomText
            isBold
            style={{
              color: 'purple',
              fontSize: moderateScale(24, 0.2),
              margin: moderateScale(10, 0.2),
            }}>
            Invest
          </CustomText>
          <FlatList
            data={images2}
            keyExtractor={item => item.id}
            horizontal
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={styles.card}
                  onPress={() => {
                    console.log('Here');
                    if (
                      selectedBubble.findIndex(i => i?.id == item?.id) != -1
                    ) {
                      setSelectedBubble(
                        selectedBubble?.filter(i => i?.id != item?.id),
                      );
                    } else {
                      setSelectedBubble(prev => [
                        ...prev,
                        {id: item?.id, name: item?.name},
                      ]);
                    }
                    const data = [...images2];
                    data[index].added = !data[index].added;

                    setimages2(data);
                  }}>
                  <ImageBackground
                    resizeMode="cover"
                    source={item.image}
                    style={styles.image}>
                    <CustomText
                      style={[
                        styles.catText,
                        item?.added && {postion: 'absolute', bottom: 5},
                      ]}>
                      {item.name}
                    </CustomText>
                    {item?.added && (
                      <Animatable.View
                        animation="pulse"
                        easing="ease-out"
                        iterationCount="infinite"
                        style={{
                          width: moderateScale(60, 0.6),
                          height: moderateScale(60, 0.6),
                          zIndex: 1,
                          alignSelf: 'center',
                          // /top: '35%',
                        }}>
                        <CustomImage
                          onPress={() => {
                            console.log('Here');
                            if (
                              selectedBubble.findIndex(
                                i => i?.id == item?.id,
                              ) != -1
                            ) {
                              setSelectedBubble(
                                selectedBubble?.filter(i => i?.id != item?.id),
                              );
                              const data = [...images2];
                              data[index].added = false;

                              setimages2(data);
                            } else {
                              setSelectedBubble(prev => [
                                ...prev,
                                {id: item?.id, name: item?.name},
                              ]);
                              const data = [...images2];
                              data[index].added = true;

                              setimages2(data);
                            }
                          }}
                          source={require('../Assets/Images/heart.png')}
                          resizeMode={'stretch'}
                          style={{width: '100%', height: '100%'}}
                        />
                      </Animatable.View>
                    )}
                    <LinearGradient
                      colors={['#c7c9c9', '#232324']}
                      start={{x: 0.1, y: 0.1}}
                      end={{x: 0.2, y: 0.5}}
                      style={{
                        opacity: 0.65,
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                      }}></LinearGradient>
                  </ImageBackground>
                </TouchableOpacity>
              );
            }}
          />
          {/* replaced  bubble payment and tax */}
          <CustomText
           
            isBold
            style={{
              fontSize: moderateScale(24, 0.2),
              color: '#ff66f5',
              margin: moderateScale(10, 0.2),
            }}>
            Social
          </CustomText>
          <FlatList
            data={images3}
            keyExtractor={item => item.id}
            horizontal
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    console.log('Here');
                    if (
                      selectedBubble.findIndex(i => i?.id == item?.id) != -1
                    ) {
                      setSelectedBubble(
                        selectedBubble?.filter(i => i?.id != item?.id),
                      );
                    } else {
                      setSelectedBubble(prev => [
                        ...prev,
                        {id: item?.id, name: item?.name},
                      ]);
                    }
                    const data = [...images3];
                    data[index].added = !data[index].added;

                    setimages3(data);
                  }}
                  style={styles.card}>
                  <ImageBackground
                    resizeMode="cover"
                    source={item.image}
                    style={styles.image}>
                    <CustomText
                      style={[
                        styles.catText,
                        item?.added && {postion: 'absolute', bottom: 5},
                      ]}
                      isBold>
                      {item.name}
                    </CustomText>
                    {item?.added && (
                      <Animatable.View
                        animation="pulse"
                        easing="ease-out"
                        iterationCount="infinite"
                        style={{
                          width: moderateScale(60, 0.6),
                          height: moderateScale(60, 0.6),
                          zIndex: 1,
                          alignSelf: 'center',
                          // /top: '35%',
                        }}>
                        <CustomImage
                          onPress={() => {
                            console.log('Here');
                            if (
                              selectedBubble.findIndex(
                                i => i?.id == item?.id,
                              ) != -1
                            ) {
                              setSelectedBubble(
                                selectedBubble?.filter(i => i?.id != item?.id),
                              );
                              const data = [...images3];
                              data[index].added = false;

                              setimages3(data);
                            } else {
                              setSelectedBubble(prev => [
                                ...prev,
                                {id: item?.id, name: item?.name},
                              ]);
                              const data = [...images3];
                              data[index].added = true;

                              setimages3(data);
                            }
                          }}
                          source={require('../Assets/Images/heart.png')}
                          resizeMode={'stretch'}
                          style={{width: '100%', height: '100%'}}
                        />
                      </Animatable.View>
                    )}
                    <LinearGradient
                      colors={['#c7c9c9', '#232324']}
                      start={{x: 0.1, y: 0.1}}
                      end={{x: 0.2, y: 0.5}}
                      style={{
                        opacity: 0.65,
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                      }}></LinearGradient>
                  </ImageBackground>
                </TouchableOpacity>
              );
            }}
          />
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default Interests;

const styles = StyleSheet.create({
  mainScreen: {
    width: windowWidth,
    height: windowHeight,
  },
  card: {
    width: windowWidth * 0.35,
    height: windowWidth * 0.45,
    borderRadius: moderateScale(15, 0.2),
    overflow: 'hidden',
    margin: moderateScale(4, 0.2),
  },
  image: {
    width: '100%',
    height: '100%',
    opacity: 0.85,
    justifyContent: 'center',
    alignItems: 'center',
  },
  catText: {
    // borderColor:'red',
    // borderWidth:1,
    width: '80%',
    textAlign: 'center',
    color: 'white',

    position: 'absolute',
    zIndex: 1,
    // backgroundColor: Color.themeLightGray,
    fontSize: moderateScale(20, 0.2),
    // flexWrap:'wrap'
  },
});
