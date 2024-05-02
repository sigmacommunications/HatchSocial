import {
    StyleSheet,
    View,
    ImageBackground,
    Dimensions,
    Image,
    TouchableOpacity,
    FlatList,
    TextInput,
  } from 'react-native';
  import React, {useState} from 'react';
  const {height, width} = Dimensions.get('window');
  import {moderateScale} from 'react-native-size-matters';
  import Entypo from 'react-native-vector-icons/Entypo';
  import {SearchData} from '../dummyData/SearchData';
  import CustomStatusBar from '../Components/CustomStatusBar';
  import Header from '../Components/Header';
  import {windowHeight, windowWidth} from '../Utillity/utils';
  import CustomImage from '../Components/CustomImage';
  import CustomText from '../Components/CustomText';
  import Color from '../Assets/Utilities/Color';
  import TextInputWithTitle from '../Components/TextInputWithTitle';
  import { useSelector } from 'react-redux';
import SubscriptionCard from '../Components/SubscriptionCard';

const SubscriptionScreen = () => {
    const themeColor = useSelector(state => state.authReducer.ThemeColor);
    const privacy = useSelector(state=> state.authReducer.privacy)
    return (
    <>
    <CustomStatusBar
      backgroundColor={Color.white}
      barStyle={'dark-content'}
    />
    <Header showBack Title={'MemberShip plan'}/>

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
        <FlatList 
        data={[
            {
                image : require('../Assets/Images/gold.png'),
                title : 'Gold membership',
                expiring : 'expiring in two days',
                Description : 'Lorem ipsum dolor lorem ipsum dolor',
                price : 53 ,
                actualPrice : 50,
            },
            {
                image : require('../Assets/Images/platinum.png'),
                title : 'Platinum membership',
                expiring : null,
                Description : 'Lorem ipsum dolor lorem ipsum dolor',
                price : 36 ,
                actualPrice : 30,
            },
            {
                image : require('../Assets/Images/gold.png'),
                title : 'silver membership',
                expiring : null,
                Description : 'Lorem ipsum dolor lorem ipsum dolor',
                price : 23 ,
                actualPrice : 20,
            }
        ]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
            paddingVertical : moderateScale(30,0.6),
            alignItems : 'center'
        }}
        style={{
            width : windowWidth
        }}
        renderItem={({item , index})=>{
            return(
                <SubscriptionCard  item={item} />
            )
        }}
        ListHeaderComponent={()=>{
            return(
                <CustomText isBold style={styles.text}>Select a membership plan</CustomText>
            )
        }}/>
        </ImageBackground></>
  )
}

export default SubscriptionScreen

const styles = StyleSheet.create({
    text : {
        color : Color.white,
        width : windowWidth * 0.9,
        textAlign : 'left',
        fontSize : moderateScale(17,0.6),
        marginBottom : moderateScale(10,0.3)
    }
})