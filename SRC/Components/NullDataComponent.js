import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { windowWidth ,windowHeight} from '../Utillity/utils';
import { moderateScale } from 'react-native-size-matters';
import CustomImage from './CustomImage';
import CustomText from './CustomText';

const NullDataComponent = () => {
  return (
    // <Text>nodata</Text>
    <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: windowWidth,
        flexDirection: 'column',
      }}>
      <View style={styles.image}>
        <CustomImage
          style={{width: '100%', height: '100%'}}
          source={require('../Assets/Images/empty_box.png')}
        />
      </View>
      <CustomText isBold style={styles.text}>
        No Data
      </CustomText>
    </View>
  )
};

export default NullDataComponent;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth,
    flexDirection: 'column',
  },
  image: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    overflow: 'hidden',
  },
  text: {
    color: 'white',
    fontSize: moderateScale(24, 0.3),
  },
});
