import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from './CustomText';
import CustomImage from './CustomImage';
import {Icon} from 'native-base';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {baseUrl} from '../Config';
import Color from '../Assets/Utilities/Color';
import LinearGradient from 'react-native-linear-gradient';
const NewComponent = ({item}) => {
  // return console.log("🚀 ~ NewComponent ~ item:", item)

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.imageContainer}>
        <CustomImage
          resizeMode={'cover'}
          source={{uri: `${baseUrl}/${item?.community_info?.image}`}}
          style={styles.image}
        />
      </View>

      <CustomText
        numberOfLines={2}
        style={[
          styles.title,
          {
            color: '#e6eff3',
            width: windowWidth * 0.2,
          },
        ]}
        isBold>
        {item?.community_info?.title}
      </CustomText>
    </TouchableOpacity>
  );
};

function NewComponent3({item ,clicked ,setClicked ,setSelectedBubble,  setIsVisible ,isVisible}) {
  console.log("🚀 ~ NewComponent3 ~ item ==================> :", item?.privacy)
  return (
    <LinearGradient
      style={[
        {
          paddingHorizontal: 12,
          paddingVertical: moderateScale(10, 0.6),
          width: windowWidth * 0.9,
          height: windowHeight * 0.12,
          marginHorizontal: moderateScale(10, 0.2),
          marginBottom: moderateScale(7, 0.1),
          elevation: 6,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.3,
          shadowRadius: 4,
          borderRadius: moderateScale(10, 0.6),
        },
      ]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={['#01E8E3', '#1296AF']}>
      <TouchableOpacity style={styles.bubble}
      onPress={() =>{
        item?.privacy.toLowerCase() == 'yes' ? 
        setIsVisible(true)
        :setClicked(true)
        setSelectedBubble(item)
        // Alert.alert("Alert!", "Work in progress")

      }}
      >
        <View
          style={{
            width: windowHeight * 0.09,
            height: windowHeight * 0.1,

            borderRadius: moderateScale(10, 0.6),
            overflow: 'hidden',
          }}>
          <CustomImage
          onPress={() => {
            item?.privacy.toLowerCase() == 'yes' ? 
            setIsVisible(true)
            :setClicked(true)
            setSelectedBubble(item)
          }}
            resizeMode={'cover'}
            source={{uri: `${baseUrl}/${item?.image}`}}
            style={styles.image}
          />
          {/* <View style={styles.titleContainer}> */}
          {/* </View> */}
        </View>
        <View style={{width: '85%', paddingHorizontal: moderateScale(10, 0.2)}}>
          <CustomText
          
            numberOfLines={2}
            style={[styles.title, {color: 'white'}]}
            isBold>
            {item?.title}
          </CustomText>
          <CustomText
            numberOfLines={2}
            style={[styles.title, {color: '#f2f8ff'}]}
            isBold>
            {item?.description ? item?.description : 'Descrption here'}
          </CustomText>
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );
}

export {NewComponent, NewComponent3};

const styles = StyleSheet.create({
  container: {
    // marginleft: moderateScale(11,0.3),
    borderRadius: moderateScale(8, 0.2),
    width: windowWidth * 0.4,
    height: windowHeight * 0.078,
    backgroundColor: '#408094',
    flexDirection: 'row',
    marginHorizontal: moderateScale(2, 0.1),
    marginVertical: moderateScale(3, 0.2),
    overflow: 'hidden',
    alignItems: 'center',
    gap: moderateScale(11, 0.2),
    elevation: 6,
  },

  imageContainer: {
    width: windowWidth * 0.17,
    height: windowWidth * 0.17,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: moderateScale(14, 0.2),
  },

  bubble: {
    alignItems: 'center',
    flexDirection: 'row',
    overflow: 'hidden',
    borderRadius: moderateScale(7, 0.2),
  },
  titleContainer: {
    width: '100%',
    height: '100%',
  },
});
