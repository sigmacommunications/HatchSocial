import {
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
  Platform,
  ToastAndroid,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
const {height, width} = Dimensions.get('window');
import Entypo from 'react-native-vector-icons/Entypo';
import {SearchData} from '../dummyData/SearchData';
import CustomStatusBar from '../Components/CustomStatusBar';
import Header from '../Components/Header';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import Color from '../Assets/Utilities/Color';
import {useDispatch, useSelector} from 'react-redux';
import CustomModal from '../Components/CustomModal';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import CustomButton from '../Components/CustomButton';
import Modal from 'react-native-modal';
import {Icon} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import navigationService from '../navigationService';
import {
  setAccountPrivate,
  setBubbleCreated,
  setBubbleSelected,
  setFeedsSelected,
  setNumOfProfiles,
  setProfileSelcted,
  setQuestionAnswered,
  setUserToken,
} from '../Store/slices/auth';
import {Get, Post} from '../Axios/AxiosInterceptorFunction';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {setSelectedProfileData} from '../Store/slices/common';

const QuestionScreen = props => {
  const themeColor = useSelector(state => state.authReducer.ThemeColor);
  const privacy = useSelector(state => state.authReducer.privacy);
  const selectedProfile = useSelector(state => state.commonReducer.selectedProfile);
 
  const token = useSelector(state => state.authReducer.token);
  const type = props?.route?.params?.type;
  console.log('🚀 ~ file: QuestionScreen.js:33 ~ QuestionScreen ~ type:', type);

  const dispatch = useDispatch();

  const question1 = [
    {
      question: 'What are you most interested in building on Hatch?',
      student: [
        {
          num: 'A',
          image:require('../Assets/Images/content.jpg'),
          option:
            'Gain access to content and creators that help introduce me to new interests',
        },
        {
          num: 'B',
          image:require('../Assets/Images/content1.jpg'),
          option:
            'Gain access to content and creators that help me learn more deeply about my existing interests',
        },
        {
          num: 'C',
          image:require('../Assets/Images/connect.jpg'),
          option: 'Connect with people in communities over shared inte',
        },
      ],
      other: [
        {
          num: 'A',
          image:require('../Assets/Images/money.jpg'),
          option:
            'a money-making, highly involved community around your passion that will not demonetize you',
        },
        {
          num: 'B',
          image:require('../Assets/Images/business.jpg'),
          option:
            'a scalable business presence that creates an interactive community around my products and services and reach to digital marketing,partnerships/collaboration, investors and other limitless resources',
        },
        {
          num: 'C',
          image:require('../Assets/Images/comunity2.jpg'),
          option:
            'Building an online presence for my self-moderated community to speak and share freely and connect with other like communities',
        },
      ],
    },
  ];

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [answer, setAnswer] = useState({});
  const [showTicks, setShowTicks] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const postAnswer = async () => {
    const url = `auth/profileqa`;
    if (Object.keys(answer).length==0) {
      return Platform.OS == 'android'
        ? ToastAndroid.show('please select any answer', ToastAndroid.SHORT)
        : Alert.alert('please select any answer');
    }
    const body = {
      id: selectedProfile?.id,
      ...answer,
    };

    console.log("🚀 ~ file: QuestionScreen.js:124 ~ postAnswer ~ body:", body)
    
    setIsLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setIsLoading(false);

    if (response != undefined) {
      console.log(
        '🚀 ~ file: QuestionScreen.js:104 ~ postAnswer ~ response:',
        response?.data,
      );
      dispatch(setBubbleCreated(false))
      dispatch(setProfileSelcted(true));
      dispatch(setSelectedProfileData(response?.data?.profile_info));
      dispatch(setQuestionAnswered(response?.data?.profile_info?.qa_status));
    }
  };

  const handleAnswerSubmit = () => {
    setModalVisible(false);
    setAnswer('');

    setShowTicks(prevTicks => ({
      ...prevTicks,
      [selectedQuestion]: true,
    }));
  };

  const handleQuestionClick = question => {
    setSelectedQuestion(question);
    setModalVisible(true);
  };

  useEffect(() => {
    // getQuestions();
  }, []);

  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />
      <Header/>

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
        }}>
        {question1?.map((item, index) => {
          return (
            <>
              <CustomText
                style={{
                  fontSize: moderateScale(15, 0.6),
                  // backgroundColor: 'green',
                  textAlign: 'center',
                  paddingHorizontal: moderateScale(20, 0.6),
                  marginTop: moderateScale(10, 0.3),
                }} isBold>
                {item?.question}
              </CustomText>
              {(selectedProfile?.type != 'Learning & Exploring'
                ? item?.other
                : item.student
              )?.map((question, index) => (
                <View
                  style={{
                    flexDirection: 'row',
                    paddingVertical: moderateScale(10, 0.6),
                    justifyContent: 'space-around',
                    width: windowWidth * 0.95,
                    // backgroundColor:'red',
                    alignItems: 'center',
                  }}>
                  {answer?.answer == question?.option ? (
                    <Icon
                      as={AntDesign}
                      name={'check'}
                      color={'black'}
                      size={moderateScale(25, 0.6)}
                    />
                  ) : (
                    <CustomText
                      style={{
                        fontSize: moderateScale(20, 0.6),
                        // backgroundColor: 'green',
                        textAlign: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      {question?.num}
                    </CustomText>
                  )}
                  <TouchableOpacity
                    activeOpacity={0.8}
                    key={index}
                    onPress={
                      () => {
                        setAnswer({
                          question:
                            'What are you most interested in building on Hatch:',
                          answer: question?.option,
                        });
                      }
                      // handleQuestionClick(question)
                    }
                    style={[
                      styles.questionContainer,
                      {
                        borderColor:
                          answer.answer == question?.option
                            ? themeColor[1]
                            : 'white',
                        borderWidth: 3,
                        // backgroundColor:'red'
                      },
                    ]}>
               <View style={styles.qusetionimage}>
              <CustomImage
                source={question?.image}
                style={{width: '100%', height: '100%'}}
              />
              </View>

                    <CustomText
                      style={{
                        fontSize: moderateScale(12, 0.6),
                        width: windowWidth * 0.59,
                        paddingHorizontal:moderateScale(10,0.3)

                      }}>
                      {question?.option}
                    </CustomText>
                    {showTicks[question] && (
                      <Icon
                        name={'check'}
                        as={Feather}
                        color={Color.green}
                        size={moderateScale(20, 0.3)}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              ))}
            </>
          );
        })}

        <View style={styles.container}></View>
        <CustomButton
          text={
            isLoading ? (
              <ActivityIndicator size={'small'} color={themeColor[1]} />
            ) : (
              'Submit'
            )
          }
          textColor={themeColor[1]}
          width={windowWidth * 0.3}
          height={windowHeight * 0.05}
          marginTop={moderateScale(20, 0.3)}
          onPress={() => {
            postAnswer();
          }}
          isGradient
          bgColor={['#FFFFFF', '#FFFFFF']}
          // borderColor={Color.black}
          // borderWidth={1}
          borderRadius={moderateScale(30, 0.3)}
        />

        <CustomButton
          text={'Logout'}
          textColor={themeColor[1]}
          width={windowWidth * 0.3}
          height={windowHeight * 0.05}
          marginTop={moderateScale(20, 0.3)}
          isGradient
          onPress={() => {
            dispatch(setUserToken(null));
            dispatch(setBubbleSelected(false));
            dispatch(setProfileSelcted(false));
            dispatch(setNumOfProfiles(0));
            dispatch(setFeedsSelected(false));
            dispatch(setAccountPrivate('public'));
            dispatch(setQuestionAnswered(false));
            dispatch(setBubbleCreated(false));
          }}
          bgColor={['#FFFFFF', '#FFFFFF']}
          borderColor={Color.black}
          borderWidth={1}
          borderRadius={moderateScale(30, 0.3)}
        />
      </ImageBackground>
    </>
  );
};

export default QuestionScreen;

const styles = StyleSheet.create({
  container: {
    padding: moderateScale(10, 0.6),
    marginTop: moderateScale(10, 0.3),
    alignSelf: 'center',
  },
  questionContainer: {
    backgroundColor: 'red',
    flexDirection: 'row',
    // alignItems: 'center',
    width: windowWidth * 0.85,
    padding: moderateScale(10, 0.6),
    backgroundColor: Color.white,
    borderRadius: moderateScale(8, 0.3),
  },

  modalContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    width: windowWidth * 0.9,
    height: windowHeight * 0.45,
    borderRadius: moderateScale(10, 0.3),
    justifyContent: 'center',
    backgroundColor: Color.white,
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  qusetionimage: {
    height: windowWidth * 0.23,
    width: windowWidth * 0.23,
    backgroundColor: '#fff',
    borderRadius:  10,
    // borderWidth: 3,
    borderColor: '#33dd50',
    overflow: 'hidden',
    // marginBottom : moderateScale(20,0.3)
  },
});

