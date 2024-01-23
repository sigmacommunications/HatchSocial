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
  import { useSelector } from 'react-redux';
  import CardComponent from '../Components/CardComponent';
  // const {height, width} = Dimensions.get('window');
  
  const FeedList = () => {
    const privacy = useSelector(state=> state.authReducer.privacy)
    const BubbleListData = [
      {
        id: 1,
        image: require('../Assets/Images/dummyman1.png'),
        name: 'Book Author',
        Time:'Today 9:00 Am',
        
      },
      {
        id: 2,
        image: require('../Assets/Images/dummyman4.png'),
        name: 'Alternative fitness',
        Time:'Today 9:00 Am',
        
      },
      {
        id: 3,
        image: require('../Assets/Images/avatar.png'),
        name: 'Alchol',
        Time:'Today 9:00 Am',
       
      },
      {
        id: 4,
        image: require('../Assets/Images/dummyUser.png'),
        name: 'Bords Shooting',
        Time:'Today 9:00 Am',
        
      },
    ];
  
    return (
      <>
        <CustomStatusBar
          backgroundColor={Color.white}
          barStyle={'dark-content'}
        />
        <Header right Title={'Feed List'}  search showBack/>
  
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
            style={styles.flatlistview}>
            <FlatList
              data={BubbleListData}
              contentContainerStyle={{
                marginBottom:moderateScale(10,.3)
              }}
              renderItem={({item, index}) => {
  
                return (
                  <CardComponent
                  item={item}
                  check={item?.check}
                  close={item?.close}
                  edit={item?.edit}
                  pending={item?.pending}
                />
                  
                );
              }}
            />
          </View>
        </ImageBackground>
      </>
    );
  };
  
  export default FeedList;
  
  const styles = StyleSheet.create({
    
    profileSection: {
      height: windowWidth *0.2,
      width: windowWidth * 0.2,
      backgroundColor: '#fff',
      borderRadius:  (windowWidth *0.2 )/2,
      overflow:'hidden',
  
      
    },
    line:{
      width: windowWidth * 0.9,
      height: 2,
      backgroundColor: 'white',
    // backgroundColor:'white',
      justifyContent: 'center',
      alignSelf: 'center',
      opacity: 0.5,
      marginBottom: moderateScale(10, 0.3),
    },
    row:{
      width: windowWidth * 1,
      height: windowHeight *0.1,
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: moderateScale(20, 0.6),
      marginBottom:moderateScale(5,0.3),
    },
    flatlistview:{
      width: windowWidth ,
      marginTop: moderateScale(5, 0.3),
      marginBottom:moderateScale(20,.3)  
    }
  });
  