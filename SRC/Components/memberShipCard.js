import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native'
import CustomText from './CustomText';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign'; 
import { Divider, Icon } from 'native-base';
import { moderateScale } from 'react-native-size-matters';
import { windowHeight, windowWidth } from '../Utillity/utils';
import CustomButton from './CustomButton';
import LinearGradient from 'react-native-linear-gradient';

const MemberShipCard = ({
    plan,
    price,
    subscriptionRules,
    bgColor,
    heading,
    subHeading,
    onSubscribe ,
    colors       
}) => {
  return (
    // <View style={[styles.card, bgColor && {
    //     backgroundColor: bgColor
    // }]}>
    <LinearGradient style={styles.card} colors={colors}>

    <View style={{marginBottom:moderateScale(10,0.2), height:'10%'}}>

    <CustomText
      isBold
      style={{
        textTransform:"uppercase",
          textAlign: 'center',
          color: 'white',
          fontSize: moderateScale(20, 0.2),
        }}>
      {plan}
    </CustomText>
    <CustomText isBold style={{textAlign: 'center', 
          fontSize: moderateScale(18, 0.2),
    color: 'white', }}>
     {price}
    </CustomText>
          </View>
    <Divider height={"0.5"} color={'white'}/>
    <View
    style={{ height:windowHeight * 0.45, 
      paddingVertical:moderateScale(5,0.1),
      marginTop:moderateScale(12,0.2)}}
    >
{/* {subscriptionRules.map((item,index) =>{
  return (
    <View
    key={index}
    style={{flexDirection:'row', 
    // alignItems:'center',
    justifyContent:'center',
    gap: moderateScale(12,0.2)}}
    >
        <Icon
        as={AntDesign}
        name='checkcircle'
        size={moderateScale(14,0.2)}
        style={{marginTop:3}}
        color={'white'}
        />
        <CustomText style={{ 
          textTransform:'none',
          color:'white', width:windowWidth * 0.65, flexWrap: 'wrap'}}>
          <CustomText style={{color:'white'}} isBold>
          {`${item.heading} : `}
          </CustomText>
           {item.description}</CustomText>
      
    </View>
  );
})

} */}
    <FlatList
    data={subscriptionRules}
    keyExtractor={item => item.id}
    // showsVerticalScrollIndicator
    // indicatorStyle='white'
    renderItem={({item}) => {
        return (
            <View
            style={{flexDirection:'row', 
            // alignItems:'center',
            justifyContent:'center',
            gap: moderateScale(12,0.2)}}
            >
                <Icon
                as={AntDesign}
                name='checkcircle'
                size={moderateScale(14,0.2)}
                style={{marginTop:3}}
                color={'white'}
                />
                <CustomText style={{ 
                  textTransform:'none',
                  color:'white', width:windowWidth * 0.65, flexWrap: 'wrap'}}>
                  <CustomText style={{color:'white'}} isBold>
                  {`${item.heading} : `}
                  </CustomText>
                   {item.description}</CustomText>
              
            </View>
        );
    }}
    />

    </View>
  <View style={styles.roleContainer}>
    <CustomText isBold style={styles.role}>{heading}</CustomText>
    <CustomText isBold style={styles.role}>{subHeading}</CustomText>
  </View>
  <CustomButton
   text={'Explore Now'}
   textColor={"white"}
   width={windowWidth * 0.7}
   height={windowHeight * 0.06}
   marginTop={moderateScale(10, 0.3)}
   onPress={() =>{
    onSubscribe();
   }}
   bgColor={'transparent'}
   borderRadius={moderateScale(30, 0.3)}
   borderWidth={moderateScale(2,0.2)}
   borderColor={"white"}
   magrinBottom={moderateScale(10,0.2)}

  />
    </LinearGradient>
  // </View>
  )
}

export default MemberShipCard;
const styles = StyleSheet.create({
    card: {
        marginTop:moderateScale(12,0.2),
        backgroundColor: '#F4397A',
        width: windowWidth * 0.85,
        height: windowHeight * 0.75,
        paddingHorizontal:moderateScale(12,0.3),
        borderRadius: moderateScale(17, 0.2),
        paddingVertical:moderateScale(12,0.3),
        // overflow:'hidden'
      
      },
      role:{
        color:'white', 
      textAlign:'left',
      fontSize: moderateScale(22,0.5)
    },
    roleContainer:{
      justifyContent:'center', 
      alignItems:'center', 
      marginTop:moderateScale(3,0.1)
    }
})