import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native'
import React from 'react';
import * as Animatable from 'react-native-animatable';
import CustomText from './CustomText';
import CustomImage from './CustomImage';
import LinearGradient from 'react-native-linear-gradient';
import { windowWidth } from '../Utillity/utils';
import { moderateScale } from 'react-native-size-matters';

const InterestCardComponent = ({ onPress, item}) => {
  return (
    <TouchableOpacity
    activeOpacity={0.8}
    style={styles.card}
    onPress={onPress}>
    <ImageBackground
      resizeMode="cover"
      source={item?.image}
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
            onPress={onPress}
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
  )
}

export default InterestCardComponent;

const styles= StyleSheet.create({
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
        width: '90%',
        textAlign: 'center',
        color: 'white',
    
        position: 'absolute',
        zIndex: 1,
        // backgroundColor: Color.themeLightGray,
        fontSize: moderateScale(15, 0.2),
        // flexWrap:'wrap'
      },
})