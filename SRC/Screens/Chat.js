import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  Image,
  FlatList,
} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomStatusBar from '../Components/CustomStatusBar';
import Header from '../Components/Header';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import Color from '../Assets/Utilities/Color';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Icon} from 'native-base';
// import { SwipeListView } from 'react-native-swipe-list-view';
// const {height, width} = Dimensions.get('window');

const Chat = () => {
  const BubbleListData = [
    {
      id: 1,
      image: require('../Assets/Images/avatar3.png'),
      name: 'ariana_grande',
      msg: [
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna',
      ],
      Time: 'Just Now',
    },
    {
      id: 2,
      image: require('../Assets/Images/avatar.png'),
      name: 'jameson679',
      msg: [
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna',
      ],
      Time: '15:00',
    },
    {
      id: 3,
      image: require('../Assets/Images/avatar3.png'),
      name: 'jameson679',
      msg: [
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna',
      ],
      Time: '8:40',
    },
    {
      id: 4,
      image: require('../Assets/Images/avatar.png'),
      name: 'ariana_grande',
      msg: ['Hello'],
      Time: '12:43',
    },
    //   {
    //     id: 5,
    //     image: require('../Assets/Images/avatar4.png'),
    //     name: 'ariana_grande',
    //     msg: [' '],
    //     Time: '11:35',
    //   },
    // {
    //   id: 6,
    //   image: require('../Assets/Images/gallery6.png'),
    //   name: 'Bird Shooting',
    //   Time: 'Today 9 :00 am',
    // },
    // {
    //   id: 7,
    //   image: require('../Assets/Images/gallery7.png'),
    //   name: 'Bird Shooting',
    //   Time: 'Today 9 :00 am',
    // },
    // {
    //   id: 8,
    //   image: require('../Assets/Images/gallery8.png'),
    //   name: 'Bird Shooting',
    //   Time: 'Today 9 :00 am',
    // },
  ];

  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />
      <Header right Title={'Inbox'} />

      <ImageBackground
        source={require('../Assets/Images/Main.png')}
        resizeMode={'cover'}
        style={{
          width: windowWidth * 1,
          height: windowHeight * 0.9,
          alignItems: 'center',
        }}>
        <View
          style={{
            width: windowWidth * 1,
            height: windowHeight * 0.88,
            // marginTop: moderateScale(15, 0.3),
            // marginBottom: moderateScale(10, 0.3),
            paddingTop: moderateScale(10, 0.6),
            // paddingRight: moderateScale(20, 0.6),
          }}>
          <FlatList
            data={BubbleListData}
            renderItem={({item, index}) => {

              return (
                <>
                  <View
                    style={{
                      width: windowWidth * 0.8,
                      height: windowHeight * 0.1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      //   alignItems: 'center',
                      //   paddingLeft: moderateScale(20, 0.6),
                      //   marginBottom: moderateScale(15, 0.3),
                    }}>
                    <View style={styles.profileSection}>
                      <CustomImage
                        source={item?.image}
                        style={{
                          width: '100%',
                          height: '100%',
                          //   borderRadius:100,
                        }}
                      />
                    </View>

                    <View
                      style={{
                        paddingLeft: moderateScale(20, 0.6),
                        justifyContent: 'center',
                      }}>
                      <CustomText
                        style={{
                          fontSize: moderateScale(14, 0.6),
                          marginTop: moderateScale(-10, 0.3),
                          color: '#000',
                          fontWeight: '500',
                        }}
                        isBold>
                        {item?.name}
                      </CustomText>

                      <CustomText
                        style={{
                          marginLeft: moderateScale(3, 0.3),
                          fontSize: moderateScale(11, 0.6),
                          color: Color.black,
                        }}>
                        {item?.msg[item?.msg.length - 1]}
                      </CustomText>

                      <CustomText
                        style={{
                          fontSize: moderateScale(10, 0.6),
                        //   marginTop: moderateScale(-10, 0.3),
                          color: Color.black,
                          fontWeight: '500',
                        }}>
                        {item?.Time}
                      </CustomText>
                    </View>
                  </View>

                  <View
                    style={{
                      width: windowWidth * 0.9,
                      height: 2.5,
                      backgroundColor: 'white',
                      // backgroundColor:'white',
                      justifyContent: 'center',
                      alignSelf: 'center',
                      opacity: 0.4,
                      marginBottom: moderateScale(10, 0.3),
                    }}></View>
                </>
              );
            }}
          />
        </View>
      </ImageBackground>
    </>
  );
};

export default Chat;

const styles = StyleSheet.create({
  profileSection: {
    height: windowWidth * 0.13,
    width: windowWidth * 0.13,
    backgroundColor: '#fff',
    borderRadius: 50,
    overflow: 'hidden',
  },
});
