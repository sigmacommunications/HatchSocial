import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  ImageBackground,
  Platform,
  ToastAndroid,
  ScrollView,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import Color from '../Assets/Utilities/Color';
import CustomStatusBar from '../Components/CustomStatusBar';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {Icon, Image} from 'native-base';

import CustomText from '../Components/CustomText';
import CustomButton from '../Components/CustomButton';
import Header from '../Components/Header';
import navigationService from '../navigationService';
import Entypo from 'react-native-vector-icons/Entypo';
import {useSelector} from 'react-redux';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import ImagePickerModal from '../Components/ImagePickerModal';
import CustomImage from '../Components/CustomImage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {TimerPickerModal} from 'react-native-timer-picker';
import {Post} from '../Axios/AxiosInterceptorFunction';
import { useNavigation } from '@react-navigation/native';

const AddEvents = (props) => {
  const bubbleId = props?.route?.params?.bubbleId
  const themeColor = useSelector(state => state.authReducer.ThemeColor);
  const privacy = useSelector(state => state.authReducer.privacy);
  const profileData = useSelector(state => state.commonReducer.selectedProfile);
  const token = useSelector(state => state.authReducer.token);
  const [selectedTab, setSelectedTab] = useState('Tag People');
  const [image, setImage] = useState({});
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState('');
  const [imagePickerVisible, setImagePickerVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('Select Date');
  const [time, setTime] = useState('Select Time');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [timeVisible, setTimeVisible] = useState(false);

  const navigation = useNavigation()

  const data = [
    {
      id: 2,
      title: 'Date',
      name: 'calendar',
      type: AntDesign,
      onPress: () => {
        setCalendarVisible(true);
      },
    },
    {
      id: 3,
      title: 'time',
      name: 'clockcircle',
      type: AntDesign,
      onPress: () => {
        setTimeVisible(true);
      },
    },
  ];

  const AddEvent = async () => {

    const formData = new FormData();
    const url = 'auth/event';
    const body = {
      profile_id:profileData?.id,
      community_id: bubbleId,
      title: title,
      description: description,
      date: date,
      time: `${hours}:${minutes}`,
    };
    for (let key in body) {
      if (['', null, undefined, ':'].includes(body[key])) {
        return Platform.OS == 'android'
          ? ToastAndroid.show(`${key} is required`, ToastAndroid.SHORT)
          : Alert.alert(`${key} is required`);
      } else {
        formData.append(key, body[key]);
      }
    }

    if (images.length > 0) {
      images?.map((item, index) =>
        formData.append(`image[${index}]`, images[index]),
      );
    } else {
      return Platform.OS == 'android'
        ? ToastAndroid.show('Add an image', ToastAndroid.SHORT)
        : Alert.alert('Add an image');
    }
  

    setLoading(true);
    const response = await Post(url, formData, apiHeader(token));
    setLoading(false);
    if (response != undefined) {
    
      navigation.goBack();
    }
  };

  useEffect(() => {
    if (Object.keys(image).length > 0) {
      setImages(prev => [...prev, image]);
      setImage({});
    }
  }, [image]);

  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />
      <Header showBack Title={'Add Event'} right />
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
          alignItems: 'center',
        }}>
        <ScrollView
          contentContainerStyle={{
            alignItems: 'center',
            paddingBottom: moderateScale(80, 0.6),
          }}>
          <CustomText
            style={styles.title}
            isBold={true}
            children={' Write Title'}
          />
          <TextInputWithTitle
            // title={'Title'}
            secureText={false}
            placeholder={'Event Title'}
            setText={setTitle}
            value={title}
            viewHeight={0.07}
            viewWidth={0.9}
            inputWidth={0.8}
            border={1}
            marginTop={moderateScale(5, 0.3)}
            borderColor={'#FFFFFF'}
            color={themeColor[1]}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(10, 0.3)}
          />

          <CustomText
            style={styles.title}
            isBold={true}
            children={' Write Description'}
          />
          <TextInputWithTitle
            maxLength={2000}
            secureText={false}
            placeholder={'Description'}
            setText={setDescription}
            value={description}
            viewHeight={0.18}
            viewWidth={0.9}
            inputWidth={0.85}
            marginTop={moderateScale(5, 0.3)}
            color={Color.red}
            border={1}
            borderColor={Color.white}
            placeholderColor={Color.themeLightGray}
            multiline
          />

          <CustomText
            style={styles.title}
            isBold={true}
            children={'Select Images'}
          />
          <View style={styles.imagesContainer}>
            {images?.map(item => {
              return (
                <View style={styles.image}>
                  <CustomImage
                    style={{width: '100%', height: '100%'}}
                    source={{uri: item?.uri}}
                  />
                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      right: 2,
                      top: 2,
                      zIndex: 1,
                      // backgroundColor: 'green',
                    }}
                    onPress={() => {
                      setImages(images.filter(data => data?.uri != item?.uri))
                    }}>
                    <Icon
                      name={'cross'}
                      color={Color.white}
                      as={Entypo}
                      onPress={() => {
                        setImages(images.filter(data => data?.uri != item?.uri))
                      }}
                    />
                  </TouchableOpacity>
                </View>
              );
            })}
            {images.length < 5 && (
              <TouchableOpacity
                style={styles.plus}
                onPress={() => {
                  if (images.length < 5) {
                    setImagePickerVisible(true);
                  } else {
                    Platform.OS == 'android'
                      ? ToastAndroid.show(
                          'you can select only five images.',
                          ToastAndroid.SHORT,
                        )
                      : Alert.alert('you can select only five images');
                  }
                }}>
                <Icon
                  name="plus"
                  as={Entypo}
                  size={25}
                  color={'black'}
                  onPress={() => {
                    if (images.length < 5) {
                      setImagePickerVisible(true);
                    } else {
                      Platform.OS == 'android'
                        ? ToastAndroid.show(
                            'you can select only five images.',
                            ToastAndroid.SHORT,
                          )
                        : Alert.alert('you can select only five images.');
                    }
                  }}
                />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.mapcontainer}>
            {data?.map(item => {
              return (
                <View style={styles.mapview}>
                  <CustomText styel={styles.maptext} isBold>
                    {item?.title}
                  </CustomText>
                  <TouchableOpacity
                    onPress={item?.onPress}
                    style={[
                      styles.iconContainer,
                      {backgroundColor: themeColor[1]},
                    ]}>
                    <Icon
                      name={item?.name}
                      size={4}
                      color={'white'}
                      as={item?.type}
                      onPress={item?.onPress}
                    />
                    <CustomText
                      onPress={item?.onPress}
                      style={{
                        color: Color.white,
                        fontSize: moderateScale(15, 0.6),
                        marginLeft: moderateScale(10, 0.3),
                      }}>
                      {item?.title == 'Date'
                        ? date
                        : hours
                        ? `${hours} : ${minutes} PM`
                        : 'Select time'}
                    </CustomText>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
          {calendarVisible && (
            <Calendar
              style={{
                width: windowWidth * 0.8,
                marginBottom: moderateScale(40, 0.3),
                // backgroundColor : 'red'
              }}
              minDate={moment().format()}
              onDayPress={day => {
                setDate(day?.dateString);
                setCalendarVisible(false);
              }}
              theme={{
                textSectionTitleColor: Color.themeColor,
                selectedDayBackgroundColor: Color.themeColor,
                selectedDayTextColor: Color.white,
                todayTextColor: Color.themeColor,
                dayTextColor: Color.black,
                dayTextColor: Color.black,
                textDisabledColor: '#d9e1e8',
                arrowColor: Color.themeColor,
                monthTextColor: Color.veryLightGray,
                indicatorColor: Color.themeColor,
                textMonthFontWeight: 'bold',
                textDayHeaderFontWeight: 'bold',
                textDayFontSize: moderateScale(12, 0.3),
                textMonthFontSize: moderateScale(16, 0.3),
                textDayHeaderFontSize: moderateScale(14, 0.3),
              }}
              markedDates={{
                ...{
                  [date]: {
                    selected: true,
                    color: Color.themeColor,
                    textColor: '#000000',
                    marked: true,
                  },
                },
              }}
            />
          )}
        </ScrollView>

        <View style={{position: 'absolute', bottom: 70}}>
          <CustomButton
            text={
              loading ? (
                <ActivityIndicator color={'#01E8E3'} size={'small'} />
              ) : (
                'Post'
              )
            }
            textColor={themeColor[1]}
            width={windowWidth * 0.7}
            height={windowHeight * 0.06}
            marginTop={moderateScale(40, 0.3)}
            onPress={() => {
              AddEvent();
              // disptach(setUserToken({token : 'fasdasd awdawdawdada'}))
              // navigationService.navigate('Signup');
            }}
            bgColor={['#FFFFFF', '#FFFFFF']}
            borderRadius={moderateScale(30, 0.3)}
            isGradient
            isBold={true}
          />
        </View>
      </ImageBackground>
      <TimerPickerModal
        styles={{
          theme: 'dark',
          confirmButton: {
            backgroundColor: themeColor[1],
            borderColor: themeColor[1],
          },
          cancelButton: {
            backgroundColor: themeColor[1],
            borderColor: themeColor[1],
          },
        }}
        visible={timeVisible}
        setIsVisible={setTimeVisible}
        onConfirm={pickedDuration => {
        
          // setTime(pickedDuration);
          setHours(pickedDuration?.hours);
          setMinutes(pickedDuration?.minutes);
          setTimeVisible(false);
        }}
        modalTitle="Select Time"
        onCancel={() => setTimeVisible(false)}
        closeOnOverlayPress
        // LinearGradient={}

        confirmTextStyle={{backgroundColor: 'purple'}}
        modalProps={{
          overlayOpacity: 0.2,
        }}
      />

      <ImagePickerModal
        show={imagePickerVisible}
        setShow={setImagePickerVisible}
        setFileObject={setImage}
      />
    </>
  );
};

const styles = ScaledSheet.create({
  iconContainer: {
    flexDirection: 'row',
    margin: moderateScale(5, 0.6),
    // backgroundColor: themeColor[1],
    padding: moderateScale(10, 0.6),
    borderRadius: moderateScale(10, 0.6),
    justifyContent: 'center',
    alignItems: 'center',
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
  title: {
    fontSize: moderateScale(18, 0.6),
    color: '#353434',
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
  line: {
    width: windowWidth * 0.006,
    height: windowHeight * 0.02,
    backgroundColor: 'black',
    marginTop: moderateScale(10, 0.3),
  },
  text: {
    fontSize: moderateScale(12, 0.6),
    color: '#353434',
    width: windowWidth * 0.9,
    textAlign: 'left',
    marginTop: moderateScale(10, 0.3),
  },
  tabStyles: {
    flexDirection: 'row',
    width: windowWidth * 0.9,
    justifyContent: 'space-between',
    marginTop: moderateScale(20, 0.3),
  },
  options: {
    fontSize: moderateScale(12, 0.6),
    width: windowWidth * 0.2,
    marginTop: moderateScale(10, 0.3),
  },
  mapview: {
    margin: moderateScale(10, 0.6),
    justifyContent: 'center',
    alignItems: 'center',
  },
  maptext: {
    width: windowWidth * 0.25,
    color: 'black',
    fontSize: moderateScale(15, 0.6),
  },
  mapcontainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    width: windowWidth,
    paddingHorizontal: moderateScale(10, 0.6),
  },
});

export default AddEvents;
