import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  Image,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {moderateScale} from 'react-native-size-matters';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomStatusBar from '../Components/CustomStatusBar';
import Header from '../Components/Header';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import Color from '../Assets/Utilities/Color';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Icon} from 'native-base';
import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';
import { useSelector } from 'react-redux';

const Inbox = () => {
  const privacy = useSelector(state=> state.authReducer.privacy)
  const [swipedRow, setSwipedRow] = useState(null);
  const [BubbleListData, setBubbleListData] = useState([
    {
      id: 1,
      image: require('../Assets/Images/avatar.png'),
      name: 'Jameson',
      msg: ['Hello', 'Aliquyam erat, sed diam'],
      Time: 'Just Now',
    },
    {
      id: 2,
      image: require('../Assets/Images/avatar1.png'),
      name: 'Group 01',
      msg: ['Hello', '', '', '', 'Fashion'],
      Time: '15:00',
    },
    {
      id: 3,
      image: require('../Assets/Images/dummyUser1.png'),
      name: 'James Tavernier',
      msg: ['Hello', 'Aliquyam erat, sed diam'],
      Time: '8:40',
    },
    {
      id: 4,
      image: require('../Assets/Images/avatar3.png'),
      name: 'Jessica Milla',
      msg: ['Hello', 'missed voice call'],
      Time: '12:43',
    },
    {
      id: 5,
      image: require('../Assets/Images/avatar4.png'),
      name: 'Josh Verstappen',
      msg: ['Hello', 'missed video call'],
      Time: '11:35',
    },
    {
      id: 6,
      image: require('../Assets/Images/dummyUser1.png'),
      name: 'James Tavernier',
      msg: ['Hello', 'Aliquyam erat, sed diam'],
      Time: '8:40',
    },
    {
      id: 7,
      image: require('../Assets/Images/avatar3.png'),
      name: 'Jessica Milla',
      msg: ['Hello', 'missed voice call'],
      Time: '12:43',
    },
    {
      id: 8,
      image: require('../Assets/Images/avatar4.png'),
      name: 'Josh Verstappen',
      msg: ['Hello', 'missed video call'],
      Time: '11:35',
    },
    {
      id: 9,
      image: require('../Assets/Images/dummyUser1.png'),
      name: 'James Tavernier',
      msg: ['Hello', 'Aliquyam erat, sed diam'],
      Time: '8:40',
    },
    {
      id: 10,
      image: require('../Assets/Images/avatar3.png'),
      name: 'Jessica Milla',
      msg: ['Hello', 'missed voice call'],
      Time: '12:43',
    },
    {
      id: 11,
      image: require('../Assets/Images/avatar4.png'),
      name: 'Josh Verstappen',
      msg: ['Hello', 'missed video call'],
      Time: '11:35',
    },
    {
      id: 12,
      image: require('../Assets/Images/dummyUser1.png'),
      name: 'James Tavernier',
      msg: ['Hello', 'Aliquyam erat, sed diam'],
      Time: '8:40',
    },
    {
      id: 13,
      image: require('../Assets/Images/avatar3.png'),
      name: 'Jessica Milla',
      msg: ['Hello', 'missed voice call'],
      Time: '12:43',
    },
    {
      id: 14,
      image: require('../Assets/Images/avatar4.png'),
      name: 'Josh Verstappen',
      msg: ['Hello', 'missed video call'],
      Time: '11:35',
    },
  ]);

  const deleteRow = index => {
    const newData = [...BubbleListData];
    newData.splice(index, 1);
    setBubbleListData(newData);
  };

  const renderHiddenItem = (data, rowMap) => {
    return (
      <View
        style={{
          alignItems: 'flex-end',
          marginRight: moderateScale(-20, 0.3),
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          paddingHorizontal: moderateScale(5, 0.6),
          borderRadius: 10,
        }}></View>
    );
  };

  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />
      <Header right Title={'Inbox'} search />

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
          alignItems: 'center',
        }}>
        <View
          style={{
            width: windowWidth,
            marginTop: moderateScale(10, 0.3),
            marginBottom: moderateScale(10, 0.3),
          }}>
          <CustomText style={styles.heading} numberOfLines={1} isBold>
            Today
          </CustomText>
          <SwipeListView
            data={BubbleListData}
            showsVerticalScrollIndicator={false}
            renderHiddenItem={renderHiddenItem}
            keyExtractor={item => item.id}
            rightOpenValue={-40}
            previewRowKey={'0'}
            contentContainerStyle={{
              paddingBottom: moderateScale(100, 0.6),
            }}
            renderItem={({item, index}) => {
              return (
                <>
                  <TouchableOpacity
                    style={styles.rowFront}
                    underlayColor={'#AAA'}>
                    <View
                      style={{
                        width: windowWidth * 0.6,
                        height: windowHeight * 0.08,
                        flexDirection: 'row',
                      }}>
                      <View style={styles.profileSection}>
                        <CustomImage
                          source={item?.image}
                          style={{
                            width: '100%',
                            height: '100%',
                          }}
                        />
                      </View>

                      <View
                        style={{
                          paddingLeft: moderateScale(10, 0.6),
                          justifyContent: 'center',
                        }}>
                        <CustomText
                          style={styles.name}
                          numberOfLines={1}
                          isBold>
                          {item?.name}
                        </CustomText>
                        <View
                          style={{
                            flexDirection: 'row',
                            marginTop: moderateScale(5, 0.3),
                          }}>
                          {item?.msg[item?.msg.length - 1] ==
                          'missed voice call' ? (
                            <Icon
                              name="phone-missed"
                              as={MaterialIcons}
                              size={4}
                              color="#FF0000"
                            />
                          ) : item?.msg[item?.msg.length - 1] ==
                            'missed video call' ? (
                            <Icon
                              name="missed-video-call"
                              as={MaterialIcons}
                              size={4}
                              color="#FF0000"
                            />
                          ) : (
                            <></>
                          )}
                          <CustomText style={styles.msg} numberOfLines={1}>
                            {item?.msg[item?.msg.length - 1]}
                          </CustomText>
                        </View>
                      </View>
                    </View>

                    <View
                      style={styles.chatRight}>
                      <CustomText
                        style={styles.timeText}>
                        {item?.Time}
                      </CustomText>
                      <CustomText
                        style={styles.msgCount}>
                        {item?.msg.length}
                      </CustomText>
                    </View>
                    <View style={styles.delete}>
                      <Icon
                        name="delete"
                        as={AntDesign}
                        color={'white'}
                        onPress={() => deleteRow(index)}
                      />
                    </View>
                  </TouchableOpacity>
                  <View style={styles.line}></View>
                </>
              );
            }}
          />
        </View>
      </ImageBackground>
    </>
  );
};

export default Inbox;

const styles = StyleSheet.create({
  backTextWhite: {
    color: '#FFF',
  },
  heading: {
    fontSize: moderateScale(20, 0.6),
    textAlign: 'left',
    width: windowWidth,
    marginTop: moderateScale(-10, 0.3),
    paddingLeft: moderateScale(20, 0.6),
    marginBottom: moderateScale(10, 0.3),
    color: 'white',
    fontWeight: '500',
  },
  name: {
    fontSize: moderateScale(14, 0.6),
    textAlign: 'left',
    marginTop: moderateScale(-10, 0.3),
    color: '#000',
  },
  delete: {
    alignItems: 'center',
    justifyContent: 'center',
    left: -20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: moderateScale(5, 0.6),
    borderRadius: 5,
  },
  line: {
    width: windowWidth * 0.9,
    height: 2.5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignSelf: 'center',
    opacity: 0.4,
    marginBottom: moderateScale(10, 0.3),
  },
  msg: {
    marginLeft: moderateScale(3, 0.3),
    fontSize: moderateScale(11, 0.6),
    color: Color.themeLightGray,
  },
  rowFront: {
    height: windowHeight * 0.08,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: moderateScale(20, 0.6),
    width: windowWidth * 0.95,
  },
  rowBack: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: 20,
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
  msgCount:{
    fontSize: moderateScale(11, 0.6),
    marginTop: moderateScale(5, 0.6),
    color: Color.themeLightGray,
    backgroundColor: 'white',
    paddingHorizontal: moderateScale(6, 0.6),
    padding: moderateScale(3, 0.6),
    borderRadius: 5,
  },
  profileSection: {
    height: windowWidth * 0.13,
    width: windowWidth * 0.13,
    backgroundColor: '#fff',
    borderRadius: 50,
    overflow: 'hidden',
  },
  chatRight:{
    width: windowWidth * 0.4,
    height: windowHeight * 0.08,
    paddingLeft: moderateScale(20, 0.6),
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeText:{
    fontSize: moderateScale(10, 0.6),
    marginTop: moderateScale(-10, 0.3),
    color: Color.white,
    fontWeight: '500',
  },
});
