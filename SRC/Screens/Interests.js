import {View, Text, StyleSheet, ImageBackground,ScrollView, FlatList} from 'react-native';
import React from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomText from '../Components/CustomText';
import CustomImage from '../Components/CustomImage';
import { moderateScale } from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import LinearGradient from 'react-native-linear-gradient';

const Interests = () => {
  const images1 = [
    { id: 'img1', image: require('../Assets/Images/int_Biz_Compress/shutterstock_1.jpg'), overlayText: "Lorem Ipsum" },
    { id: 'img2', image: require('../Assets/Images/int_Biz_Compress/shutterstock_2.jpg'), overlayText: "Dolor Sit Amet" },
    { id: 'img3', image: require('../Assets/Images/int_Biz_Compress/shutterstock_3.jpg'), overlayText: "Consectetur Adipiscing" },
    { id: 'img4', image: require('../Assets/Images/int_Biz_Compress/shutterstock_4.jpg'), overlayText: "Sed Do Eiusmod" },
    { id: 'img5', image: require('../Assets/Images/int_Biz_Compress/shutterstock_5.jpg'), overlayText: "Tempor Incididunt" },
    { id: 'img6', image: require('../Assets/Images/int_Biz_Compress/shutterstock_6.jpg'), overlayText: "Ut Labore Et Dolore" },
    { id: 'img7', image: require('../Assets/Images/int_Biz_Compress/shutterstock_7.jpg'), overlayText: "Magna Aliqua" },
    { id: 'img8', image: require('../Assets/Images/int_Biz_Compress/shutterstock_8.jpg'), overlayText: "Ut Enim Ad Minim" },
    { id: 'img9', image: require('../Assets/Images/int_Biz_Compress/shutterstock_9.jpg'), overlayText: "Veniam Quis Nostrud" },
    { id: 'img10', image: require('../Assets/Images/int_Biz_Compress/shutterstock_10.jpg'), overlayText: "Exercitation Ullamco" },
    { id: 'img11', image: require('../Assets/Images/int_Biz_Compress/shutterstock_11.jpg'), overlayText: "Laboris Nisi Ut" },
    { id: 'img12', image: require('../Assets/Images/int_Biz_Compress/shutterstock_12.jpg'), overlayText: "Aliquip Ex Ea" },
    { id: 'img13', image: require('../Assets/Images/int_Biz_Compress/shutterstock_13.jpg'), overlayText: "Commodo Consequat" },
    { id: 'img14', image: require('../Assets/Images/int_Biz_Compress/shutterstock_14.jpg'), overlayText: "Duis Aute Irure" },
];
const images2 = [
  { id: 'img1', image: require('../Assets/Images/int_Invest_Compress/invest_1.jpg'), overlayText: "Lorem Ipsum" },
  { id: 'img2', image: require('../Assets/Images/int_Invest_Compress/invest_2.jpg'), overlayText: "Dolor Sit Amet" },
  { id: 'img3', image: require('../Assets/Images/int_Invest_Compress/invest_3.jpg'), overlayText: "Consectetur Adipiscing" },
  { id: 'img4', image: require('../Assets/Images/int_Invest_Compress/invest_4.jpg'), overlayText: "Sed Do Eiusmod" },
  { id: 'img5', image: require('../Assets/Images/int_Invest_Compress/invest_5.jpg'), overlayText: "Tempor Incididunt" },
  { id: 'img6', image: require('../Assets/Images/int_Invest_Compress/invest_6.jpg'), overlayText: "Ut Labore Et Dolore" },
  { id: 'img7', image: require('../Assets/Images/int_Invest_Compress/invest_7.jpg'), overlayText: "Magna Aliqua" },
  { id: 'img8', image: require('../Assets/Images/int_Invest_Compress/invest_8.jpg'), overlayText: "Ut Enim Ad Minim" },
  { id: 'img9', image: require('../Assets/Images/int_Invest_Compress/invest_9.jpg'), overlayText: "Veniam Quis Nostrud" },
  { id: 'img10', image: require('../Assets/Images/int_Invest_Compress/invest_10.jpg'), overlayText: "Exercitation Ullamco" },
  { id: 'img11', image: require('../Assets/Images/int_Invest_Compress/invest_11.jpg'), overlayText: "Laboris Nisi Ut" },
  { id: 'img12', image: require('../Assets/Images/int_Invest_Compress/invest_12.jpg'), overlayText: "Aliquip Ex Ea" },
  { id: 'img13', image: require('../Assets/Images/int_Invest_Compress/invest_13.jpg'), overlayText: "Commodo Consequat" },
  { id: 'img14', image: require('../Assets/Images/int_Invest_Compress/invest_14.jpg'), overlayText: "Duis Aute Irure" },
];
const images3 = [
  { id: 'img1', image: require('../Assets/Images/int_Social_Compress/Social_1.jpg'), overlayText: "Lorem Ipsum" },
  { id: 'img2', image: require('../Assets/Images/int_Social_Compress/Social_2.jpg'), overlayText: "Dolor Sit Amet" },
  { id: 'img3', image: require('../Assets/Images/int_Social_Compress/Social_3.jpg'), overlayText: "Consectetur Adipiscing" },
  { id: 'img4', image: require('../Assets/Images/int_Social_Compress/Social_4.jpg'), overlayText: "Sed Do Eiusmod" },
  { id: 'img5', image: require('../Assets/Images/int_Social_Compress/Social_5.jpg'), overlayText: "Tempor Incididunt" },
  { id: 'img6', image: require('../Assets/Images/int_Social_Compress/Social_6.jpg'), overlayText: "Ut Labore Et Dolore" },
  { id: 'img7', image: require('../Assets/Images/int_Social_Compress/Social_7.jpg'), overlayText: "Magna Aliqua" },
  { id: 'img8', image: require('../Assets/Images/int_Social_Compress/Social_8.jpg'), overlayText: "Ut Enim Ad Minim" },
  { id: 'img9', image: require('../Assets/Images/int_Social_Compress/Social_9.jpg'), overlayText: "Veniam Quis Nostrud" },
  { id: 'img10', image: require('../Assets/Images/int_Social_Compress/Social_10.jpg'), overlayText: "Exercitation Ullamco" },
  { id: 'img11', image: require('../Assets/Images/int_Social_Compress/Social_11.jpg'), overlayText: "Laboris Nisi Ut" },
  { id: 'img12', image: require('../Assets/Images/int_Social_Compress/Social_12.jpg'), overlayText: "Aliquip Ex Ea" },
  { id: 'img13', image: require('../Assets/Images/int_Social_Compress/Social_13.jpg'), overlayText: "Commodo Consequat" },
  { id: 'img14', image: require('../Assets/Images/int_Social_Compress/Social_14.jpg'), overlayText: "Duis Aute Irure" },
  // Up to Social_14.jpg, continue up to Social_42.jpg
  { id: 'img15', image: require('../Assets/Images/int_Social_Compress/Social_15.jpg'), overlayText: "Lorem Ipsum" },
  { id: 'img16', image: require('../Assets/Images/int_Social_Compress/Social_16.jpg'), overlayText: "Dolor Sit Amet" },
  { id: 'img17', image: require('../Assets/Images/int_Social_Compress/Social_17.jpg'), overlayText: "Consectetur Adipiscing" },
  { id: 'img18', image: require('../Assets/Images/int_Social_Compress/Social_18.jpg'), overlayText: "Sed Do Eiusmod" },
  { id: 'img19', image: require('../Assets/Images/int_Social_Compress/Social_19.jpg'), overlayText: "Tempor Incididunt" },
  { id: 'img20', image: require('../Assets/Images/int_Social_Compress/Social_20.jpg'), overlayText: "Ut Labore Et Dolore" },
  { id: 'img21', image: require('../Assets/Images/int_Social_Compress/Social_21.jpg'), overlayText: "Magna Aliqua" },
  { id: 'img22', image: require('../Assets/Images/int_Social_Compress/Social_22.jpg'), overlayText: "Ut Enim Ad Minim" },
  { id: 'img23', image: require('../Assets/Images/int_Social_Compress/Social_23.jpg'), overlayText: "Veniam Quis Nostrud" },
  { id: 'img24', image: require('../Assets/Images/int_Social_Compress/Social_24.jpg'), overlayText: "Exercitation Ullamco" },
  { id: 'img25', image: require('../Assets/Images/int_Social_Compress/Social_25.jpg'), overlayText: "Laboris Nisi Ut" },
  { id: 'img26', image: require('../Assets/Images/int_Social_Compress/Social_26.jpg'), overlayText: "Aliquip Ex Ea" },
  { id: 'img27', image: require('../Assets/Images/int_Social_Compress/Social_27.jpg'), overlayText: "Commodo Consequat" },
  { id: 'img28', image: require('../Assets/Images/int_Social_Compress/Social_28.jpg'), overlayText: "Duis Aute Irure" },
  { id: 'img29', image: require('../Assets/Images/int_Social_Compress/Social_29.jpg'), overlayText: "Lorem Ipsum" },
  { id: 'img30', image: require('../Assets/Images/int_Social_Compress/Social_30.jpg'), overlayText: "Dolor Sit Amet" },
  { id: 'img31', image: require('../Assets/Images/int_Social_Compress/Social_31.jpg'), overlayText: "Consectetur Adipiscing" },
  { id: 'img32', image: require('../Assets/Images/int_Social_Compress/Social_32.jpg'), overlayText: "Sed Do Eiusmod" },
  { id: 'img33', image: require('../Assets/Images/int_Social_Compress/Social_33.jpg'), overlayText: "Tempor Incididunt" },
  { id: 'img34', image: require('../Assets/Images/int_Social_Compress/Social_34.jpg'), overlayText: "Ut Labore Et Dolore" },
  { id: 'img35', image: require('../Assets/Images/int_Social_Compress/Social_35.jpg'), overlayText: "Magna Aliqua" },
  { id: 'img36', image: require('../Assets/Images/int_Social_Compress/Social_36.jpg'), overlayText: "Ut Enim Ad Minim" },
  { id: 'img37', image: require('../Assets/Images/int_Social_Compress/Social_37.jpg'), overlayText: "Veniam Quis Nostrud" },
  { id: 'img38', image: require('../Assets/Images/int_Social_Compress/Social_38.jpg'), overlayText: "Exercitation Ullamco" },
  { id: 'img39', image: require('../Assets/Images/int_Social_Compress/Social_39.jpg'), overlayText: "Laboris Nisi Ut" },
  { id: 'img40', image: require('../Assets/Images/int_Social_Compress/Social_40.jpg'), overlayText: "Aliquip Ex Ea" },
  { id: 'img41', image: require('../Assets/Images/int_Social_Compress/Social_41.jpg'), overlayText: "Commodo Consequat" },
  { id: 'img42', image: require('../Assets/Images/int_Social_Compress/Social_42.jpg'), overlayText: "Duis Aute Irure" }
];
const images4 = [
  { id: 'img1', image: require('../Assets/Images/int_Traders_Compress/traders_1.jpg'), overlayText: "Lorem Ipsum" },
  { id: 'img2', image: require('../Assets/Images/int_Traders_Compress/traders_2.jpg'), overlayText: "Dolor Sit Amet" },
  { id: 'img3', image: require('../Assets/Images/int_Traders_Compress/traders_3.jpg'), overlayText: "Consectetur Adipiscing" },
  { id: 'img4', image: require('../Assets/Images/int_Traders_Compress/traders_4.jpg'), overlayText: "Sed Do Eiusmod" },
  { id: 'img5', image: require('../Assets/Images/int_Traders_Compress/traders_5.jpg'), overlayText: "Tempor Incididunt" },
  { id: 'img6', image: require('../Assets/Images/int_Traders_Compress/traders_6.jpg'), overlayText: "Ut Labore Et Dolore" },
  { id: 'img7', image: require('../Assets/Images/int_Traders_Compress/traders_7.jpg'), overlayText: "Magna Aliqua" },
  { id: 'img8', image: require('../Assets/Images/int_Traders_Compress/traders_8.jpg'), overlayText: "Ut Enim Ad Minim" },
  { id: 'img9', image: require('../Assets/Images/int_Traders_Compress/traders_9.jpg'), overlayText: "Veniam Quis Nostrud" },
  { id: 'img10', image: require('../Assets/Images/int_Traders_Compress/traders_10.jpg'), overlayText: "Exercitation Ullamco" },
  { id: 'img11', image: require('../Assets/Images/int_Traders_Compress/traders_11.jpg'), overlayText: "Laboris Nisi Ut" },
  { id: 'img12', image: require('../Assets/Images/int_Traders_Compress/traders_12.jpg'), overlayText: "Aliquip Ex Ea" },
  { id: 'img13', image: require('../Assets/Images/int_Traders_Compress/traders_13.jpg'), overlayText: "Commodo Consequat" },
  { id: 'img14', image: require('../Assets/Images/int_Traders_Compress/traders_14.jpg'), overlayText: "Duis Aute Irure" },
  // Up to traders_14.jpg, continue up to traders_21.jpg
  { id: 'img15', image: require('../Assets/Images/int_Traders_Compress/traders_15.jpg'), overlayText: "Lorem Ipsum" },
  { id: 'img16', image: require('../Assets/Images/int_Traders_Compress/traders_16.jpg'), overlayText: "Dolor Sit Amet" },
  { id: 'img17', image: require('../Assets/Images/int_Traders_Compress/traders_17.jpg'), overlayText: "Consectetur Adipiscing" },
  { id: 'img18', image: require('../Assets/Images/int_Traders_Compress/traders_18.jpg'), overlayText: "Sed Do Eiusmod" },
  { id: 'img19', image: require('../Assets/Images/int_Traders_Compress/traders_19.jpg'), overlayText: "Tempor Incididunt" },
  { id: 'img20', image: require('../Assets/Images/int_Traders_Compress/traders_20.jpg'), overlayText: "Ut Labore Et Dolore" },
  { id: 'img21', image: require('../Assets/Images/int_Traders_Compress/traders_21.jpg'), overlayText: "Magna Aliqua" }
];



  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />
      <ImageBackground
        source={
          // ? require('../Assets/Images/theme2.jpg')
          require('../Assets/Images/Main.png')
        }
        resizeMode={'cover'}
        style={{
          width: windowWidth,
          height: windowHeight ,
          paddingVertical:moderateScale(12,0.2)
        }}>
            <ScrollView>


           
            <CustomText isBold
            style={{
              color:"green",
              fontSize: moderateScale(24,0.2), 
            margin: moderateScale(10,0.2)}}
            >Grow Bubble Tips</CustomText>
             <FlatList
             data={images4}
             keyExtractor={item => item.id}
             horizontal
             renderItem={({item}) =>{
                return (
                    <View
             style={styles.card}
             >
                <View > 

                <ImageBackground
                resizeMode="cover"
                source={item.image}
                style={styles.image}
                >
             

                    <CustomText 
                    style={styles.catText}
                    isBold>
                    {item.overlayText}

                    </CustomText>
                                <LinearGradient 
                    colors={["#c7c9c9","#232324",]}
                    start={{x:0.1,y: 0.1}}
                    end={{x:0.2,y: 0.5}}
                    style={{
                        opacity:0.65,
                    width:'100%', height:"100%", position:'absolute', }}></LinearGradient>
                </ImageBackground>
                </View>

             </View>
                );
             }}
             />
            
           
            <CustomText isBold
            style={{
              color:'#39FF14',
              fontSize: moderateScale(24,0.2), 
            margin: moderateScale(10,0.2)}}
            >setup and bubble management</CustomText>
             <FlatList
             data={images1}
             keyExtractor={item => item.id}
             horizontal
             renderItem={({item}) =>{
                return (
                    <View
             style={styles.card}
             >
                <View > 

                <ImageBackground
                resizeMode="cover"
                source={item.image}
                style={styles.image}
                >
             

                    <CustomText 
                    style={styles.catText}
                    isBold>
                    {item.overlayText}

                    </CustomText>
                                <LinearGradient 
                    colors={["#c7c9c9","#232324",]}
                    start={{x:0.1,y: 0.1}}
                    end={{x:0.2,y: 0.5}}
                    style={{
                        opacity:0.65,
                    width:'100%', height:"100%", position:'absolute', }}></LinearGradient>
                </ImageBackground>
                </View>

             </View>
                );
             }}
             />
            
            <CustomText isBold
            style={{
              color:'purple',
              fontSize: moderateScale(24,0.2), 
            margin: moderateScale(10,0.2)}}
            >bubble membership mangement</CustomText>
             <FlatList
             data={images2}
             keyExtractor={item => item.id}
             horizontal
             renderItem={({item}) =>{
                return (
                    <View
             style={styles.card}
             >
                <View > 

                <ImageBackground
                resizeMode="cover"
                source={item.image}
                style={styles.image}
                >
             

                    <CustomText 
                    style={styles.catText}
                    isBold>
                    {item.overlayText}

                    </CustomText>
                                <LinearGradient 
                    colors={["#c7c9c9","#232324",]}
                    start={{x:0.1,y: 0.1}}
                    end={{x:0.2,y: 0.5}}
                    style={{
                        opacity:0.65,
                    width:'100%', height:"100%", position:'absolute', }}></LinearGradient>
                </ImageBackground>
                </View>

             </View>
                );
             }}
             />
            
            <CustomText isBold
            style={{fontSize: moderateScale(24,0.2),
              color:'#ff66f5', 
            margin: moderateScale(10,0.2)}}
            >bubble payment and tax</CustomText>
             <FlatList
             data={images3}
             keyExtractor={item => item.id}
             horizontal
             renderItem={({item}) =>{
                return (
                    <View
             style={styles.card}
             >
                <View > 

                <ImageBackground
                resizeMode="cover"
                source={item.image}
                style={styles.image}
                >
             

                    <CustomText 
                    style={styles.catText}
                    isBold>
                    {item.overlayText}

                    </CustomText>
                                <LinearGradient 
                    colors={["#c7c9c9","#232324",]}
                    start={{x:0.1,y: 0.1}}
                    end={{x:0.2,y: 0.5}}
                    style={{
                        opacity:0.65,
                    width:'100%', height:"100%", position:'absolute', }}></LinearGradient>
                </ImageBackground>
                </View>

             </View>
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
  card:{
    width:windowWidth * 0.35,
    height: windowWidth * 0.45,
    borderRadius:moderateScale(15,0.2),
    overflow:'hidden',
    margin: moderateScale(4,0.2)
  },
  image:{
    width:'100%',
    height:'100%',
    opacity:0.85,
    justifyContent:'center',
    alignItems:'center'
  },
  catText:{
    // borderColor:'red',
    // borderWidth:1,
    width:"80%",
    textAlign:'center',
    color:'white',
    
    position:'absolute',
    zIndex:1,
    // backgroundColor: Color.themeLightGray,
    fontSize:moderateScale(20,0.2),
    // flexWrap:'wrap'

  }
});
