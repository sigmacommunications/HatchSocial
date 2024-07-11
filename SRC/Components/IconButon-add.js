import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Icon } from 'native-base';
import React from 'react'
import { windowWidth } from '../Utillity/utils';
import { moderateScale } from 'react-native-size-matters';

const AddIconButton = ({onPress, style}) => {
  return (
    <TouchableOpacity
  
  style={[{backgroundColor:'#3e809d', 
      alignItems:'center',
      justifyContent:'center',
    borderRadius: (windowWidth * 0.15)/2,
    position:'absolute',
    // position:'absolute',
    bottom:moderateScale(120,0.3),
    right:moderateScale(10,0.3),
    zIndex:1,  
    width: windowWidth * 0.15, height: windowWidth * 0.15} , style]}
    onPress={onPress}
    >
        <Icon 
        onPress={onPress}
        as={Ionicons} name='add' size={moderateScale(24,0.2)} color={'white'}/>
      </TouchableOpacity>
  )
}

export default AddIconButton

const styles = StyleSheet.create({})