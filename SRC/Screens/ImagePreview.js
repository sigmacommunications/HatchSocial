import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CustomText from '../Components/CustomText';
import {Icon} from 'native-base';
import {Divider} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import React from 'react'
import CustomButton from '../Components/CustomButton';
import Entypo from 'react-native-vector-icons/Entypo';
import { windowHeight, windowWidth } from '../Utillity/utils';
import { moderateScale } from 'react-native-size-matters';
import CustomImage from '../Components/CustomImage';

const ImagePreview = ({navigation,route}) => {
const image= route?.params?.imageData;
  return (
    <>
    <View style={styles.row}>
      <TouchableOpacity
        onPress={() => {
            navigation.goBack()
            //   setIsVisible(false)
        }}>
        <View
          // colors={Color.themeBgColor}
          // style={styles.customBtn}>
          >
          <Icon
            name="arrowleft"
            as={AntDesign}
            size={moderateScale(24, 0.6)}
            color={'white'}
          />
        </View>
      </TouchableOpacity>

       {/* <CustomButton
        iconStyle={{
            width: windowWidth * 0.09,
            height: windowHeight * 0.05,
            textAlign: 'center',
            paddingHorizontal: moderateScale(12, 0.2),
            paddingTop: moderateScale(15, 0.6),
            fontSize: moderateScale(24, 0.6),
            color: Color.black,
        }}
        iconName="cross"
        iconType={Entypo}
        iconSize={18}
        // color={Color.white}
        marginTop={moderateScale(5, 0.3)}
        // text={'Use'}
        isGradient={true}
        onPress={() => {
            //   setIsVisible(false);
        }}
        bgColor={['white', 'white']}
        width={windowHeight * 0.06}
        height={windowHeight * 0.06}
        />  */}
    </View>
    <View style={styles.imageView}>
        <CustomText style={{color:'white'}}>{image?.index}</CustomText>
    <View style={{width: windowWidth, height:windowHeight * 0.56, overflow:'hidden'}}>

   <CustomImage style={{width:'100%', height: '100%'}} 
   resizeMode={'cover'}
   source={{uri: image?.uri}}/>
    </View>
  </View>
   </>
  )
}

export default ImagePreview

const styles = StyleSheet.create({
    row: {
        paddingHorizontal: moderateScale(10, 0.6),
        paddingVertical: moderateScale(15, 0.6),
        flexDirection: 'row',
        width:windowWidth,
        height:windowHeight * 0.1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor :'black'
      },
      imageView: {
        widtth: windowWidth,
        height: windowHeight * 0.9,
        justifyContent:'center',
        // zIndex:1,
    
        backgroundColor:'black',
        // justifyContent: 'center',
    
        // paddingHorizontal:moderateScale(12,0.2)
      },
})